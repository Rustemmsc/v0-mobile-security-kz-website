"use client"

import { Shield, Award, Headphones, Wrench, Building2, CreditCard } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function Benefits() {
  const { t } = useTranslation()

  const benefits = [
    {
      icon: Shield,
      title: t("benefits.experience"),
      description: t("benefits.experienceDesc"),
    },
    {
      icon: Award,
      title: t("benefits.warranty"),
      description: t("benefits.warrantyDesc"),
    },
    {
      icon: Headphones,
      title: t("benefits.support"),
      description: t("benefits.supportDesc"),
    },
    {
      icon: Wrench,
      title: t("benefits.certified"),
      description: t("benefits.certifiedDesc"),
    },
    {
      icon: Building2,
      title: t("benefits.officialDealers"),
      description: t("benefits.officialDealersDesc"),
    },
    {
      icon: CreditCard,
      title: t("benefits.flexiblePayment"),
      description: t("benefits.flexiblePaymentDesc"),
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("benefits.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("benefits.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold pt-2 text-foreground">{benefit.title}</h3>
              </div>
              <p className="text-foreground/70 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
