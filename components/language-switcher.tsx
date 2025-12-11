"use client"

import { Globe } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  const languages = [
    { code: "ru", label: "RU" },
    { code: "kk", label: "KZ" },
    { code: "en", label: "EN" },
  ] as const

  const currentLabel = languages.find((lang) => lang.code === language)?.label || "RU"

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface transition-colors cursor-pointer">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLabel}</span>
      </button>

      <div className="absolute right-0 top-full mt-2 bg-surface-elevated border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`block w-full px-4 py-2 text-sm text-left hover:bg-surface transition-colors first:rounded-t-lg last:rounded-b-lg cursor-pointer ${
              language === lang.code ? "text-primary font-medium" : "text-foreground-muted"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}
