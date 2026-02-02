# Security Audit Report
## FlowAI Website - Basic Application Security Assessment

**Date:** February 2026  
**Scope:** Netlify Forms submissions, public assets/headers, environment usage, dependencies.  
**Framework:** Next.js 16.1.6 (App Router, static export)  

---

## Summary of Findings
- No exposed secrets found in repo; only public `NEXT_PUBLIC_*` values are used for analytics/Calendly (expected).
- Security headers present in `public/_headers` (CSP, XFO, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- Lead and contact capture use Netlify Forms with form-name scoping.
- Dependency audit completed (`npm audit --production`): no known vulnerabilities reported.

---

## Risks by Severity

### 🔴 High
No high severity findings at this time.

### 🟠 Medium
No medium severity findings at this time.

### 🟡 Low
1) Netlify Forms endpoints can still receive spam submissions  
   - **Location:** Netlify Forms  
   - **Risk:** Public forms can be targeted by bots.  
   - **Impact:** Increased spam leads; mitigated by honeypots and Netlify spam controls.

---

## Recommended Fixes (Remaining)
1) Enable Netlify Forms spam filtering or reCAPTCHA if spam increases.  
2) Add `npm audit --omit=dev` to CI on a schedule.

---

## Positive Controls Observed
- Security headers present (CSP, XFO, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- Netlify Forms with honeypot fields on contact and lead capture forms.
- No secrets in repo; `NEXT_PUBLIC_*` used only for public IDs/URLs.

---

## Next Steps Checklist
- [ ] Enable Netlify Forms spam filtering or reCAPTCHA if needed.  
- [ ] Add `npm audit --omit=dev` to CI.  