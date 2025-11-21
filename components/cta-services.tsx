"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function CtaServices() {
  const { t } = useTranslation()

  const whatsappUrl = `https://wa.me/77789755555?text=${encodeURIComponent(t("whatsapp.message"))}`

  return (
    <section className="py-12 md:py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{t("cta.servicesTitle")}</h3>
          <p className="text-lg text-muted-foreground mb-4 md:mb-6">{t("cta.servicesSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="group h-12 md:h-14">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("cta.servicesButton")}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 md:h-14 bg-transparent">
              <a href="tel:+77789755555">
                <Phone className="w-5 h-5 mr-2" />
                {t("cta.callButton")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
