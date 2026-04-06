import { useTranslations } from "next-intl";
import { images } from "@/lib/images";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={images.hero.background}
          alt="Amphora background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-wine-dark/70 via-wine-dark/60 to-wine-dark/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-wine-dark/50 via-transparent to-wine-dark/50" />
      <div className="absolute inset-0 texture-overlay opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 text-center">
        <div className="mb-8 animate-fade-in-up">
          <span className="text-champagne-gold text-sm tracking-[0.3em] uppercase font-sans">
            {t("tagline")}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in-up animate-delay-300">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-pale-gold/90 font-serif italic mb-8 animate-fade-in-up animate-delay-600">
          {t("subtitle")}
        </p>
        <div className="flex items-center justify-center gap-4 text-gray-300 animate-fade-in-up animate-delay-900">
          <div className="h-[1px] w-16 bg-champagne-gold/50" />
          <p className="text-sm tracking-wider">{t("divider")}</p>
          <div className="h-[1px] w-16 bg-champagne-gold/50" />
        </div>
        <div className="mt-6 md:mt-10 animate-fade-in-up animate-delay-900 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#products"
            className="inline-block bg-champagne-gold hover:bg-pale-gold text-wine-dark px-6 py-3 md:px-8 rounded-full font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-champagne-gold/20"
          >
            {t("cta")}
          </a>
          <a
            href="#story"
            className="inline-block border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-wine-dark px-6 py-3 md:px-8 rounded-full font-semibold tracking-wide transition-all duration-300"
          >
            {t("history")}
          </a>
        </div>
      </div>
    </section>
  );
}
