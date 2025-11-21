"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "@/lib/translations"

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useTranslation()

  if (!isVisible) return null

  const handleBannerClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-primary text-background py-3 px-4 relative">
      <div className="container mx-auto text-center cursor-pointer" onClick={handleBannerClick}>
        <p className="text-sm md:text-base font-medium">🔥 {t("urgency.text")}</p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Close banner"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
