"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, Award, ChevronDown, ArrowLeft, Camera, HardDrive, Fingerprint, Bell, DoorOpen, Shield, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/translations"
import { ProductCard } from "@/components/product-card"
import { ProductGalleryModal } from "@/components/product-gallery-modal"

interface Category {
  id: string
  name_ru: string
  name_kk: string
  name_en: string
  description_ru: string | null
  description_kk: string | null
  description_en: string | null
  icon: string | null
  image: string | null
  is_active: boolean
  display_order: number
}

interface Product {
  id: string
  category_id: string
  name_ru: string
  name_kk: string
  name_en: string
  brand: string | null
  description_ru: string | null
  description_kk: string | null
  description_en: string | null
  specifications: any
  price: number
  images: string[] | null
  is_featured: boolean
  is_in_stock: boolean
  sku: string | null
  is_active: boolean
  position?: number | null
  is_on_sale?: boolean | null
  is_on_order?: boolean | null
  is_retail?: boolean | null
  price_type?: string | null
  product_categories?: {
    name_ru: string
    name_kk: string
    name_en: string
    id: string
  }
}

interface ShopProps {
  categories: Category[]
  products: Product[]
  showCustomCtaInline?: boolean
}

export function Shop({ categories: dbCategories, products: dbProducts, showCustomCtaInline = true }: ShopProps) {
  const { t, language } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const iconMap: Record<string, any> = {
    Camera,
    HardDrive,
    Fingerprint,
    Bell,
    DoorOpen,
  }

  const getCategoryName = (cat: Category) => {
    if (language === "kk") return cat.name_kk || cat.name_ru
    if (language === "en") return cat.name_en || cat.name_ru
    return cat.name_ru
  }

  const getCategoryDescription = (cat: Category) => {
    if (language === "kk") return cat.description_kk || cat.description_ru || ""
    if (language === "en") return cat.description_en || cat.description_ru || ""
    return cat.description_ru || ""
  }

  const categoryCards = dbCategories
    .map((cat) => {
      const productCount = dbProducts.filter((p) => p.category_id === cat.id).length
      const backgroundImages: Record<string, string> = {
        "IP Камеры": "/images/category-ip-cameras.jpg",
        Видеорегистраторы: "/images/category-nvr.jpg",
        "Контроль доступа": "/images/category-access-control.jpg",
        Сигнализации: "/images/category-alarm.jpg",
        Домофоны: "/images/category-intercom.jpg",
      }
      // Используем изображение из БД, если есть, иначе из хардкода, иначе placeholder
      const backgroundImage = cat.image || backgroundImages[cat.name_ru] || "/placeholder.svg?height=400&width=600"

      return {
        id: cat.id,
        icon: iconMap[cat.icon || "Camera"] || Camera,
        label: getCategoryName(cat),
        description: getCategoryDescription(cat),
        productCount,
        backgroundImage,
      }
    })
    .filter((cat) => cat.productCount > 0)

  const getProductName = (p: Product) => {
    if (language === "kk") return p.name_kk || p.name_ru
    if (language === "en") return p.name_en || p.name_ru
    return p.name_ru
  }

  const getProductDescription = (p: Product) => {
    if (language === "kk") return p.description_kk || p.description_ru || ""
    if (language === "en") return p.description_en || p.description_ru || ""
    return p.description_ru || ""
  }

  const formatSpecifications = (specs: any): string => {
    if (!specs) return ""
    
    let parsed = specs
    
    if (typeof specs === 'string') {
      if (!specs.trim().startsWith('{') && !specs.trim().startsWith('[')) {
        return ""
      }
      
      try {
        parsed = JSON.parse(specs)
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed)
        }
      } catch {
        return ""
      }
    }
    
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      const entries = Object.entries(parsed)
      if (entries.length === 0) return ""
      
      const keyTranslations: Record<string, string> = {
        'resolution': 'Разрешение',
        'features': 'Особенности',
        'connectivity': 'Подключение',
        'storage': 'Хранилище',
        'channels': 'Каналы',
        'type': 'Тип',
        'zoom': 'Зум',
        'room': 'Комната'
      }
      
      return entries
        .map(([key, value]) => {
          const translatedKey = keyTranslations[key.toLowerCase()] || key
          return `${translatedKey}: ${value}`
        })
        .join(' • ')
    }
    
    return ""
  }

  const products = dbProducts.map((p) => ({
    id: p.id,
    category: p.category_id,
    name: getProductName(p),
    brand: p.brand || "",
    description: getProductDescription(p),
    specs: formatSpecifications(p.specifications),
    price: p.price,
    image: p.images && p.images.length > 0 ? p.images[0] : "/placeholder.svg?height=400&width=400",
    popular: p.is_featured,
    inStock: p.is_in_stock,
    sku: p.sku || "",
    position: p.position || 0,
    isOnSale: p.is_on_sale === true,
    isOnOrder: p.is_on_order || false,
    isRetail: p.is_retail ?? true,
    priceType: p.price_type || "retail",
    name_ru: p.name_ru,
    name_kk: p.name_kk,
    name_en: p.name_en,
    description_ru: p.description_ru || "",
    description_kk: p.description_kk || "",
    description_en: p.description_en || "",
  }))

  const filteredProducts = selectedCategory
    ? products
        .filter((p) => p.category === selectedCategory)
        .sort((a, b) => {
          // Сначала по position, потом по id
          if (a.position !== b.position) {
            return (a.position || 0) - (b.position || 0)
          }
          return a.id.localeCompare(b.id)
        })
    : []

  const brands = [
    { name: "Hikvision", logo: "/hikvision-logo-large.jpg" },
    { name: "Dahua", logo: "/dahua-logo.png" },
    { name: "Ajax Systems", logo: "/ajax-systems-security-alarm-logo.jpg" },
    { name: "ZKTeco", logo: "/zkteco-biometric-access-control-logo.jpg" },
    { name: "Commax", logo: "/commax-intercom-video-door-phone-logo.jpg" },
    { name: "Ezviz", logo: "/ezviz-logo.png" },
    { name: "Imou", logo: "/imou-logo.png" },
    { name: "Tuya", logo: "/tuya-logo.png" },
    { name: "HiWatch", logo: "/hiwatch-logo.png" },
    { name: "Tiandy", logo: "/tiandy-logo.png" },
    { name: "HiLook", logo: "/hilook-logo.png" },
    { name: "Macroscop", logo: "/macroscop-logo.png" },
  ]

  const duplicatedBrands = [...brands, ...brands]

  const scrollLogos = (direction: "left" | "right") => {
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)

    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const startAutoScroll = () => {
      const interval = setInterval(() => {
        if (!isPaused && scrollContainerRef.current) {
          const container = scrollContainerRef.current
          const maxScroll = container.scrollWidth - container.clientWidth

          if (container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({
              left: 0,
              behavior: "smooth",
            })
          } else {
            container.scrollTo({
              left: container.scrollLeft + 200,
              behavior: "smooth",
            })
          }
        }
      }, 3000)

      return () => clearInterval(interval)
    }

    startAutoScroll()
  }, [isPaused])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
  }

  return (
    <section id="shop" className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary/80 mb-4">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <ShoppingCart className="w-3 h-3" />
            {t("shop.badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold md:font-bold mb-4 text-balance">
            {t("shop.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mx-auto text-pretty">{t("shop.subtitle")}</p>
        </div>

        <div className="space-y-10">
          {!selectedCategory ? (
            <>
              {categoryCards.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Категории товаров скоро появятся</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                  {categoryCards.map((category) => {
                    const Icon = category.icon
                    return (
                      <Card
                        key={category.id}
                        className="group relative flex flex-col overflow-hidden rounded-xl hover:shadow-md transition-all cursor-pointer hover:border-primary/50 border-border/80 p-0"
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="relative w-full">
                            <div className="aspect-[4/3]">
                              <img
                                src={category.backgroundImage || "/placeholder.svg"}
                                alt={category.label}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          <div className="flex-1 space-y-2 px-3 pb-3 md:px-4 md:pb-4">
                            <Badge
                              variant="secondary"
                              className="rounded-full px-2.5 py-0.5 text-[10px] md:text-xs bg-primary/5 text-primary border border-primary/20"
                            >
                              {category.productCount} {t("shop.productsLabel")}
                            </Badge>

                            <div className="flex items-start gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 text-primary flex-shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-xs md:text-sm font-semibold text-foreground text-left text-balance">
                                  {category.label}
                                </h3>
                                {category.description && (
                                  <p className="text-[11px] md:text-xs text-muted-foreground text-left line-clamp-2">
                                    {category.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <Button variant="outline" onClick={handleBackToCategories} className="gap-2 bg-transparent">
                  <ArrowLeft className="w-4 h-4" />
                  {t("shop.backToCategories")}
                </Button>
                <h3 className="text-2xl md:text-3xl font-semibold md:font-bold">
                  {categoryCards.find((c) => c.id === selectedCategory)?.label}
                </h3>
                <div className="w-32" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {showCustomCtaInline && (
            <div className="mt-8">
              <Card className="relative mx-auto w-full max-w-7xl overflow-hidden border border-[#242582] bg-gradient-to-r from-[#242582] via-[#2F2FA2] to-[#242582] text-white shadow-xl shadow-[#242582]/40">
                <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_left,#2F2FA2,transparent_55%),radial-gradient(circle_at_bottom_right,#553D67,transparent_60%)]" />
                <div className="relative flex flex-col gap-3 p-4 md:p-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-3 max-w-3xl">
                    <h3 className="text-xl md:text-2xl font-semibold md:font-bold tracking-tight">
                      {t("shop.customTitle")}
                    </h3>
                    <p className="text-base md:text-lg text-white/85">
                      {t("shop.customSubtitle")}
                    </p>
                  </div>
                  <div className="flex w-full md:w-auto items-center justify-start md:justify-end">
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="w-full md:w-auto px-7 text-sm md:text-base font-medium shadow-lg shadow-orange-500/40 bg-orange-500 text-white hover:bg-orange-400"
                    >
                      <a
                        href="https://wa.me/77789755555?text=Здравствуйте! Нужна консультация по выбору оборудования."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("shop.customButton")}
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="mt-8 mb-2 relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
            <div className="absolute inset-0 z-[0] bg-grid-white/5" />

            <Card className="relative border-none bg-background/90 backdrop-blur-sm shadow-sm">
              <div className="p-4 md:p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 md:gap-3 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 md:px-4 md:py-2 mb-3">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-xs md:text-sm lg:text-base text-primary text-balance">
                      {t("shop.mscSupplier")}
                    </h3>
                    <span className="hidden md:inline text-xs md:text-sm text-muted-foreground">•</span>
                    <p className="hidden md:inline text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                      {t("shop.mscSupplierDesc")}
                    </p>
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-primary fill-primary flex-shrink-0" />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-xl md:text-2xl">{t("shop.officialDealer")}</h3>
                    <Award className="w-5 h-5 text-primary" />
                  </div>

                  <div className="relative group">
                    <button
                      onClick={() => scrollLogos("left")}
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all opacity-0 group-hover:opacity-100 -translate-x-5 group-hover:translate-x-0 cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <ChevronDown className="w-5 h-5 rotate-90" />
                    </button>
                    <button
                      onClick={() => scrollLogos("right")}
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all opacity-0 group-hover:opacity-100 translate-x-5 group-hover:translate-x-0 cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <ChevronDown className="w-5 h-5 -rotate-90" />
                    </button>

                    <div className="overflow-hidden py-3 px-4 md:px-10">
                      <div
                        ref={scrollContainerRef}
                        className={`flex gap-8 md:gap-10 ${isPaused ? "" : "animate-scroll"}`}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
                      >
                        {duplicatedBrands.map((brand, index) => (
                          <div key={`${brand.name}-${index}`} className="flex-shrink-0 group/logo w-32 md:w-40">
                            <div className="relative h-16 md:h-20 flex items-center justify-center p-2.5 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 hover:border-primary/60 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
                              <img
                                src={brand.logo || "/placeholder.svg"}
                                alt={`${brand.name} logo`}
                                className="max-w-full max-h-full object-contain transition-all duration-300"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all group-hover:scale-110 flex-shrink-0">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs md:text-sm font-medium">{t("shop.certifiedEquipment")}</span>
                  </div>

                  <div className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all group-hover:scale-110 flex-shrink-0">
                      <Award className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-xs md:text-sm font-medium">{t("shop.officialWarranty")}</span>
                  </div>

                  <div className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all group-hover:scale-110 flex-shrink-0">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    </div>
                    <span className="text-xs md:text-sm font-medium">{t("shop.originalProducts")}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <ProductGalleryModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
