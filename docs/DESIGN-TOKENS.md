# Design Tokens (Color) — Flow AI

**Source of truth:** `src/styles/tokens.css`  
**Tailwind mapping:** `tailwind.config.ts` → `colors.primary`

## Brand colors (WCAG AA with Large Text)
- **Button background:** `--color-primary-bg: #EA3D2A`  
  - White text on this is WCAG AA compliant at 18px+ (enforced via `.btn-primary`)  
- **Primary link on white:** `--color-primary-link: #C23A1E`  
  - Colored text on white is ≥ 4.5:1 at all sizes  
- **Body text on white:** `--color-body: #6B7280` (or darker for tiny text)
- **Brand orange text:** Use `.text-brand-lg` class (enforces 24px+ for AA compliance)

## Usage
- Buttons: `.btn-primary bg-primary text-white`
- Links: `text-primary-700 hover:underline`
- Body copy: defaults from `tokens.css`

## Process
1. Change token in `src/styles/tokens.css`
2. (If needed) update Tailwind mapping
3. Run `npm run a11y:local` to verify AA contrast
