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

  // Build alternates languages object for homepage
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${BASE_URL}${getLocalePath(locale)}`;
  }

  // Add homepage entry with alternates for multilingual SEO
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages,
    },
  });

  return entries;
}
