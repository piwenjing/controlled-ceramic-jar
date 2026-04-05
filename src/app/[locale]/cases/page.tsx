import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://amphoraswine.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const casesMeta = messages.CasesMetadata;

  // Helper function to generate URL path based on localePrefix: "as-needed" strategy
  const getLocalePath = (loc: string) => {
    return loc === routing.defaultLocale ? "" : `/${loc}`;
  };

  return {
    title: casesMeta.title,
    description: casesMeta.description,
    alternates: {
      canonical: `${BASE_URL}${getLocalePath(locale)}/cases`,
    },
    openGraph: {
      title: casesMeta.title,
      description: casesMeta.description,
      type: "website",
      locale: locale,
      url: `${BASE_URL}${getLocalePath(locale)}/cases`,
    },
  };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="pt-20 bg-wine-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-champagne-gold hover:text-pale-gold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
          <div className="mt-12 text-center">
            <h1 className="text-3xl font-display text-champagne-gold">Cases</h1>
            <p className="text-gray-400 mt-4">Content moved to homepage</p>
          </div>
        </div>
      </div>
    </>
  );
}
