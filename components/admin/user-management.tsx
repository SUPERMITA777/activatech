"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Save, User, Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface AdminUser {
  id: string
  username: string
  email: string
  password: string
  role: "admin" | "editor" | "viewer"
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

const mockUsers: AdminUser[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@activatech.com",
    password: "admin123",
    role: "admin",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    username: "editor1",
    email: "editor@activatech.com",
    password: "editor123",
    role: "editor",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
]

export function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "viewer" as "admin" | "editor" | "viewer",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Update existing user
      setUsers((prev) => prev.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user)))
      toast({
        title: "Usuario actualizado",
        description: "Los datos del usuario han sido actualizados exitosamente.",
      })
    } else {
      // Add new user
      const newUser: AdminUser = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdAt: new Date(),
      }
      setUsers((prev) => [...prev, newUser])
      toast({
        title: "Usuario creado",
        description: "El nuevo usuario ha sido creado exitosamente.",
      })
    }

    setFormData({ username: "", email: "", password: "", role: "viewer" })
    setEditingUser(null)
    setShowForm(false)
  }

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado del sistema.",
    })
  }

  const toggleActive = (id: string) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user)))
  }

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "editor":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "viewer":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Usuarios</h2>
          <p className="text-gray-400">Administra los usuarios del panel de administración</p>
        </div>
        <Button
          onClick={() => {
            setEditingUser(null)
            setFormData({ username: "", email: "", password: "", role: "viewer" })
            setShowForm(true)
          }}
          className="bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 hover:from-green-500 hover:via-cyan-600 hover:to-purple-700 text-black font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-gray-400">Usuarios Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-cyan-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{users.filter((u) => u.isActive).length}</p>
                <p className="text-gray-400">Usuarios Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="w-8 h-8 text-purple-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{users.filter((u) => u.role === "admin").length}</p>
                <p className="text-gray-400">Administradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Form */}
      {showForm && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</CardTitle>
            <CardDescription className="text-gray-300">
              {editingUser ? "Modifica los datos del usuario" : "Crea un nuevo usuario para el panel de administración"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre de Usuario</label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="admin, editor1, etc."
                    required
                    className="bg-black/30 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="usuario@activatech.com"
                    required
                    className="bg-black/30 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="Contraseña segura"
                    required
                    className="bg-black/30 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rol</label>
                  <Select
                    onValueChange={(value: "admin" | "editor" | "viewer") =>
                      setFormData((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger className="bg-black/30 border-gray-600 text-white">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="admin">Administrador - Acceso completo</SelectItem>
                      <SelectItem value="editor">Editor - Puede editar contenido</SelectItem>
                      <SelectItem value="viewer">Visualizador - Solo lectura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-400 to-purple-500 hover:from-green-500 hover:to-purple-600 text-black font-semibold"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingUser ? "Actualizar" : "Crear Usuario"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{user.username}</h3>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${user.isActive ? "border-green-500 text-green-400" : "border-red-500 text-red-400"}`}
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <div className="flex items-center space-x-2">
                        <strong>Contraseña:</strong>
                        <span className="font-mono">{showPasswords[user.id] ? user.password : "••••••••"}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-4 h-4 text-gray-400 hover:text-white"
                          onClick={() => togglePasswordVisibility(user.id)}
                        >
                          {showPasswords[user.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p>
                        <strong>Creado:</strong> {user.createdAt.toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Último acceso:</strong> {user.lastLogin?.toLocaleDateString() || "Nunca"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(user.id)}
                    className={`${
                      user.isActive ? "border-yellow-500 text-yellow-400" : "border-green-500 text-green-400"
                    } bg-transparent`}
                  >
                    {user.isActive ? "Desactivar" : "Activar"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(user)}
                    className="border-cyan-500 text-cyan-400 bg-transparent"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                    className="border-red-500 text-red-400 bg-transparent"
                    disabled={user.username === "admin"} // Protect main admin
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
