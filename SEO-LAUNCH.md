# Launch day checklist

The deployed concept runs in **demo mode**: every page carries `noindex, nofollow`, `robots.txt` lists no sitemap, the sitemap is empty, and the footer shows "Concept preview by Lee Enterprises Unlimited." Live mode switches all of that.

1. In Vercel, under Project Settings > Environment Variables (Production), set:
   - `NEXT_PUBLIC_SITE_MODE=live`
   - `NEXT_PUBLIC_SITE_URL=https://kaiferinsurance.com` (the real domain, with no trailing slash)
2. Redeploy. These variables are read at build time, so a redeploy is required.
3. Check the live site:
   - View the source of `/` and `/contact`: `<meta name="robots" content="index, follow">` is present, and each canonical points to the real domain.
   - `/robots.txt` lists `Sitemap: https://kaiferinsurance.com/sitemap.xml`.
   - `/sitemap.xml` lists `/` and `/contact`.
   - The concept line is gone from the footer.
   - Run the Rich Results Test (search.google.com/test/rich-results) on `/` and `/contact`.
4. Submit the sitemap in Google Search Console and in Bing Webmaster Tools.
5. Link the site from the Google Business Profile (the website field), and update the Facebook page link.
6. Set up redirects from the old site's URLs (for example its staff, contact and reviews pages) to `/` or `/contact`.
7. Replace every DRAFT and sample item. Search the code for `DRAFT`:
   - Office hours (8:30 to 5:30 on Google, 9 to 5 on the old site).
   - Whether the office line takes texts (`business.acceptsText` in `lib/business.ts`).
   - Permission to feature the $5,080 post.
   - The giving totals, and how to describe the Dawn Hill Fight Foundation.
   - The GBMC caption.
   - Who handles personal and business requests (the routing line).
   - The callback promise on the success screen.
   - The Chesapeake Employers "Workers' comp" tag.
   - The seasonal band (swap it each season).
   - Which Client-Family quotes go in the ledger.
8. Update `business.contentUpdated` in `lib/business.ts` whenever the content changes, so the sitemap dates stay real.
