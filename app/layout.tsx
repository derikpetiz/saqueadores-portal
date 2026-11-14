import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aliança Saqueadores | Portal Oficial - No Man\'s Sky',
  description: 'Portal tático e censo oficial da frota de elite Saqueadores.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#030712] text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-black font-sans antialiased">
        
        {/* Barra de Navegação Superior Global (Fixa & Imersiva) */}
        <header className="border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-2xl sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2.5 group">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
              <span className="text-cyan-400 font-black tracking-widest text-sm uppercase font-mono">Saqueadores</span>
            </a>
            <span className="text-slate-700">/</span>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 font-mono tracking-wider uppercase">
              SEC-EUCLID
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <a 
              href="/" 
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80 transition-all duration-300 flex items-center gap-2"
            >
              <span>🏠</span> Início / Home
            </a>
            <a 
              href="/dashboard" 
              className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
            >
              Painel Tático
            </a>
          </nav>
        </header>

        <main>{children}</main>

        {/* Rodapé Global */}
        <footer className="border-t border-slate-900 bg-[#020408] py-8 px-6 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
          <div>ALIANÇA SAQUEADORES • SECURE GRID V2.5</div>
          <div className="text-cyan-500/60">NO MAN'S SKY ELITE HUB</div>
        </footer>
      </body>
    </html>
  );
}