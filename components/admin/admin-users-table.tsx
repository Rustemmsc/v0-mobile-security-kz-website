"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Edit } from "lucide-react"

type Admin = {
  id: string
  email: string
  role: "super_admin" | "admin" | "manager" | "editor"
  full_name: string
  created_at: string
}

const roleDescriptions = {
  super_admin: "Полный доступ ко всем функциям",
  admin: "Управление контентом и заказами",
  manager: "Просмотр и редактирование товаров",
  editor: "Редактирование контента сайта",
}

const roleLabels = {
  super_admin: "Супер Администратор",
  admin: "Администратор",
  manager: "Менеджер",
  editor: "Редактор",
}

export function AdminUsersTable() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState<"super_admin" | "admin" | "manager" | "editor">("admin")
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("admin_users").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error loading admins:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить администраторов",
        variant: "destructive",
      })
    } else {
      setAdmins(data || [])
    }
    setLoading(false)
  }

  const handleAddAdmin = async () => {
    if (!email || !password || !fullName) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Ошибка",
        description: "Пароль должен содержать минимум 8 символов",
        variant: "destructive",
      })
      return
    }

    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (authError) throw authError

      if (!authData.user) {
        throw new Error("User creation failed")
      }

      // Add to admin_users table
      const { error: dbError } = await supabase.from("admin_users").insert({
        id: authData.user.id,
        email: email,
        role: role,
        full_name: fullName,
      })

      if (dbError) throw dbError

      toast({
        title: "Успешно",
        description: `Администратор создан. Email: ${email}, Пароль: ${password}`,
        duration: 10000,
      })
      setDialogOpen(false)
      setEmail("")
      setPassword("")
      setFullName("")
      setRole("admin")
      loadAdmins()
    } catch (error: any) {
      console.error("Error adding admin:", error)
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось добавить администратора",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRole = async () => {
    if (!editingAdmin) return

    const { error } = await supabase.from("admin_users").update({ role: role }).eq("id", editingAdmin.id)

    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роль",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Успешно",
        description: "Роль обновлена",
      })
      setEditDialogOpen(false)
      setEditingAdmin(null)
      loadAdmins()
    }
  }

  const openEditDialog = (admin: Admin) => {
    setEditingAdmin(admin)
    setRole(admin.role)
    setEditDialogOpen(true)
  }

  const deleteAdmin = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого администратора?")) {
      return
    }

    const { error } = await supabase.from("admin_users").delete().eq("id", id)

    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить администратора",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Успешно",
        description: "Администратор удален",
      })
      loadAdmins()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Всего администраторов: {admins.length}</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить администратора
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Создать администратора</DialogTitle>
              <DialogDescription>Создайте нового администратора с учетными данными</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="fullName">Полное имя</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Минимум 8 символов"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Сохраните пароль и передайте его новому администратору
                </p>
              </div>
              <div>
                <Label htmlFor="role">Роль</Label>
                <Select value={role} onValueChange={(v: any) => setRole(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">
                      <div>
                        <div className="font-medium">{roleLabels.editor}</div>
                        <div className="text-xs text-muted-foreground">{roleDescriptions.editor}</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div>
                        <div className="font-medium">{roleLabels.manager}</div>
                        <div className="text-xs text-muted-foreground">{roleDescriptions.manager}</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div>
                        <div className="font-medium">{roleLabels.admin}</div>
                        <div className="text-xs text-muted-foreground">{roleDescriptions.admin}</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="super_admin">
                      <div>
                        <div className="font-medium">{roleLabels.super_admin}</div>
                        <div className="text-xs text-muted-foreground">{roleDescriptions.super_admin}</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddAdmin} className="w-full">
                Создать администратора
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменить роль</DialogTitle>
            <DialogDescription>Измените роль для {editingAdmin?.full_name || editingAdmin?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="editRole">Новая роль</Label>
              <Select value={role} onValueChange={(v: any) => setRole(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">{roleLabels.editor}</SelectItem>
                  <SelectItem value="manager">{roleLabels.manager}</SelectItem>
                  <SelectItem value="admin">{roleLabels.admin}</SelectItem>
                  <SelectItem value="super_admin">{roleLabels.super_admin}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">{roleDescriptions[role]}</p>
            </div>
            <Button onClick={handleUpdateRole} className="w-full">
              Сохранить изменения
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Дата создания</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium">{admin.full_name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      admin.role === "super_admin" ? "default" : admin.role === "admin" ? "secondary" : "outline"
                    }
                  >
                    {roleLabels[admin.role]}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(admin.created_at).toLocaleDateString("ru-RU")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(admin)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteAdmin(admin.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
