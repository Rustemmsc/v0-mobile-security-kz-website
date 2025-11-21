"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, EyeOff, MoveUp, MoveDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { CategoryDialog } from "@/components/admin/category-dialog"

interface Category {
  id: string
  name_ru: string
  name_kk: string
  name_en: string
  description_ru: string | null
  is_active: boolean
  display_order: number
}

interface CategoriesTableProps {
  categories: Category[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту категорию?")) {
      return
    }

    setIsLoading(categoryId)
    const supabase = createClient()

    const { error } = await supabase.from("product_categories").delete().eq("id", categoryId)

    if (error) {
      toast.error("Ошибка при удалении категории")
      console.error(error)
    } else {
      toast.success("Категория успешно удалена")
      router.refresh()
    }

    setIsLoading(null)
  }

  const toggleActive = async (category: Category) => {
    setIsLoading(category.id)
    const supabase = createClient()

    const { error } = await supabase
      .from("product_categories")
      .update({ is_active: !category.is_active })
      .eq("id", category.id)

    if (error) {
      toast.error("Ошибка при обновлении категории")
      console.error(error)
    } else {
      toast.success(`Категория ${category.is_active ? "скрыта" : "показана"}`)
      router.refresh()
    }

    setIsLoading(null)
  }

  const moveCategory = async (category: Category, direction: "up" | "down") => {
    setIsLoading(category.id)
    const supabase = createClient()

    const newOrder = direction === "up" ? category.display_order - 1 : category.display_order + 1

    const { error } = await supabase
      .from("product_categories")
      .update({ display_order: newOrder })
      .eq("id", category.id)

    if (error) {
      toast.error("Ошибка при изменении порядка")
      console.error(error)
    } else {
      router.refresh()
    }

    setIsLoading(null)
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 mb-4">Пока нет категорий</p>
        <CategoryDialog>
          <Button>Добавить первую категорию</Button>
        </CategoryDialog>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Описание</TableHead>
          <TableHead>Порядок</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name_ru}</TableCell>
            <TableCell className="max-w-xs truncate">{category.description_ru || "—"}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">{category.display_order}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveCategory(category, "up")}
                    disabled={index === 0 || isLoading === category.id}
                  >
                    <MoveUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveCategory(category, "down")}
                    disabled={index === categories.length - 1 || isLoading === category.id}
                  >
                    <MoveDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={category.is_active ? "default" : "secondary"}>
                {category.is_active ? "Активна" : "Скрыта"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleActive(category)}
                  disabled={isLoading === category.id}
                >
                  {category.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <CategoryDialog category={category}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </CategoryDialog>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(category.id)}
                  disabled={isLoading === category.id}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
