'use client';
import { useState } from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'progresso' | 'atlas' | 'lideranca'>('progresso');
  const [baseCoord, setBaseCoord] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleBaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseCoord.trim()) return;
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
    setBaseCoord('');
  };

  return (
    <div className="min-h-screen py-10 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header do Operador */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50 mb-3 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Liderança • Capitão Oficial
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">Painel do Descobridor</h1>
            <p className="text-xs md:text-sm text-slate-400 font-mono mt-1.5">
              Operador: <span className="text-cyan-400 font-semibold">Intocavel</span> <span className="text-slate-600">|</span> Plataforma: <span className="text-slate-300">PC / Steam</span>
            </p>
          </div>

          <button 
            onClick={() => alert('Sessão encerrada com segurança.')} 
            className="mt-6 md:mt-0 px-5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 font-mono text-xs border border-red-900/50 transition-all duration-300 backdrop-blur-md relative z-10"
          >
            Encerrar Sessão
          </button>
        </div>

        {/* Abas de Navegação Tática */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
          <button 
            onClick={() => setActiveTab('progresso')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 border ${activeTab === 'progresso' ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-800/40'}`}
          >
            Meu Progresso & Base
          </button>
          <button 
            onClick={() => setActiveTab('atlas')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 border ${activeTab === 'atlas' ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-800/40'}`}
          >
            Mural do Atlas
          </button>
          <button 
            onClick={() => setActiveTab('lideranca')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 border ${activeTab === 'lideranca' ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-800/40'}`}
          >
            Painel da Liderança 👑
          </button>
        </div>

        {/* Conteúdo da Aba Ativa */}
        {activeTab === 'progresso' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
                <div className="text-xl font-black text-cyan-400 font-mono mb-2">01</div>
                <h3 className="text-sm font-bold text-white mb-1">Entrar na Aliança</h3>
                <p className="text-xs text-slate-400 font-light">Censo registado com sucesso no sistema.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
                <div className="text-xl font-black text-cyan-400 font-mono mb-2">02</div>
                <h3 className="text-sm font-bold text-white mb-1">Casa na "Terra"</h3>
                <p className="text-xs text-slate-400 font-light">Base Aprovada pela Liderança!</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-950/20 to-slate-900/40 border border-green-500/30 backdrop-blur-xl">
                <div className="text-xl font-black text-green-400 font-mono mb-2">03</div>
                <h3 className="text-sm font-bold text-white mb-1">Glifos de Elite</h3>
                <p className="text-xs text-slate-400 font-light">Liberados com Sucesso!</p>
              </div>
            </div>

            {/* Formulário de Registo de Residência */}
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white mb-1">Registo da Residência na "Terra"</h2>
              <p className="text-xs text-slate-400 font-light mb-6">Insira o link de acesso ou as coordenadas do portal da sua base para análise da liderança.</p>
              
              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Coordenadas submetidas com sucesso para análise da liderança!
                </div>
              )}

              <form onSubmit={handleBaseSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-2">Link da Base / Coordenadas NMS</label>
                  <input 
                    type="text" 
                    value={baseCoord}
                    onChange={(e) => setBaseCoord(e.target.value)}
                    placeholder="Ex: Coordenadas Planetárias ou print do local" 
                    className="w-full bg-[#020408] border border-slate-800 rounded-xl px-4 py-3.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono transition-all duration-300 shadow-inner"
                  />
                </div>
                <button type="submit" className="px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  Enviar para Validação
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'atlas' && (
          <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl text-center">
            <h2 className="text-xl font-bold text-white mb-2">Mural do Atlas & Glifos</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">Repositório central de sequências de portais e coordenadas de mundos extremos da aliança.</p>
          </div>
        )}

        {activeTab === 'lideranca' && (
          <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl text-center">
            <h2 className="text-xl font-bold text-white mb-2">Painel de Comando Restrito</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">Área exclusiva para validação de frotas, patentes e aprovação de novos membros.</p>
          </div>
        )}

      </div>
    </div>
  );
}