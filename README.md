# Salman Bashir: portfolio

Personal portfolio for Salman Bashir, Senior Software Engineer, Full Stack Developer and AI integration engineer.
Built with Next.js 16 (App Router) and TypeScript. It has no CSS framework and no UI library, and
uses only four runtime dependencies (`next`, `react`, `react-dom`, `geist`).

## What's inside

- **Content in one file.** Everything on the site, and everything the chat assistant knows, lives in
  `src/content/profile.ts`. Edit that file to update projects, skills, roles or contact details.
- **Static pages.** The home page and 9 case studies (`/projects/<slug>`) are pre-rendered at build
  time. The home page re-generates daily.
- **System diagrams.** Featured projects include a small diagram built from facts in `profile.ts`
  (`diagram` field), rendered as plain HTML so it reflows on any screen and can be read by search engines.
- **Portfolio assistant.** The chat button opens an assistant served by `POST /api/chat`.
  - It needs no AI API and costs nothing to run. It matches the visitor's question against
    `profile.ts` (projects, technologies, around 25 question types and follow-up context) and falls back
    to BM25 search over the same content.
  - It never invents answers. Anything not in the portfolio is reported as "not specified", with a
    pointer to WhatsApp or email.
  - The API validates input, rejects cross-origin requests, limits body size and rate-limits each IP
    (20 messages per minute).
- **WhatsApp.**
  - Floating button and calls to action use `https://wa.me/923137713795` with a pre-filled greeting.
  - The contact form opens WhatsApp or email with the message filled in. Nothing is stored.
- **Resume.** `public/Salman_Bashir_Resume.pdf`, linked from the header, hero, contact section,
  footer and chat. `/resume` and `/cv` redirect to it.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint (next/core-web-vitals + TypeScript)
npm run typecheck  # tsc --noEmit
npm test           # unit tests for the chat assistant engine
```

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected Next.js
   settings. Then deploy.
3. Optional but recommended: under **Settings → Environment Variables**, add
   - `NEXT_PUBLIC_SITE_URL` = your final domain, e.g. `https://salmanbashir.dev` (no trailing slash).
     If it is not set, the site uses the production URL Vercel assigns.
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = the code from Google Search Console's HTML-tag method.
   Redeploy after changing environment variables.
4. To use a custom domain, add it under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it.

No API keys or secrets are needed.

## SEO and Google Search Console

Already in place:
- **Metadata:** unique titles, descriptions and canonical URLs on every page.
- **Social sharing:** Open Graph and Twitter cards, with generated share images for the home page and
  each case study.
- **Structured data:** JSON-LD `Person`, `WebSite` and `ProfilePage` on the home page, and a
  `BreadcrumbList` on each case study.
- **Crawling:** `/sitemap.xml` and `/robots.txt`, with `/api/` excluded from crawling.
- **Page structure:** one `h1` per page, semantic sections and descriptive alt text.

After the first deploy:
1. Open [Google Search Console](https://search.google.com/search-console) and add your domain
   (the Domain property via DNS, or a URL-prefix property using `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`).
2. Under **Sitemaps**, submit `https://<your-domain>/sitemap.xml`.
3. Use **URL Inspection** on the home page and request indexing.
4. Link to the site from your LinkedIn profile (Contact info → Website). This is the fastest way to get it discovered.

## Updating content

- **New project:** add an entry to `projects` in `src/content/profile.ts` and set `featured: true` to show it
  as a card. Its case-study page, sitemap entry, share image and assistant knowledge are created automatically.
- **Years of experience:** change `experience` in `src/content/profile.ts` (currently "nearly 5 years"); every mention on the site and in the assistant uses it.
- **Link preview image:** `src/app/opengraph-image.jpg` (1200×630). Case studies generate their own preview with your photo.
- **New resume:** replace `public/Salman_Bashir_Resume.pdf`, keeping the same file name.
- **New photo:** replace `src/assets/salman-photo.jpg` (4:5 portrait) and `src/assets/salman-avatar.jpg` (square face crop).
