# Deploying Ask My Data to Vercel

Since the project is already pushed to GitHub, deployment is straightforward.

## Prerequisites
- A Vercel account (https://vercel.com/signup).
- The project pushed to GitHub (https://github.com/Chriseke234/AskMyData).

## Steps

1.  **Login to Vercel**: Go to your Vercel Dashboard.
2.  **Add New Project**: Click "Add New..." -> "Project".
3.  **Import Git Repository**:
    - Select "Continue with GitHub".
    - Find `ask-my-data` (or `AskMyData`) in the list and click "Import".
4.  **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `.` (default).
    - **Environment Variables**: Expand the section and add:
        - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
        - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
5.  **Deploy**: Click "Deploy".

Vercel will build the project and provide you with a live URL (e.g., `ask-my-data.vercel.app`).
