"use client"

import React, { useEffect, useState } from "react"
import { Shield, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { getSiteSettings, type SiteSettings } from "@/app/actions/get-site-settings"

export function Footer() {
  const { t, language } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [showMapMenu, setShowMapMenu] = React.useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    getSiteSettings(language).then(setSettings)
  }, [language])

  const address = settings?.company_address || "Проспект Туран, 54 НП3, Астана, Казахстан"
  const phone = settings?.company_phone || "+7 (778) 975-55-55"
  const phoneSupport = settings?.company_phone_support || "+7 (778) 340-00-00"
  const email = settings?.company_email || "info@mobilesecurity.kz"

  const addressEncoded = encodeURIComponent(address)

  const mapLinks = [
    {
      name: "2GIS",
      url: `https://2gis.kz/astana/search/${addressEncoded}`,
      icon: "🗺️",
    },
    {
      name: "Yandex Maps",
      url: `https://yandex.kz/maps/?text=${addressEncoded}`,
      icon: "🗺️",
    },
    {
      name: "Google Maps",
      url: `https://maps.google.com/?q=${addressEncoded}`,
      icon: "🗺️",
    },
  ]

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg border-2 border-primary/30 bg-primary/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold">
                MobileSecurity<span className="text-primary">.kz</span>
              </span>
            </div>
            <p className="text-sm text-foreground-muted mb-4">{t("footer.description")}</p>
            <div className="flex gap-3">
              <div
                className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center text-white opacity-60 cursor-not-allowed transition-opacity"
                title="Facebook (Coming Soon)"
              >
                <Facebook className="w-5 h-5" />
              </div>
              <div
                className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg flex items-center justify-center text-white opacity-60 cursor-not-allowed transition-opacity"
                title="Instagram (Coming Soon)"
              >
                <Instagram className="w-5 h-5" />
              </div>
              <div
                className="w-10 h-10 bg-[#FF0000] rounded-lg flex items-center justify-center text-white opacity-60 cursor-not-allowed transition-opacity"
                title="YouTube (Coming Soon)"
              >
                <Youtube className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>
                <a href="#services" className="hover:text-primary transition-colors cursor-pointer">
                  {t("services.cctv")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors cursor-pointer">
                  {t("services.alarm")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors cursor-pointer">
                  {t("services.access")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors cursor-pointer">
                  {t("services.intercom")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors cursor-pointer">
                  {t("services.network")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>
                <a href="#about" className="hover:text-primary transition-colors cursor-pointer">
                  {t("header.about")}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary transition-colors cursor-pointer">
                  {t("header.projects")}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-primary transition-colors cursor-pointer">
                  {t("reviews.title")}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-primary transition-colors cursor-pointer">
                  {t("header.packages")}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors cursor-pointer">
                  {t("header.contacts")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">{t("footer.contacts")}</h3>
            <ul className="space-y-3 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    {phone}
                  </a>
                  <span className="text-xs">{t("contact.sales")}</span>
                  <a
                    href={`tel:${phoneSupport.replace(/\D/g, "")}`}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    {phoneSupport}
                  </a>
                  <span className="text-xs">{t("contact.supportTime")}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors cursor-pointer">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="relative">
                  <button
                    onClick={() => setShowMapMenu(!showMapMenu)}
                    className="text-left hover:text-primary transition-colors cursor-pointer"
                  >
                    {address}
                  </button>
                  {showMapMenu && (
                    <div className="absolute bottom-full left-0 mb-2 bg-background border border-border rounded-lg shadow-lg p-2 min-w-[180px] z-10">
                      <div className="text-xs font-semibold mb-2 px-2 text-foreground">{t("contact.openMap")}:</div>
                      {mapLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-2 py-2 hover:bg-surface rounded transition-colors text-foreground cursor-pointer"
                          onClick={() => setShowMapMenu(false)}
                        >
                          <span>{link.icon}</span>
                          <span>{link.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-foreground-muted">
          <p>
            © {currentYear} MobileSecurity.kz. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  )
}
