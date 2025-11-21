"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ContentDialog } from "@/components/admin/content-dialog"

interface ContentItem {
  id: string
  key: string
  value_ru: string | null
  value_kk: string | null
  value_en: string | null
  content_type: string
  section: string | null
  description: string | null
}

interface ContentTableProps {
  content: ContentItem[]
}

export function ContentTable({ content }: ContentTableProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (contentId: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот элемент контента?")) {
      return
    }

    setIsLoading(contentId)
    const supabase = createClient()

    const { error } = await supabase.from("site_content").delete().eq("id", contentId)

    if (error) {
      toast.error("Ошибка при удалении контента")
      console.error(error)
    } else {
      toast.success("Контент успешно удален")
      router.refresh()
    }

    setIsLoading(null)
  }

  if (content.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 mb-4">Пока нет элементов контента</p>
        <ContentDialog>
          <Button>Добавить первый элемент</Button>
        </ContentDialog>
      </div>
    )
  }

  // Group content by section
  const groupedContent = content.reduce(
    (acc, item) => {
      const section = item.section || "Без раздела"
      if (!acc[section]) {
        acc[section] = []
      }
      acc[section].push(item)
      return acc
    },
    {} as Record<string, ContentItem[]>,
  )

  return (
    <div className="space-y-8">
      {Object.entries(groupedContent).map(([section, items]) => (
        <div key={section}>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">{section}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ключ</TableHead>
                <TableHead>Значение (RU)</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.key}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.value_ru || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.content_type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-slate-600">{item.description || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ContentDialog content={item}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </ContentDialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        disabled={isLoading === item.id}
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
      ))}
    </div>
  )
}
