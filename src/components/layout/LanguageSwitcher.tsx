"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
  zh: "中",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  function onChange(newLocale: string) {
    // Replace locale in pathname
    const currentLocale = locale;
    let newPath = pathname;
    
    if (pathname.startsWith(`/${currentLocale}`)) {
      newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    } else if (currentLocale === routing.defaultLocale) {
      // Currently on default locale without prefix
      newPath = `/${newLocale}${pathname}`;
    } else {
      newPath = `/${newLocale}${pathname}`;
    }
    
    window.location.href = newPath;
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => onChange(loc)}
          className={`px-3 py-2 text-sm sm:px-2 sm:py-1 sm:text-xs rounded transition-colors ${
            locale === loc
              ? "bg-champagne-gold text-wine-dark font-bold"
              : "text-gray-400 hover:text-champagne-gold"
          }`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
