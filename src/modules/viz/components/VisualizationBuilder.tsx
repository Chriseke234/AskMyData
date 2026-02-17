
'use client';

import { useState } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { BarChart2, TrendingUp, PieChart as PieIcon, Activity } from 'lucide-react';


// Mock Data
const data = [
    { name: 'Jan', sales: 4000, profit: 2400, amt: 2400 },
    { name: 'Feb', sales: 3000, profit: 1398, amt: 2210 },
    { name: 'Mar', sales: 2000, profit: 9800, amt: 2290 },
    { name: 'Apr', sales: 2780, profit: 3908, amt: 2000 },
    { name: 'May', sales: 1890, profit: 4800, amt: 2181 },
    { name: 'Jun', sales: 2390, profit: 3800, amt: 2500 },
    { name: 'Jul', sales: 3490, profit: 4300, amt: 2100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

type ChartType = 'bar' | 'line' | 'pie' | 'area';

export function VisualizationBuilder() {
    const [chartType, setChartType] = useState<ChartType>('bar');

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="var(--color-primary)" />
                        <Bar dataKey="profit" fill="var(--color-accent)" />
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="var(--color-primary)" />
                        <Line type="monotone" dataKey="profit" stroke="var(--color-accent)" />
                    </LineChart>
                );
            case 'area':
                return (
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="sales" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="profit" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.3} />
                    </AreaChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="sales"
                            label={({ name, percent }: { name?: string, percent?: number }) => `${name ?? ''} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            <Card style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>Chart Type:</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                        variant={chartType === 'bar' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('bar')}
                    >
                        <BarChart2 size={16} style={{ marginRight: '0.5rem' }} /> Bar
                    </Button>
                    <Button
                        variant={chartType === 'line' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('line')}
                    >
                        <TrendingUp size={16} style={{ marginRight: '0.5rem' }} /> Line
                    </Button>
                    <Button
                        variant={chartType === 'area' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('area')}
                    >
                        <Activity size={16} style={{ marginRight: '0.5rem' }} /> Area
                    </Button>
                    <Button
                        variant={chartType === 'pie' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('pie')}
                    >
                        <PieIcon size={16} style={{ marginRight: '0.5rem' }} /> Pie
                    </Button>
                </div>
            </Card>

            <Card style={{ flex: 1, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, width: '100%', minHeight: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart() || <div />}
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}
