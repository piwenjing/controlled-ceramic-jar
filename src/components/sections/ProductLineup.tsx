"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import {
  FaSnowflake,
  FaWater,
  FaShieldHalved,
  FaTruckFast,
  FaHeadset,
  FaCheck,
} from "react-icons/fa6";
import { FaSearchPlus, FaTimes } from "react-icons/fa";

export default function ProductLineup() {
  const t = useTranslations("ProductLineup");
  const locale = useLocale();

  const gen2Features: Array<{ title: string; desc: string }> =
    t.raw("gen2.features");
  const priceItems: string[] = t.raw("priceNotes.items");

  // 非中文版本使用新的图片链接
  const gen2Image = locale === "zh"
    ? images.products.gen2
    : "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/%E6%9C%AA%E5%91%BD%E5%90%8D.webp";

  // 灯箱(点击图片放大)
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ESC 关闭 + 锁定背景滚动
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <section
      id="products"
      className="relative py-6 md:py-20 lg:py-28 bg-gradient-to-b from-wine-red/20 to-wine-dark scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {/* Gen 2 Flagship Showcase */}
        <div className="relative bg-gradient-to-br from-champagne-gold/15 via-wine-dark/40 to-champagne-gold/10 border border-champagne-gold/40 rounded-3xl overflow-hidden shadow-2xl">
          {/* Decorative glow blob — hidden on mobile to save layout space */}
          <div
            className="hidden md:block absolute -top-32 -right-32 w-80 h-80 bg-champagne-gold/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="hidden md:block absolute -bottom-32 -left-32 w-80 h-80 bg-wine-red/30 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Top header */}
          <div className="relative flex items-start justify-between gap-3 p-4 sm:p-6 md:p-8 border-b border-champagne-gold/20">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-champagne-gold text-wine-dark text-[10px] sm:text-xs font-bold tracking-widest rounded-full mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 bg-wine-dark rounded-full animate-pulse" />
                FLAGSHIP · GEN 2
              </span>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                {t("gen2.name")}
              </h3>
              <p className="text-champagne-gold/80 text-xs sm:text-base mt-1">
                Standard 1000L · Precision Temperature Control
              </p>
            </div>
            {/* Capacity badge */}
            <div className="hidden sm:flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-champagne-gold/50 bg-wine-dark/60 flex-shrink-0">
              <span className="text-2xl md:text-3xl font-display font-bold text-champagne-gold leading-none">
                1000
              </span>
              <span className="text-xs text-champagne-gold/70 mt-0.5">LITERS</span>
            </div>
          </div>

          {/* Body: image + content */}
          <div className="relative grid md:grid-cols-12 gap-4 md:gap-10 p-4 sm:p-6 md:p-8 items-center">
            {/* Left: image (col-span-5) */}
            <div className="md:col-span-5 flex flex-col items-center">
              {/* Mobile: image fills width. Desktop: limited height with aspect-ratio container. */}
              <div
                className="relative w-full md:max-w-md rounded-2xl overflow-hidden border-2 border-champagne-gold/30 bg-gradient-to-b from-wine-dark/60 to-wine-dark p-3 md:p-4 shadow-xl group"
              >
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="block w-full cursor-zoom-in"
                  aria-label="Click to enlarge product image"
                >
                  {/* Mobile: aspect-ratio box, img fills & object-contain (full width, natural height) */}
                  {/* Desktop: max-height capped, img centered */}
                  <div
                    className="relative w-full mx-auto"
                    style={{
                      aspectRatio: "1105 / 1920",
                      maxHeight: "min(75vh, 520px)",
                    }}
                  >
                    <img
                      src={gen2Image}
                      alt={t("gen2.name")}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors pointer-events-none">
                      <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaSearchPlus /> Click to enlarge
                      </span>
                      <span className="sm:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px]">
                        <FaSearchPlus className="text-xs" /> Tap
                      </span>
                    </span>
                  </div>
                </button>
              </div>
              <p className="hidden sm:block text-xs text-gray-500 mt-3 italic">
                Tap image to view in full detail
              </p>
            </div>

            {/* Right: pricing + features (col-span-7) */}
            <div className="md:col-span-7 space-y-5 md:space-y-6">
              {/* Pricing tiers — side-by-side comparison */}
              <div>
                <h4 className="text-[10px] sm:text-sm uppercase tracking-widest text-champagne-gold/70 font-semibold mb-2 sm:mb-3">
                  Choose Your Configuration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Basic */}
                  <div className="relative bg-wine-dark/50 border border-champagne-gold/20 rounded-xl p-3.5 sm:p-5 hover:border-champagne-gold/50 transition-colors">
                    <div className="flex items-baseline justify-between mb-1.5 sm:mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-gray-300">
                        {t("gen2.basic.label")}
                      </span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-display font-bold text-champagne-gold mb-2 sm:mb-3">
                      {t("gen2.basic.price")}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {t("gen2.basic.desc")}
                    </p>
                  </div>

                  {/* Premium (highlighted) */}
                  <div className="relative bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 border-2 border-champagne-gold rounded-xl p-3.5 sm:p-5 shadow-lg">
                    <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-champagne-gold text-wine-dark text-[10px] sm:text-xs font-bold rounded-full">
                      {t("gen2.premium.tag")}
                    </span>
                    <div className="flex items-baseline justify-between mb-1.5 sm:mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {t("gen2.premium.label")}
                      </span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 sm:mb-3">
                      {t("gen2.premium.price")}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                      {t("gen2.premium.desc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-[10px] sm:text-sm uppercase tracking-widest text-champagne-gold/70 font-semibold mb-2 sm:mb-3">
                  Built-In Highlights
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {gen2Features.map((f, i) => {
                    const Icon = i === 0 ? FaSnowflake : FaWater;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-wine-dark/40 rounded-lg border border-champagne-gold/15 hover:border-champagne-gold/40 transition-colors"
                      >
                        <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-champagne-gold/15 flex items-center justify-center">
                          <Icon className="text-champagne-gold text-xs sm:text-sm" />
                        </span>
                        <div className="min-w-0">
                          <h5 className="text-white font-semibold text-xs sm:text-sm">
                            {f.title}
                          </h5>
                          <p className="text-gray-400 text-[11px] sm:text-xs">
                            {f.desc}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Trust strip — desktop only, mobile saves vertical space */}
              <div className="hidden sm:flex flex-wrap gap-x-6 gap-y-2 pt-3 border-t border-champagne-gold/20">
                <span className="flex items-center gap-2 text-xs text-gray-300">
                  <FaShieldHalved className="text-champagne-gold" />
                  1-Year Warranty
                </span>
                <span className="flex items-center gap-2 text-xs text-gray-300">
                  <FaTruckFast className="text-champagne-gold" />
                  Shipping Included
                </span>
                <span className="flex items-center gap-2 text-xs text-gray-300">
                  <FaHeadset className="text-champagne-gold" />
                  Lifetime Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Notes — compacted mobile */}
        <div className="mt-6 md:mt-10 bg-wine-red/20 border border-champagne-gold/30 rounded-xl p-3 sm:p-6 md:p-8">
          <h4 className="text-base sm:text-xl md:text-2xl font-semibold text-champagne-gold mb-3 md:mb-4 text-center">
            {t("priceNotes.title")}
          </h4>
          <ul className="space-y-2 md:space-y-3 text-gray-300 max-w-3xl mx-auto text-xs sm:text-sm">
            {priceItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <FaCheck className="text-champagne-gold mt-0.5 flex-shrink-0 text-xs sm:text-base" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lightbox — 点击放大 */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Product image preview"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Big image */}
          <div
            className="relative max-w-5xl max-h-[90vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gen2Image}
              alt={t("gen2.name")}
              className="w-full h-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-center text-white/70 text-sm mt-3">
              {t("gen2.name")} · Press ESC or click outside to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
