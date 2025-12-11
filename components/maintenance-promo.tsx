"use client"

import { Button } from "@/components/ui/button"
import { Gift, CheckCircle2, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function MaintenancePromo() {
  const { t } = useTranslation()

  const openWhatsApp = () => {
    const phone = "77789755555"
    const message = encodeURIComponent(t("whatsapp.maintenanceMessage"))
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  const includedFeatures = [
    t("maintenancePromo.included1"),
    t("maintenancePromo.included2"),
    t("maintenancePromo.included3"),
    t("maintenancePromo.included4"),
    t("maintenancePromo.included5"),
    t("maintenancePromo.included6"),
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t("maintenancePromo.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("maintenancePromo.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-card border border-primary/20 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{t("maintenancePromo.promoTitle")}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary-foreground">1</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{t("maintenancePromo.gift")}</p>
                    <p className="text-sm text-muted-foreground">{t("maintenancePromo.freeDiagnostics")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary-foreground">2</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{t("maintenancePromo.gift")}</p>
                    <p className="text-sm text-muted-foreground">{t("maintenancePromo.freeRepair")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary-foreground">3</span>
                  </div>
                  <div>
                    <p className="font-semibold">{t("maintenancePromo.discount")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">{t("maintenancePromo.includedTitle")}</h3>
              <div className="space-y-3">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button onClick={openWhatsApp} size="lg" className="w-full mt-8 group">
                {t("maintenancePromo.cta")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
