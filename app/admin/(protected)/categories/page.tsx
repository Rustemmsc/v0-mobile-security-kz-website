import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CategoriesTable } from "@/components/admin/categories-table"
import { CategoryDialog } from "@/components/admin/category-dialog"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("product_categories").select("*").order("display_order")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Категории</h1>
          <p className="text-slate-600">Управление категориями товаров</p>
        </div>
        <CategoryDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить категорию
          </Button>
        </CategoryDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все категории</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesTable categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  )
}
