# Design Tokens (Color) — Flow AI

**Source of truth:** `src/styles/tokens.css`  
**Tailwind mapping:** `tailwind.config.js` → `colors.primary`

## Brand colors (WCAG AA)
- **Button background:** `--color-primary-bg: #E22F1B`  
  - White text on this is ≥ 4.5:1  
- **Primary link on white:** `--color-primary-link: #B11F0F`  
  - Colored text on white is ≥ 4.5:1  
- **Body text on white:** `--color-body: #6B7280` (or darker for tiny text)

## Usage
- Buttons: `.btn-primary bg-primary text-white`
- Links: `text-primary-700 hover:underline`
- Body copy: defaults from `tokens.css`

## Process
1. Change token in `src/styles/tokens.css`
2. (If needed) update Tailwind mapping
3. Run `npm run a11y:local` to verify AA contrast
