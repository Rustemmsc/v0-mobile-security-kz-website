"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { ShoppingCart, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/translations"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

interface ProductCardProps {
  product: {
    id: number | string
    category: string
    name: string
    description: string
    specs: string
    price: number
    image: string
    popular?: boolean
    brand?: string
    sku?: string
    inStock?: boolean
    isOnSale?: boolean
    isOnOrder?: boolean
    isRetail?: boolean
    priceType?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })

    toast.success(t("shop.itemAdded"), {
      description: product.name,
      action: {
        label: t("shop.viewCart"),
        onClick: () => {
          document.querySelector<HTMLButtonElement>('[aria-label="Shopping cart"]')?.click()
        },
      },
    })
  }

  const getWhatsAppUrl = () => {
    const message = `Здравствуйте! Интересует ${product.name} (${product.price.toLocaleString()}₸) + установка. Можете рассчитать стоимость?`
    return `https://wa.me/77789755555?text=${encodeURIComponent(message)}`
  }

  const handleCardClick = () => {
    router.push(`/products/${product.id}`)
  }

  return (
    <Card
      id={`product-${product.id}`}
      onClick={handleCardClick}
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-muted">
        <div className="relative w-full h-64">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted-foreground/10 to-muted" />
          )}
          <img
            src={product.image || "/placeholder.svg?height=256&width=400&query=security+camera"}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "/outdoor-security-camera.png"
              setImageLoaded(true)
            }}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.isOnSale && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/50 font-semibold">
              Акция
            </Badge>
          )}
          {product.popular && <Badge className="bg-primary shadow-lg shadow-primary/50">{t("shop.popular")}</Badge>}
          {product.inStock === false && (
            <Badge variant="destructive" className="shadow-lg">
              Нет в наличии
            </Badge>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
            {product.brand}
          </p>
        )}

        {/* Name */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {product.description}
          </p>
        )}

        {/* Price */}
        {product.price > 0 && (
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-primary">{product.price.toLocaleString()}</span>
            <span className="text-muted-foreground">{t("shop.currency")}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className="w-full transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {t("shop.addToCart")}
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <Plus className="w-4 h-4 mr-2" />
              {t("shop.buyWithInstallation")}
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}
