import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ContentTable } from "@/components/admin/content-table"
import { ContentDialog } from "@/components/admin/content-dialog"

export default async function ContentPage() {
  const supabase = await createClient()

  const { data: content } = await supabase.from("site_content").select("*").order("section")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Контент сайта</h1>
          <p className="text-slate-600">Управление текстами и контентом вашего сайта</p>
        </div>
        <ContentDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить контент
          </Button>
        </ContentDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все элементы контента</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentTable content={content || []} />
        </CardContent>
      </Card>
    </div>
  )
}
