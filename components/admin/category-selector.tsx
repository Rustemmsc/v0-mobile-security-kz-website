"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductSorter } from "@/components/admin/product-sorter"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useEffect } from "react"

interface Category {
  id: string
  name_ru: string
  name_kk: string
  name_en: string
}

interface CategorySelectorProps {
  categories: Category[]
}

export function CategorySelector({ categories }: CategorySelectorProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  useEffect(() => {
    if (selectedCategoryId) {
      loadProducts()
    } else {
      setProducts([])
    }
  }, [selectedCategoryId])

  const loadProducts = async () => {
    if (!selectedCategoryId) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name_ru, price, currency, images, is_on_sale, position")
        .eq("category_id", selectedCategoryId)
        .order("position", { ascending: true, nullsFirst: false })
        .order("id", { ascending: true })

      if (error) {
        console.error("Error loading products:", error)
        return
      }

      setProducts(data || [])
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Выберите категорию для сортировки" />
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

      {isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Загрузка товаров...</p>
        </div>
      )}

      {!isLoading && selectedCategoryId && selectedCategory && (
        <ProductSorter
          products={products}
          categoryId={selectedCategoryId}
          categoryName={selectedCategory.name_ru}
        />
      )}

      {!selectedCategoryId && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Выберите категорию для начала сортировки товаров</p>
        </div>
      )}
    </div>
  )
}

