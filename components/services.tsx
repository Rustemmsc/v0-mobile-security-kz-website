"use client"

import { Button } from "@/components/ui/button"
import { Camera, Bell, Lock, Radio, Home, Wrench, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function Services() {
  const { t } = useTranslation()

  const services = [
    {
      icon: Camera,
      title: t("services.cctv"),
      description: t("services.cctvDesc"),
      features: [
        t("services.cctvFeature1"),
        t("services.cctvFeature2"),
        t("services.cctvFeature3"),
        t("services.cctvFeature4"),
      ],
      priceFrom: "50 000",
      image: "/professional-security-cameras-monitoring-system.jpg",
    },
    {
      icon: Bell,
      title: t("services.alarm"),
      description: t("services.alarmDesc"),
      features: [
        t("services.alarmFeature1"),
        t("services.alarmFeature2"),
        t("services.alarmFeature3"),
        t("services.alarmFeature4"),
      ],
      priceFrom: "80 000",
      image: "/modern-alarm-system-control-panel.jpg",
    },
    {
      icon: Lock,
      title: t("services.access"),
      description: t("services.accessDesc"),
      features: [
        t("services.accessFeature1"),
        t("services.accessFeature2"),
        t("services.accessFeature3"),
        t("services.accessFeature4"),
      ],
      priceFrom: "50 000",
      image: "/access-control-system-with-fingerprint-scanner.jpg",
    },
    {
      icon: Radio,
      title: t("services.gsm"),
      description: t("services.gsmDesc"),
      features: [
        t("services.gsmFeature1"),
        t("services.gsmFeature2"),
        t("services.gsmFeature3"),
        t("services.gsmFeature4"),
      ],
      priceFrom: "80 000",
      image: "/gsm-signal-booster-antenna-installation.jpg",
    },
    {
      icon: Home,
      title: t("services.smart"),
      description: t("services.smartDesc"),
      features: [
        t("services.smartFeature1"),
        t("services.smartFeature2"),
        t("services.smartFeature3"),
        t("services.smartFeature4"),
      ],
      priceFrom: "50 000", // Updated Smart Home price from 300,000 to 50,000 tenge
      image: "/smart-home-automation-control-panel.jpg",
    },
    {
      icon: Wrench,
      title: t("services.maintenance"),
      description: t("services.maintenanceDesc"),
      features: [
        t("services.maintenanceFeature1"),
        t("services.maintenanceFeature2"),
        t("services.maintenanceFeature3"),
        t("services.maintenanceFeature4"),
      ],
      priceFrom: "15 000",
      image: "/maintenance-service-technician-security-system.jpg",
    },
  ]

  const getWhatsAppUrl = (serviceName: string) => {
    const phone = "77789755555"
    const message = `Здравствуйте! Интересует услуга: ${serviceName}. Хочу получить расчет стоимости.`
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="services" className="py-12 md:py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.title")}</h2>
          <p className="text-lg text-foreground-muted">{t("services.subtitle")}</p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6 md:gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background group">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 md:w-14 md:h-14 bg-primary rounded-lg flex items-center justify-center glow-effect">
                    <service.icon className="w-6 h-6 md:w-7 md:h-7 text-background" />
                  </div>
                </div>
              </div>

              <div className={`space-y-3 md:space-y-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
                <p className="text-sm md:text-base text-foreground-muted leading-relaxed">{service.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-xs md:text-sm text-foreground-muted">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs md:text-sm text-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{t("services.equipmentNote")}</span>
                </div>

                <div className="flex items-baseline gap-1.5 md:gap-2">
                  <span className="text-foreground-muted">От</span>
                  <span className="text-2xl md:text-3xl font-bold text-primary">{service.priceFrom}</span>
                  <span className="text-foreground-muted">тенге</span>
                </div>

                <Button asChild size="sm" className="glow-effect-hover group mt-1.5">
                  <a href={getWhatsAppUrl(service.title)} target="_blank" rel="noopener noreferrer">
                    {t("services.quote")}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
