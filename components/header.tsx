"use client"

import { useState } from "react"
import { Menu, X, Shield, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CartButton } from "@/components/cart-button"
import { useTranslation } from "@/lib/translations"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const navItems = [
    { label: t("header.services"), href: "/#services" },
    { label: t("header.packages"), href: "/#packages" },
    { label: t("header.shop"), href: "/shop" },
    { label: t("header.projects"), href: "/#projects" },
    { label: "Отзывы", href: "/#reviews" },
    { label: t("header.about"), href: "/#about" },
    { label: t("header.contacts"), href: "/#contact" },
  ]

  const whatsappUrl = `https://wa.me/77789755555?text=${encodeURIComponent(t("whatsapp.message"))}`

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg border-2 border-primary/30 bg-primary/5 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              MobileSecurity<span className="text-primary">.kz</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <CartButton />
            <Button asChild variant="outline" className="hidden md:inline-flex bg-transparent">
              <a href="tel:+77789755555">
                <Phone className="w-4 h-4 mr-2" />
                {t("header.callUs")}
              </a>
            </Button>
            <Button asChild className="hidden md:inline-flex">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t("hero.consultation")}
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 font-semibold text-foreground/70 hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <CartButton />
            <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
              <a href="tel:+77789755555">
                <Phone className="w-4 h-4 mr-2" />
                {t("header.callUs")}
              </a>
            </Button>
            <Button asChild className="w-full mt-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t("hero.consultation")}
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
