'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase-browser';

type Profile = {
  gamertag: string;
  platform: string | null;
  is_leader: boolean | null;
  base_on_terra_approved: boolean | null;
  station_conquered_approved: boolean | null;
  glyphs_unlocked: boolean | null;
};

type Tab = 'progresso' | 'atlas' | 'lideranca';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tab, setTab] = useState<Tab>('progresso');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace('/entrar');
        return;
      }
      const { data: row } = await supabase
        .from('profiles')
        .select(
          'gamertag, platform, is_leader, base_on_terra_approved, station_conquered_approved, glyphs_unlocked',
        )
        .eq('id', data.user.id)
        .maybeSingle();
      if (!row) {
        router.replace('/bem-vindo');
        return;
      }
      setProfile(row);
    });
  }, [router]);

  async function signOut() {
    await createClient().auth.signOut();
    router.replace('/');
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 text-mute">Carregando...</div>
    );
  }

  const steps = [
    { title: 'Base na Terra', done: !!profile.base_on_terra_approved },
    { title: 'Estação conquistada', done: !!profile.station_conquered_approved },
    { title: 'Glifos desbloqueados', done: !!profile.glyphs_unlocked },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: 'progresso', label: 'Meu progresso' },
    { id: 'atlas', label: 'Atlas' },
    ...(profile.is_leader ? [{ id: 'lideranca' as Tab, label: 'Liderança' }] : []),
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-8">
        <div>
          {profile.is_leader && (
            <p className="mb-2 font-semibold text-gold">Liderança da aliança</p>
          )}
          <h1 className="font-display text-6xl font-black leading-none">
            {profile.gamertag}
          </h1>
          <p className="mt-2 text-mute">Plataforma: {profile.platform ?? 'não informada'}</p>
        </div>
        <button
          onClick={signOut}
          className="rounded border border-line px-5 py-2.5 font-semibold hover:border-gold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
        >
          Sair
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Seções do painel">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={`rounded px-5 py-2.5 font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft ${
              tab === t.id
                ? 'bg-gold text-background'
                : 'border border-line text-mute hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'progresso' && (
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.title}
                className={`rounded-md border p-6 ${s.done ? 'border-gold bg-panel' : 'border-line'}`}
              >
                <h2 className="font-display text-3xl font-black">{s.title}</h2>
                <p className={`mt-2 font-semibold ${s.done ? 'text-gold' : 'text-mute'}`}>
                  {s.done ? 'Concluída' : 'Pendente'}
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === 'atlas' && (
          <div className="rounded-md border border-dashed border-line bg-panel p-8">
            <h2 className="mb-2 font-display text-3xl font-black">Atlas em construção</h2>
            <p className="text-mute">
              Aqui ficarão as descobertas da aliança, com glifos, tipo de planeta e autor.
            </p>
          </div>
        )}

        {tab === 'lideranca' && profile.is_leader && (
          <div className="rounded-md border border-dashed border-line bg-panel p-8">
            <h2 className="mb-2 font-display text-3xl font-black">Painel da liderança</h2>
            <p className="text-mute">
              Os pedidos de aprovação dos membros aparecerão aqui na próxima etapa.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
