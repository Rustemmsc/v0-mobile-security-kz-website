"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, EyeOff, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  name_ru: string
  price: number
  currency: string
  stock_quantity: number
  is_in_stock: boolean
  is_active: boolean
  images: string[]
  product_categories?: {
    name_ru: string
  }
}

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "none">("none")
  const router = useRouter()

  const handleDelete = async (productId: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) {
      return
    }

    setIsLoading(productId)
    const supabase = createClient()

    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (error) {
      toast.error("Ошибка при удалении товара")
      console.error(error)
    } else {
      toast.success("Товар успешно удален")
      router.refresh()
    }

    setIsLoading(null)
  }

  const toggleActive = async (product: Product) => {
    setIsLoading(product.id)
    const supabase = createClient()

    const { error } = await supabase.from("products").update({ is_active: !product.is_active }).eq("id", product.id)

    if (error) {
      toast.error("Ошибка при обновлении товара")
      console.error(error)
    } else {
      toast.success(`Товар ${product.is_active ? "скрыт" : "показан"}`)
      router.refresh()
    }

    setIsLoading(null)
  }

  // Сортировка товаров
  const sortedProducts = useMemo(() => {
    if (sortBy === "none") return products
    
    const sorted = [...products].sort((a, b) => {
      if (sortBy === "price_asc") {
        return a.price - b.price
      } else if (sortBy === "price_desc") {
        return b.price - a.price
      }
      return 0
    })
    
    return sorted
  }, [products, sortBy])

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 mb-4">Пока нет товаров</p>
        <Button asChild>
          <Link href="/admin/products/new">Добавить первый товар</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Кнопка сортировки */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(value: "price_asc" | "price_desc" | "none") => setSortBy(value)}>
            <SelectTrigger className="w-[200px]">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Сортировать по цене" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Без сортировки</SelectItem>
              <SelectItem value="price_asc">По возрастанию цены</SelectItem>
              <SelectItem value="price_desc">По убыванию цены</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
        <TableRow>
          <TableHead className="w-20">Фото</TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead>Остаток</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.images &&
              product.images.length > 0 &&
              product.images[0] &&
              !product.images[0].includes("/placeholder.svg") ? (
                <div className="relative h-12 w-12">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name_ru}
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.parentElement?.classList.add("bg-slate-200", "flex", "items-center", "justify-center")
                    }}
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center">
                  <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium">{product.name_ru}</TableCell>
            <TableCell>{product.product_categories?.name_ru || "Без категории"}</TableCell>
            <TableCell>
              {product.price} {product.currency}
            </TableCell>
            <TableCell>
              <Badge variant={product.stock_quantity > 0 ? "default" : "destructive"}>
                {product.stock_quantity} шт
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={product.is_active ? "default" : "secondary"}>
                {product.is_active ? "Активен" : "Скрыт"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleActive(product)}
                  disabled={isLoading === product.id}
                >
                  {product.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/products/${product.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  disabled={isLoading === product.id}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
