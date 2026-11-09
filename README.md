# ClipsTube

ClipsTube is being rebuilt as a real video-sharing web application, with a close visual reference to YouTube's 2020 desktop layout and a separate creator Studio. The interface uses original ClipsTube branding and assets.

## Current implementation

- Next.js App Router application (not a GitHub Pages static site).
- Supabase SSR client setup with cookie-based sessions.
- Email/password sign-up and sign-in actions.
- Supabase-backed public video feed and watch route.
- Responsive 2020-inspired navigation, category bar, video cards and Studio dashboard.
- Database schema and Row Level Security for profiles, channels, videos, subscriptions, likes, comments, playlists and reports.
- Preview feed is explicitly labelled when there are no published database videos.

## Run locally

1. Install Node.js 22 or later.
2. Copy `.env.example` to `.env.local`.
3. Add the ClipsTube Supabase Project URL and publishable key from Project Settings → API.
4. Run `npm install`, then `npm run dev`.
5. Open http://localhost:3000.

Never commit `.env.local`, database passwords, Supabase secret keys, or video-provider API tokens.

## Deployment

Deploy this as a Next.js application (for example, Vercel or another Node.js host). GitHub Pages cannot run the server-side authentication and upload routes required by this app. The original root `index.html` is retained temporarily as a static design reference; it is not the production app.

## Not implemented yet

Real video upload/transcoding, playback delivery, provider webhooks, thumbnail storage policies, interactive likes/comments/subscriptions, secure view-count tracking, moderation queue and admin roles, appeals, abuse prevention, and production analytics. These must be implemented and tested before being advertised as working features.

## Safety and launch requirements

Do not open public uploads until operational moderation, reporting, appeal handling, abuse prevention, privacy controls, and age-appropriate defaults are in place. A public user-to-user video platform needs review of applicable UK online-safety and data-protection duties with a responsible adult and qualified advice.
