import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: "A family owned independent insurance agency in Cockeysville, MD, since 1974.",
    start_url: "/",
    display: "browser",
    background_color: "#F6F3EC",
    theme_color: "#F6F3EC",
    icons: [
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
