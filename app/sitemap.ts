import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { IS_LIVE, absolute } from "@/lib/site";

// Empty in demo mode. In live mode, every page with its last content update.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_LIVE) return [];
  const lastModified = new Date(`${business.contentUpdated}T12:00:00Z`);
  return [
    { url: absolute("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absolute("/contact"), lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
