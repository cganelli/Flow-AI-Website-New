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
- `LEAD_WEBHOOK_URL` (optional): If set, lead data is POSTed to this webhook; otherwise payloads are logged server-side.

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
