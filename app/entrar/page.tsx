'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { createClient } from '../lib/supabase-browser';

const button =
  'rounded bg-gold px-6 py-3 font-semibold text-background hover:bg-gold-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft disabled:opacity-60';

export default function EntrarPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(new URLSearchParams(window.location.search).has('erro'));
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        setUser(data.user);
        setLoading(false);
      });
  }, []);

  async function signIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async function signOut() {
    await createClient().auth.signOut();
    setUser(null);
  }

  const name =
    user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.email;

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <div className="rounded-md border border-line bg-panel p-8">
        <h1 className="mb-2 font-display text-5xl font-black leading-none text-gold">
          Entrar
        </h1>

        {loading ? (
          <p className="text-mute">Verificando sessão...</p>
        ) : user ? (
          <>
            <p className="mt-4 mb-6 text-mute">
              Conectado como <b className="text-foreground">{name}</b>.
            </p>
            <button onClick={signOut} className={button}>
              Sair
            </button>
          </>
        ) : (
          <>
            <p className="mt-4 mb-3 text-mute">
              Use a sua conta do Discord para acessar o portal da aliança.
            </p>
            <p className="mb-6 text-sm text-mute">
              Ao entrar, você concorda com as{' '}
              <Link href="/regras" className="underline">
                Regras
              </Link>{' '}
              e a{' '}
              <Link href="/privacidade" className="underline">
                Política de Privacidade
              </Link>
              .
            </p>
            {failed && (
              <p className="mb-4 text-sm text-red-400">
                Não foi possível concluir o login. Tente de novo.
              </p>
            )}
            <button onClick={signIn} className={button}>
              Entrar com Discord
            </button>
          </>
        )}
      </div>
    </div>
  );
}
