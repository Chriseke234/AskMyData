from http.server import BaseHTTPRequestHandler
import json
import os
from supabase import create_client, Client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 1. Setup Supabase
        url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
        key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
        supabase: Client = create_client(url, key)

        # 2. Read Body
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        body = json.loads(post_data.decode('utf-8'))
        
        message = body.get('message')
        tenant_id = body.get('tenantId')
        user_id = body.get('userId')
        session_id = body.get('sessionId')

        # 3. Create session if not exists
        current_session_id = session_id
        if not current_session_id:
            session_data = {
                "tenant_id": tenant_id,
                "user_id": user_id,
                "title": (message[:30] + '...') if message else 'New Chat'
            }
            res = supabase.table("chat_sessions").insert(session_data).execute()
            if res.data:
                current_session_id = res.data[0]['id']

        # 4. Save User Message
        if current_session_id:
            supabase.table("chat_messages").insert({
                "session_id": current_session_id,
                "role": "user",
                "content": message
            }).execute()

        # 5. Logic (Mock AI / Python Processing)
        ai_response = f"Python Backend Analysis:\n1. Received: {message}\n2. Running statistical analysis...\n3. Done."
        code_snippet = "import pandas as pd\nprint('Analyzing dataset...')"

        # 6. Save Assistant Message
        if current_session_id:
            supabase.table("chat_messages").insert({
                "session_id": current_session_id,
                "role": "assistant",
                "content": ai_response,
                "code_snippet": code_snippet
            }).execute()

        # 7. Response
        response_data = {
            "role": "assistant",
            "content": ai_response,
            "code_snippet": code_snippet,
            "sessionId": current_session_id
        }

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
        return
