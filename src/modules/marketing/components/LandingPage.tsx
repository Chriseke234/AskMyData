
'use client';

import Link from 'next/link';

export function LandingPage() {
    return (
        <div className="landing-container">
            <nav className="landing-nav">
                <div className="logo">
                    <div className="logo-icon" />
                    <span>Ask My Data</span>
                </div>
                <div className="nav-links">
                    <Link href="/login" className="nav-link">Sign In</Link>
                    <Link href="/login" className="btn-primary">Get Started</Link>
                </div>
            </nav>

            <main className="hero-section">
                <div className="hero-content">
                    <div className="badge">Powered by AI</div>
                    <h1 className="hero-title">
                        Unlock Intelligence <br />
                        From Your <span>Data</span>
                    </h1>
                    <p className="hero-subtitle">
                        Upload your datasets and let our AI-powered engine analyze,
                        visualize, and provide deep insights in seconds.
                    </p>
                    <div className="hero-actions">
                        <Link href="/login" className="btn-primary btn-large">Get Started for Free</Link>
                        <Link href="#features" className="btn-secondary btn-large">View Features</Link>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="glass-card main-viz">
                        <div className="viz-header">
                            <div className="dot" />
                            <div className="dot" />
                            <div className="dot" />
                        </div>
                        <div className="viz-content">
                            <div className="bar-group">
                                <div className="bar" style={{ height: '60%' }} />
                                <div className="bar" style={{ height: '80%' }} />
                                <div className="bar" style={{ height: '40%' }} />
                                <div className="bar" style={{ height: '90%' }} />
                                <div className="bar" style={{ height: '70%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="glass-card stats-viz">
                        <div className="viz-content">
                            <div className="stat-value">+124%</div>
                            <div className="stat-label">Growth Rate</div>
                        </div>
                    </div>
                </div>
            </main>

            <section id="features" className="features-section">
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Instant Analysis</h3>
                        <p>Upload CSV/Excel files and get immediate summaries through natural language.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Visual Intelligence</h3>
                        <p>Automatically generate beautiful, interactive charts and dashboards.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Python Integration</h3>
                        <p>Leverage the power of Python for complex statistical analysis and modeling.</p>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .landing-container {
                    min-height: 100vh;
                    background-color: var(--background);
                    color: var(--foreground);
                    overflow-x: hidden;
                }

                .landing-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 5%;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background: rgba(10, 10, 10, 0.8);
                    backdrop-filter: blur(10px);
                    z-index: 1000;
                    border-bottom: 1px solid var(--border);
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 700;
                    font-size: 1.25rem;
                }

                .logo-icon {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                    border-radius: 8px;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .nav-link {
                    color: var(--text-muted);
                    transition: color 0.2s;
                }

                .nav-link:hover {
                    color: var(--foreground);
                }

                .hero-section {
                    padding: 10rem 5% 5rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .hero-title {
                    font-size: 4rem;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                }

                .hero-title span {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--text-muted);
                    margin-bottom: 2.5rem;
                    max-width: 600px;
                    line-height: 1.6;
                }

                .hero-actions {
                    display: flex;
                    gap: 1rem;
                }

                .btn-primary {
                    background: var(--color-primary);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-md);
                    font-weight: 500;
                    transition: transform 0.2s, background 0.2s;
                }

                .btn-primary:hover {
                    background: var(--color-primary-hover);
                    transform: translateY(-2px);
                }

                .btn-secondary {
                    background: transparent;
                    border: 1px solid var(--border);
                    color: var(--foreground);
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-md);
                    font-weight: 500;
                    transition: background 0.2s;
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

                .btn-large {
                    padding: 1rem 2rem;
                    font-size: 1.125rem;
                }

                .badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: rgba(124, 58, 237, 0.1);
                    color: var(--color-primary);
                    border: 1px solid rgba(124, 58, 237, 0.2);
                    border-radius: 100px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .hero-visual {
                    position: relative;
                    height: 500px;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    position: absolute;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .main-viz {
                    width: 400px;
                    height: 300px;
                    top: 50px;
                    left: 50px;
                    z-index: 2;
                }

                .stats-viz {
                    width: 200px;
                    height: 150px;
                    bottom: 50px;
                    right: 50px;
                    z-index: 3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .viz-header {
                    padding: 1rem;
                    display: flex;
                    gap: 0.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                }

                .viz-content {
                    padding: 2rem;
                    text-align: center;
                }

                .bar-group {
                    display: flex;
                    align-items: flex-end;
                    gap: 1.5rem;
                    height: 150px;
                    justify-content: center;
                }

                .bar {
                    width: 30px;
                    background: linear-gradient(to top, var(--color-primary), var(--color-accent));
                    border-radius: 6px 6px 0 0;
                    transition: height 1s ease-out;
                }

                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--color-success);
                }

                .stat-label {
                    color: var(--text-muted);
                    font-size: 0.875rem;
                }

                .features-section {
                    padding: 5rem 5%;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                }

                .feature-card {
                    padding: 2.5rem;
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    transition: transform 0.3s, border-color 0.3s;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--color-primary);
                }

                .feature-card h3 {
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }

                .feature-card p {
                    color: var(--text-muted);
                    line-height: 1.6;
                }

                @media (max-width: 1024px) {
                    .hero-section {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    .hero-subtitle {
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .hero-actions {
                        justify-content: center;
                    }
                    .hero-visual {
                        display: none;
                    }
                    .feature-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
