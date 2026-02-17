export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '1rem'
    }}>
      <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Ask My Data</h1>
      <p style={{ color: 'var(--text-muted)' }}>AI-Powered Data Intelligence Workspace</p>
    </div>
  );
}
