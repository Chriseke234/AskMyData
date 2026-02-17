
import { VisualizationBuilder } from '@/modules/viz/components/VisualizationBuilder';

export default function AnalysisPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Analysis & Visualization</h1>
                <p style={{ color: 'var(--text-muted)' }}>Build custom charts and visualize your data insights.</p>
            </div>

            <div style={{ flex: 1 }}>
                <VisualizationBuilder />
            </div>
        </div>
    );
}
