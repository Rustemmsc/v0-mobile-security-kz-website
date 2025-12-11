"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  total_amount: number
  currency: string
  status: string
  created_at: string
  items: Array<{ name: string; quantity: number; price: number }>
}

interface OrdersTableProps {
  orders: Order[]
}

const statusColors = {
  pending: "secondary",
  confirmed: "default",
  processing: "default",
  completed: "default",
  cancelled: "destructive",
} as const

const statusLabels = {
  pending: "Ожидает",
  confirmed: "Подтвержден",
  processing: "В обработке",
  completed: "Завершен",
  cancelled: "Отменен",
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const updateStatus = async (orderId: string, newStatus: string) => {
    setIsLoading(orderId)
    const supabase = createClient()

    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId)

    if (error) {
      toast.error("Ошибка при обновлении статуса")
      console.error(error)
    } else {
      toast.success("Статус заказа обновлен")
      router.refresh()
    }

    setIsLoading(null)
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Пока нет заказов</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Клиент</TableHead>
          <TableHead>Контакт</TableHead>
          <TableHead>Сумма</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}</TableCell>
            <TableCell className="font-medium">{order.customer_name}</TableCell>
            <TableCell>
              <div className="space-y-1 text-sm">
                <div>{order.customer_email}</div>
                <div className="text-slate-600">{order.customer_phone}</div>
              </div>
            </TableCell>
            <TableCell className="font-semibold">
              {order.total_amount} {order.currency}
            </TableCell>
            <TableCell>
              <Select
                value={order.status}
                onValueChange={(value) => updateStatus(order.id, value)}
                disabled={isLoading === order.id}
              >
                <SelectTrigger className="w-32">
                  <SelectValue>
                    <Badge variant={statusColors[order.status as keyof typeof statusColors]}>
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{new Date(order.created_at).toLocaleDateString("ru-RU")}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
