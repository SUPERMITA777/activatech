"use client"

import { useState, useEffect } from "react"
import { Plus, Package, Video, LogOut, Edit, Trash2, MessageCircle, Users, Settings, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductForm } from "./product-form"
import { VideoForm } from "./video-form"
import Image from "next/image"
import { ChatTraining } from "./chat-training"
import { ChatHistory } from "./chat-history"
import { UserManagement } from "./user-management"
import { InstagramManagement } from "./instagram-management"
import { ContactManagement } from "./contact-management"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  category: string
  price_usd: number
  price_ars: number
  is_active: boolean
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products")
  const [showProductForm, setShowProductForm] = useState(false)
  const [showVideoForm, setShowVideoForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts()
    }
  }, [activeTab])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`)
      if (response.ok) {
        const product = await response.json()
        setEditingProduct(product)
        setShowProductForm(true)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar el producto para editar.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Producto eliminado",
          description: "El producto ha sido eliminado exitosamente.",
        })
        fetchProducts()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto.",
        variant: "destructive",
      })
    }
  }

  const handleProductFormClose = () => {
    setShowProductForm(false)
    setEditingProduct(null)
  }

  const handleProductSave = () => {
    fetchProducts()
  }

  const mockVideos = [
    { id: 1, title: "Amplificador Pro X1 - Demo", platform: "YouTube" },
    { id: 2, title: "Instalación Sistema Elite", platform: "YouTube" },
    { id: 3, title: "Setup Profesional", platform: "TikTok" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="ACTIVATECH Logo" width={32} height={32} className="rounded-full" />
              <span className="text-lg font-bold bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                ACTIVATECH Admin
              </span>
            </div>
            <Button
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-gray-900">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-purple-500 data-[state=active]:text-black"
            >
              <Package className="w-4 h-4 mr-2" />
              Productos
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-purple-500 data-[state=active]:text-black"
            >
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-purple-500 data-[state=active]:text-black"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat IA
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-purple-500 data-[state=active]:text-black"
            >
              <Users className="w-4 h-4 mr-2" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger
              value="instagram"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-purple-500 data-[state=active]:text-black"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-purple-500 data-[state=active]:text-black"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Productos</h2>
              <Button
                onClick={() => setShowProductForm(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>

            {showProductForm && (
              <ProductForm
                product={editingProduct || undefined}
                onClose={handleProductFormClose}
                onSave={handleProductSave}
              />
            )}

            {loading ? (
              <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-800 rounded-lg h-20 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="bg-gray-900 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                          <p className="text-gray-400">
                            {product.category} • ${product.price_usd} USD • $
                            {product.price_ars?.toLocaleString("es-AR")} ARS
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cyan-500 text-cyan-400 bg-transparent"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-400 bg-transparent"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Videos</h2>
              <Button
                onClick={() => setShowVideoForm(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Video
              </Button>
            </div>

            {showVideoForm && <VideoForm onClose={() => setShowVideoForm(false)} />}

            <div className="grid gap-4">
              {mockVideos.map((video) => (
                <Card key={video.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                        <p className="text-gray-400">{video.platform}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 bg-transparent">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-500 text-red-400 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Tabs defaultValue="training" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="training">Entrenamiento</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
              </TabsList>
              <TabsContent value="training">
                <ChatTraining />
              </TabsContent>
              <TabsContent value="history">
                <ChatHistory />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="instagram" className="space-y-6">
            <InstagramManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <ContactManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
