import { useTranslations } from "next-intl";
import { FaFire, FaHandSparkles, FaLeaf } from "react-icons/fa6";

const craftIcons = [FaFire, FaHandSparkles, FaLeaf];

export default function CraftsmanshipSection() {
  const t = useTranslations("Craftsmanship");
  const paragraphs: string[] = t.raw("paragraphs");
  const features: Array<{ title: string; desc: string }> = t.raw("features");

  return (
    <section className="relative py-10 md:py-20 lg:py-28 bg-gradient-to-b from-wine-red/20 to-wine-dark scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-champagne-gold mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-300 text-base md:text-lg font-serif italic mb-6">
            {t("subtitle")}
          </p>
          <div className="max-w-3xl mx-auto text-gray-300 leading-relaxed space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 md:mt-12">
          {features.map((feat, i) => {
            const Icon = craftIcons[i];
            return (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-4xl text-champagne-gold" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {feat.title}
                </h4>
                <p className="text-gray-400 text-sm">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
