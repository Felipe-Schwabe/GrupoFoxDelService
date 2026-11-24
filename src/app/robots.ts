import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!business.indexable) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    ...(business.canonicalUrl ? { sitemap: `${business.canonicalUrl.replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}
