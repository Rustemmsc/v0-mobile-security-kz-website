"use server"

import { createClient as createBrowserClient } from "@/lib/supabase/server"
import { createClient } from "@supabase/supabase-js"

export async function createFirstAdmin(email: string, password: string) {
  console.log("[v0] Server: Creating first admin", email)

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    // Service role client bypasses RLS
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check if any admins exist
    const { data: existingAdmins, error: checkError } = await supabaseAdmin.from("admin_users").select("id").limit(1)

    console.log("[v0] Server: Existing admins check", { existingAdmins, checkError })

    if (existingAdmins && existingAdmins.length > 0) {
      return {
        success: false,
        error: "Администратор уже существует. Используйте страницу входа.",
      }
    }

    // Create auth user using admin client
    console.log("[v0] Server: Creating auth user")
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    })

    console.log("[v0] Server: Auth result", { authData, authError })

    if (authError) {
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: "Не удалось создать пользователя" }
    }

    // Insert into admin_users using service role (bypasses RLS)
    console.log("[v0] Server: Inserting into admin_users table")
    const { error: adminError } = await supabaseAdmin.from("admin_users").insert({
      id: authData.user.id,
      email: email,
      role: "super_admin",
      full_name: "Super Admin",
    })

    console.log("[v0] Server: Admin insert result", { adminError })

    if (adminError) {
      return {
        success: false,
        error: `Ошибка добавления администратора: ${adminError.message}`,
      }
    }

    // Sign in the user using regular client
    console.log("[v0] Server: Signing in user")
    const supabase = await createBrowserClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("[v0] Server: Sign in result", { signInError })

    if (signInError) {
      return {
        success: true,
        message: "Администратор создан. Войдите используя созданные данные.",
        needsLogin: true,
      }
    }

    return {
      success: true,
      message: "Администратор создан и вход выполнен успешно!",
      userId: authData.user.id,
    }
  } catch (error: any) {
    console.error("[v0] Server: Setup error", error)
    return {
      success: false,
      error: error.message || "Произошла неизвестная ошибка",
    }
  }
}
