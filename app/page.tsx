'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      
      {/* Background Atmospheres & Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-8 uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 relative" />
          Setor Euclid • Rede de Frotas Ativa
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight uppercase mb-8 bg-gradient-to-b from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
          Aliança Saqueadores
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light mb-12 leading-relaxed">
          O sindicato soberano em No Man's Sky. Engenharia de bases na <span className="text-cyan-400 font-medium">"Terra"</span>, comércio restrito e supremacia tática absoluta.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transform hover:-translate-y-0.5">
            Entrar no Painel Tático
          </Link>
          <a href="#pilares" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-widest text-xs border border-slate-800 backdrop-blur-md transition-all duration-300">
            Explorar Diretrizes
          </a>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="border-y border-slate-800/60 bg-slate-950/40 backdrop-blur-xl py-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-black text-cyan-400 font-mono tracking-tight">100%</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-mono">Soberania Galáctica</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-black text-white font-mono tracking-tight">ELITE</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-mono">Padrão Operacional</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-black text-cyan-400 font-mono tracking-tight">EUCLID</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-mono">Domínio Primário</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-black text-white font-mono tracking-tight">ONLINE</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-mono">Censo Criptografado</div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pilares" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Arquitetura da Aliança</h2>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Pilares Operacionais</h3>
          <div className="w-12 h-1 bg-cyan-500 mx-auto rounded-full mt-4 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 font-mono font-bold mb-6 group-hover:scale-110 transition-transform shadow-inner">
              01
            </div>
            <h4 className="text-lg font-bold text-white mb-3 tracking-wide">Censo de Exploradores</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Registo biométrico e de gamertags na rede central para validação de patentes e permissões de frota.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 font-mono font-bold mb-6 group-hover:scale-110 transition-transform shadow-inner">
              02
            </div>
            <h4 className="text-lg font-bold text-white mb-3 tracking-wide">Residência na "Terra"</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Submissão de coordenadas planetárias e homologação de bases fortificadas perante o comando central.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 font-mono font-bold mb-6 group-hover:scale-110 transition-transform shadow-inner">
              03
            </div>
            <h4 className="text-lg font-bold text-white mb-3 tracking-wide">Glifos de Elite</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Acesso exclusivo a sequências de portais restritos, rotas comerciais e sistemas de alta densidade de recursos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}