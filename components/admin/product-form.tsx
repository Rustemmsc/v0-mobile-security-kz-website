"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { ImageUpload } from "@/components/admin/image-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Category {
  id: string
  name_ru: string
}

interface Product {
  id?: string
  name_ru: string
  name_kk: string
  name_en: string
  description_ru?: string
  description_kk?: string
  description_en?: string
  price: number
  currency: string
  price_type?: "retail" | "on_order" | "sale"
  sku?: string
  stock_quantity: number
  category_id?: string
  images: string[]
  brand?: string
  model?: string
  is_in_stock: boolean
  is_active: boolean
  is_retail?: boolean
  is_on_order?: boolean
  is_on_sale?: boolean
}

interface ProductFormProps {
  categories: Category[]
  product?: Product
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Product>({
    name_ru: product?.name_ru || "",
    name_kk: product?.name_kk || "",
    name_en: product?.name_en || "",
    description_ru: product?.description_ru || "",
    description_kk: product?.description_kk || "",
    description_en: product?.description_en || "",
    price: product?.price || 0,
    currency: product?.currency || "KZT",
    price_type: product?.price_type || "retail",
    sku: product?.sku || "",
    stock_quantity: product?.stock_quantity || 0,
    category_id: product?.category_id || "",
    images: product?.images || [],
    brand: product?.brand || "",
    model: product?.model || "",
    is_in_stock: product?.is_in_stock ?? true,
    is_active: product?.is_active ?? true,
    is_retail: product?.is_retail ?? true,
    is_on_order: product?.is_on_order ?? false,
    is_on_sale: product?.is_on_sale ?? false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    try {
      // Подготовка данных: убираем undefined и преобразуем типы
      const dataToSave: any = {
        name_ru: formData.name_ru,
        name_kk: formData.name_kk,
        name_en: formData.name_en,
        description_ru: formData.description_ru || null,
        description_kk: formData.description_kk || null,
        description_en: formData.description_en || null,
        price: Number(formData.price),
        currency: formData.currency,
        sku: formData.sku || null,
        stock_quantity: Number(formData.stock_quantity),
        category_id: formData.category_id || null,
        images: formData.images || [],
        brand: formData.brand || null,
        model: formData.model || null,
        is_in_stock: Boolean(formData.is_in_stock),
        is_active: Boolean(formData.is_active),
      }

      // Добавляем новые поля только если они определены
      if (formData.price_type) {
        dataToSave.price_type = formData.price_type
      }
      if (formData.is_retail !== undefined) {
        dataToSave.is_retail = Boolean(formData.is_retail)
      }
      if (formData.is_on_order !== undefined) {
        dataToSave.is_on_order = Boolean(formData.is_on_order)
      }
      if (formData.is_on_sale !== undefined) {
        dataToSave.is_on_sale = Boolean(formData.is_on_sale)
      }

      if (product?.id) {
        // Update existing product
        const { error, data } = await supabase.from("products").update(dataToSave).eq("id", product.id).select()

        if (error) {
          console.error("Supabase error:", error)
          toast.error(`Ошибка при сохранении товара: ${error.message}`)
          return
        }
        toast.success("Товар успешно обновлен")
      } else {
        // Create new product
        const { error, data } = await supabase.from("products").insert([dataToSave]).select()

        if (error) {
          console.error("Supabase error:", error)
          toast.error(`Ошибка при сохранении товара: ${error.message}`)
          return
        }
        toast.success("Товар успешно создан")
      }

      router.push("/admin/products")
      router.refresh()
    } catch (error: any) {
      console.error("Error saving product:", error)
      toast.error(`Ошибка при сохранении товара: ${error?.message || "Неизвестная ошибка"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="ru" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ru">Русский</TabsTrigger>
          <TabsTrigger value="kk">Қазақша</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>

        <TabsContent value="ru" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name_ru">Название товара (RU) *</Label>
            <Input
              id="name_ru"
              required
              value={formData.name_ru}
              onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description_ru">Описание (RU)</Label>
            <Textarea
              id="description_ru"
              rows={4}
              value={formData.description_ru}
              onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
            />
          </div>
        </TabsContent>

        <TabsContent value="kk" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name_kk">Тауар атауы (KK) *</Label>
            <Input
              id="name_kk"
              required
              value={formData.name_kk}
              onChange={(e) => setFormData({ ...formData, name_kk: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description_kk">Сипаттамасы (KK)</Label>
            <Textarea
              id="description_kk"
              rows={4}
              value={formData.description_kk}
              onChange={(e) => setFormData({ ...formData, description_kk: e.target.value })}
            />
          </div>
        </TabsContent>

        <TabsContent value="en" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name_en">Product Name (EN) *</Label>
            <Input
              id="name_en"
              required
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description_en">Description (EN)</Label>
            <Textarea
              id="description_en"
              rows={4}
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">Основная информация</h3>

          <div className="grid gap-2">
            <Label htmlFor="category">Категория *</Label>
            <Select
              required
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name_ru}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Цена * (₸)</Label>
            <Input
              id="price"
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
            />
            <p className="text-sm text-slate-500">Цена товара в тенге</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price_type">Тип цены *</Label>
            <Select
              value={formData.price_type}
              onValueChange={(value: "retail" | "on_order" | "sale") => setFormData({ ...formData, price_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип цены" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Розница</SelectItem>
                <SelectItem value="on_order">Под Заказ</SelectItem>
                <SelectItem value="sale">Акция</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sku">Артикул (SKU)</Label>
            <Input
              id="sku"
              placeholder="например: CAM-001"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
            <p className="text-sm text-slate-500">Уникальный код товара для учета</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">Склад и доступность</h3>

          <div className="grid gap-2">
            <Label htmlFor="stock">Количество на складе *</Label>
            <Input
              id="stock"
              type="number"
              required
              min="0"
              placeholder="0"
              value={formData.stock_quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock_quantity: Number.parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_in_stock"
              checked={formData.is_in_stock}
              onCheckedChange={(checked) => setFormData({ ...formData, is_in_stock: checked as boolean })}
            />
            <Label
              htmlFor="is_in_stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Товар в наличии
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
            />
            <Label
              htmlFor="is_active"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Товар активен (отображается на сайте)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_retail"
              checked={formData.is_retail}
              onCheckedChange={(checked) => setFormData({ ...formData, is_retail: checked as boolean })}
            />
            <Label
              htmlFor="is_retail"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Товар в розницу
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_on_order"
              checked={formData.is_on_order}
              onCheckedChange={(checked) => setFormData({ ...formData, is_on_order: checked as boolean })}
            />
            <Label
              htmlFor="is_on_order"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Товар под заказ
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_on_sale"
              checked={formData.is_on_sale}
              onCheckedChange={(checked) => setFormData({ ...formData, is_on_sale: checked as boolean })}
            />
            <Label
              htmlFor="is_on_sale"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Товар по акции
            </Label>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="brand">Бренд</Label>
            <Input
              id="brand"
              placeholder="например: Hikvision"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="model">Модель</Label>
            <Input
              id="model"
              placeholder="например: DS-2CD2043G2-I"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Изображения товара</Label>
        <ImageUpload images={formData.images} onChange={(images) => setFormData({ ...formData, images })} />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product?.id ? "Обновить товар" : "Создать товар"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")} disabled={isLoading}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
