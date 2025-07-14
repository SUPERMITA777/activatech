"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download, Eye, Zap, Volume2, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Product {
  id: string
  name: string
  category: string
  description: string
  specs: string
  price_usd: number
  price_ars: number
  image_url: string
  download_link: string
}

const categories = ["Todos", "Amplificadores", "Sistemas", "Parlantes", "Mezcladoras", "Subwoofers"]

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

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

  const filteredProducts =
    selectedCategory === "Todos" ? products : products.filter((product) => product.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Amplificadores":
        return <Zap className="w-4 h-4" />
      case "Sistemas":
        return <Volume2 className="w-4 h-4" />
      case "Parlantes":
        return <Radio className="w-4 h-4" />
      default:
        return <Volume2 className="w-4 h-4" />
    }
  }

  const formatPrice = (usd: number, ars: number) => {
    return (
      <div className="text-right">
        <div className="text-2xl font-bold text-white">${usd}</div>
        <div className="text-sm text-gray-400">${ars?.toLocaleString("es-AR")} ARS</div>
      </div>
    )
  }

  if (loading) {
    return (
      <section id="productos" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Nuestros Productos
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="productos" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Nuestros Productos
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre nuestra línea completa de equipos de audio profesional, diseñados para ofrecer la máxima calidad y
            rendimiento.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                "border-purple-500/30 text-gray-300 hover:border-transparent hover:bg-gradient-to-r hover:from-green-400/20 hover:to-purple-500/20 " +
                (selectedCategory === category
                  ? "bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 text-black font-semibold border-transparent"
                  : "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500")
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-gray-900/50 border-gray-700 hover:border-transparent hover:bg-gradient-to-r hover:from-green-400/10 hover:to-purple-500/10 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/25"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=300&width=400"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-green-400/20 to-purple-500/20 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 border-purple-500/30">
                    {getCategoryIcon(product.category)}
                    <span className="ml-1">{product.category}</span>
                  </Badge>
                  <div className="absolute top-4 right-4">{formatPrice(product.price_usd, product.price_ars)}</div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl text-white mb-2">{product.name}</CardTitle>
                <CardDescription className="text-gray-300 mb-4">{product.description}</CardDescription>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black bg-transparent"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ficha Técnica
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-cyan-400">{product.name}</DialogTitle>
                        <DialogDescription className="text-gray-300">
                          Especificaciones técnicas detalladas
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative h-48 rounded-lg overflow-hidden">
                          <Image
                            src={product.image_url || "/placeholder.svg?height=300&width=400"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-2xl font-bold text-white">${product.price_usd} USD</p>
                            <p className="text-gray-400">${product.price_ars?.toLocaleString("es-AR")} ARS</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-cyan-400 mb-2">Especificaciones:</h4>
                          <pre className="text-sm text-gray-300 whitespace-pre-line bg-black/30 p-4 rounded">
                            {product.specs}
                          </pre>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/30 text-green-400 hover:bg-green-500 hover:text-black bg-transparent"
                    asChild
                  >
                    <a href={product.download_link} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Manual
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
