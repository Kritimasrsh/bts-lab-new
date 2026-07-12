# BTS Lab — Behind The Screen

A Next.js (App Router) marketing site for BTS Lab, a mobile repair / buyback /
training academy / accessories shop — same concepts as the Mobizilla
reference site, with its own bold, colorful visual identity built around a
"repair claim ticket" motif.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## Structure

- `app/layout.js` — root layout, global nav/footer, Google Fonts
- `app/globals.css` — design tokens (colors, fonts) and the signature
  `.ticket` / `.ticket-perf` card styles
- `app/page.js` — homepage
- `app/services/`, `app/buyback/`, `app/academy/`, `app/shop/`,
  `app/about/`, `app/contact/` — interior pages
- `app/components/` — shared UI: `Navbar`, `Footer`, `Hero`, `Ticket`,
  `Eyebrow`, `PageHeader`, `CtaBanner`, section components

## Design system

- **Palette**: ink `#14122B`, paper `#FBF7FF`, violet `#7C3AED`, coral
  `#FF5470`, sun `#FFC93F`, mint `#00D9A3`
- **Type**: Unbounded (display/headlines), Plus Jakarta Sans (body),
  JetBrains Mono (labels, prices, ticket codes)
- **Signature element**: the repair-claim "ticket" card — a bordered,
  hard-shadow card with a dashed perforation and punch-holes, used for
  services, reviews, courses and refurbished listings, echoing the
  physical claim ticket you get handed at a phone repair counter.

## Content

Copy, pricing and contact details are placeholders — swap in BTS Lab's
real services, prices, course details, and location before launch. The
contact form is UI-only; wire it up to your form handler or API route of
choice.
