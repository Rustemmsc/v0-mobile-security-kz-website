"use client"

import { ArrowRight, RefreshCw, Percent, Shield } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function TradeInOffer() {
  const { t } = useTranslation()

  const tradeInWhatsAppUrl = `https://wa.me/77789755555?text=${encodeURIComponent(
    "Здравствуйте! Интересует программа Trade-In со скидкой 30% при обновлении системы видеонаблюдения.",
  )}`

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left side - Main offer */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-3">
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-semibold">{t("tradeIn.title")}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{t("tradeIn.subtitle")}</h2>

              <p className="text-lg text-white/90 mb-4">{t("tradeIn.description")}</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl md:text-7xl font-bold">30%</span>
                <span className="text-2xl font-semibold">{t("tradeIn.discount")}</span>
              </div>

              <a
                href={tradeInWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 inline-flex items-center gap-2 group shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {t("tradeIn.cta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right side - Benefits */}
            <div className="space-y-3">
              <a
                href={tradeInWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/40 hover:bg-white/25 hover:border-white/50 transition-all duration-300 block shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-1">{t("tradeIn.benefit1Title")}</h3>
                    <p className="text-white/80 text-sm">{t("tradeIn.benefit1Desc")}</p>
                  </div>
                </div>
              </a>

              <a
                href={tradeInWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/40 hover:bg-white/25 hover:border-white/50 transition-all duration-300 block shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Percent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-1">{t("tradeIn.benefit2Title")}</h3>
                    <p className="text-white/80 text-sm">{t("tradeIn.benefit2Desc")}</p>
                  </div>
                </div>
              </a>

              <a
                href={tradeInWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/40 hover:bg-white/25 hover:border-white/50 transition-all duration-300 block shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-1">{t("tradeIn.benefit3Title")}</h3>
                    <p className="text-white/80 text-sm">{t("tradeIn.benefit3Desc")}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
