import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "@/components/admin/product-form"
import { notFound } from "next/navigation"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("product_categories").select("*").order("display_order"),
  ])

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Редактировать товар</h1>
        <p className="text-slate-600">Обновите информацию о товаре</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о товаре</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm categories={categories || []} product={product} />
        </CardContent>
      </Card>
    </div>
  )
}
