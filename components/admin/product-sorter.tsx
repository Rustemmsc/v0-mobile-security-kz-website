"use client"

import { useState, useEffect } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name_ru: string
  price: number
  currency: string
  images: string[] | null
  is_on_sale?: boolean | null
  position?: number | null
}

interface ProductSorterProps {
  products: Product[]
  categoryId: string
  categoryName: string
}

function SortableProductItem({ product }: { product: Product }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: product.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? "bg-muted" : ""}>
      <Card className="mb-2">
        <div className="flex items-center gap-4 p-4">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing flex items-center justify-center w-8 h-8 rounded hover:bg-muted transition-colors"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Фото товара */}
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            {product.images && product.images.length > 0 && product.images[0] && !product.images[0].includes("/placeholder.svg") ? (
              <Image
                src={product.images[0]}
                alt={product.name_ru}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-sm truncate">{product.name_ru}</h3>
              {product.is_on_sale && (
                <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">Акция</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {product.price.toLocaleString()} {product.currency}
            </p>
          </div>

          {/* Позиция */}
          <div className="text-sm font-medium text-muted-foreground w-12 text-center">
            #{product.position !== null && product.position !== undefined ? product.position + 1 : "—"}
          </div>
        </div>
      </Card>
    </div>
  )
}

export function ProductSorter({ products: initialProducts, categoryId, categoryName }: ProductSorterProps) {
  const [products, setProducts] = useState(initialProducts)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = products.findIndex((p) => p.id === active.id)
    const newIndex = products.findIndex((p) => p.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    // Обновляем порядок локально сразу
    const newProducts = arrayMove(products, oldIndex, newIndex).map((product, index) => ({
      ...product,
      position: index,
    }))

    setProducts(newProducts)
    setIsSaving(true)

    // Автоматически сохраняем порядок сразу после изменения
    try {
      const response = await fetch("/api/admin/products/sort", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          products: newProducts.map((p) => ({
            id: p.id,
            position: p.position || 0,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при сохранении порядка")
      }

      toast.success("Порядок товаров успешно сохранен")
      
      // Обновляем данные с сервера
      setTimeout(() => {
        router.refresh()
      }, 500)
    } catch (error: any) {
      console.error("Error saving sort order:", error)
      toast.error(error.message || "Ошибка при сохранении порядка товаров")
      // Возвращаем к исходному порядку при ошибке
      setProducts(initialProducts)
    } finally {
      setIsSaving(false)
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">В этой категории пока нет товаров</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Категория: {categoryName}</h3>
          <p className="text-sm text-muted-foreground">
            Перетащите товары для изменения порядка. Порядок сохраняется автоматически.
          </p>
        </div>
        {isSaving && (
          <Badge variant="secondary" className="animate-pulse">
            Сохранение...
          </Badge>
        )}
        {!isSaving && products.length > 0 && (
          <Badge variant="outline" className="text-green-600 border-green-600">
            ✓ Готово
          </Badge>
        )}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={products.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {products.map((product) => (
              <SortableProductItem key={product.id} product={product} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

