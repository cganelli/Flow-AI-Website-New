# System Architecture & Operations

Authoritative overview of how the site is built and runs, including build/deploy, request flows, security, and edge/runtime considerations.

## Stack & Rendering Model
- Next.js 15 App Router, TypeScript, Tailwind CSS + DaisyUI components.
- Output is configured as **static export** (`next.config.js` sets `output: "export"`), so `next build` emits static assets suitable for Netlify/static hosting. Images use `unoptimized: true`.
- App shell: `src/app` for routes, `src/components` for all UI, `src/styles/tokens.css` for brand tokens.

## How to Run
- Dev: `npm run dev` (binds 0.0.0.0, default port 3000).
- Lint: `npm run lint` (Biome).
- Tests: `npm run test:a11y` (Vitest + jest-axe); `npm run a11y:smoke` runs Vitest then pa11y against a static export.
- Build (static export): `npm run build` or `npm run build:static` → static output for CDN/Netlify-style hosting.

## Application Structure
- Pages/layout: `src/app/page.tsx` (home) plus other routes in `src/app/*`.
- Components: all reusable UI lives in `src/components` (per project convention and DaisyUI styling).
- Data/content: `src/content`, `src/data`.
- Styles: Tailwind + DaisyUI tokens in `src/styles/tokens.css`, globals in `src/app/globals.css`.
- API routes (used when not statically exported): `src/app/api/contact-submit/route.ts`, `src/app/api/send-email/route.ts`.

## Form & Submission Flow
- Static Netlify Forms: hidden registration forms live in `src/app/page.tsx`; `EmailJsFormBridge` (`src/components/EmailJsFormBridge.tsx`) injects the Netlify attributes, honeypot, and `form-name` on visible forms.
- Submission path:
  1. User fills a visible form (e.g., `ContactCaptureForm`).
  2. Native validation + bridge runs; if valid, it URL-encodes the form and POSTs to the current page (Netlify captures the submission).
  3. On success, the bridge swaps the form for an inline “Thank you” message; on error, the user sees a fallback alert with support email.
- Inquiry/contact pages use the same mechanism; no persistent database is used.

## Security Posture
- Headers: `public/_headers` sets CSP, HSTS-related protections (nosniff, frame denial, referrer policy, permissions policy). Adjust CSP domains if new third-parties are added.
- Input validation & sanitization: `sanitizeContactForm` + `escapeHtml` inside `contact-submit` API; similar validation in `send-email`.
- CSRF/origin checks: both APIs enforce an origin allowlist.
- Rate limiting: `src/lib/rate-limit.ts` caps contact/send-email endpoints (currently 5/15m per client).
- Secrets: email provider keys must be supplied via environment variables; none are committed.
- Logging: server logs avoid echoing PII in production; client error messaging remains generic.

## Edge Functions / Server Runtime
- Current config is static export → no Next.js Edge or Server Functions are emitted. API routes run only in a serverful/SSR deployment; for pure static hosting they are bypassed in favor of Netlify form capture.
- To run on Vercel with API routes, remove `output: "export"` (or gate it per env) and deploy as serverless/edge as needed. Add middleware if you want edge-based rate limiting or header injection instead of the static `_headers` file.

## Accessibility & QA
- WCAG 2.2 AA tracked in `WCAG_AUDIT_RESOURCES_TRAINING.md`.
- Keyboard/focus and semantic fixes are enforced via Biome rules; SVGs are titled or `aria-hidden` as appropriate.
- Recommended smoke: `npm run lint`, `npm run test:a11y`, then `npm run a11y:local` before release.

## Deployment Notes
- Static hosting (current): `npm run build` → deploy `out/` (Netlify-style). `_redirects` and `_headers` live in `public/`.
- Serverful/edge hosting (future): disable static export, keep CSP/headers via middleware or platform config, ensure environment variables for email providers are set, and retain rate limiting/CSRF checks on API routes.
