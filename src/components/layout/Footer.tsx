import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const tContact = useTranslations("Contact");

  return (
    <footer className="bg-wine-dark border-t border-champagne-gold/10 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-6 md:gap-8 md:mb-8">
          <div>
            <h3 className="font-display text-champagne-gold text-lg mb-2">
              {t("brand")}
            </h3>
            <p className="text-sm text-gray-400">{t("tagline")}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">
              {t("quickLinks")}
            </h4>
            <div className="space-y-2">
              <a
                href="#technology"
                className="block text-sm text-gray-400 hover:text-champagne-gold transition-colors"
              >
                {t("links.technology")}
              </a>
              <a
                href="#products"
                className="block text-sm text-gray-400 hover:text-champagne-gold transition-colors"
              >
                {t("links.products")}
              </a>
              <a
                href="#cases"
                className="block text-sm text-gray-400 hover:text-champagne-gold transition-colors"
              >
                {t("links.cases")}
              </a>
              <a
                href="#contact"
                className="block text-sm text-gray-400 hover:text-champagne-gold transition-colors"
              >
                {t("links.contact")}
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">{t("contactLabel")}</h4>
            <div className="space-y-2">
              <div className="text-sm text-gray-400">
                <span className="text-champagne-gold">Email: </span>
                <span>{tContact("email")}</span>
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-champagne-gold">WeChat: </span>
                <span>{tContact("wechat")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-champagne-gold/10 pt-6 text-center text-xs text-gray-500">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
