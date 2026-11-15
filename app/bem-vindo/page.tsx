'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase-browser';

const platforms = ['PC', 'PlayStation', 'Xbox', 'Switch'];

const field =
  'w-full rounded border border-line bg-background px-4 py-3 text-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft';

export default function BemVindoPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [gamertag, setGamertag] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace('/entrar');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();
      if (profile) {
        router.replace('/entrar');
        return;
      }
      setUserId(data.user.id);
      setReady(true);
    });
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const tag = gamertag.trim();
    if (tag.length < 3 || tag.length > 24) {
      setMessage('O nome deve ter de 3 a 24 caracteres.');
      return;
    }
    setSaving(true);
    setMessage('');

    const { error } = await createClient()
      .from('profiles')
      .insert({ id: userId, gamertag: tag, platform });

    if (error) {
      setMessage(
        error.code === '23505'
          ? 'Esse nome já está em uso. Escolha outro.'
          : 'Não foi possível salvar. Tente de novo.',
      );
      setSaving(false);
      return;
    }
    router.replace('/entrar');
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <div className="rounded-md border border-line bg-panel p-8">
        <h1 className="mb-2 font-display text-5xl font-black leading-none text-gold">
          Bem-vindo, viajante
        </h1>

        {!ready ? (
          <p className="mt-4 text-mute">Carregando...</p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-5">
            <p className="text-mute">
              Escolha o nome com que você aparece na aliança e a sua plataforma.
            </p>
            <div>
              <label htmlFor="gamertag" className="mb-2 block text-sm text-mute">
                Nome de viajante
              </label>
              <input
                id="gamertag"
                value={gamertag}
                onChange={(e) => setGamertag(e.target.value)}
                maxLength={24}
                placeholder="De 3 a 24 caracteres"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="platform" className="mb-2 block text-sm text-mute">
                Plataforma
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className={field}
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            {message && <p className="text-sm text-red-400">{message}</p>}
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-gold px-6 py-3 font-semibold text-background hover:bg-gold-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft disabled:opacity-60"
            >
              {saving ? 'Salvando...' : 'Entrar na aliança'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
