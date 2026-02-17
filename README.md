# Ask My Data

A production-ready, modular monolith AI SaaS platform for data analysis, visualization, and collaboration.

## Features

- **Multi-tenancy**: Workspace-based architecture.
- **AI Chat**: Conversational interface for data analysis.
- **Datasets**: Upload and manage CSV/Excel datasets.
- **Visualization**: Create custom charts from your data.
- **Admin Control Center**: User and workspace management.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables
- **Backend & Auth**: Supabase
- **Charts**: Recharts

## Getting Started

1.  **Environment Setup**:
    Copy `.env.local.example` to `.env.local` and populate it with your Supabase credentials.
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Database Setup**:
    Run the SQL scripts located in `supabase/schema.sql` in your Supabase SQL Editor to set up the database schema and RLS policies.

## Deployment

This project is optimized for deployment on Vercel.

1.  Push your code to a Git repository.
2.  Import the project into Vercel.
3.  Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel dashboard.
4.  Deploy!
