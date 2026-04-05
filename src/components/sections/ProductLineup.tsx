import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import {
  FaSnowflake,
  FaWater,
} from "react-icons/fa";

export default function ProductLineup() {
  const t = useTranslations("ProductLineup");
  const locale = useLocale();

  const gen2Features: Array<{ title: string; desc: string }> =
    t.raw("gen2.features");
  const priceItems: string[] = t.raw("priceNotes.items");

  // 非中文版本使用新的图片链接
  const gen2Image = locale === "zh" 
    ? images.products.gen2 
    : "https://ceramic-jar.oss-ap-southeast-1.aliyuncs.com/medio/%E9%99%B6%E7%BD%90%E7%BB%93%E6%9E%84%E5%9B%BE.png";

  return (
    <section
      id="products"
      className="relative py-10 md:py-20 lg:py-28 bg-gradient-to-b from-wine-red/20 to-wine-dark scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="space-y-6 md:space-y-12">
          {/* Gen 2 - Only product displayed */}
          <div className="bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 border border-champagne-gold/50 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-champagne-gold/30 to-transparent p-4 md:p-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2">
                {t("gen2.name")}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 p-4 sm:gap-6 sm:p-6 md:gap-8 md:p-8 items-center">
              <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-champagne-gold/30 bg-wine-dark/30">
                <img
                  src={gen2Image}
                  alt={t("gen2.name")}
                  className="w-full h-56 sm:h-72 md:h-96 object-contain"
                />
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="bg-wine-dark/50 rounded-lg p-4">
                    <p className="text-gray-300 mb-2">
                      {t("gen2.basic.label")}
                    </p>
                    <p className="text-champagne-gold text-2xl font-bold">
                      {t("gen2.basic.price")}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {t("gen2.basic.desc")}
                    </p>
                  </div>
                  <div className="bg-wine-dark/50 rounded-lg p-4 border-2 border-champagne-gold">
                    <p className="text-gray-300 mb-2">
                      {t("gen2.premium.label")}{" "}
                      <span className="text-xs bg-champagne-gold text-wine-dark px-2 py-1 rounded">
                        {t("gen2.premium.tag")}
                      </span>
                    </p>
                    <p className="text-champagne-gold text-2xl font-bold">
                      {t("gen2.premium.price")}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {t("gen2.premium.desc")}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {gen2Features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {i === 0 ? (
                        <FaSnowflake className="text-champagne-gold text-lg" />
                      ) : (
                        <FaWater className="text-champagne-gold text-lg" />
                      )}
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">
                          {f.title}
                        </h4>
                        <p className="text-gray-400 text-xs">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Notes */}
        <div className="mt-12 bg-wine-red/20 border border-champagne-gold/30 rounded-xl p-4 sm:p-6 md:p-8">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-champagne-gold mb-4 text-center">
            {t("priceNotes.title")}
          </h4>
          <ul className="space-y-3 text-gray-300 max-w-3xl mx-auto">
            {priceItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-champagne-gold mt-1">&#9432;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
