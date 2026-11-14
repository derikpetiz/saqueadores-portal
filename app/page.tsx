'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 10%, #091326 0%, #030712 60%, #010308 100%)',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Barra de Navegação Superior */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(3, 7, 18, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '2px', color: '#00e5ff' }}>
            ⚡ SAQUEADORES
          </span>
          <span style={{ fontSize: '0.75rem', background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
            NMS ALIANÇA
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 16px', fontWeight: '500', fontSize: '0.95rem' }}>
            Entrar
          </Link>
          <Link href="/dashboard" style={{ background: '#00e5ff', color: '#030712', textDecoration: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.95rem', boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)' }}>
            Juntar-se à Aliança
          </Link>
        </div>
      </nav>

      {/* Seção Hero (Principal) */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 20px 80px 20px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          color: '#38bdf8',
          padding: '6px 16px',
          borderRadius: '30px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          marginBottom: '24px',
          textTransform: 'uppercase'
        }}>
          Exploração • Comércio • Domínio Galáctico
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '24px',
          background: 'linear-gradient(to right, #ffffff, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          O Portal Definitivo da Aliança Saqueadores
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: '#94a3b8',
          maxWidth: '650px',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Coordenadas de bases, controlo de frotas, economia e o quartel-general exclusivo para os viajantes mais temidos de No Man's Sky.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'center', justifyContent: 'center' }}>
          <Link href="/dashboard" style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)', color: '#030712', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)' }}>
            Aceder ao Quartel-General
          </Link>
          <a href="#recursos" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>
            Explorar Recursos
          </a>
        </div>
      </section>

      {/* Seção de Recursos / Módulos */}
      <section id="recursos" style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '48px', fontWeight: '800' }}>
          Tecnologia & Operações da Aliança
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Base de Dados de Portais', desc: 'Registo e partilha de glifos, coordenadas exatas de planetas ricos e sistemas exóticos.' },
            { title: 'Gestão de Frotas', desc: 'Organização de missões de fragatas, expedições conjuntas e defesa de territórios.' },
            { title: 'Comércio & Recursos', desc: 'Rotas comerciais otimizadas e abastecimento centralizado para os membros da aliança.' }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              padding: '32px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.2s'
            }}>
              <h3 style={{ fontSize: '1.25rem', color: '#00e5ff', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer style={{
        textAlign: 'center',
        padding: '40px',
        borderTop: '1px solid rgba(56, 189, 248, 0.1)',
        color: '#64748b',
        fontSize: '0.9rem',
        marginTop: '80px'
      }}>
        <p>© 2026 Aliança Saqueadores • No Man's Sky Community Portal. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}