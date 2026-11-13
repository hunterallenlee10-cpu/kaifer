// The launch switch. Demo mode (the default) keeps the concept out of Google so it never
// competes with the agency's real listing. Live mode is only run locally until launch day.
export type SiteMode = "demo" | "live";

export const SITE_MODE: SiteMode = process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";
export const IS_LIVE = SITE_MODE === "live";

// Falls back to Vercel's production domain (set automatically at build time), then to localhost.
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000";
export const SITE_URL = rawUrl.replace(/\/+$/, "");

export const absolute = (path = "/") => `${SITE_URL}${path === "/" ? "/" : path}`;
