"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function CtaProjects() {
  const { t } = useTranslation()

  const whatsappUrl = `https://wa.me/77789755555?text=${encodeURIComponent(t("whatsapp.message"))}`

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-[#242582]/30 bg-gradient-to-r from-[#242582] via-[#2F2FA2] to-[#242582] px-6 py-8 md:px-10 md:py-10 text-white shadow-xl shadow-[#242582]/35">
          <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_55%)]" />
          <div className="relative text-center space-y-3 md:space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold md:font-bold tracking-tight">
              {t("cta.projectsTitle")}
            </h3>
            <p className="text-base md:text-lg text-white/85 max-w-3xl mx-auto">
              {t("cta.projectsSubtitle")}
            </p>
          </div>
          <div className="relative mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="group h-12 md:h-14 px-8 md:px-10 bg-orange-500 text-white hover:bg-orange-400 shadow-lg shadow-orange-500/40 border-none"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t("cta.projectsButton")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 md:h-14 px-8 md:px-10 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
            >
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
