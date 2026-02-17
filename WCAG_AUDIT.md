# WCAG 2.2 Level AA Accessibility Audit

**Audit date:** February 2026  
**Standard:** WCAG 2.2 Level AA (automated checks align to WCAG 2.1/2.2 AA where supported)  
**Scope:** Lead magnet–related pages and AI Information Session block in the footer

---

## Scope

| Area | Description |
|------|-------------|
| **Lead magnet quiz** | Quiz flow at `/lead-magnet` and the lead magnet modal (popup) |
| **Lead magnet results** | Results page at `/lead-magnet/results` |
| **Book-call page** | Page at `/book-call` (We Build It call + Calendly) |
| **Footer AI Information Session** | “We handle complex AI…”, “Book your FREE Information Session”, bullets, and “Claim My Free Info Session” CTA in the site footer |

---

## Method

- **Automated:** axe-core (via jest-axe) with tags: `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`.
- **CI config:** pa11y-ci (WCAG2AA) is configured for the same pages; full run requires static build and local server (`npm run a11y:local`).

### Tests run

- `src/__tests__/book-call.a11y.spec.tsx` — Book-call page: main landmark, axe (WCAG 2/2.1/2.2 AA).
- `src/__tests__/lead-magnet-quiz.a11y.spec.tsx` — Lead magnet wizard (first question step), axe.
- `src/__tests__/lead-magnet-modal.a11y.spec.tsx` — Lead magnet modal (dialog + wizard), axe.
- `src/__tests__/footer-info-session.a11y.spec.tsx` — Footer: Information Session heading, subheading, CTA button, axe.

Existing tests that also cover this scope:

- `src/__tests__/home.a11y.spec.tsx` — Home page (includes footer with AI Information Session).
- `src/__tests__/modal.a11y.spec.tsx` — Dialog semantics (Audit modal).

---

## Results

**Command:** `npm run test:a11y` (Vitest + jest-axe)

| Test file | Result | Notes |
|-----------|--------|--------|
| book-call.a11y.spec.tsx | Pass | Main landmark present; no axe violations reported. |
| lead-magnet-quiz.a11y.spec.tsx | Pass | Question 1 of 5 present; no axe violations reported. |
| lead-magnet-modal.a11y.spec.tsx | Pass | Dialog with accessible name “7-Day plan quiz”; no axe violations reported. |
| footer-info-session.a11y.spec.tsx | Pass | Headings and CTA found; no axe violations reported. |
| home.a11y.spec.tsx | Pass | Includes footer (AI Information Session block). |
| contact.a11y.spec.tsx | Pass | — |
| modal.a11y.spec.tsx | Pass | — |
| skip-link.a11y.spec.tsx | Pass | — |

**Overall:** All 8 a11y test files passed.

### Pa11y-ci (full URL audit)

- **Config:** `.pa11yci.json` includes:
  - `http://localhost:4321/`
  - `http://localhost:4321/lead-magnet/`
  - `http://localhost:4321/lead-magnet/results/`
  - `http://localhost:4321/book-call/`
  - Plus existing FAQ, contact, privacy-terms, accessibility.
- **Run:** For a full pa11y run against the static export, use:  
  `npm run a11y:local`  
  (builds, serves `out` on port 4321, then runs pa11y-ci).
- **Latest run:** 8/8 URLs passed (after resolving skip-link and duplicate-id issues).

---

## Resolved issues (pa11y-ci)

The following issues were found by `npm run a11y:local` and have been fixed:

| Page | Issue | Fix |
|------|--------|-----|
| `/lead-magnet/` | Skip link `#main` had no target (page does not use main Layout). | Wrapped page content in `<main id="main">` and added a sr-only element with `id="navigation"` (with Home link) so both skip links have targets. |
| `/lead-magnet/` | Skip link `#navigation` had no target. | Same as above. |
| `/book-call/` | Duplicate `id="book-appointment"` (page section and footer). | Renamed the book-call page section to `id="book-call-section"`. Footer keeps `id="book-appointment"`; all site links to `#book-appointment` continue to target the footer. |

---

## Violations

No WCAG 2.2 Level AA violations were reported by the automated tests for:

- Lead magnet quiz (page and modal)
- Book-call page
- Footer AI Information Session block

(Results page was not run in isolation in this test suite; it is included in the pa11y-ci URL list for when `a11y:local` is run.)

---

## Limitations

- **Environment:** Tests run in jsdom. Some axe checks (e.g. “Respondable target must be a frame”) are skipped or may not run; structure and role/name checks still run.
- **Coverage:** Automated checks do not replace manual testing for keyboard flow, focus management, screen readers, or color contrast in all themes.
- **Results page:** Full results page relies on client-side state (e.g. localStorage); automated axe run is most meaningful when the page is loaded with that state (e.g. after a real or mocked submission).

---

## Recommendations

1. **Keep running:** `npm run test:a11y` in CI to guard regressions on the audited areas.
2. **Full pa11y run:** Periodically run `npm run a11y:local` (or equivalent) to audit all configured URLs, including `/lead-magnet/results/`.
3. **Manual pass:** For go-live or major releases, do a manual pass (keyboard, one screen reader, and zoom) on the quiz, results, book-call, and footer Information Session block.
