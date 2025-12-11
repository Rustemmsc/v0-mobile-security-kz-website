"use client"

import { Phone } from "lucide-react"

export function CallButton() {
  const phoneNumber = "+77789755555"

  const handleClick = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-6 w-14 h-14 bg-[#2F2FA2] hover:bg-[#242582] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50 hover:scale-110 cursor-pointer"
      aria-label="Call us"
    >
      <Phone className="w-7 h-7" />
    </button>
  )
}
