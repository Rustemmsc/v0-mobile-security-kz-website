"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Shield } from "lucide-react"
import { createFirstAdmin } from "./actions"
import { useRouter } from "next/navigation"

export default function AdminSetupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Client: Form submitted")

    if (!email || !password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен быть минимум 6 символов",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      console.log("[v0] Client: Calling createFirstAdmin server action")
      const result = await createFirstAdmin(email, password)
      console.log("[v0] Client: Server action result", result)

      if (result.success) {
        toast({
          title: "Успешно!",
          description: result.message,
        })

        if (result.needsLogin) {
          setTimeout(() => {
            router.push("/admin/auth/login")
          }, 2000)
        } else {
          setTimeout(() => {
            router.push("/admin")
          }, 1000)
        }
      } else {
        toast({
          title: "Ошибка",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("[v0] Client: Error", error)
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось создать администратора",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-center">Настройка Админ-панели</h1>
          <p className="text-sm text-muted-foreground text-center mt-2">Создайте первого администратора</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email администратора</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@mobilesecurity.kz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Минимум 6 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Создание...
              </>
            ) : (
              "Создать администратора"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          После создания вы автоматически войдете в систему
        </p>
      </Card>
    </div>
  )
}
