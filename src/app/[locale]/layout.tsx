import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cinzel, Playfair_Display, Lato } from "next/font/google";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateVideoJsonLd } from "@/lib/videos";
import { images } from "@/lib/images";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-lato", display: "swap" });
const fontVariables = `${cinzel.variable} ${playfair.variable} ${lato.variable}`;

const BASE_URL = "https://amphoraswine.com";

// Shared OG image — uses the hero background already on OSS. 1200×630 fallback,
// Google will fetch and crop to its preferred aspect ratio at share time.
const OG_IMAGE_URL = images.hero.background;

// Map app locale → BCP 47 locale tag (OpenGraph requires ISO 639-1 + country)
const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  zh: "zh_CN",
  es: "es_ES",
  fr: "fr_FR",
};

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
  // x-default should always point to the default locale (no prefix)
  languages["x-default"] = BASE_URL;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: meta.title,
      template: `%s | Chengjing Ceramics`,
    },
    description: meta.description,
    keywords: meta.keywords,
    applicationName: "Chengjing Ceramics",
    authors: [{ name: "Chengjing Ceramics Co., Ltd." }],
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `${BASE_URL}${getLocalePath(locale)}`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE_MAP[locale] || "en_US",
      url: `${BASE_URL}${getLocalePath(locale)}`,
      siteName: "Chengjing Ceramics",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "Chengjing Ceramics — Handcrafted ceramic amphoras for premium winemaking",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE_URL],
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

  // ─────────────────────────────────────────────────────────────────────
  // Schema.org JSON-LD — WebSite (with SearchAction for sitelinks search)
  // ─────────────────────────────────────────────────────────────────────
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}#website`,
    url: BASE_URL,
    name: "Chengjing Ceramics",
    description: (messages as { Metadata?: { description?: string } }).Metadata?.description,
    inLanguage: locale,
    publisher: { "@id": `${BASE_URL}#organization` },
  };

  // ─────────────────────────────────────────────────────────────────────
  // Schema.org JSON-LD — Organization
  // ─────────────────────────────────────────────────────────────────────
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    name: "Chengjing Ceramics",
    alternateName: "Chengjing Ceramics Co., Ltd.",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
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

  // ─────────────────────────────────────────────────────────────────────
  // Schema.org JSON-LD — Product (flagship Gen 2 amphora for rich snippets)
  // Two offers (Basic + Premium) at the same product page.
  // ─────────────────────────────────────────────────────────────────────
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}#product-gen2`,
    name: "Gen 2 — Temperature Controlled Ceramic Amphora",
    description:
      "Professional ceramic amphora with precision temperature control for fermentation and aging. 1000L standard, handcrafted in Rongchang, China.",
    image: [
      OG_IMAGE_URL,
      "https://ligeyuanshan-taoguan.oss-ap-southeast-1.aliyuncs.com/jar/attach/%E6%9C%AA%E5%91%BD%E5%90%8D.webp",
    ],
    brand: { "@type": "Brand", name: "Chengjing Ceramics" },
    manufacturer: { "@id": `${BASE_URL}#organization` },
    category: "Winemaking Equipment > Fermentation & Aging > Ceramic Amphora",
    sku: "AMPHORA-GEN2-1000L",
    offers: [
      {
        "@type": "Offer",
        name: "Gen 2 Basic",
        price: "2100",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: BASE_URL,
        seller: { "@id": `${BASE_URL}#organization` },
        itemOffered: {
          "@type": "Product",
          name: "Gen 2 — Basic (manual temperature control)",
        },
      },
      {
        "@type": "Offer",
        name: "Gen 2 Premium (Recommended)",
        price: "3100",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: BASE_URL,
        seller: { "@id": `${BASE_URL}#organization` },
        itemOffered: {
          "@type": "Product",
          name: "Gen 2 — Premium (automatic temperature control)",
        },
      },
    ],
  };

  // ─────────────────────────────────────────────────────────────────────
  // Schema.org JSON-LD — VideoObject array (existing)
  // ─────────────────────────────────────────────────────────────────────
  const videoJsonLd = generateVideoJsonLd(locale as "en", pageUrl);

  return (
    <html lang={locale}>
      <body className={`${fontVariables} bg-wine-dark min-h-screen text-white font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
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
