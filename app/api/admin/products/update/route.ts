import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Проверка прав администратора через обычный клиент
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: admin } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (!admin || !admin.is_active) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Получаем данные товара
    const body = await request.json()
    const { productId, productData } = body

    if (!productId || !productData) {
      return NextResponse.json(
        { error: "Invalid request. productId and productData required" },
        { status: 400 }
      )
    }

    // Используем admin client (service role) - он не использует кэш схемы
    const adminClient = createAdminClient()
    
    // Обновляем товар через admin client
    const { data, error } = await adminClient
      .from("products")
      .update(productData)
      .eq("id", productId)
      .select()
      .single()

    if (error) {
      console.error("Error updating product:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      product: data,
    })
  } catch (error: any) {
    console.error("Update product error:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

