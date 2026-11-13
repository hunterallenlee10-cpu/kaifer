import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/lib/site";

// Crawling stays allowed in both modes so crawlers can read the page's robots meta.
// Demo pages carry noindex, nofollow. Only live mode lists the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(IS_LIVE ? { sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL } : {}),
  };
}
