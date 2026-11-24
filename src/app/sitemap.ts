import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!business.canonicalUrl || !business.indexable) return [];

  return [
    {
      url: business.canonicalUrl.replace(/\/$/, ""),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
