import type { Metadata } from "next";
import { business } from "./business";

// Page metadata replaces the layout's openGraph and twitter objects instead of merging them,
// so every page builds both from here to keep the link preview image and card type.
const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "The Kaifer Insurance Group. We work for you. The KIG team at the Chili 8 cook-off.",
};

export function social(url: string, title: string, description: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: "en_US",
      url,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: "@KaiferIns",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
