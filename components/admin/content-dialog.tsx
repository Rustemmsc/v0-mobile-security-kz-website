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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface ContentItem {
  id?: string
  key: string
  value_ru?: string
  value_kk?: string
  value_en?: string
  content_type: string
  section?: string
  description?: string
}

interface ContentDialogProps {
  content?: ContentItem
  children: React.ReactNode
}

export function ContentDialog({ content, children }: ContentDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContentItem>({
    key: content?.key || "",
    value_ru: content?.value_ru || "",
    value_kk: content?.value_kk || "",
    value_en: content?.value_en || "",
    content_type: content?.content_type || "text",
    section: content?.section || "",
    description: content?.description || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    try {
      if (content?.id) {
        // Update existing content
        const { error } = await supabase.from("site_content").update(formData).eq("id", content.id)

        if (error) throw error
        toast.success("Контент успешно обновлен")
      } else {
        // Create new content
        const { error } = await supabase.from("site_content").insert([formData])

        if (error) throw error
        toast.success("Контент успешно создан")
      }

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error saving content:", error)
      toast.error("Ошибка при сохранении контента")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{content?.id ? "Редактировать контент" : "Новый элемент контента"}</DialogTitle>
          <DialogDescription>Управляйте текстами и контентом вашего сайта на всех языках</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="key">Ключ *</Label>
              <Input
                id="key"
                required
                placeholder="hero.title"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                disabled={!!content?.id}
              />
              <p className="text-xs text-slate-500">Уникальный идентификатор для использования в коде</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="section">Раздел</Label>
              <Input
                id="section"
                placeholder="hero, about, contact"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content_type">Тип контента</Label>
            <Select
              value={formData.content_type}
              onValueChange={(value) => setFormData({ ...formData, content_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Текст</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
                <SelectItem value="image">Изображение URL</SelectItem>
                <SelectItem value="url">URL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Описание</Label>
            <Input
              id="description"
              placeholder="Краткое описание назначения этого контента"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Tabs defaultValue="ru" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ru">Русский</TabsTrigger>
              <TabsTrigger value="kk">Қазақша</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>

            <TabsContent value="ru" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="value_ru">Значение (RU)</Label>
                <Textarea
                  id="value_ru"
                  rows={6}
                  placeholder="Введите текст на русском языке"
                  value={formData.value_ru}
                  onChange={(e) => setFormData({ ...formData, value_ru: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="kk" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="value_kk">Мәні (KK)</Label>
                <Textarea
                  id="value_kk"
                  rows={6}
                  placeholder="Қазақ тілінде мәтін енгізіңіз"
                  value={formData.value_kk}
                  onChange={(e) => setFormData({ ...formData, value_kk: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="en" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="value_en">Value (EN)</Label>
                <Textarea
                  id="value_en"
                  rows={6}
                  placeholder="Enter text in English"
                  value={formData.value_en}
                  onChange={(e) => setFormData({ ...formData, value_en: e.target.value })}
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
              {content?.id ? "Обновить" : "Создать"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
