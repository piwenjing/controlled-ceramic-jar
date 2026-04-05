import { routing } from "@/i18n/routing";
import { MetadataRoute } from "next";

const BASE_URL = "https://amphoraswine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Helper function to generate URL based on localePrefix: "as-needed" strategy
  // English (default locale) has no prefix, other locales have /{locale} prefix
  const getLocalePath = (locale: string) => {
    return locale === routing.defaultLocale ? "" : `/${locale}`;
  };

  // Add homepage entries for all locales
  for (const locale of routing.locales) {
    entries.push({
      url: `${BASE_URL}${getLocalePath(locale)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
  }

  // Add /cases page entries for all locales
  for (const locale of routing.locales) {
    entries.push({
      url: `${BASE_URL}${getLocalePath(locale)}/cases`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
