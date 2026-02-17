# Flow AI Website

A modern, accessible website built with Next.js, TypeScript, and Tailwind CSS.

## 🎨 Design tokens
See `/docs/DESIGN-TOKENS.md`. All WCAG-sensitive colors live in `src/styles/tokens.css`.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🌐 Environment Variables (Netlify)

Add these in Netlify: Site settings → Build & deploy → Environment.

- `NEXT_PUBLIC_CALENDLY_URL` (required): Calendly booking link used by `/lead-magnet`.

Lead and contact submissions use Netlify Forms, so no additional backend env vars are required.

### Netlify form for lead magnet

The lead magnet form is already wired in the app:

- **Form name:** `lead-magnet`
- **Where it lives:** A hidden form in `LeadMagnetWizard.tsx` with `data-netlify="true"` so Netlify can discover it at build time.
- **How it submits:** When a user completes the email gate (name, email, website URL), the app POSTs to `/` with `form-name: lead-magnet` and the same fields (quiz answers, plan, UTM, etc.).

**What you need to do:**

1. **Deploy to Netlify**  
   After the site is built and deployed, Netlify’s build step crawls the HTML and registers any form with `data-netlify="true"`. The `lead-magnet` form will then appear under **Site → Forms** in the Netlify dashboard.

2. **View submissions**  
   In Netlify: **Site → Forms → lead-magnet → Form submissions**. Each submission includes `email`, `first_name`, `last_name`, `website_url`, quiz answers (`q1`–`q5`), `plan_key`, `plan_name`, UTM params, and `createdAt`.

3. **Optional: email notifications**  
   In **Forms → lead-magnet → Form notifications**, add an email notification so you get an email for each new submission.

No extra env vars or Netlify config are required for the form to work; deploying is enough for Netlify to start accepting submissions.

### Calendly: booking source on the invite (free plan)

With one meeting type, the site sends **a4** so you can tell from the invite whether they booked from **AI Info Session** (footer/homepage) or **Let Us Build It For You** (lead-magnet results, book-call page). Calendly maps **a1** = 1st custom question, **a2** = 2nd, **a3** = 3rd, **a4** = 4th. If you already have 3 invitee questions (e.g. Website URL, Phone, Share anything), add a **4th** invitee question (e.g. “Booking source” or “Reason for call”). The site pre-fills **a4** with “AI Info Session” or “Let Us Build It For You”; that value will appear on the meeting invite.

## 🧪 Testing

```bash
# Run accessibility tests
npm run test:a11y

# Run full accessibility suite
npm run a11y:smoke

# Run local accessibility testing
npm run a11y:local
```

## 📦 Build

```bash
npm run build:static
```

## ♿ Accessibility

This website is built with accessibility in mind and follows WCAG 2.1 AA guidelines. All interactive elements have proper focus indicators, color contrast meets AA standards, and the site is fully keyboard navigable.
