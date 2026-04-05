"use client";

import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";

export default function InquiryForm() {
  const t = useTranslations("InquiryForm");
  const productOptions: string[] = t.raw("productOptions");

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);

    // Check honeypot
    if (formData.get("_hp")) {
      setStatus("success");
      return;
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      country: formData.get("country"),
      products: formData.getAll("products"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="inquiry"
      className="relative py-10 md:py-20 lg:py-28 bg-gradient-to-b from-wine-dark to-wine-red/20 scroll-mt-16"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-champagne-gold mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-300 text-base md:text-lg">{t("subtitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-wine-red/20 border border-champagne-gold/30 rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="_hp"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {t("name")} *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-wine-dark/50 border border-champagne-gold/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-champagne-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {t("email")} *
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-wine-dark/50 border border-champagne-gold/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-champagne-gold focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {t("company")}
              </label>
              <input
                type="text"
                name="company"
                className="w-full bg-wine-dark/50 border border-champagne-gold/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-champagne-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {t("country")}
              </label>
              <input
                type="text"
                name="country"
                className="w-full bg-wine-dark/50 border border-champagne-gold/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-champagne-gold focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t("product")}
            </label>
            <div className="flex flex-wrap gap-3">
              {productOptions.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 bg-wine-dark/50 border border-champagne-gold/20 rounded-lg px-3 py-2 cursor-pointer hover:border-champagne-gold/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    name="products"
                    value={opt}
                    className="accent-champagne-gold"
                  />
                  <span className="text-sm text-gray-300">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t("message")}
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder={t("messagePlaceholder")}
              className="w-full bg-wine-dark/50 border border-champagne-gold/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-champagne-gold focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-champagne-gold hover:bg-pale-gold text-wine-dark py-3 rounded-lg font-semibold tracking-wide transition-all duration-300 disabled:opacity-50"
          >
            {status === "sending" ? t("sending") : t("submit")}
          </button>

          {status === "success" && (
            <p className="text-center text-green-400 text-sm">{t("success")}</p>
          )}
          {status === "error" && (
            <p className="text-center text-red-400 text-sm">{t("error")}</p>
          )}
        </form>
      </div>
    </section>
  );
}
