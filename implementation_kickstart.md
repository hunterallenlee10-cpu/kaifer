# The Kaifer Insurance Group: implementation kickstart

Concept site by Lee Enterprises Unlimited. A front-end-only Next.js build, "Blue Ledger" direction.

## Plan

- **Stack:** Next.js 16 (App Router) with TypeScript and Tailwind CSS 4. Motion in two places only: the Shop-Around (`components/sections/ShopAround.tsx`, on the browser's Web Animations API) and the Client-Family Ledger (`components/ClientLedger/`, on Framer Motion, loaded when the ledger nears the viewport). `lucide-react` for icons. `@vercel/analytics` loads only on Vercel.
- **Data:** `lib/business.ts` holds every fact. `lib/ledger.ts` holds the Client-Family entries, with their sources in comments. `lib/checkup.ts` holds the life-event map. `lib/site.ts` holds the launch switch.
- **Images:** the originals are in `public/images/raw/`. `npm run images` (sharp) writes `.webp` files to `public/images/` plus the logo PNG, the favicon (`app/icon.png`), the Apple touch icon (`app/apple-icon.png`) and `public/og-image.png`.
- **Pages:** `/` (the landing page), `/contact` and a real 404.
- **Conversion:** every primary action is a `QuoteButton` that opens one shared `QuoteBuilder` (a context and a modal). Service mode runs the same builder. `/contact` embeds the same form inline.
- **Launch switch:** `NEXT_PUBLIC_SITE_MODE` (`demo` by default, or `live`) and `NEXT_PUBLIC_SITE_URL`. They drive the robots meta, `robots.txt`, the sitemap and the concept line in the footer.

## Design tokens ("Blue Ledger")

| Token | Value | Use |
|---|---|---|
| paper | `#F6F3EC` | page background |
| sheet | `#FFFFFF` | cards, with a 1px `#DDD6C8` rule |
| rule | `#DDD6C8` | hairlines and borders |
| accent | `#0079C0` | primary button, links, key numbers, years, active states, ledger handle. On paper only at 24px or larger |
| accent-ink | `#005F99` | small blue text on paper, focus rings |
| ink | `#0E2338` | text, and the Client Desk, final call-to-action and footer bands |
| muted | `#5A6878` | secondary text |

- Fonts: Newsreader (display: 500 and 600, plus 500 italic) and Public Sans (body: 400, 500, 600), both through `next/font`, with tabular figures throughout.
- Radius 6px. No shadows. 8px grid. Sections are padded 112 to 128px on desktop and 72px on mobile.
- Motion in two places only: the Shop-Around and the Client-Family Ledger. Both respect `prefers-reduced-motion`.

## Build checklist

- [x] Phase 1: scaffold, tokens, fonts, nav, hero with the Shop-Around, footer
- [x] Phase 2: Why independent, the Client-Family Ledger with `lib/ledger.ts`
- [x] Phase 3: seasonal band, coverage bento, the team
- [x] Phase 4: Give Back, How it works, Client Desk, reviews, FAQ, final call to action
- [x] Phase 5: Quote Builder in both modes, wiring and pre-selects, prefilled email, mobile sticky bar, `/contact`
- [x] Phase 6: launch switch, titles and descriptions, single h1, JSON-LD, robots, sitemap, `llms.txt`, OG image, favicon, 404, images, `SEO-LAUNCH.md`
- [x] Phase 6b: Lighthouse against a production build, mobile and desktop, in live and demo mode
- [x] Phase 7: final review, commit, ready for GitHub and Vercel

## Final review checklist

- [x] The hero sells the job. The Shop-Around plays once. At 375px the headline and primary button are visible without scrolling.
- [x] The ledger moves through every entry in order and ends on "You.". It works with mouse, touch and keyboard. The quotes are exact.
- [x] No looked-up numbers.
- [x] Every quote button pre-selects correctly. The Client Desk opens service mode. The phone, email, ERIE and directions links work.
- [x] Every "only this business" item is present.
- [x] Zero em dashes, zero double hyphens, zero stock or AI images, zero insurer logos, zero invented facts.
- [x] The DRAFT comments are in place.
- [x] No family details, no names on faces, no savings promises, no legal advice.
- [x] Two fonts, three colours plus text, motion in two sections.
- [x] At 375px: no overflow, the burger works, the sticky bar works.
- [x] Footer on both pages. Demo mode is noindex. Live mode is index with a sitemap.
- [x] The OG image and favicon are the agency's own.
- [x] Lighthouse SEO 100 in live mode. Performance, Accessibility and Best Practices at 90 or higher.
- [x] One h1 per page. The titles and descriptions are unique. The JSON-LD validates.
