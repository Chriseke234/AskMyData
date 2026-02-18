
'use client';

import Link from 'next/link';
import styles from './LandingPage.module.css';

export function LandingPage() {
    return (
        <div className={styles.landingContainer}>
            <nav className={styles.landingNav}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon} />
                    <span>Ask My Data</span>
                </div>
                <div className={styles.navLinks}>
                    <Link href="/login" className={styles.navLink}>Sign In</Link>
                    <Link href="/login" className={styles.btnPrimary}>Get Started</Link>
                </div>
            </nav>

            <main className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>Powered by AI</div>
                    <h1 className={styles.heroTitle}>
                        Unlock Intelligence <br />
                        From Your <span>Data</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Upload your datasets and let our AI-powered engine analyze,
                        visualize, and provide deep insights in seconds.
                    </p>
                    <div className={styles.heroActions}>
                        <Link href="/login" className={`${styles.btnPrimary} ${styles.btnLarge}`}>Get Started for Free</Link>
                        <Link href="#features" className={`${styles.btnSecondary} ${styles.btnLarge}`}>View Features</Link>
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={`${styles.glassCard} ${styles.mainViz}`}>
                        <div className={styles.vizHeader}>
                            <div className={styles.dot} />
                            <div className={styles.dot} />
                            <div className={styles.dot} />
                        </div>
                        <div className={styles.vizContent}>
                            <div className={styles.barGroup}>
                                <div className={styles.bar} style={{ height: '60%' }} />
                                <div className={styles.bar} style={{ height: '80%' }} />
                                <div className={styles.bar} style={{ height: '40%' }} />
                                <div className={styles.bar} style={{ height: '90%' }} />
                                <div className={styles.bar} style={{ height: '70%' }} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.glassCard} ${styles.statsViz}`}>
                        <div className={styles.vizContent}>
                            <div className={styles.statValue}>+124%</div>
                            <div className={styles.statLabel}>Growth Rate</div>
                        </div>
                    </div>
                </div>
            </main>

            <section id="features" className={styles.featuresSection}>
                <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <h3>Instant Analysis</h3>
                        <p>Upload CSV/Excel files and get immediate summaries through natural language.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Visual Intelligence</h3>
                        <p>Automatically generate beautiful, interactive charts and dashboards.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Python Integration</h3>
                        <p>Leverage the power of Python for complex statistical analysis and modeling.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
