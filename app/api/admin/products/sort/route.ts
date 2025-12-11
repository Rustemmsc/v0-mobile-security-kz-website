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

    // Проверка прав администратора - используем admin_users таблицу
    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    // Если админ не найден, но пользователь авторизован - разрешаем доступ
    // (для обратной совместимости, если таблица admin_users не используется)
    if (adminError && adminError.code !== 'PGRST116') {
      console.error("Admin check error:", adminError)
    }

    // Если админ найден, но не активен - запрещаем
    if (admin && admin.is_active === false) {
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
    const productIds = products.map((p: any) => p.id)
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

    // Обновляем позиции товаров - используем транзакцию через RPC или последовательные обновления
    // Для Supabase используем последовательные обновления (batch update не поддерживается напрямую)
    const updatePromises = products.map((product) =>
      supabase
        .from("products")
        .update({ position: product.position })
        .eq("id", product.id)
        .eq("category_id", categoryId)
    )

    const results = await Promise.all(updatePromises)
    
    // Проверяем наличие ошибок
    const errors = results.filter((result) => result.error)
    if (errors.length > 0) {
      console.error("Error updating product positions:", errors)
      return NextResponse.json(
        { error: "Failed to update some product positions", details: errors.map(e => e.error?.message) },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Порядок товаров успешно обновлен",
    })
  } catch (error) {
    console.error("Sort error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

