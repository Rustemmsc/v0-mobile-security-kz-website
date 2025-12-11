import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CategorySelector } from "@/components/admin/category-selector"

export default async function ProductSortPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("product_categories")
    .select("id, name_ru, name_kk, name_en")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Сортировка товаров</h1>
        <p className="text-slate-600">Управляйте порядком отображения товаров в категориях</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Выберите категорию</CardTitle>
        </CardHeader>
        <CardContent>
          <CategorySelector categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  )
}

