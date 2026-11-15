import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Barlow_Condensed, Public_Sans } from 'next/font/google';
import './globals.css';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--next-display',
});

const body = Public_Sans({
  subsets: ['latin'],
  variable: '--next-body',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alianca-saqueadores.vercel.app'),
  title: "Aliança Saqueadores | No Man's Sky",
  description:
    "Aliança brasileira de No Man's Sky: missões em grupo pagas em glifos e um atlas de planetas feito pelos próprios viajantes.",
  openGraph: {
    title: "Aliança Saqueadores | No Man's Sky",
    description:
      'Missões em grupo pagas em glifos e um atlas de planetas feito pelos viajantes.',
    images: ['/logo.png'],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`dark ${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-gold selection:text-background">
        <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={34} height={34} priority />
              <span className="font-display text-2xl font-black text-foreground">
                Saqueadores
              </span>
            </Link>

            <nav className="flex items-center gap-6 text-sm">
              <Link href="/#missoes" className="hidden text-mute hover:text-foreground sm:inline">
                Missões
              </Link>
              <Link href="/atlas" className="hidden text-mute hover:text-foreground sm:inline">
                Atlas
              </Link>
              <Link href="/#entrar" className="hidden text-mute hover:text-foreground sm:inline">
                Como entrar
              </Link>
              <Link
                href="/dashboard"
                className="rounded bg-gold px-5 py-2.5 font-semibold text-background hover:bg-gold-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
              >
                Entrar
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-line py-8 text-sm text-mute">
          <div className="mx-auto max-w-6xl px-5">
            Aliança Saqueadores, comunidade de No Man&apos;s Sky. Projeto de fãs,
            sem vínculo com a Hello Games.
          </div>
        </footer>
      </body>
    </html>
  );
}
