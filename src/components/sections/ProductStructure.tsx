import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import {
  FaTemperatureHalf,
  FaDroplet,
  FaWind,
} from "react-icons/fa6";

const icons = [FaTemperatureHalf, FaDroplet, FaWind];
const keys = ["temperature", "sampling", "gas"] as const;

export default function ProductStructure() {
  const t = useTranslations("ProductStructure");
  const locale = useLocale() as "zh" | "en" | "fr" | "es";

  // Get diagram images based on locale (default to English)
  const diagram1 = images.structure.diagram1[locale] || images.structure.diagram1.en;
  const diagram2 = images.structure.diagram2[locale] || images.structure.diagram2.en;

  return (
    <section
      id="technology"
      className="relative py-10 md:py-20 lg:py-28 bg-gradient-to-b from-wine-dark to-wine-red/20 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Left: images */}
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-champagne-gold/30">
              <img
                src={diagram1}
                alt="Wine ceramic vessel temperature control system with digital gauge"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-champagne-gold/30">
              <img
                src={diagram2}
                alt="Ceramic vessel sampling valve and gas control system for fermentation"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right: features */}
          <div className="space-y-6">
            {keys.map((key, i) => {
              const Icon = icons[i];
              const items: string[] = t.raw(`${key}.items`);
              return (
                <div
                  key={key}
                  className="bg-wine-red/30 backdrop-blur-md border border-champagne-gold/30 rounded-xl p-4 sm:p-6 hover:border-champagne-gold/60 hover:bg-wine-red/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-champagne-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="text-3xl text-champagne-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">
                        {t(`${key}.title`)}
                      </h3>
                      <ul className="text-base text-gray-300 space-y-2">
                        {items.map((item: string, j: number) => (
                          <li key={j} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
