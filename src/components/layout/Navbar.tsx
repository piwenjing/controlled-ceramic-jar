"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { key: "technology", href: "#technology" },
  { key: "cases", href: "#cases" },
  { key: "story", href: "#story" },
  { key: "advantages", href: "#advantages" },
  { key: "products", href: "#products" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Helper to determine if link is external/page link
  const isPageLink = (href: string) => href.startsWith("/");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-wine-dark/80 backdrop-blur-md border-b border-champagne-gold/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-champagne-gold text-lg tracking-wider"
        >
          {t("brand")}
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            isPageLink(link.href) ? (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm transition-colors tracking-wide ${
                  pathname === link.href
                    ? "text-champagne-gold"
                    : "text-gray-300 hover:text-champagne-gold"
                }`}
              >
                {t(link.key)}
              </Link>
            ) : (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-gray-300 hover:text-champagne-gold transition-colors tracking-wide"
              >
                {t(link.key)}
              </a>
            )
          )}
          <LanguageSwitcher />
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-champagne-gold text-xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-wine-dark/95 backdrop-blur-md border-t border-champagne-gold/10 px-6 py-4 space-y-3">
          {navLinks.map((link) =>
            isPageLink(link.href) ? (
              <Link
                key={link.key}
                href={link.href}
                className={`block transition-colors py-2 ${
                  pathname === link.href
                    ? "text-champagne-gold"
                    : "text-gray-300 hover:text-champagne-gold"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
            ) : (
              <a
                key={link.key}
                href={link.href}
                className="block text-gray-300 hover:text-champagne-gold transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </a>
            )
          )}
          <div className="pt-2 border-t border-champagne-gold/10">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
