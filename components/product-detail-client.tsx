"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingCart, Plus, Star, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/translations"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

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
  product_categories?: {
    name_ru: string
    name_kk: string
    name_en: string
    id: string
  }
}

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter()
  const { t, language } = useTranslation()
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["/placeholder.svg?height=600&width=600"]

  const getProductName = () => {
    if (language === "kk") return product.name_kk || product.name_ru
    if (language === "en") return product.name_en || product.name_ru
    return product.name_ru
  }

  const getProductDescription = () => {
    if (language === "kk") return product.description_kk || product.description_ru || ""
    if (language === "en") return product.description_en || product.description_ru || ""
    return product.description_ru || ""
  }

  const getCategoryName = () => {
    if (!product.product_categories) return ""
    if (language === "kk") return product.product_categories.name_kk || product.product_categories.name_ru
    if (language === "en") return product.product_categories.name_en || product.product_categories.name_ru
    return product.product_categories.name_ru
  }

  const formatSpecifications = (specs: any): Array<{ label: string; value: string }> => {
    if (!specs) return []
    
    let parsed = specs
    
    if (typeof specs === 'string') {
      if (!specs.trim().startsWith('{') && !specs.trim().startsWith('[')) {
        return [{ label: 'Характеристики', value: specs }]
      }
      
      try {
        parsed = JSON.parse(specs)
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed)
        }
      } catch {
        return [{ label: 'Характеристики', value: specs }]
      }
    }
    
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      const keyTranslations: Record<string, string> = {
        'resolution': 'Разрешение',
        'features': 'Особенности',
        'connectivity': 'Подключение',
        'storage': 'Хранилище',
        'channels': 'Каналы',
        'type': 'Тип',
        'zoom': 'Зум',
        'room': 'Комната',
        'lens': 'Объектив',
        'nightVision': 'Ночное видение',
        'audio': 'Аудио',
        'ptz': 'Поворотный механизм',
        'weatherResistance': 'Защита от влаги'
      }
      
      return Object.entries(parsed).map(([key, value]) => ({
        label: keyTranslations[key] || key,
        value: String(value)
      }))
    }
    
    return [{ label: 'Характеристики', value: String(parsed) }]
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: getProductName(),
      price: product.price,
      image: images[0],
      category: product.category_id,
    })

    toast.success(t("shop.itemAdded"), {
      description: getProductName(),
      action: {
        label: t("shop.viewCart"),
        onClick: () => {
          document.querySelector<HTMLButtonElement>('[aria-label="Shopping cart"]')?.click()
        },
      },
    })
  }

  const getWhatsAppUrl = () => {
    const message = `Здравствуйте! Интересует ${getProductName()} (${product.price.toLocaleString()}₸) + установка. Можете рассчитать стоимость?`
    return `https://wa.me/77789755555?text=${encodeURIComponent(message)}`
  }

  const specifications = formatSpecifications(product.specifications)

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 gap-2 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("shop.back")}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-muted">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="relative w-full h-full block cursor-pointer group"
                  aria-label="Zoom image"
                >
                  <img
                    src={images[selectedImageIndex] || "/placeholder.svg"}
                    alt={getProductName()}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? "scale-150" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </button>

                {/* Navigation arrows for images */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${getProductName()} - фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="flex items-center gap-2 flex-wrap">
              {getCategoryName() && (
                <Badge variant="secondary">{getCategoryName()}</Badge>
              )}
              {product.brand && (
                <Badge variant="outline">{product.brand}</Badge>
              )}
              {product.is_featured && (
                <Badge className="bg-primary">{t("shop.popular")}</Badge>
              )}
              {!product.is_in_stock && (
                <Badge variant="destructive">Нет в наличии</Badge>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-balance">{getProductName()}</h1>

            {/* Rating & SKU */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-muted text-muted" />
              </div>
              {product.sku && (
                <span className="text-sm text-muted-foreground">Артикул: {product.sku}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground text-pretty">
              {getProductDescription()}
            </p>

            {/* Price */}
            <Card className="p-6 bg-accent/10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-primary">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-xl text-muted-foreground">{t("shop.currency")}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.is_in_stock}
                  size="lg"
                  className="w-full"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t("shop.addToCart")}
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    <Plus className="w-5 h-5 mr-2" />
                    {t("shop.buyWithInstallation")}
                  </a>
                </Button>
              </div>
            </Card>

            {/* Specifications */}
            {specifications.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Характеристики</h3>
                <dl className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                      <dt className="font-medium text-muted-foreground">{spec.label}</dt>
                      <dd className="font-semibold text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
