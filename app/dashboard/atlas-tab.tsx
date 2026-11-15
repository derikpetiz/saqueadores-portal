'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../lib/supabase-browser';

type Item = {
  id: string;
  title: string;
  type: string | null;
  galaxy: string | null;
  glyphs: string | null;
  author: string | null;
  user_id: string | null;
};

const types = ['Gigante paradisíaco', 'Gigante oceânico', 'Outro'];
const emptyForm = { title: '', type: types[0], galaxy: '', glyphs: '', description: '', image: '' };

const field =
  'w-full rounded border border-line bg-background px-4 py-3 text-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft';

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-mute">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function AtlasTab({ userId, isLeader }: { userId: string; isLeader: boolean }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    let q = createClient()
      .from('atlas_discoveries')
      .select('id, title, type, galaxy, glyphs, author, user_id')
      .order('created_at', { ascending: false });
    if (!isLeader) q = q.eq('user_id', userId);
    const { data } = await q;
    setItems(data ?? []);
  }, [isLeader, userId]);

  useEffect(() => {
    load();
  }, [load]);

  const set = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const title = form.title.trim();
    const galaxy = form.galaxy.trim();
    const glyphs = form.glyphs.replace(/\s/g, '').toUpperCase();
    const description = form.description.trim();
    const image = form.image.trim();

    const problem =
      title.length < 3 || title.length > 80
        ? 'O título deve ter de 3 a 80 caracteres.'
        : galaxy.length < 2 || galaxy.length > 40
          ? 'Informe a galáxia, com 2 a 40 caracteres.'
          : !/^[0-9A-F]{12}$/.test(glyphs)
            ? 'Os glifos devem ter 12 caracteres, de 0 a 9 e de A a F.'
            : description.length > 500
              ? 'A descrição pode ter no máximo 500 caracteres.'
              : image && !/^https:\/\//i.test(image)
                ? 'O link da imagem deve começar com https://'
                : '';
    if (problem) {
      setMsg({ ok: false, text: problem });
      return;
    }

    setSaving(true);
    setMsg(null);
    const { error } = await createClient()
      .from('atlas_discoveries')
      .insert({
        title,
        type: form.type,
        galaxy,
        glyphs,
        description: description || null,
        image_url: image || null,
      });
    setSaving(false);

    if (error) {
      setMsg({
        ok: false,
        text: error.code === '23505' ? 'Esse planeta já está no atlas.' : 'Não foi possível registrar. Tente de novo.',
      });
      return;
    }
    setForm(emptyForm);
    setMsg({ ok: true, text: 'Descoberta registrada.' });
    load();
  }

  async function remove(id: string) {
    const { data, error } = await createClient().from('atlas_discoveries').delete().eq('id', id).select('id');
    setConfirmId(null);
    if (error || !data || data.length === 0) {
      setMsg({ ok: false, text: 'Não foi possível apagar.' });
      return;
    }
    setItems((l) => (l ? l.filter((i) => i.id !== id) : l));
    setMsg({ ok: true, text: 'Descoberta apagada.' });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={submit} className="space-y-4">
        <h2 className="font-display text-4xl font-black leading-none">Registrar descoberta</h2>
        <Field id="a-title" label="Título">
          <input id="a-title" value={form.title} onChange={set('title')} maxLength={80} className={field} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="a-type" label="Tipo de planeta">
            <select id="a-type" value={form.type} onChange={set('type')} className={field}>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field id="a-galaxy" label="Galáxia">
            <input id="a-galaxy" value={form.galaxy} onChange={set('galaxy')} maxLength={40} placeholder="Ex: Eissentam" className={field} />
          </Field>
        </div>
        <Field id="a-glyphs" label="Glifos do portal (12 caracteres)">
          <input id="a-glyphs" value={form.glyphs} onChange={set('glyphs')} maxLength={16} placeholder="0123 4567 89AB" className={`${field} font-mono`} />
        </Field>
        <Field id="a-desc" label="Descrição (opcional)">
          <textarea id="a-desc" value={form.description} onChange={set('description')} maxLength={500} rows={3} className={field} />
        </Field>
        <Field id="a-img" label="Link da imagem (opcional, https)">
          <input id="a-img" value={form.image} onChange={set('image')} placeholder="https://..." className={field} />
        </Field>
        <p role="status" className={`min-h-6 text-sm ${msg?.ok ? 'text-gold' : 'text-red-400'}`}>
          {msg?.text}
        </p>
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-gold px-6 py-3 font-semibold text-background hover:bg-gold-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Registrar no atlas'}
        </button>
      </form>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-4xl font-black leading-none">
            {isLeader ? 'Todas as descobertas' : 'Minhas descobertas'}
          </h2>
          <Link href="/atlas" className="text-sm font-semibold text-gold underline">
            Ver o atlas público
          </Link>
        </div>
        {items === null ? (
          <p className="mt-6 text-mute">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="mt-6 text-mute">Nenhuma descoberta registrada ainda.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {items.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-display text-2xl font-black leading-none">{i.title}</p>
                  <p className="mt-1 text-sm text-mute">
                    {[i.galaxy, i.glyphs, isLeader && i.author ? `por ${i.author}` : null].filter(Boolean).join(' · ')}
                  </p>
                </div>
                {confirmId === i.id ? (
                  <div className="flex gap-2">
                    <button onClick={() => remove(i.id)} className="rounded bg-red-500 px-3 py-1.5 text-sm font-semibold text-background">
                      Confirmar
                    </button>
                    <button onClick={() => setConfirmId(null)} className="rounded border border-line px-3 py-1.5 text-sm font-semibold">
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmId(i.id)} className="rounded border border-line px-3 py-1.5 text-sm font-semibold text-mute hover:border-red-400 hover:text-red-400">
                    Apagar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
