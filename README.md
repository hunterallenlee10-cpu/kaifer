# The Kaifer Insurance Group: concept site

A front-end-only concept for The Kaifer Insurance Group in Cockeysville, MD, built by Lee Enterprises Unlimited. It uses Next.js 16 (App Router), TypeScript and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build: `npm run build`, then `npm start`.

Before a commit, run `npm run check`. It runs the linter, the type check and `scripts/check-copy.mjs`, which enforces the copy rules (no em dashes or double hyphens, no hype words, no file over 500 lines, exactly ten insurers, Gerard's quote left exact).

## Where things live

- `lib/business.ts`: every business fact. Edit here first.
- `lib/ledger.ts`: the Client-Family Ledger entries, with their sources in comments.
- `lib/checkup.ts`: the life-event map for the Quote Builder.
- `lib/faq.ts`: the FAQ, shared by the page and the FAQPage JSON-LD.
- `lib/site.ts`: the launch switch (`NEXT_PUBLIC_SITE_MODE`, `NEXT_PUBLIC_SITE_URL`). With no site URL set, it uses the Vercel production domain.
- `lib/meta.ts`: the Open Graph and Twitter card settings shared by every page.
- `next.config.ts`: security headers, image cache times and image formats.
- `components/sections/`: one file per section. Also `components/QuoteBuilder/` and `components/ClientLedger/`.
- `scripts/optimize-images.mjs` (`npm run images`): turns `public/images/raw/` into `.webp` files and builds the favicons.
- `scripts/make-og.mjs` (`npm run og`): builds `public/og-image.png`.
- `docs/screenshots/`: desktop and mobile screenshots of the hero, the ledger, the team section and the Quote Builder.

## Deploy (Vercel)

Import the repository as a new project. No settings are needed: it deploys in **demo mode** (`noindex, nofollow`, with the concept footer line). To launch, follow `SEO-LAUNCH.md`.

Search the code for `DRAFT` to see everything the owner still needs to confirm.
