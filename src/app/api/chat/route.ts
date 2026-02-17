
import { createClient } from '@/shared/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { message, tenantId, userId, sessionId } = await req.json();
    const supabase = await createClient();

    // 1. Create session if not exists
    let currentSessionId = sessionId;
    if (!currentSessionId) {
        const { data: session, error } = await supabase
            .from('chat_sessions')
            .insert({ tenant_id: tenantId, user_id: userId, title: message.substring(0, 30) + '...' })
            .select()
            .single();

        if (session) currentSessionId = session.id;
    }

    // 2. Save User Message
    if (currentSessionId) {
        await supabase.from('chat_messages').insert({
            session_id: currentSessionId,
            role: 'user',
            content: message
        });
    }

    // 3. Mock AI Processing & Python Execution
    // In a real app, this would call OpenAI/Anthropic and a Python Sandbox.

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();

            const responseText = `I received your request: "${message}".\n\nI am analyzing your datasets...\n\n`;
            controller.enqueue(encoder.encode(responseText));

            // Simulate processing delay
            await new Promise(r => setTimeout(r, 500));

            const analysisStep = `Found 2 relevant datasets. Scanning for patterns...\n`;
            controller.enqueue(encoder.encode(analysisStep));

            await new Promise(r => setTimeout(r, 500));

            const codeHeader = `\nGenerated Python Code:\n`;
            controller.enqueue(encoder.encode(codeHeader));

            const code = `import pandas as pd\n\ndf = pd.read_csv('dataset.csv')\nprint(df.describe())`;
            controller.enqueue(encoder.encode(code));

            // Save Assistant Message (async, don't block stream)
            if (currentSessionId) {
                await supabase.from('chat_messages').insert({
                    session_id: currentSessionId,
                    role: 'assistant',
                    content: responseText + analysisStep + codeHeader + code,
                    code_snippet: code
                });
            }

            controller.close();
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
