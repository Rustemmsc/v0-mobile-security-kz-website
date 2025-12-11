"use client"

import { useTranslation } from "@/lib/translations"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  Video,
  Mic,
  Moon,
  ScanFace,
  Users,
  Car,
  Search,
  Thermometer,
  Brain,
  Cloud,
  Smartphone,
  Home,
  Workflow,
  Activity,
} from "lucide-react"

export function Technologies() {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)

  const technologies = [
    {
      icon: Video,
      title: t("technologies.onlineViewing"),
      description: t("technologies.onlineViewingDesc"),
      bgGradient: "from-[#2F2FA2]/10 to-cyan-500/10",
    },
    {
      icon: Mic,
      title: t("technologies.audioDetection"),
      description: t("technologies.audioDetectionDesc"),
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: Moon,
      title: t("technologies.colorNightVision"),
      description: t("technologies.colorNightVisionDesc"),
      bgGradient: "from-[#242582]/10 to-[#2F2FA2]/10",
    },
    {
      icon: ScanFace,
      title: t("technologies.faceRecognition"),
      description: t("technologies.faceRecognitionDesc"),
      bgGradient: "from-green-500/10 to-teal-500/10",
    },
    {
      icon: Users,
      title: t("technologies.peopleCounting"),
      description: t("technologies.peopleCountingDesc"),
      bgGradient: "from-orange-500/10 to-red-500/10",
    },
    {
      icon: Car,
      title: t("technologies.vehicleRecognition"),
      description: t("technologies.vehicleRecognitionDesc"),
      bgGradient: "from-red-500/10 to-pink-500/10",
    },
    {
      icon: Search,
      title: t("technologies.bodySearch"),
      description: t("technologies.bodySearchDesc"),
      bgGradient: "from-cyan-500/10 to-[#2F2FA2]/10",
    },
    {
      icon: Thermometer,
      title: t("technologies.thermalImaging"),
      description: t("technologies.thermalImagingDesc"),
      bgGradient: "from-yellow-500/10 to-orange-500/10",
    },
    {
      icon: Brain,
      title: t("technologies.aiAnalytics"),
      description: t("technologies.aiAnalyticsDesc"),
      bgGradient: "from-purple-500/10 to-indigo-500/10",
    },
    {
      icon: Cloud,
      title: t("technologies.cloudStorage"),
      description: t("technologies.cloudStorageDesc"),
      bgGradient: "from-[#2F2FA2]/10 to-sky-500/10",
    },
    {
      icon: Smartphone,
      title: t("technologies.mobileApp"),
      description: t("technologies.mobileAppDesc"),
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: Home,
      title: t("technologies.smartHomeIntegration"),
      description: t("technologies.smartHomeIntegrationDesc"),
      bgGradient: "from-teal-500/10 to-cyan-500/10",
    },
    {
      icon: Workflow,
      title: t("technologies.crmIntegration"),
      description: t("technologies.crmIntegrationDesc"),
      bgGradient: "from-pink-500/10 to-purple-500/10",
    },
    {
      icon: Activity,
      title: t("technologies.motionDetection"),
      description: t("technologies.motionDetectionDesc"),
      bgGradient: "from-orange-500/10 to-yellow-500/10",
    },
  ]

  const displayedTechnologies = showAll ? technologies : technologies.slice(0, 8)

  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-background via-background to-muted/60">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mb-10 max-w-3xl mx-auto text-center space-y-3 md:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {t("technologies.title")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
            {t("technologies.title")}
          </h2>
          <p className="text-lg text-muted-foreground/90">
            {t("technologies.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4 lg:gap-5">
          {displayedTechnologies.map((tech, index) => {
            const Icon = tech.icon
            return (
              <div
                key={index}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-3 md:p-4 lg:p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.bgGradient} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative flex h-full flex-col gap-2 md:gap-3">
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 md:h-10 md:w-10">
                      <Icon className="h-4 w-4 text-primary md:h-5 md:w-5" />
                    </div>
                    <h3 className="text-xs font-semibold text-foreground md:text-sm lg:text-base">{tech.title}</h3>
                  </div>
                  <p className="text-[10px] leading-relaxed text-muted-foreground md:text-xs lg:text-sm">
                    {tech.description}
                  </p>
                  <div className="mt-auto h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            )
          })}
        </div>

        {!showAll && technologies.length > 8 && (
          <div className="mt-6 text-center md:hidden">
            <Button onClick={() => setShowAll(true)} variant="outline" className="h-11 cursor-pointer">
              Показать все технологии
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
