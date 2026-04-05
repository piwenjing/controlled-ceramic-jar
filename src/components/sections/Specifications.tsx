import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaJar, FaStar, FaCircleCheck } from "react-icons/fa6";

export default function Specifications() {
  const t = useTranslations("Specifications");
  const nonTempFeatures: string[] = t.raw("nonTemp.features");
  const withTempFeatures: string[] = t.raw("withTemp.features");
  const capacities: Array<{ size: string; desc: string }> =
    t.raw("capacities");

  return (
    <section className="relative py-10 md:py-20 lg:py-28 bg-wine-dark scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Non-temp controlled */}
          <div className="bg-gradient-to-br from-wine-red/30 to-wine-red/10 border border-champagne-gold/20 rounded-xl p-4 sm:p-6 md:p-8 hover:border-champagne-gold/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <FaJar className="text-3xl text-pale-gold" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white">
                {t("nonTemp.title")}
              </h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              {nonTempFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaCircleCheck className="text-champagne-gold" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With temp controlled */}
          <div className="bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 border border-champagne-gold/50 rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-lg hover:shadow-champagne-gold/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <FaJar className="text-3xl text-champagne-gold" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-champagne-gold">
                {t("withTemp.title")}
              </h3>
            </div>
            <ul className="space-y-3 text-gray-200">
              {withTempFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaStar className="text-champagne-gold" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Capacity selection */}
        <div className="mt-12 bg-wine-red/20 border border-champagne-gold/30 rounded-xl p-4 sm:p-6 md:p-8">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-champagne-gold mb-6 text-center">
            {t("capacityTitle")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 text-center">
            {capacities.map((cap, i) => (
              <div key={i} className="bg-wine-dark/50 rounded-lg p-4 sm:p-6">
                <p className="text-2xl md:text-3xl font-bold text-champagne-gold mb-2">
                  {cap.size}
                </p>
                <p className="text-sm text-gray-400">{cap.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-6 text-sm">
            {t("capacityNote")}
          </p>
        </div>
      </div>
    </section>
  );
}
