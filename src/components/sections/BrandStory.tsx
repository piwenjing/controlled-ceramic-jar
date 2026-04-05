import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import {
  FaIndustry,
  FaFlask,
  FaShieldHalved,
  FaWind,
} from "react-icons/fa6";

const featureIcons = [FaIndustry, FaFlask, FaShieldHalved, FaWind];

export default function BrandStory() {
  const t = useTranslations("BrandStory");
  const features: Array<{ title: string; desc: string }> = t.raw("features");

  return (
    <section
      id="story"
      className="relative py-10 md:py-20 lg:py-28 bg-wine-dark scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <p className="text-sm text-gray-400 text-center -mt-8 mb-8 md:-mt-12 md:mb-16">
          {t("regions")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={i}
                className="bg-gradient-to-br from-wine-red/30 to-wine-red/10 border border-champagne-gold/20 rounded-xl p-4 sm:p-6 text-center hover:border-champagne-gold/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-3xl text-champagne-gold" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Craftsmanship images */}
        <div className="mt-8 md:mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-champagne-gold mb-2">
              {t("craftsmanship.title")}
            </h3>
            <p className="text-gray-400 text-sm">
              {t("craftsmanship.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-champagne-gold/30 group">
              <img
                src={images.craftsmanship.process1}
                alt="Traditional ceramic wine vessel handcrafting process showing clay molding techniques"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-champagne-gold/30 group">
              <img
                src={images.craftsmanship.process2}
                alt="Artisan finishing ceramic wine vessel with detailed surface craftsmanship"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
