'use client';

import { useState } from 'react';

export default function PortalHome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isRegistering ? 'Registo efetuado com sucesso na rede!' : 'Conexão estabelecida com sucesso!');
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 20%, #0c192c 0%, #050b14 70%, #020408 100%)',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px'
    }}>
      {/* Grelha de fundo de alta tecnologia */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      {/* Cartão principal com efeito Glassmorphism */}
      <div style={{
        position: 'relative',
        background: 'rgba(11, 19, 38, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: '16px',
        boxShadow: '0 0 50px rgba(0, 229, 255, 0.12), inset 0 0 20px rgba(0, 229, 255, 0.05)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '440px',
        textAlign: 'center'
      }}>
        {/* Etiqueta de sistema */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(0, 229, 255, 0.1)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          color: '#00e5ff',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          marginBottom: '16px',
          textTransform: 'uppercase'
        }}>
          NMS // Terminal de Comando
        </div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#ffffff',
          marginBottom: '8px',
          letterSpacing: '0.5px'
        }}>
          SAQUEADORES
        </h1>
        
        <p style={{
          color: '#94a3b8',
          fontSize: '0.9rem',
          marginBottom: '32px'
        }}>
          {isRegistering ? 'Registe a sua identidade na rede galáctica' : 'Aceda ao portal restrito da aliança'}
        </p>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', marginBottom: '8px', fontWeight: 'bold', letterSpacing: '1px' }}>
              FREQUÊNCIA DE E-MAIL
            </label>
            <input 
              type="email" 
              placeholder="comandante@atlas.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(2, 6, 23, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                outline: 'none',
                fontSize: '0.95rem',
                boxSizing: 'border-box'
              }}
              required 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', marginBottom: '8px', fontWeight: 'bold', letterSpacing: '1px' }}>
              CÓDIGO DE ACESSO (SENHA)
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(2, 6, 23, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                outline: 'none',
                fontSize: '0.95rem',
                boxSizing: 'border-box'
              }}
              required 
            />
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
              color: '#050b14',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '8px',
              fontSize: '1rem',
              letterSpacing: '1px',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            {isRegistering ? 'INICIALIZAR REGISTO' : 'ESTABELECER CONEXÃO'}
          </button>
        </form>

        <button 
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            marginTop: '24px',
            fontSize: '0.85rem'
          }}
        >
          {isRegistering ? 'Já possui credenciais? Faça login' : 'Novo viajante? Registe-se na aliança'}
        </button>
      </div>
    </main>
  );
}