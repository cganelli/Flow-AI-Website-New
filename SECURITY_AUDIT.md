# Security Audit Report
## FlowAI Website - Basic Application Security Assessment

**Date:** February 2026  
**Scope:** APIs (`/api/contact-submit`, `/api/send-email`, `/api/leads`), public assets/headers, environment usage, dependencies.  
**Framework:** Next.js 16.1.6 (App Router, standalone output)  

---

## Summary of Findings
- No exposed secrets found in repo; only public `NEXT_PUBLIC_*` values are used for analytics/Calendly (expected).
- Security headers present in `public/_headers` (CSP, XFO, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- Contact and email APIs include origin checks, input validation, and rate limiting (Upstash optional; in-memory fallback ok for low traffic).
- Lead capture API now includes origin checks, rate limiting, basic input validation, and avoids PII logging when webhook is unset.
- Dependency audit completed (`npm audit --production`): no known vulnerabilities reported.

---

## Risks by Severity

### 🔴 High
No high severity findings at this time.

### 🟠 Medium
No medium severity findings at this time.

### 🟡 Low
4) Origin validation allows missing origin/referer  
   - **Location:** `src/app/api/contact-submit/route.ts`, `src/app/api/send-email/route.ts`  
   - **Risk:** Requests without origin/referer are allowed, enabling non-browser abuse.  
   - **Impact:** Higher exposure to script-based abuse; still rate limited.

---

## Recommended Fixes (Remaining)
1) Configure Upstash rate limiting via `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` when traffic grows.  
2) Keep `EMAIL_API_KEY` set in production and in any environment where `/api/send-email` is used.  
3) Add `npm audit --omit=dev` to CI on a schedule.

---

## Positive Controls Observed
- Security headers present (CSP, XFO, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- Contact/email APIs: origin validation, in-memory rate limiting, sanitization/escaping of inputs, generic error responses.
- No secrets in repo; `NEXT_PUBLIC_*` used only for public IDs/URLs.
- Input sanitization helpers (`sanitizeContactForm`, `escapeHtml`) used in contact flow.

---

## Next Steps Checklist
- [ ] Set Upstash env vars when traffic grows and shared rate limiting is needed.  
- [ ] Keep `EMAIL_API_KEY` set where `/api/send-email` is used.  
- [ ] Add `npm audit --omit=dev` to CI.  