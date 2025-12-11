"use client"

import { Button } from "@/components/ui/button"
import { Shield, ArrowRight, Phone, Zap, Award, ChevronLeft, ChevronRight, Video, UserCheck } from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { useState, useEffect } from "react"

export function Hero() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/modern-security-camera-system-with-monitors-showin.jpg",
      alt: "Professional Security Monitoring",
    },
    {
      image: "/luxury-cottage-smart-home-security-system.jpg",
      alt: "Smart Home Security",
    },
    {
      image: "/modern-office-security-access-control-system.jpg",
      alt: "Access Control System",
    },
    {
      image: "/warehouse-security-system-with-cameras-and-sensors.jpg",
      alt: "Warehouse Security",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const getWhatsAppUrl = (messageKey: string) => {
    const phoneNumber = "77789755555"
    const message = t(messageKey)
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="relative overflow-hidden py-8 md:py-16 lg:py-20 pb-6 md:pb-10 bg-gradient-to-b from-background via-surface/30 to-background">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full animate-fade-in">
              <Shield className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">{t("hero.badge")}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up text-balance">
              {t("hero.title")}
            </h1>

            <p className="text-lg md:text-xl text-foreground leading-relaxed text-pretty">{t("hero.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{t("hero.onlineViewing")}</span>
              </div>
              <a
                href={getWhatsAppUrl("whatsapp.freeVisitMessage")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{t("hero.freeVisit")}</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 p-5 bg-surface/50 backdrop-blur-sm border border-border rounded-xl">
              <div className="text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-xs text-white/70">{t("projects.title")}</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">1-3</div>
                <div className="text-xs text-white/70">{t("packages.installation")}</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">3 {t("packages.years")}</div>
                <div className="text-xs text-white/70">{t("packages.warranty")}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="glow-effect-hover group text-base md:text-lg h-12 md:h-14">
                <a href={getWhatsAppUrl("whatsapp.discountMessage")} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  {t("hero.cta")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base md:text-lg h-12 md:h-14 bg-transparent">
                <a href="tel:+77789755555">
                  <Phone className="w-5 h-5 mr-2" />
                  {t("hero.callNow")}
                </a>
              </Button>
            </div>

            <p className="text-sm text-foreground flex items-center gap-2 !mt-3">
              <Zap className="w-4 h-4 text-primary" />
              {t("urgency.text")}
            </p>
          </div>

          <div className="relative animate-fade-in-right">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-surface shadow-2xl">
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors cursor-pointer z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors cursor-pointer z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      index === currentSlide ? "bg-primary w-8" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="absolute top-8 right-8 bg-background/95 backdrop-blur-md border-2 border-primary/50 rounded-xl p-6 shadow-2xl animate-float">
                <div className="text-4xl font-bold text-primary text-glow">24/7</div>
                <div className="text-sm font-medium text-foreground">Мониторинг</div>
              </div>

              <div className="absolute bottom-8 left-8 bg-background/95 backdrop-blur-md border-2 border-primary/50 rounded-xl p-6 shadow-2xl animate-float delay-500">
                <div className="text-4xl font-bold text-primary text-glow">99.9%</div>
                <div className="text-sm font-medium text-foreground">Надежность</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
