"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Upload, Save, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id?: string
  name: string
  category: string
  description: string
  specs: string
  price_usd: number
  price_ars?: number
  image_url?: string
  download_link: string
}

interface ProductFormProps {
  product?: Product
  onClose: () => void
  onSave: () => void
}

export function ProductForm({ product, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: "",
    category: "",
    description: "",
    specs: "",
    price_usd: 0,
    download_link: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [currencyRate, setCurrencyRate] = useState(1000)
  const { toast } = useToast()

  useEffect(() => {
    if (product) {
      setFormData(product)
    }

    // Fetch current currency rate
    fetchCurrencyRate()
  }, [product])

  const fetchCurrencyRate = async () => {
    try {
      const response = await fetch("/api/currency")
      const { rate } = await response.json()
      setCurrencyRate(rate)
    } catch (error) {
      console.error("Error fetching currency rate:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = product ? `/api/products/${product.id}` : "/api/products"
      const method = product ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save product")

      toast({
        title: product ? "Producto actualizado" : "Producto creado",
        description: `El producto ha sido ${product ? "actualizado" : "creado"} exitosamente.`,
      })

      onSave()
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el producto. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucket", "product-images")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload image")

      const { url } = await response.json()
      setFormData((prev) => ({ ...prev, image_url: url }))

      toast({
        title: "Imagen subida",
        description: "La imagen se ha subido exitosamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo subir la imagen. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price_usd" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const estimatedARS = Math.round(formData.price_usd * currencyRate)

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">{product ? "Editar Producto" : "Nuevo Producto"}</CardTitle>
            <CardDescription className="text-gray-300">
              {product ? "Modifica los datos del producto" : "Agrega un nuevo producto al catálogo"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del Producto</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-black/30 border-gray-600 text-white"
                placeholder="Ej: Amplificador Pro X1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                <SelectTrigger className="bg-black/30 border-gray-600 text-white">
                  <SelectValue placeholder={formData.category || "Selecciona una categoría"} />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="Amplificadores">Amplificadores</SelectItem>
                  <SelectItem value="Sistemas">Sistemas</SelectItem>
                  <SelectItem value="Parlantes">Parlantes</SelectItem>
                  <SelectItem value="Mezcladoras">Mezcladoras</SelectItem>
                  <SelectItem value="Subwoofers">Subwoofers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-black/30 border-gray-600 text-white resize-none"
              placeholder="Descripción breve del producto..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Especificaciones Técnicas</label>
            <Textarea
              name="specs"
              value={formData.specs}
              onChange={handleChange}
              required
              rows={4}
              className="bg-black/30 border-gray-600 text-white resize-none"
              placeholder="Potencia: 2000W RMS&#10;Respuesta de frecuencia: 20Hz - 20kHz&#10;THD: <0.1%&#10;Conexiones: XLR, TRS, RCA"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Precio (USD)
              </label>
              <Input
                name="price_usd"
                type="number"
                step="0.01"
                value={formData.price_usd}
                onChange={handleChange}
                required
                className="bg-black/30 border-gray-600 text-white"
                placeholder="1299.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Precio Estimado (ARS)</label>
              <div className="bg-black/30 border border-gray-600 rounded-md px-3 py-2 text-gray-400">
                ${estimatedARS.toLocaleString("es-AR")}
                <span className="text-xs ml-2">(Tasa: ${currencyRate})</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Link de Descarga (Manual)</label>
            <Input
              name="download_link"
              value={formData.download_link}
              onChange={handleChange}
              className="bg-black/30 border-gray-600 text-white"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Imagen del Producto</label>
            {formData.image_url && (
              <div className="mb-4">
                <img
                  src={formData.image_url || "/placeholder.svg"}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                />
              </div>
            )}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Arrastra una imagen aquí o haz clic para seleccionar</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isUploading}
              />
              <Button
                type="button"
                variant="outline"
                className="border-cyan-500 text-cyan-400 bg-transparent"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={isUploading}
              >
                {isUploading ? "Subiendo..." : "Seleccionar Imagen"}
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isSubmitting ? (
                "Guardando..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {product ? "Actualizar" : "Guardar"} Producto
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
