import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', background: '#0f172a', color: '#fff' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Portal dos Saqueadores</h1>
      <p style={{ margin: '10px 0 30px 0', color: '#94a3b8' }}>Bem-vindo ao portal oficial da aliança.</p>
      <Link href="/dashboard" style={{ background: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
        Entrar no Dashboard
      </Link>
    </main>
  );
}