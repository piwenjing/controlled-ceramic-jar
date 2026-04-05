"use client";

import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Navbar");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-champagne-gold mb-4">
          404
        </h1>
        <p className="text-gray-300 mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block bg-champagne-gold hover:bg-pale-gold text-wine-dark px-6 py-3 rounded-full font-semibold transition-all duration-300"
        >
          {t("brand")}
        </a>
      </div>
    </div>
  );
}
