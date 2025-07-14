"use client"

import type React from "react"

import { useState } from "react"
import { Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface LoginFormProps {
  onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple authentication check
    // In production, this should verify against the database
    if (credentials.username === "admin" && credentials.password === "admin123") {
      toast({
        title: "Acceso concedido",
        description: "Bienvenido al panel de administración",
      })
      onLogin()
    } else {
      toast({
        title: "Error de autenticación",
        description: "Usuario o contraseña incorrectos. Usa: admin / admin123",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-md bg-gray-900/50 border-gray-700 relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Image src="/logo.png" alt="ACTIVATECH Logo" width={48} height={48} className="rounded-full" />
          </div>
          <CardTitle className="text-2xl text-white">Panel de Administración</CardTitle>
          <CardDescription className="text-gray-300">
            Ingresa tus credenciales para acceder
            <br />
            <span className="text-xs text-cyan-400 mt-2 block">Usuario: admin | Contraseña: admin123</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                name="username"
                type="text"
                placeholder="Usuario"
                value={credentials.username}
                onChange={handleChange}
                required
                className="pl-10 bg-black/30 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={handleChange}
                required
                className="pl-10 bg-black/30 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 hover:from-green-500 hover:via-cyan-600 hover:to-purple-700 text-black font-semibold"
            >
              {isLoading ? "Verificando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
