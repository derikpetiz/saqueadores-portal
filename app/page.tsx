'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

export default function PortalDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gamertag, setGamertag] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  
  // Abas do Painel: 'progresso' | 'atlas' | 'lideranca'
  const [activeTab, setActiveTab] = useState('progresso');

  // Estados para Envio de Base
  const [baseLink, setBaseLink] = useState('');
  const [baseMsg, setBaseMsg] = useState('');

  // Estados para o Mural do Atlas
  const [discoveries, setDiscoveries] = useState<any[]>([]);
  const [planetName, setPlanetName] = useState('');
  const [systemName, setSystemName] = useState('');
  const [glyphCoords, setGlyphCoords] = useState('');

  // Estados para Liderança
  const [allProfiles, setAllProfiles] = useState<any[]>([]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Autenticação
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (isForgotPassword) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/dashboard',
      });
      if (error) setErrorMsg('Erro: ' + error.message);
      else setSuccessMsg('Instruções enviadas para o seu e-mail.');
      setLoading(false);
      return;
    }

    if (isRegistering) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      } 
      if (data.user) {
        await supabase.from('profiles').insert([{ id: data.user.id, gamertag, platform }]);
        const { data: loginData } = await supabase.auth.signInWithPassword({ email, password });
        if (loginData.user) {
          setUser(loginData.user);
          await fetchProfile(loginData.user.id);
        }
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg('Credenciais inválidas.');
      } else if (data.user) {
        setUser(data.user);
        await fetchProfile(data.user.id);
      }
    }
    setLoading(false);
  };

  const fetchProfile = async (userId: string) => {
    let { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) {
      setProfile(data);
      if (data.is_leader) fetchAllProfiles();
    }
    fetchDiscoveries();
  };

  const fetchDiscoveries = async () => {
    const { data } = await supabase.from('atlas_discoveries').select('*').order('created_at', { ascending: false });
    if (data) setDiscoveries(data);
  };

  const fetchAllProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*');
    if (data) setAllProfiles(data);
  };

  // Enviar Base para Aprovação
  const handleBaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('profiles')
      .update({ base_on_terra_approved: false }) // Envia como pendente de validação
      .eq('id', user.id);

    if (error) setBaseMsg('Erro ao enviar base.');
    else {
      setBaseMsg('Base enviada com sucesso! Aguardando validação da liderança.');
      fetchProfile(user.id);
    }
  };

  // Adicionar Descoberta no Atlas
  const handleAddDiscovery = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('atlas_discoveries').insert([
      { planet_name: planetName, system_name: systemName, glyph_coords: glyphCoords, discovered_by: profile.gamertag }
    ]);
    if (!error) {
      setPlanetName('');
      setSystemName('');
      setGlyphCoords('');
      fetchDiscoveries();
      alert('Sistema catalogado no Atlas com sucesso!');
    }
  };

  // Ações da Liderança (Aprovar Base ou Glifos)
  const toggleApproval = async (memberId: string, field: string, currentVal: boolean) => {
    await supabase.from('profiles').update({ [field]: !currentVal }).eq('id', memberId);
    fetchAllProfiles();
  };

  // Se logado
  if (user && profile) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          {/* Cabeçalho */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-6 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full">
                {profile.is_leader ? 'Liderança • Capitão/Oficial' : 'Explorador de Elite'}
              </span>
              <h1 className="text-3xl font-black text-white mt-2">Painel do Descobridor</h1>
              <p className="text-slate-400 text-sm">Operador: <span className="text-cyan-400 font-bold">{profile.gamertag}</span> ({profile.platform})</p>
            </div>
            <button 
              onClick={() => { supabase.auth.signOut(); setUser(null); setProfile(null); }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 font-semibold px-4 py-2 rounded-xl hover:bg-red-500/20 transition text-sm"
            >
              Sair da Conta
            </button>
          </div>

          {/* Navegação por Abas */}
          <div className="flex flex-wrap gap-3 mb-8 border-b border-slate-800 pb-4">
            <button 
              onClick={() => setActiveTab('progresso')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${activeTab === 'progresso' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              Meu Progresso & Base
            </button>
            <button 
              onClick={() => setActiveTab('atlas')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${activeTab === 'atlas' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              Mural do Atlas
            </button>
            {profile.is_leader && (
              <button 
                onClick={() => setActiveTab('lideranca')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${activeTab === 'lideranca' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-amber-400 hover:text-white'}`}
              >
                Painel da Liderança 👑
              </button>
            )}
          </div>

          {/* CONTEÚDO: ABA PROGRESSO */}
          {activeTab === 'progresso' && (
            <div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className={`p-6 rounded-2xl border ${profile.is_leader || profile.gamertag ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="text-cyan-400 font-black text-2xl mb-2">01</div>
                  <h3 className="font-bold text-lg mb-1 text-white">Entrar na Aliança</h3>
                  <p className="text-sm text-slate-400">Censo registado com sucesso no sistema.</p>
                </div>

                <div className={`p-6 rounded-2xl border ${profile.base_on_terra_approved ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="text-cyan-400 font-black text-2xl mb-2">02</div>
                  <h3 className="font-bold text-lg mb-1 text-white">Casa na "Terra"</h3>
                  <p className="text-sm text-slate-400">{profile.base_on_terra_approved ? 'Base Aprovada pela Liderança!' : 'Envie a evidência para validação'}</p>
                </div>

                <div className={`p-6 rounded-2xl border ${profile.glyphs_unlocked ? 'bg-green-500/10 border-green-500/50' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="text-green-400 font-black text-2xl mb-2">03</div>
                  <h3 className="font-bold text-lg mb-1 text-white">Glifos de Elite</h3>
                  <p className="text-sm text-slate-400">{profile.glyphs_unlocked ? 'Liberados com Sucesso!' : 'Bloqueado (Requer etapas 1 e 2)'}</p>
                </div>
              </div>

              {/* Formulário de Envio de Base */}
              <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Registo da Residência na "Terra"</h3>
                <p className="text-sm text-slate-400 mb-6">Insira o link de acesso ou as coordenadas do portal da sua base para análise da liderança.</p>
                
                {baseMsg && <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs p-3 rounded-xl mb-4">{baseMsg}</div>}

                <form onSubmit={handleBaseSubmit} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">Link da Base / Coordenadas NMS</label>
                    <input 
                      type="text" 
                      value={baseLink} 
                      onChange={(e) => setBaseLink(e.target.value)} 
                      required 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none text-sm"
                      placeholder="Ex: Coordenadas Planetárias ou print do local"
                    />
                  </div>
                  <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition text-sm">
                    Enviar para Validação
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* CONTEÚDO: ABA ATLAS */}
          {activeTab === 'atlas' && (
            <div>
              <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Catalogar Nova Descoberta</h3>
                <p className="text-sm text-slate-400 mb-6">Partilhe sistemas e planetas valiosos com todos os Saqueadores.</p>
                
                <form onSubmit={handleAddDiscovery} className="grid md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nome do Planeta" 
                    value={planetName} 
                    onChange={(e) => setPlanetName(e.target.value)} 
                    required 
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-400 outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Nome do Sistema" 
                    value={systemName} 
                    onChange={(e) => setSystemName(e.target.value)} 
                    required 
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-400 outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Glifos / Coordenadas" 
                    value={glyphCoords} 
                    onChange={(e) => setGlyphCoords(e.target.value)} 
                    required 
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-400 outline-none"
                  />
                  <div className="md:col-span-3">
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition text-sm">
                      Publicar no Atlas
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de Descobertas */}
              <div className="grid md:grid-cols-2 gap-4">
                {discoveries.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <div className="text-cyan-400 font-bold text-lg mb-1">{item.planet_name}</div>
                    <div className="text-xs text-slate-400 mb-3">Sistema: <span className="text-white font-medium">{item.system_name}</span></div>
                    <div className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-cyan-300 mb-3 border border-slate-800/60">
                      Glifos: {item.glyph_coords}
                    </div>
                    <div className="text-xs text-slate-500 text-right">Descoberto por: <span className="text-slate-300 font-bold">{item.discovered_by}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTEÚDO: ABA LIDERANÇA */}
          {activeTab === 'lideranca' && profile.is_leader && (
            <div className="bg-slate-900/80 border border-amber-500/30 p-8 rounded-2xl">
              <h3 className="text-2xl font-black text-amber-400 mb-2">Painel de Controlo da Liderança</h3>
              <p className="text-sm text-slate-400 mb-6">Aprove as bases e liberte os glifos de elite para os membros da aliança.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="border-b border-slate-800 text-xs uppercase text-slate-400">
                    <tr>
                      <th className="pb-3">Explorador</th>
                      <th className="pb-3">Plataforma</th>
                      <th className="pb-3 text-center">Base na Terra</th>
                      <th className="pb-3 text-center">Glifos de Elite</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {allProfiles.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-800/30">
                        <td className="py-4 font-bold text-white">{member.gamertag}</td>
                        <td className="py-4 text-slate-400">{member.platform}</td>
                        <td className="py-4 text-center">
                          <button 
                            onClick={() => toggleApproval(member.id, 'base_on_terra_approved', member.base_on_terra_approved)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${member.base_on_terra_approved ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                          >
                            {member.base_on_terra_approved ? 'Aprovada ✓' : 'Pendente'}
                          </button>
                        </td>
                        <td className="py-4 text-center">
                          <button 
                            onClick={() => toggleApproval(member.id, 'glyphs_unlocked', member.glyphs_unlocked)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${member.glyphs_unlocked ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                          >
                            {member.glyphs_unlocked ? 'Liberados ✓' : 'Bloqueados'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tela de Login / Cadastro / Recuperação
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-black text-cyan-400 mb-1 text-center">
          {isForgotPassword ? 'Recuperar Senha' : (isRegistering ? 'Censo dos Saqueadores' : 'Acesso ao Portal')}
        </h2>
        <p className="text-slate-400 text-xs text-center mb-6">
          {isForgotPassword ? 'Informe seu e-mail para receber o link' : (isRegistering ? 'Preencha seus dados de explorador' : 'Entre com suas credenciais oficiais')}
        </p>

        {errorMsg && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4">{errorMsg}</div>}
        {successMsg && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs p-3 rounded-xl mb-4">{successMsg}</div>}

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">Gamertag / Nome no NMS</label>
                <input 
                  type="text" 
                  value={gamertag} 
                  onChange={(e) => setGamertag(e.target.value)} 
                  required 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 outline-none text-sm"
                  placeholder="Ex: Intocavel"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">Plataforma</label>
                <select 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 outline-none text-sm"
                >
                  <option value="PC">PC / Steam</option>
                  <option value="Xbox">Xbox</option>
                  <option value="PlayStation">PlayStation</option>
                  <option value="Switch">Nintendo Switch</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 outline-none text-sm"
              placeholder="seu@email.com"
            />
          </div>
          {!isForgotPassword && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">Senha</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm"
          >
            {loading ? 'Processando...' : (isForgotPassword ? 'Enviar Instruções' : (isRegistering ? 'Registrar no Censo' : 'Entrar no Portal'))}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          {!isForgotPassword && (
            <div>
              <button 
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs text-cyan-400 hover:underline font-semibold block w-full"
              >
                {isRegistering ? 'Já tem cadastro? Faça login' : 'Novo membro? Cadastre-se na aliança'}
              </button>
            </div>
          )}
          <div>
            <button 
              type="button"
              onClick={() => { setIsForgotPassword(!isForgotPassword); setErrorMsg(''); setSuccessMsg(''); }}
              className="text-xs text-slate-400 hover:text-cyan-400 transition block w-full mt-2 font-medium"
            >
              {isForgotPassword ? 'Voltar para o login' : 'Esqueceu sua senha?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}