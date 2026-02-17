
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Code } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Card } from '@/shared/components/ui/Card';
import { createClient } from '@/shared/lib/supabase/client';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    code_snippet?: string;
}

export function ChatInterface({ tenantId, userId }: { tenantId: string, userId: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessionId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    tenantId,
                    userId,
                    sessionId
                }),
            });

            if (!response.ok) throw new Error(response.statusText);

            // Handle streaming response
            const reader = response.body?.getReader();
            if (!reader) return;

            const assistantMessage: Message = { role: 'assistant', content: '' };
            setMessages(prev => [...prev, assistantMessage]);

            // Read the stream
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                // Simple streaming parsing (assuming raw text for now, but API might send JSON chunks)
                // For simplicity in this demo, let's assume the API sends raw text chunks of the content.

                // Actually, better to accumulate and update state.
                // If API sends structured events, we parse.
                // Let's assume API sends text for now.

                assistantMessage.content += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...assistantMessage };
                    return newMessages;
                });
            }

            // After stream, if we need to update session ID from response headers or something, we could.
            // But simpler: API returns session ID in first chunk? No, too complex.
            // We'll rely on client-side session or just create new one every time if null.
            // We can fetch the session ID if we want to persist it.

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', gap: '1rem' }}>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
                {messages.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>
                        <Bot size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h2>How can I help you analyze your data?</h2>
                        <p>Ask me to describe a dataset, run a regression, or plot a chart.</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        gap: '1rem',
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                    }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-accent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            color: 'white'
                        }}>
                            {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'var(--card-bg)',
                                color: msg.role === 'user' ? 'white' : 'var(--foreground)',
                                border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {msg.content}
                            </div>

                            {msg.code_snippet && (
                                <div style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#d4d4d4',
                                    borderRadius: 'var(--radius-md)',
                                    overflow: 'hidden',
                                    fontSize: '0.875rem'
                                }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.5rem 1rem', backgroundColor: '#2d2d2d',
                                        borderBottom: '1px solid #333'
                                    }}>
                                        <Code size={14} />
                                        <span>Python Output</span>
                                    </div>
                                    <pre style={{ padding: '1rem', overflowX: 'auto', margin: 0 }}>
                                        {msg.code_snippet}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <Card style={{ padding: '1rem' }}>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about your data..."
                        disabled={loading}
                        style={{ flex: 1 }}
                    />
                    <Button type="submit" disabled={loading || !input.trim()}>
                        {loading ? '...' : <Send size={18} />}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
