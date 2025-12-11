"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, EyeOff, GripVertical } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Product {
  id: string
  name_ru: string
  price: number
  currency: string
  stock_quantity: number
  is_in_stock: boolean
  is_active: boolean
  images: string[]
  category_id: string
  position?: number | null
  product_categories?: {
    name_ru: string
    id: string
  }
}

interface Category {
  id: string
  name_ru: string
}

interface ProductsTableProps {
  products: Product[]
  categories: Category[]
}

function SortableRow({ product, onToggleActive, onDelete, isLoading }: {
  product: Product
  onToggleActive: (product: Product) => void
  onDelete: (id: string) => void
  isLoading: string | null
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? "bg-muted" : ""}>
      <TableCell className="w-10 cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </TableCell>
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
            onClick={() => onToggleActive(product)}
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
            onClick={() => onDelete(product.id)}
            disabled={isLoading === product.id}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export function ProductsTable({ products, categories }: ProductsTableProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isReordering, setIsReordering] = useState(false)
  const [localProducts, setLocalProducts] = useState<Product[]>(products)
  const router = useRouter()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Фильтруем товары по выбранной категории
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return localProducts
    }
    return localProducts.filter((p) => p.category_id === selectedCategory)
  }, [localProducts, selectedCategory])

  // Сортируем товары по position внутри категории
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const posA = a.position || 0
      const posB = b.position || 0
      if (posA !== posB) {
        return posA - posB
      }
      return a.id.localeCompare(b.id)
    })
  }, [filteredProducts])

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
      setLocalProducts(localProducts.filter((p) => p.id !== productId))
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
      setLocalProducts(
        localProducts.map((p) => (p.id === product.id ? { ...p, is_active: !p.is_active } : p))
      )
      router.refresh()
    }

    setIsLoading(null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = sortedProducts.findIndex((p) => p.id === active.id)
    const newIndex = sortedProducts.findIndex((p) => p.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const newProducts = arrayMove(sortedProducts, oldIndex, newIndex)
    setLocalProducts((prev) => {
      const updated = [...prev]
      newProducts.forEach((product, index) => {
        const existingIndex = updated.findIndex((p) => p.id === product.id)
        if (existingIndex !== -1) {
          updated[existingIndex] = { ...updated[existingIndex], position: index + 1 }
        }
      })
      return updated
    })

    setIsReordering(true)

    try {
      const categoryId = selectedCategory === "all" ? sortedProducts[0]?.category_id : selectedCategory
      if (!categoryId) {
        toast.error("Не удалось определить категорию")
        return
      }

      const reorderData = newProducts.map((product, index) => ({
        product_id: product.id,
        position: index + 1,
      }))

      const response = await fetch("/api/admin/products/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          products: reorderData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to reorder products")
      }

      toast.success("Порядок товаров обновлен")
      router.refresh()
    } catch (error) {
      console.error("Reorder error:", error)
      toast.error("Ошибка при обновлении порядка товаров")
      // Возвращаем старый порядок при ошибке
      setLocalProducts(products)
    } finally {
      setIsReordering(false)
    }
  }

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
      {/* Фильтр по категории */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Фильтр по категории:</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name_ru}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCategory !== "all" && (
          <p className="text-sm text-muted-foreground">
            {sortedProducts.length} товар(ов) в категории
          </p>
        )}
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">Нет товаров в выбранной категории</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
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
              <SortableContext items={sortedProducts.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                {sortedProducts.map((product) => (
                  <SortableRow
                    key={product.id}
                    product={product}
                    onToggleActive={toggleActive}
                    onDelete={handleDelete}
                    isLoading={isLoading}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      )}

      {isReordering && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">Обновление порядка...</p>
        </div>
      )}
    </div>
  )
}
