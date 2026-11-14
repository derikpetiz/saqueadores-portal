'use client';

import { useState } from 'react';

export default function PortalHome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticação com Supabase ou redirecionamento
    alert(isRegistering ? 'Registo efetuado com sucesso!' : 'Login efetuado com sucesso!');
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0b0f19', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#111827', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '100%', maxWidth: '420px', border: '1px solid #1f2937', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', color: '#38bdf8', fontWeight: 'bold' }}>Acesso ao Portal</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '24px' }}>Entre com suas credenciais oficiais da aliança</p>
        
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px', fontWeight: 'bold' }}>E-MAIL</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', outline: 'none' }}
              required 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px', fontWeight: 'bold' }}>SENHA</label>
            <input 
              type="password" 
              placeholder="********" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', outline: 'none' }}
              required 
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '12px', background: '#00e5ff', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '8px', fontSize: '1rem' }}
          >
            {isRegistering ? 'Cadastrar na Aliança' : 'Entrar no Portal'}
          </button>
        </form>

        <button 
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', marginTop: '20px', fontSize: '0.9rem', textDecoration: 'underline' }}
        >
          {isRegistering ? 'Já tem cadastro? Faça login' : 'Novo membro? Cadastre-se na aliança'}
        </button>
      </div>
    </main>
  );
}