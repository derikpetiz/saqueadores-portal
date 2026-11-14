export default function EpicLandingPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 10%, #060d1a 0%, #02050b 50%, #010204 100%)',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden',
      margin: 0,
      padding: 0
    }}>
      {/* Barra de Navegação Superior */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 48px',
        borderBottom: '1px solid rgba(0, 229, 255, 0.15)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(2, 5, 11, 0.85)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '1.3rem', fontWeight: '900', letterSpacing: '3px', color: '#00e5ff', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>
            ⚡ SAQUEADORES
          </span>
          <span style={{ fontSize: '0.7rem', background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(0, 229, 255, 0.3)', letterSpacing: '1px' }}>
            NMS // ALIANÇA ELITE
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="#historia" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>História</a>
          <a href="#recursos" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Operações</a>
          <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none', padding: '8px 18px', fontWeight: '600', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px' }}>
            Entrar
          </a>
          <a href="/dashboard" style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)', color: '#030712', textDecoration: 'none', padding: '9px 22px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)' }}>
            Registar na Aliança
          </a>
        </div>
      </nav>

      {/* Seção Hero (Principal) */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 20px 80px 20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 229, 255, 0.08)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          color: '#00e5ff',
          padding: '6px 18px',
          borderRadius: '30px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          marginBottom: '28px',
          textTransform: 'uppercase'
        }}>
          <span style={{ width: '8px', height: '8px', background: '#00e5ff', borderRadius: '50%', boxShadow: '0 0 8px #00e5ff' }}></span>
          Rede Galáctica Ativa • Coordenadas Sincronizadas
        </div>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '24px',
          letterSpacing: '-1px'
        }}>
          O Domínio Absoluto do <span style={{ background: 'linear-gradient(to right, #00e5ff, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vazio Estelar</span>
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#94a3b8',
          maxWidth: '720px',
          marginBottom: '44px',
          lineHeight: '1.7'
        }} data-source="A Aliança Saqueadores é uma federação independente de viajantes, exploradores e mercenários unidos pelo domínio das galáxias em No Man's Sky.">
          Nascidos nas franjas do espaço desconhecido, os <strong style={{ color: '#fff' }}>Saqueadores</strong> representam a elite dos viajantes em No Man's Sky. Coordenamos frotas, partilhamos portais ancestrais e dominamos a economia intergaláctica.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/dashboard" style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)', color: '#030712', padding: '16px 36px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.05rem', boxShadow: '0 0 30px rgba(0, 229, 255, 0.4)' }}>
            Aceder ao Quartel-General
          </a>
          <a href="#historia" style={{ background: 'rgba(255, 255, 255, 0.04)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '16px 36px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', fontSize: '1.05rem' }}>
            Conhecer a Nossa História
          </a>
        </div>
      </section>

      {/* Estatísticas Rápidas */}
      <section style={{ borderTop: '1px solid rgba(56, 189, 248, 0.1)', borderBottom: '1px solid rgba(56, 189, 248, 0.1)', background: 'rgba(3, 7, 18, 0.5)', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00e5ff', marginBottom: '8px' }}>142+</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '1px' }}>VIAJANTES ATIVOS</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#38bdf8', marginBottom: '8px' }}>48</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '1px' }}>SISTEMAS DOMINADOS</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00e5ff', marginBottom: '8px' }}>1,250</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '1px' }}>GLIFOS CATALOGADOS</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#38bdf8', marginBottom: '8px' }}>100%</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '1px' }}>SINDINATO LIVRE</div>
          </div>
        </div>
      </section>

      {/* Seção de Lore e História da Aliança */}
      <section id="historia" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#00e5ff', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Registo Histórico // Arquivos do Atlas</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '10px' }}>A Origem dos Saqueadores</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(0, 229, 255, 0.2)', padding: '36px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '16px' }}>O Despertar no quadrante zero</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '16px' }}>
              Fundada nas profundezas do sistema Euclid, a aliança nasceu da necessidade de sobrevivência mútua contra frotas sentinelas hostis e facções corrompidas. O que começou como um pequeno grupo de refugo transformou-se numa força organizada de exploração e comércio.
            </p>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '0.98rem' }}>
              Hoje, operamos como uma colmeia tecnológica unificada. Nenhum viajante anda sozinho no espaço profundo; as nossas rotas e bases estão permanentemente sincronizadas.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px', borderRadius: '12px' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>🛡️ Honra e Irmandade</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>Proteção total a qualquer membro sob ataque em sistemas hostis.</p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px', borderRadius: '12px' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>🌌 Cartografia Avançada</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>Acesso restrito a planetas exóticos ricos em recursos raros e nanites.</p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px', borderRadius: '12px' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>⚙️ Economia Coletiva</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>Monopólio de rotas comerciais de alta rentabilidade entre sistemas ricos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Módulos Operacionais */}
      <section id="recursos" style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>Tecnologia & Operações da Aliança</h2>
          <p style={{ color: '#94a3b8', marginTop: '8px' }}>Ferramentas de ponta desenvolvidas para o controlo total do espaço.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {[
            { title: 'Base de Dados de Portais', desc: 'Registo e partilha de glifos, coordenadas exatas de planetas paradisíacos e sistemas ricos em recursos.' },
            { title: 'Gestão de Frotas de Cargueiros', desc: 'Coordenação tática de missões de fragatas, expedições conjuntas e defesa ativa de territórios reivindicados.' },
            { title: 'Comércio & Economia Galáctica', desc: 'Rotas comerciais otimizadas e abastecimento centralizado de materiais essenciais para membros da aliança.' }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'rgba(11, 19, 38, 0.7)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              padding: '36px',
              borderRadius: '16px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <div style={{ fontSize: '1.3rem', color: '#00e5ff', marginBottom: '16px', fontWeight: 'bold' }}>// 0{index + 1}</div>
              <h3 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chamada Final para Ação (CTA) */}
      <section style={{ padding: '100px 20px', textAlign: 'center', background: 'linear-gradient(to top, rgba(3, 7, 18, 1), transparent)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(11, 19, 38, 0.9)', border: '1px solid rgba(0, 229, 255, 0.3)', padding: '60px 40px', borderRadius: '24px', boxShadow: '0 0 50px rgba(0, 229, 255, 0.15)' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '16px' }}>Pronto para se juntar à frota?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '32px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Registe as suas credenciais oficiais, obtenha acesso ao quartel-general e conecte-se com os comandantes da aliança.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/dashboard" style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)', color: '#030712', padding: '16px 36px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.05rem', boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)' }}>
              Aceder ao Portal / Registar
            </a>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer style={{
        textAlign: 'center',
        padding: '40px',
        borderTop: '1px solid rgba(0, 229, 255, 0.1)',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        <p>© 2026 Aliança Saqueadores • No Man's Sky Community Portal. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}