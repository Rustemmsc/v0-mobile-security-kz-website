import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "@/components/admin/product-form"

export default async function NewProductPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("product_categories").select("*").order("display_order")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Добавить товар</h1>
        <p className="text-slate-600">Создайте новый товар для вашего магазина</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о товаре</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  )
}
