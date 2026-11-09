# ClipsTube

ClipsTube is a real user-generated video-sharing website with a visual target of the **desktop YouTube experience around 2020**. It uses original ClipsTube branding and does not use YouTube's logo or proprietary assets.

## Live architecture

- **Frontend:** static HTML, CSS and JavaScript served by GitHub Pages.
- **Backend:** Supabase project `hggvmjohnigtzditurtv` for authentication, database, Row Level Security and private object storage.
- **Routing:** client-side hash routes, so pages work on GitHub Pages without server-side Next.js routes.
- **No seeded catalogue:** the homepage starts empty. Only real public videos uploaded by users appear.
- **Media:** private Supabase Storage buckets; the app requests short-lived signed URLs after checking database access.
- **Uploads:** MP4, WebM, QuickTime/MOV or OGG up to 50 MB; optional JPG/PNG/WebP thumbnails up to 5 MB.

## Features in the current static app

- Email/password registration and sign-in
- Creator channel creation and channel settings
- Public video feed, trending sort and search
- Video playback using the uploaded original file
- Like/unlike, subscribe/unsubscribe, comments and video reports
- Private, unlisted and public visibility
- Studio dashboard, upload form, content list and delete
- Watch history stored in the visitor's browser
- Responsive 2020-inspired viewer and Studio styling
- Dark theme and collapsible navigation

## Deploy

A GitHub Actions workflow at `.github/workflows/pages.yml` deploys the repository root to GitHub Pages on pushes to `main`.

In the repository's **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions** if it is not already selected.

The public Supabase project URL and publishable key are embedded in `app.js`. Publishable keys are designed for browser use; never put a Supabase secret/service-role key in this repository. Database and Storage Row Level Security are required for safety.

## Current media limits and remaining production work

This is a working first-party upload-and-playback implementation, not a full YouTube-scale media pipeline. Uploads are limited to 50 MB and are played as the original uploaded file. There is no transcoding, adaptive bitrate streaming, automatic thumbnail extraction, view-count event pipeline, channel-wide comment moderation dashboard, moderator role workflow, copyright appeals workflow, or automated content review yet.

Do not open public uploads to a broad audience until moderation staffing, reporting review, appeal handling, anti-abuse controls, privacy controls and age-appropriate defaults are ready. Review applicable UK online-safety and data-protection duties with a responsible adult and qualified advice before a public launch.

## Legacy source

The earlier Next.js App Router implementation remains in `app/` and `lib/` as reference code. It is not used by the GitHub Pages deployment. The production static entry point is `index.html`, with `style.css` and `app.js`.
