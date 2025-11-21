"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface Category {
  id?: string
  name_ru: string
  name_kk: string
  name_en: string
  description_ru?: string
  description_kk?: string
  description_en?: string
  display_order?: number
}

interface CategoryDialogProps {
  category?: Category
  children: React.ReactNode
}

export function CategoryDialog({ category, children }: CategoryDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Category>({
    name_ru: category?.name_ru || "",
    name_kk: category?.name_kk || "",
    name_en: category?.name_en || "",
    description_ru: category?.description_ru || "",
    description_kk: category?.description_kk || "",
    description_en: category?.description_en || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    try {
      if (category?.id) {
        // Update existing category
        const { error } = await supabase.from("product_categories").update(formData).eq("id", category.id)

        if (error) throw error
        toast.success("Категория успешно обновлена")
      } else {
        // Create new category
        const { error } = await supabase.from("product_categories").insert([{ ...formData, is_active: true }])

        if (error) throw error
        toast.success("Категория успешно создана")
      }

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error saving category:", error)
      toast.error("Ошибка при сохранении категории")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{category?.id ? "Редактировать категорию" : "Новая категория"}</DialogTitle>
          <DialogDescription>Введите информацию о категории на всех языках</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="ru" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ru">Русский</TabsTrigger>
              <TabsTrigger value="kk">Қазақша</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>

            <TabsContent value="ru" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name_ru">Название (RU) *</Label>
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
                  rows={3}
                  value={formData.description_ru}
                  onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="kk" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name_kk">Атауы (KK) *</Label>
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
                  rows={3}
                  value={formData.description_kk}
                  onChange={(e) => setFormData({ ...formData, description_kk: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="en" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name_en">Name (EN) *</Label>
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
                  rows={3}
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {category?.id ? "Обновить" : "Создать"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
