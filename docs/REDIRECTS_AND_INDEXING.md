# Redirects and Google Search Indexing

## Canonical setup

- **Canonical URL:** `https://thisisflowai.com` (no www)
- **Redirects:** All http and www variants → 301 to `https://thisisflowai.com`
- **Sitemap:** Lists only canonical URLs (no http, no www)

## Netlify domain settings

In **Netlify → Domain management → Domain settings**:

1. Set **Primary domain** to `thisisflowai.com` (apex, not www)
2. Enable **Redirect to main domain** for `www.thisisflowai.com` if offered

This works with the redirect rules in `netlify.toml` so requests arrive at the canonical URL in a single hop.

## Google Search Console “Page with redirect”

URLs like `http://www.thisisflowai.com/` and `https://www.thisisflowai.com/` are **expected** to redirect. Google will not index them; it indexes the final URL (`https://thisisflowai.com/`). That’s normal.

If validation fails:

1. **Avoid redirect chains** – Redirects in `netlify.toml` go directly to the canonical URL (single hop).
2. **Sitemap** – `sitemap.xml` should only include canonical URLs. Set `SITE_URL=https://thisisflowai.com` in Netlify env if needed.
3. **Inspect URLs** – Use GSC’s URL Inspection tool. The canonical tag should point to the redirect destination (`https://thisisflowai.com/...`).
4. **Do not validate http/www URLs** – When using “Validate fix,” prefer canonical URLs only. The http/www variants will continue to redirect; that’s correct.
