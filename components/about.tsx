"use client"

import { Award, Users, Building2, TrendingUp } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function About() {
  const { t } = useTranslation()

  const stats = [
    { icon: Building2, value: "500+", label: t("about.stat1") },
    { icon: Users, value: "20+", label: t("about.stat2") },
    { icon: Award, value: "15", label: t("about.stat3") },
    { icon: TrendingUp, value: "98%", label: t("about.stat4") },
  ]

  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t("about.title")}</h2>
            <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
              <p>{t("about.description")}</p>
              <p>{t("about.equipmentSupply")}</p>
              <div>
                <h3 className="font-bold text-foreground mb-2">{t("about.mission")}</h3>
                <p>{t("about.missionText")}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-8 bg-surface border border-border rounded-2xl text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
