import { useTranslations } from "next-intl";
import { FaTriangleExclamation, FaStar } from "react-icons/fa6";

export default function ComparisonSection() {
  const t = useTranslations("Comparison");
  const tradItems: string[] = t.raw("traditional.items");
  const ourItems: string[] = t.raw("ours.items");

  return (
    <section className="relative py-10 md:py-20 lg:py-28 bg-wine-dark scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Traditional limitations */}
          <div className="bg-gradient-to-br from-wine-red/30 to-wine-red/10 border border-red-900/30 rounded-xl p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <FaTriangleExclamation className="text-3xl text-red-400" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                {t("traditional.title")}
              </h2>
            </div>
            <ul className="space-y-4 text-gray-300">
              {tradItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 flex-shrink-0">&#10006;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our advantages */}
          <div className="bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 border border-champagne-gold/30 rounded-xl p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <FaStar className="text-3xl text-champagne-gold" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-champagne-gold">
                {t("ours.title")}
              </h2>
            </div>
            <ul className="space-y-4 text-gray-200">
              {ourItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-champagne-gold mt-1 flex-shrink-0">&#10004;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
