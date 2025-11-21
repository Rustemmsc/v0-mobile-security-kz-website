"use client"

import { MessageCircle } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function WhatsAppButton() {
  const { t } = useTranslation()
  const phoneNumber = "77789755555"

  const handleClick = () => {
    const message = t("whatsapp.message")
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50 glow-effect-hover cursor-pointer"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  )
}
