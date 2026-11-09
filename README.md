# ClipsTube

ClipsTube is a real video-sharing web application in development. Its visual target is the **desktop YouTube experience around June 2020**, plus the YouTube Studio Beta creator interface used during 2020. It uses original ClipsTube branding and does not copy YouTube's logo or proprietary assets.

## Historical design research

- YouTube's November 7, 2019 desktop redesign announcement describes larger/richer thumbnails, longer titles, channel icons below each video, fewer shelves, desktop queueing, and "Don't recommend channel". This redesign was already in effect during 2020.
- A June 16, 2020 archived homepage capture shows a more compact feed, COVID-19 news shelf, and category shelves. This is a useful period-specific visual cross-check; it should not be conflated with the later 2021 topic-chip/grid redesign.
- A May 27, 2020 homepage screenshot transcription records the familiar left navigation (Home, Now Streaming, Trending, Subscriptions, Library, History), sign-in prompt, Recommended section, Best of YouTube categories, News, Live, Fashion, Learning, Spotlight and 360° Video shelves.
- 2020 YouTube Studio Beta had a left channel navigation with Dashboard, Videos, Playlists, Analytics, Comments, Subtitles, Monetization and Settings. The channel videos page used Uploads/Live tabs, Filter, and columns for Visibility, Restrictions, Date, Views, Comments and Likes (vs. dislikes).
- In March 2020, creators could still switch back to Creator Studio Classic from Studio Beta; the newer Studio Beta was the recommended interface.
- The 2020 desktop watch page retained the classic layout: video player and title/details in the main column, recommendations in the right rail, with channel information, actions, description and comments below the player.

## 2020 video catalogue samples

The preview catalogue uses titles from YouTube's 2020 UK trending list, including The Body Coach's PE with Joe, Sidemen Reunited Mukbang, NikkieTutorials' I'm Coming Out, WillNE's All Star video, Sky Sports Boxing, MrBeast's influencer tournament, Britain's Got Talent, and BT Sport's Barcelona v Bayern highlights. Additional globally trending examples include Mark Rober's squirrel-proof bird feeder, Dream's Minecraft speedrunner finale, and Jeffree Star's We Broke Up.

These are clearly labelled sample catalogue entries. Their thumbnails are illustrative, not the original video thumbnails, and the sample catalogue does not claim to be a live or complete archive of 2020 YouTube.

## Current implementation

- Next.js App Router application with TypeScript.
- Supabase SSR client setup and email/password sign-in/sign-up.
- Supabase-backed public video feed and watch route.
- 2020-inspired viewer homepage, left navigation, compact cards, and Studio Beta-style dashboard/content table.
- Database schema and Row Level Security for profiles, channels, videos, subscriptions, likes, comments, playlists and reports.

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
