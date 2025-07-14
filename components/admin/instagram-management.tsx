"use client"

import type React from "react"

import { useState } from "react"
import { Edit, Save, Instagram, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface InstagramConfig {
  id: string
  accountUsername: string
  accessToken: string
  isActive: boolean
  lastSync: Date
  postsCount: number
}

interface InstagramPost {
  id: string
  imageUrl: string
  caption: string
  likes: number
  comments: number
  postUrl: string
  timestamp: Date
  isVisible: boolean
}

const mockConfig: InstagramConfig = {
  id: "1",
  accountUsername: "activatech",
  accessToken: "IGQVJ...", // Truncated for security
  isActive: true,
  lastSync: new Date(),
  postsCount: 24,
}

const mockPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption:
      "🔥 Nuevo amplificador Pro X1 en acción! Potencia profesional para tus eventos más importantes. #ACTIVATECH #AudioProfesional",
    likes: 245,
    comments: 18,
    postUrl: "https://instagram.com/p/example1",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isVisible: true,
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "✨ Sistema Elite 5.1 instalado en el nuevo estudio de grabación. Calidad de sonido excepcional! 🎵",
    likes: 189,
    comments: 12,
    postUrl: "https://instagram.com/p/example2",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isVisible: true,
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "🎧 Monitores de estudio en su máximo esplendor. Perfectos para mezcla y masterización profesional.",
    likes: 156,
    comments: 9,
    postUrl: "https://instagram.com/p/example3",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isVisible: false,
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg?height=300&width=300",
    caption: "🚀 Behind the scenes: Instalación de sistema completo para evento corporativo. #EventosProfesionales",
    likes: 203,
    comments: 15,
    postUrl: "https://instagram.com/p/example4",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    isVisible: true,
  },
]

export function InstagramManagement() {
  const [config, setConfig] = useState<InstagramConfig>(mockConfig)
  const [posts, setPosts] = useState<InstagramPost[]>(mockPosts)
  const [showConfigForm, setShowConfigForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [configForm, setConfigForm] = useState({
    accountUsername: config.accountUsername,
    accessToken: config.accessToken,
  })
  const { toast } = useToast()

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfig((prev) => ({
      ...prev,
      ...configForm,
      lastSync: new Date(),
    }))
    setShowConfigForm(false)
    toast({
      title: "Configuración actualizada",
      description: "La configuración de Instagram ha sido guardada exitosamente.",
    })
  }

  const handleSyncPosts = async () => {
    setIsLoading(true)
    // Simulate API call to Instagram
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setConfig((prev) => ({
      ...prev,
      lastSync: new Date(),
      postsCount: posts.length,
    }))

    setIsLoading(false)
    toast({
      title: "Sincronización completada",
      description: "Los posts de Instagram han sido actualizados.",
    })
  }

  const togglePostVisibility = (postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, isVisible: !post.isVisible } : post)))
  }

  const visiblePosts = posts.filter((post) => post.isVisible)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Instagram</h2>
          <p className="text-gray-400">Configura la integración con Instagram y gestiona los posts mostrados</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleSyncPosts}
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Sincronizando..." : "Sincronizar"}
          </Button>
          <Button
            onClick={() => setShowConfigForm(true)}
            className="bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 hover:from-green-500 hover:via-cyan-600 hover:to-purple-700 text-black font-semibold"
          >
            <Edit className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Instagram className="w-8 h-8 text-pink-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{config.postsCount}</p>
                <p className="text-gray-400">Posts Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <ExternalLink className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{visiblePosts.length}</p>
                <p className="text-gray-400">Posts Visibles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">@</span>
              </div>
              <div>
                <p className="text-lg font-bold text-white">@{config.accountUsername}</p>
                <p className="text-gray-400">Cuenta</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${config.isActive ? "bg-green-400" : "bg-red-400"}`}></div>
              <div>
                <p className="text-lg font-bold text-white">{config.isActive ? "Conectado" : "Desconectado"}</p>
                <p className="text-gray-400">Estado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Form */}
      {showConfigForm && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Configuración de Instagram</CardTitle>
            <CardDescription className="text-gray-300">
              Configura la conexión con tu cuenta de Instagram Business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConfigSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre de Usuario</label>
                <Input
                  value={configForm.accountUsername}
                  onChange={(e) => setConfigForm((prev) => ({ ...prev, accountUsername: e.target.value }))}
                  placeholder="activatech"
                  required
                  className="bg-black/30 border-gray-600 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  El nombre de usuario de tu cuenta de Instagram Business (sin @)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Access Token</label>
                <Textarea
                  value={configForm.accessToken}
                  onChange={(e) => setConfigForm((prev) => ({ ...prev, accessToken: e.target.value }))}
                  placeholder="IGQVJ..."
                  required
                  rows={3}
                  className="bg-black/30 border-gray-600 text-white resize-none font-mono text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Token de acceso de Instagram Basic Display API.
                  <a
                    href="https://developers.facebook.com/docs/instagram-basic-display-api"
                    target="_blank"
                    className="text-cyan-400 hover:underline ml-1"
                    rel="noreferrer"
                  >
                    Ver documentación
                  </a>
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowConfigForm(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Posts Management */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Posts de Instagram</CardTitle>
          <CardDescription className="text-gray-300">
            Gestiona qué posts se muestran en la sección de Instagram del sitio web
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-gray-800 border-gray-600 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.imageUrl})` }}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="outline"
                        className={`${
                          post.isVisible
                            ? "border-green-500 text-green-400 bg-green-500/20"
                            : "border-red-500 text-red-400 bg-red-500/20"
                        }`}
                      >
                        {post.isVisible ? "Visible" : "Oculto"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center justify-between text-white text-sm bg-black/70 rounded px-2 py-1">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">{post.caption}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{post.timestamp.toLocaleDateString()}</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePostVisibility(post.id)}
                          className={`${
                            post.isVisible ? "border-yellow-500 text-yellow-400" : "border-green-500 text-green-400"
                          } bg-transparent text-xs`}
                        >
                          {post.isVisible ? "Ocultar" : "Mostrar"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(post.postUrl, "_blank")}
                          className="border-cyan-500 text-cyan-400 bg-transparent text-xs"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Last Sync Info */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Última sincronización: {config.lastSync.toLocaleString()}</span>
            </div>
            <span className="text-sm text-gray-400">
              Mostrando {visiblePosts.length} de {posts.length} posts
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
