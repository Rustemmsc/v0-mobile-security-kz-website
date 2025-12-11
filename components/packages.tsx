"use client"

import { Button } from "@/components/ui/button"
import { Check, Star, Zap } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function Packages() {
  const { t } = useTranslation()

  const packages = [
    {
      name: t("packages.express"),
      description: t("packages.expressDesc"),
      price: "50 000",
      popular: false,
      express: true,
      features: [
        t("packages.expressFeature1"),
        t("packages.expressFeature2"),
        t("packages.expressFeature3"),
        t("packages.expressFeature4"),
        t("packages.expressFeature5"),
        t("packages.expressFeature6"),
        t("packages.expressFeature7"),
      ],
    },
    {
      name: t("packages.basic"),
      description: t("packages.basicDesc"),
      price: "250 000",
      popular: false,
      features: [
        t("packages.basicFeature1"),
        t("packages.basicFeature2"),
        t("packages.basicFeature3"),
        t("packages.basicFeature4"),
        t("packages.basicFeature5"),
        t("packages.basicFeature6"),
      ],
    },
    {
      name: t("packages.professional"),
      description: t("packages.professionalDesc"),
      price: "550 000",
      popular: true,
      features: [
        t("packages.professionalFeature1"),
        t("packages.professionalFeature2"),
        t("packages.professionalFeature3"),
        t("packages.professionalFeature4"),
        t("packages.professionalFeature5"),
        t("packages.professionalFeature6"),
        t("packages.professionalFeature7"),
        t("packages.professionalFeature8"),
      ],
    },
    {
      name: t("packages.corporate"),
      description: t("packages.corporateDesc"),
      price: "1 200 000",
      popular: false,
      features: [
        t("packages.corporateFeature1"),
        t("packages.corporateFeature2"),
        t("packages.corporateFeature3"),
        t("packages.corporateFeature4"),
        t("packages.corporateFeature5"),
        t("packages.corporateFeature6"),
        t("packages.corporateFeature7"),
        t("packages.corporateFeature8"),
        t("packages.corporateFeature9"),
        t("packages.corporateFeature10"),
      ],
    },
  ]

  const handlePackageOrder = (packageName: string, price: string) => {
    const message = `Здравствуйте! Хочу заказать пакет "${packageName}" (${price} тенге). Прошу связаться со мной для уточнения деталей.`
    const whatsappUrl = `https://wa.me/77789755555?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCustomOrder = () => {
    const message = `Здравствуйте! Интересует индивидуальное решение по видеонаблюдению. Прошу связаться со мной для консультации.`
    const whatsappUrl = `https://wa.me/77789755555?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="packages" className="py-12 md:py-16 bg-gradient-to-br from-surface via-background to-surface">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("packages.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("packages.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${
                pkg.popular
                  ? "border-primary bg-background shadow-lg shadow-primary/20"
                  : pkg.express
                    ? "border-orange-500 bg-gradient-to-br from-orange-500/10 to-red-500/10"
                    : "border-border bg-background"
              }`}
            >
              {pkg.express && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center gap-1">
                  <Zap className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">{t("packages.installation")}</span>
                </div>
              )}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-background fill-background" />
                  <span className="text-sm font-medium text-background">{t("packages.popular")}</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2`}>{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-muted-foreground">тенге</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full cursor-pointer ${pkg.popular || pkg.express ? "glow-effect-hover" : ""}`}
                variant={pkg.popular || pkg.express ? "default" : "outline"}
                onClick={() => handlePackageOrder(pkg.name, pkg.price)}
              >
                {t("packages.choose")}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">{t("packages.customTitle")}</p>
          <Button variant="outline" size="lg" onClick={handleCustomOrder} className="cursor-pointer bg-transparent">
            {t("packages.customButton")}
          </Button>
        </div>
      </div>
    </section>
  )
}
