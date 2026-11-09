# ClipsTube: production platform architecture

## Product direction

ClipsTube is intended to become a real user-generated video platform with a visual language inspired by desktop YouTube circa 2020. The historical interface is a design reference only; the application will use modern, supported infrastructure.

## Proposed stack

- **Web application:** Next.js App Router + TypeScript, deployed on Vercel or another Node-compatible host.
- **Identity:** Supabase Auth. Use server-side cookie sessions with `@supabase/ssr`.
- **Application data:** Supabase Postgres. Every exposed table must have Row Level Security (RLS) and least-privilege grants.
- **Video:** Cloudflare Stream. Create one-time Direct Creator Upload URLs on the server; upload video bytes directly from the browser to Stream; store the returned Stream UID and metadata in Postgres; play through Stream's adaptive-bitrate player.
- **Images:** Supabase Storage for avatars, channel banners and thumbnails where appropriate.
- **Operations:** moderation queue, user reports, account suspension, content takedown, audit trail, rate limits and abuse monitoring.

## Why video needs a dedicated service

A video-sharing service must ingest large files, transcode them into multiple playback qualities, package them for streaming, and deliver them globally. Ordinary object storage alone does not provide the complete video pipeline. Cloudflare Stream provides direct creator uploads, encoding, playback and delivery, including adaptive bitrate playback. Its current documented limits and supported formats must be checked at implementation time.

## Core data model

- `profiles`: public profile fields linked to Supabase Auth user IDs.
- `channels`: channel handle, title, description, avatar/banner references and owner.
- `videos`: channel owner, title, description, visibility, moderation status, Stream UID, duration, thumbnail and timestamps.
- `subscriptions`: subscriber-to-channel relationship with unique constraints.
- `video_likes`: user-to-video relationship, one reaction per user/video.
- `comments`: video, author, text, moderation state and timestamps.
- `playlists` and `playlist_items`: owner-managed collections and ordering.
- `video_views`: deduplicated/qualified view events, designed to resist trivial refresh inflation.
- `reports`: reporter, target type/id, reason, status and reviewer metadata.
- `moderation_actions`: immutable audit trail for content/account actions.

All user-owned rows must enforce ownership in RLS. Public reads should be limited to approved, public content. Draft, private, removed, restricted and pending-review content must not leak through public queries. Never rely on hidden UI controls for authorization.

## Upload and publishing flow

1. Signed-in creator opens Studio and selects a video.
2. Browser sends metadata and file details to a server route.
3. Server verifies the session, account standing, upload limits and allowed file type/size.
4. Server requests a one-time Cloudflare Stream Direct Creator Upload URL using a secret stored only on the server.
5. Browser uploads directly to Stream and reports progress.
6. Server verifies the resulting Stream asset via a trusted callback or API lookup before marking the upload as received.
7. Video enters a pending moderation/processing state. It is not publicly listed or playable until required checks pass and encoding is ready.
8. Creator can edit title, description, thumbnail, visibility and audience settings in Studio.
9. Publishing changes visibility only after policy and processing checks pass.

Never put Cloudflare API tokens, Supabase secret/service-role keys, or other server secrets in browser code or public environment variables.

## MVP delivery order

### Phase 0 — accounts and secure foundation
- Next.js application shell and 2020-inspired layout.
- Sign-up, email verification, sign-in, sign-out and account recovery.
- Profiles and channel creation.
- Database schema, RLS policies and storage policies.
- Private configuration through environment variables.

### Phase 1 — real video lifecycle
- Server-issued direct upload URLs.
- Resumable/progress-aware uploads where supported.
- Processing status and playable video pages.
- Creator Studio upload list and metadata editor.
- Draft, unlisted/private and public visibility rules.

### Phase 2 — community features
- Subscriptions, likes, comments and playlists.
- Search, channel pages, home feed and watch history.
- View counting with abuse resistance.

### Phase 3 — safety and operations before public launch
- User reporting, reviewer queue, appeals and takedown workflow.
- Content and account enforcement, rate limits and spam controls.
- Age-aware protections, privacy-by-default settings and data deletion/export.
- Copyright complaint process, repeat-infringer handling and transparent policies.
- Monitoring, backups, incident response and cost limits.

## Safety, privacy and compliance gate

ClipsTube is a user-to-user service if people can upload content that other people can encounter or interact with. Before opening public uploads, the operator must assess applicable jurisdictions and implement proportionate systems for illegal-content reports, child safety, complaints, moderation, record keeping and privacy. UK requirements may include the Online Safety Act and the ICO Age Appropriate Design Code. This document is an engineering plan, not legal advice; obtain qualified adult/legal guidance before operating a public service, particularly for UK and international users.

Default to private/high-privacy account settings, collect the minimum personal data, avoid public exposure of precise location, and do not use profiling or engagement nudges on child users without a justified, compliant design.

## Hosting and cost notes

Video delivery is likely to be the largest variable cost. Cloudflare Stream bills for stored video minutes and delivered video minutes; storage capacity is purchased in increments, and delivery scales with viewing. Supabase Free is useful for development but has small database/storage/egress limits and can pause inactive projects. Vercel Hobby is limited to personal, non-commercial use; a public commercial service requires a suitable paid hosting plan. Set budget alerts, upload caps and usage monitoring before inviting users.

## Required secrets / external setup

Use a local `.env.local` and the hosting provider's encrypted environment-variable store. A committed `.env.example` may list variable names only:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` (server only, if a server-side admin operation truly requires it)
- `CLOUDFLARE_ACCOUNT_ID` (server only)
- `CLOUDFLARE_STREAM_API_TOKEN` (server only)
- `NEXT_PUBLIC_APP_URL`

Never commit real values.

## Research references

- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Next.js SSR: https://supabase.com/docs/guides/auth/server-side
- Supabase secure data and RLS: https://supabase.com/docs/guides/database/secure-data
- Supabase Storage access control: https://supabase.com/docs/guides/storage/security/access-control
- Supabase resumable uploads: https://supabase.com/docs/guides/storage/uploads/resumable-uploads
- Cloudflare Stream overview: https://developers.cloudflare.com/stream/
- Cloudflare Stream direct uploads: https://developers.cloudflare.com/stream/uploading-videos/
- Cloudflare Stream pricing: https://developers.cloudflare.com/stream/pricing/
- Ofcom child safety duties: https://www.ofcom.org.uk/online-safety/protecting-children/protection-of-children-duties-under-the-online-safety-act
- Ofcom age assurance: https://www.ofcom.org.uk/online-safety/protecting-children/age-assurance
- ICO Age Appropriate Design Code: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/
