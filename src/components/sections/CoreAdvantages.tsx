import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { FaCertificate, FaUsers, FaJar, FaArrowsRotate } from "react-icons/fa6";

const serviceIcons = [FaUsers, FaJar, FaArrowsRotate];

export default function CoreAdvantages() {
  const t = useTranslations("CoreAdvantages");
  const items: Array<{ title: string; desc: string }> = t.raw("items");
  const services: Array<{ title: string; desc: string }> = t.raw("services");

  return (
    <section
      id="advantages"
      className="relative py-10 md:py-20 lg:py-28 bg-gradient-to-b from-wine-red/20 to-wine-dark scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {/* Advantages grid with background */}
        <div className="relative grid md:grid-cols-2 gap-4 mb-6 md:gap-8 md:mb-12 rounded-3xl overflow-hidden border-2 border-champagne-gold/40">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src={images.advantages.img1}
              alt=""
              className="w-full h-full object-cover opacity-15"
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url('${images.advantages.img3}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          {items.map((item, i) => (
            <div
              key={i}
              className="relative z-10 bg-wine-red/30 backdrop-blur-sm border border-champagne-gold/30 rounded-xl p-4 m-2 sm:p-6 sm:m-3 md:p-8 md:m-4 hover:bg-wine-red/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-champagne-gold text-wine-dark rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-champagne-gold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Showcase: No Leak */}
        <div className="mt-8 md:mt-16">
          <div className="text-center mb-6 md:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-champagne-gold mb-2">
              {t("showcase.title")}
            </h3>
            <p className="text-gray-400 text-sm">{t("showcase.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-champagne-gold/30 group">
              <img
                src={images.advantages.img1}
                alt="Professional ceramic amphora construction ensuring zero-leak performance with precise sealing technology"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 border border-champagne-gold/50 rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="mb-4 text-center">
                <FaCertificate className="text-5xl text-champagne-gold mx-auto" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-4 text-center">
                {t("noLeak.emphasis")}
              </h3>
              <p className="text-gray-300 leading-relaxed text-center">
                {t("noLeak.desc")}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-champagne-gold/30 group">
              <img
                src={images.advantages.img2}
                alt="High-quality ceramic wine amphora showcasing superior craftsmanship and durability"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-4 mt-6 md:gap-6 md:mt-12">
          {services.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-4xl text-champagne-gold" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
