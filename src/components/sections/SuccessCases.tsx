import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function SuccessCases() {
  const t = useTranslations("SuccessCases");
  const regions: Array<{
    name: string;
    desc: string;
    wineries: string[];
  }> = t.raw("regions");

  return (
    <section
      id="cases"
      className="relative py-10 md:py-20 lg:py-28 bg-wine-dark scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="space-y-6 md:space-y-12">
          {regions.map((region, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-wine-red/30 to-wine-red/10 border border-champagne-gold/30 rounded-xl p-4 sm:p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <FaMapMarkerAlt className="text-3xl text-champagne-gold" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                  {region.name}
                </h3>
              </div>
              <p className="text-champagne-gold text-lg mb-4">{region.desc}</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {region.wineries.map((winery, j) => (
                  <div
                    key={j}
                    className="bg-wine-dark/50 rounded-lg p-4 text-center"
                  >
                    <p className="text-champagne-gold font-semibold text-sm">
                      {winery}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
