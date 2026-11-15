'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase-browser';
import AtlasTab from './atlas-tab';

const DISCORD = 'https://discord.gg/XTRw3hRfe';

type Profile = {
  id: string;
  gamertag: string;
  platform: string | null;
  is_leader: boolean | null;
  base_on_terra_approved: boolean | null;
  station_conquered_approved: boolean | null;
  glyphs_unlocked: boolean | null;
};

type Tab = 'progresso' | 'atlas' | 'lideranca';

const steps = [
  { step: 'base', key: 'base_on_terra_approved', label: 'Base na Terra' },
  { step: 'station', key: 'station_conquered_approved', label: 'Estação conquistada' },
  { step: 'glyphs', key: 'glyphs_unlocked', label: 'Glifos desbloqueados' },
] as const;

const columns =
  'id, gamertag, platform, is_leader, base_on_terra_approved, station_conquered_approved, glyphs_unlocked';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tab, setTab] = useState<Tab>('progresso');
  const [members, setMembers] = useState<Profile[] | null>(null);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace('/entrar');
        return;
      }
      const { data: row } = await supabase
        .from('profiles')
        .select(columns)
        .eq('id', data.user.id)
        .maybeSingle();
      if (!row) {
        router.replace('/bem-vindo');
        return;
      }
      setProfile(row);
    });
  }, [router]);

  useEffect(() => {
    if (tab !== 'lideranca' || !profile?.is_leader) return;
    createClient()
      .from('profiles')
      .select(columns)
      .order('gamertag')
      .then(({ data }) => setMembers(data ?? []));
  }, [tab, profile?.is_leader]);

  async function signOut() {
    await createClient().auth.signOut();
    router.replace('/');
  }

  async function toggle(m: Profile, s: (typeof steps)[number]) {
    const next = !m[s.key];
    const apply = (value: boolean) =>
      setMembers((list) =>
        list ? list.map((x) => (x.id === m.id ? { ...x, [s.key]: value } : x)) : list,
      );
    apply(next);
    const { error } = await createClient().rpc('set_member_progress', {
      target: m.id,
      step: s.step,
      new_value: next,
    });
    if (error) {
      apply(!next);
      setNotice('Não foi possível salvar. Tente de novo.');
      return;
    }
    setNotice('');
    if (m.id === profile?.id) setProfile((p) => (p ? { ...p, [s.key]: next } : p));
  }

  if (!profile) {
    return <div className="mx-auto max-w-6xl px-5 py-16 text-mute">Carregando...</div>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'progresso', label: 'Meu progresso' },
    { id: 'atlas', label: 'Atlas' },
    ...(profile.is_leader ? [{ id: 'lideranca' as Tab, label: 'Liderança' }] : []),
  ];

  const needsGlyphs =
    profile.base_on_terra_approved && profile.station_conquered_approved && !profile.glyphs_unlocked;

  const shown = (members ?? []).filter((m) =>
    m.gamertag.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-8">
        <div>
          {profile.is_leader && <p className="mb-2 font-semibold text-gold">Liderança da aliança</p>}
          <h1 className="font-display text-6xl font-black leading-none">{profile.gamertag}</h1>
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
              tab === t.id ? 'bg-gold text-background' : 'border border-line text-mute hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'progresso' && (
          <>
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((s) => {
                const done = !!profile[s.key];
                return (
                  <div key={s.step} className={`rounded-md border p-6 ${done ? 'border-gold bg-panel' : 'border-line'}`}>
                    <h2 className="font-display text-3xl font-black">{s.label}</h2>
                    <p className={`mt-2 font-semibold ${done ? 'text-gold' : 'text-mute'}`}>
                      {done ? 'Concluída' : 'Pendente'}
                    </p>
                  </div>
                );
              })}
            </div>
            {needsGlyphs && (
              <p className="mt-6 text-mute">
                Você cumpriu as etapas. Peça a um líder no{' '}
                <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline">
                  Discord
                </a>{' '}
                para liberar os seus glifos.
              </p>
            )}
          </>
        )}

        {tab === 'atlas' && <AtlasTab userId={profile.id} isLeader={!!profile.is_leader} />}

        {tab === 'lideranca' && profile.is_leader && (
          <div>
            <label htmlFor="busca" className="mb-2 block text-sm text-mute">
              Buscar membro
            </label>
            <input
              id="busca"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nome de viajante"
              className="mb-4 w-full max-w-sm rounded border border-line bg-background px-4 py-3 text-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
            />
            <p role="status" className="mb-2 min-h-6 text-sm text-red-400">
              {notice}
            </p>
            {members === null ? (
              <p className="text-mute">Carregando membros...</p>
            ) : shown.length === 0 ? (
              <p className="text-mute">Nenhum membro encontrado.</p>
            ) : (
              <ul className="divide-y divide-line border-y border-line">
                {shown.map((m) => (
                  <li key={m.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                    <div>
                      <p className="font-display text-3xl font-black leading-none">
                        {m.gamertag}
                        {m.id === profile.id && <span className="ml-2 font-body text-base font-normal text-mute">você</span>}
                      </p>
                      <p className="text-sm text-mute">
                        {m.platform ?? 'plataforma não informada'}
                        {m.is_leader ? ' · liderança' : ''}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {steps.map((s) => (
                        <button
                          key={s.step}
                          onClick={() => toggle(m, s)}
                          aria-pressed={!!m[s.key]}
                          className={`rounded px-4 py-2 text-sm font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft ${
                            m[s.key] ? 'bg-gold text-background' : 'border border-line text-mute hover:text-foreground'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
