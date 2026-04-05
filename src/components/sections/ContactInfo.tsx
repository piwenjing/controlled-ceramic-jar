"use client";

import { useTranslations } from "next-intl";
import { FaHandshake, FaCopy, FaCheck } from "react-icons/fa6";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1.5 rounded-md bg-champagne-gold/20 hover:bg-champagne-gold/40 transition-colors"
      title={copied ? "已复制" : "复制"}
    >
      {copied ? (
        <FaCheck className="text-green-400 text-sm" />
      ) : (
        <FaCopy className="text-champagne-gold text-sm" />
      )}
    </button>
  );
}

export default function ContactInfo() {
  const t = useTranslations("Contact");
  const tLabels = useTranslations("ContactLabels");

  return (
    <section
      id="contact"
      className="relative py-10 md:py-20 lg:py-28 bg-gradient-to-b from-wine-red/20 to-wine-dark scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-champagne-gold/10 to-transparent border border-champagne-gold/30 rounded-2xl p-6 sm:p-8 md:p-12">
          <FaHandshake className="text-4xl md:text-5xl text-champagne-gold mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            {t("message")}
          </p>
          <p className="text-sm text-gray-400 italic mb-8">{t("messageEn")}</p>

          <div className="border-t border-champagne-gold/30 pt-8 mt-8">
            <h3 className="text-xl font-semibold text-champagne-gold mb-4">
              {t("company")}
            </h3>
            <p className="text-sm text-gray-400 mb-4">{t("address")}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-champagne-gold">{tLabels("email")}</span>
                <span>{t("email")}</span>
                <CopyButton text={t("email")} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-champagne-gold">{tLabels("wechat")}</span>
                <span>{t("wechat")}</span>
                <CopyButton text={t("wechat")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
