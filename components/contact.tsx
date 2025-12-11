"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Shield,
  Award,
  Headphones,
  Zap,
  Wrench,
  CreditCard,
  MessageCircle,
} from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { getSiteSettings, type SiteSettings } from "@/app/actions/get-site-settings"

export function Contact() {
  const { t, language } = useTranslation()
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showAddressMapOptions, setShowAddressMapOptions] = useState(false)
  const [showMapOverlayOptions, setShowMapOverlayOptions] = useState(false)

  useEffect(() => {
    getSiteSettings(language).then(setSettings)
  }, [language])

  const address = settings?.company_address || "Проспект Туран, 54 НП3, Астана, Казахстан"
  const phone = settings?.company_phone || "+7 (778) 975-55-55"
  const phoneSupport = settings?.company_phone_support || "+7 (778) 340-00-00"
  const email = settings?.company_email || "info@mobilesecurity.kz"

  const googleQuery = "ЖК Medina Tower, Проспект Туран, 54, Астана"
  const mapUrls = {
    "2gis": `https://2gis.kz/astana/search/${encodeURIComponent(address)}`,
    yandex: `https://yandex.kz/maps/?text=${encodeURIComponent(address)}`,
    google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleQuery)}`,
  }

  const whatsappUrl = `https://wa.me/77789755555?text=${encodeURIComponent(t("whatsapp.message"))}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let message = `🔔 *Новая заявка с сайта*\n\n`
      message += `👤 *Имя:* ${formData.name}\n`
      message += `📱 *Телефон:* ${formData.phone}\n`

      if (formData.email) {
        message += `📧 *Email:* ${formData.email}\n`
      }

      if (formData.service) {
        message += `🛠 *Услуга:* ${formData.service}\n`
      }

      if (formData.message) {
        message += `\n💬 *Сообщение:*\n${formData.message}`
      }

      setSubmitStatus("success")
      setFormData({ name: "", phone: "", email: "", service: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("contact.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        {/* Primary CTAs */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href="tel:+77789755555"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <Phone className="w-5 h-5" />
            <span>{t("contact.callNow") || "Позвонить"}</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Benefits row */}
        <div className="mt-6">
          <div className="bg-background border border-border rounded-2xl p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="flex flex-col items-center text-center gap-2.5">
                <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">{t("benefits.experience")}</h4>
                  <p className="text-sm text-foreground/80">10+ лет на рынке</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2.5">
                <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">{t("benefits.warranty")}</h4>
                  <p className="text-sm text-foreground/80">Гарантия до 3 лет</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2.5">
                <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">{t("benefits.support")}</h4>
                  <p className="text-sm text-foreground/80">Поддержка 24/7</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2.5">
                <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">{t("benefits.certified")}</h4>
                  <p className="text-sm text-foreground/80">Сертифицированные инженеры</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2.5">
                <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">{t("benefits.officialDealers")}</h4>
                  <p className="text-sm text-foreground/80">Официальные дилеры брендов</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2.5">
                <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">{t("benefits.flexiblePayment")}</h4>
                  <p className="text-sm text-foreground/80">Гибкие варианты оплаты</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map full width with floating form */}
        <div className="mt-8 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16">
          <div className="relative">
            {/* Floating contact form */}
            <div className="absolute right-4 top-4 z-30 w-full max-w-md">
              <div className="bg-[#242582] text-primary-foreground backdrop-blur-md border border-border/60 rounded-2xl p-6 shadow-2xl shadow-black/40">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name-floating" className="block text-sm font-medium mb-1.5">
                      {t("contact.name")} *
                    </label>
                    <Input
                      id="name-floating"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Айдар Нұрланов"
                      className="bg-white text-foreground placeholder:text-foreground-muted border-white/80"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone-floating" className="block text-sm font-medium mb-1.5">
                        {t("contact.phone")} *
                      </label>
                      <Input
                        id="phone-floating"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="bg-white text-foreground placeholder:text-foreground-muted border-white/80"
                      />
                    </div>

                    <div>
                      <label htmlFor="email-floating" className="block text-sm font-medium mb-1.5">
                        {t("contact.email")}
                      </label>
                      <Input
                        id="email-floating"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        className="bg-white text-foreground placeholder:text-foreground-muted border-white/80"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service-floating" className="block text-sm font-medium mb-1.5">
                      {t("contact.service")}
                    </label>
                    <select
                      id="service-floating"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-white/80 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">{t("contact.selectService")}</option>
                      <option value={t("contact.serviceCCTV")}>{t("contact.serviceCCTV")}</option>
                      <option value={t("contact.serviceAlarm")}>{t("contact.serviceAlarm")}</option>
                      <option value={t("contact.serviceAccess")}>{t("contact.serviceAccess")}</option>
                      <option value={t("contact.serviceGSM")}>{t("contact.serviceGSM")}</option>
                      <option value={t("contact.serviceSmart")}>{t("contact.serviceSmart")}</option>
                      <option value={t("contact.serviceOther")}>{t("contact.serviceOther")}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message-floating" className="block text-sm font-medium mb-1.5">
                      {t("contact.message")}
                    </label>
                    <Textarea
                      id="message-floating"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t("contact.messagePlaceholder")}
                      rows={3}
                      className="bg-white text-foreground placeholder:text-foreground-muted border-white/80"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full bg-white text-[#242582] hover:bg-slate-100 glow-effect-hover cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("contact.submitting") : t("contact.submit")}
                  </Button>

                  {submitStatus === "success" && (
                    <p className="text-sm text-success text-center">{t("contact.successMessage")}</p>
                  )}

                  {submitStatus === "error" && (
                    <p className="text-sm text-error text-center">{t("contact.errorMessage")}</p>
                  )}
                </form>
              </div>
            </div>

            <div className="aspect-[8/3] bg-surface overflow-hidden relative group">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(googleQuery)}&zoom=17`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта расположения офиса MobileSecurity.kz"
              />

              <div
                className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors cursor-pointer z-20"
                onClick={() => {
                  setShowMapOverlayOptions(!showMapOverlayOptions)
                  setShowAddressMapOptions(false)
                }}
              >
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{t("contact.openMap")}</span>
                  <span className="text-sm font-medium sm:hidden">Карта</span>
                </div>
              </div>

              {showMapOverlayOptions && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowMapOverlayOptions(false)} />
                  <div className="absolute top-[60%] left-1/2 -translate-x-1/2 bg-background border border-border rounded-lg shadow-xl p-2 z-40 min-w-[220px]">
                    <div className="text-sm font-semibold mb-2 px-3 pt-1 text-foreground">{t("contact.openMap")}:</div>
                    <a
                      href={mapUrls["2gis"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-surface rounded-md transition-colors cursor-pointer"
                      onClick={() => setShowMapOverlayOptions(false)}
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                      <span>{t("contact.openIn2GIS")}</span>
                    </a>
                    <a
                      href={mapUrls.yandex}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-surface rounded-md transition-colors cursor-pointer"
                      onClick={() => setShowMapOverlayOptions(false)}
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                      <span>{t("contact.openInYandex")}</span>
                    </a>
                    <a
                      href={mapUrls.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-surface rounded-md transition-colors cursor-pointer"
                      onClick={() => setShowMapOverlayOptions(false)}
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                      <span>{t("contact.openInGoogle")}</span>
                    </a>
                  </div>
                </>
              )}

              {/* Custom Logo Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10">
                <div className="relative">
                  {/* Marker Pin */}
                  <div className="w-16 h-16 bg-primary rounded-full border-4 border-white shadow-2xl flex items-center justify-center animate-bounce">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-white"
                    >
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  {/* Company Name Label */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-lg border border-border">
                    <p className="text-sm font-bold text-foreground">MobileSecurity.kz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
