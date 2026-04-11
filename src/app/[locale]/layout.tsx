import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cinzel, Playfair_Display, Lato } from "next/font/google";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateVideoJsonLd } from "@/lib/videos";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-lato", display: "swap" });
const fontVariables = `${cinzel.variable} ${playfair.variable} ${lato.variable}`;

const BASE_URL = "https://amphoraswine.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const meta = messages.Metadata;

  // Helper function to generate URL path based on localePrefix: "as-needed" strategy
  const getLocalePath = (loc: string) => {
    return loc === routing.defaultLocale ? "" : `/${loc}`;
  };

  // Build alternates with full URLs
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}${getLocalePath(loc)}`;
  }
  // Add x-default pointing to English (default)
  languages["x-default"] = BASE_URL;

  return {
    title: {
      default: meta.title,
      template: `%s | Amphoras Wine`,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}${getLocalePath(locale)}`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: locale,
      url: `${BASE_URL}${getLocalePath(locale)}`,
      siteName: "Amphoras Wine",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Helper function to generate URL path based on localePrefix: "as-needed" strategy
  const getLocalePath = (loc: string) => {
    return loc === routing.defaultLocale ? "" : `/${loc}`;
  };

  const pageUrl = `${BASE_URL}${getLocalePath(locale)}`;

  // Schema.org JSON-LD structured data - Organization
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Amphoras Wine",
    url: BASE_URL,
    description: (messages as { Metadata?: { description?: string } }).Metadata?.description || "Premium fermentation and aging ceramic amphoras for winemaking",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rongchang",
      addressRegion: "Chongqing",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "kvevri@163.com",
    },
    areaServed: "Worldwide",
  };

  // Schema.org JSON-LD structured data - VideoObject array
  const videoJsonLd = generateVideoJsonLd(locale as "en" | "zh" | "fr" | "es", pageUrl);

  return (
    <html lang={locale}>
      <body className={`${fontVariables} bg-wine-dark min-h-screen text-white font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
