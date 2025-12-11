"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/translations"

export function Projects() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState("all")

  const projects = [
    {
      title: t("projects.construction"),
      category: "cctv", // Use key instead of translated string
      description: t("projects.constructionDesc"),
      image: "/construction-site-security-cameras-surveillance-sy.jpg",
      stats: { [t("projects.cameras")]: 24, [t("projects.area")]: "8000 м²", [t("projects.duration")]: "15 дней" },
    },
    {
      title: t("projects.warehouse"),
      category: "comprehensive", // Use key instead of translated string
      description: t("projects.warehouseDesc"),
      image: "/warehouse-security-camera-system-storage-facility.jpg",
      stats: { [t("projects.cameras")]: 45, [t("projects.area")]: "12000 м²", [t("projects.duration")]: "35 дней" },
    },
    {
      title: t("projects.cottage"),
      category: "smart", // Use key instead of translated string
      description: t("projects.cottageDesc"),
      image: "/luxury-cottage-smart-home-security-system.jpg",
      stats: { [t("projects.cameras")]: 12, [t("projects.area")]: "450 м²", [t("projects.duration")]: "12 дней" },
    },
    {
      title: t("projects.office"),
      category: "access", // Use key instead of translated string
      description: t("projects.officeDesc"),
      image: "/modern-office-security-access-control-system.jpg",
      stats: {
        [t("projects.users")]: 150,
        [t("projects.doors")]: 12,
        [t("projects.duration")]: "18 дней",
      },
    },
    {
      title: t("projects.restaurant"),
      category: "cctv", // Use key instead of translated string
      description: t("projects.restaurantDesc"),
      image: "/restaurant-security-camera-system-dining-area.jpg",
      stats: { [t("projects.cameras")]: 16, [t("projects.area")]: "350 м²", [t("projects.duration")]: "8 дней" },
    },
    {
      title: t("projects.parking"),
      category: "cctv", // Use key instead of translated string
      description: t("projects.parkingDesc"),
      image: "/parking-lot-security-camera-license-plate-recognit.jpg",
      stats: { [t("projects.cameras")]: 32, [t("projects.area")]: "5000 м²", [t("projects.duration")]: "20 дней" },
    },
    {
      title: t("projects.residential"),
      category: "comprehensive", // Use key instead of translated string
      description: t("projects.residentialDesc"),
      image: "/residential-complex-security-system-apartment-buil.jpg",
      stats: { [t("projects.cameras")]: 68, [t("projects.area")]: "18000 м²", [t("projects.duration")]: "50 дней" },
    },
    {
      title: t("projects.mall"),
      category: "cctv", // Use key instead of translated string
      description: t("projects.mallDesc"),
      image: "/shopping-mall-security-camera-system.jpg",
      stats: { [t("projects.cameras")]: 120, [t("projects.area")]: "15000 м²", [t("projects.duration")]: "45 дней" },
    },
  ]

  const categories = [
    { key: "all", label: t("projects.all") },
    { key: "cctv", label: t("projects.cctv") },
    { key: "access", label: t("projects.access") },
    { key: "comprehensive", label: t("projects.comprehensive") },
    { key: "smart", label: t("projects.smart") },
  ]

  const filteredProjects = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)

  const handleViewAllProjects = () => {
    const message = encodeURIComponent(
      "Здравствуйте! Хочу узнать больше о ваших реализованных проектах и получить консультацию.",
    )
    window.open(`https://wa.me/77789755555?text=${message}`, "_blank")
  }

  const getCategoryLabel = (categoryKey: string) => {
    const category = categories.find((c) => c.key === categoryKey)
    return category ? category.label : categoryKey
  }

  return (
    <section id="projects" className="py-12 md:py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("projects.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("projects.subtitle")}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === category.key
                  ? "bg-primary text-background"
                  : "bg-background text-foreground hover:bg-background/80"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-background border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-medium text-background">{getCategoryLabel(project.category)}</span>
                </div>
              </div>

              <div className="p-3 md:p-4 space-y-2.5">
                <h3 className="text-sm md:text-base font-semibold">{project.title}</h3>
                <p className="text-xs md:text-sm text-foreground/70 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm md:text-base font-semibold text-primary">{value}</span>
                      <span className="text-[11px] text-foreground/60 capitalize">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="default"
            onClick={handleViewAllProjects}
            className="cursor-pointer bg-white hover:bg-white/90 text-foreground border-white"
          >
            {t("projects.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  )
}
