import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Shield, User, Bell, Database } from "lucide-react"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/auth/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground">Управление настройками системы и вашего профиля</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Профиль пользователя */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Профиль администратора</CardTitle>
            </div>
            <CardDescription>Информация о вашей учетной записи</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div>
              <Label>ID пользователя</Label>
              <p className="text-sm font-mono text-muted-foreground">{user.id}</p>
            </div>
            <Button variant="outline">Изменить пароль</Button>
          </CardContent>
        </Card>

        {/* Безопасность */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Безопасность</CardTitle>
            </div>
            <CardDescription>Настройки безопасности системы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Двухфакторная аутентификация</Label>
              <p className="text-sm text-muted-foreground">Не настроена</p>
            </div>
            <div>
              <Label>Последний вход</Label>
              <p className="text-sm text-muted-foreground">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString("ru-RU") : "Н/Д"}
              </p>
            </div>
            <Button variant="outline">Настроить 2FA</Button>
          </CardContent>
        </Card>

        {/* Уведомления */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Уведомления</CardTitle>
            </div>
            <CardDescription>Настройка оповещений о заказах</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email уведомления о новых заказах</Label>
              <p className="text-sm text-muted-foreground">Включены</p>
            </div>
            <div>
              <Label>Уведомления о низком остатке товара</Label>
              <p className="text-sm text-muted-foreground">Включены</p>
            </div>
            <Button variant="outline">Настроить уведомления</Button>
          </CardContent>
        </Card>

        {/* База данных */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>База данных</CardTitle>
            </div>
            <CardDescription>Информация о подключении</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Статус подключения</Label>
              <p className="text-sm text-green-600">Подключено к Supabase</p>
            </div>
            <div>
              <Label>Проект</Label>
              <p className="text-sm text-muted-foreground">MobileSecurity.kz</p>
            </div>
            <Button variant="outline">Резервное копирование</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
