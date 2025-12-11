import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Проверка прав администратора
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

    const body = await request.json()
    const { categoryId, products } = body

    if (!categoryId || !Array.isArray(products)) {
      return NextResponse.json(
        { error: "Invalid request. categoryId and products array required" },
        { status: 400 }
      )
    }

    // Проверяем, что все товары принадлежат указанной категории
    const productIds = products.map((p: any) => p.product_id)
    const { data: existingProducts, error: checkError } = await supabase
      .from("products")
      .select("id, category_id")
      .in("id", productIds)

    if (checkError) {
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    const invalidProducts = existingProducts?.filter(
      (p) => p.category_id !== categoryId
    )

    if (invalidProducts && invalidProducts.length > 0) {
      return NextResponse.json(
        { error: "Some products don't belong to this category" },
        { status: 400 }
      )
    }

    // Обновляем позиции в транзакции
    const updates = products.map((item: { product_id: string; position: number }) => ({
      id: item.product_id,
      position: item.position,
    }))

    for (const update of updates) {
      const { error } = await supabase
        .from("products")
        .update({ position: update.position })
        .eq("id", update.id)
        .eq("category_id", categoryId)

      if (error) {
        console.error("Error updating product position:", error)
        return NextResponse.json(
          { error: "Failed to update product positions" },
          { status: 500 }
        )
      }
    }

    // Возвращаем обновленный список товаров
    const { data: updatedProducts } = await supabase
      .from("products")
      .select("id, position")
      .in("id", productIds)
      .eq("category_id", categoryId)
      .order("position", { ascending: true })

    return NextResponse.json({
      success: true,
      products: updatedProducts,
    })
  } catch (error) {
    console.error("Reorder error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

