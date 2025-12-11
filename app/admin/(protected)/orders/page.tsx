import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrdersTable } from "@/components/admin/orders-table"

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Заказы</h1>
        <p className="text-slate-600">Управление заказами клиентов</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все заказы</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders || []} />
        </CardContent>
      </Card>
    </div>
  )
}
