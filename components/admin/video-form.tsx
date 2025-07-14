"use client"

import type React from "react"

import { useState } from "react"
import { X, Save, Youtube, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface VideoFormProps {
  onClose: () => void
}

export function VideoForm({ onClose }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "",
    videoUrl: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Video guardado",
      description: "El video ha sido agregado exitosamente.",
    })

    setIsSubmitting(false)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Nuevo Video</CardTitle>
            <CardDescription className="text-gray-300">Agrega un nuevo video desde YouTube o TikTok</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Título del Video</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-black/30 border-gray-600 text-white"
              placeholder="Ej: Amplificador Pro X1 - Demo Completo"
            />
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
              placeholder="Descripción del video..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Plataforma</label>
            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, platform: value }))}>
              <SelectTrigger className="bg-black/30 border-gray-600 text-white">
                <SelectValue placeholder="Selecciona la plataforma" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="youtube">
                  <div className="flex items-center">
                    <Youtube className="w-4 h-4 mr-2 text-red-500" />
                    YouTube
                  </div>
                </SelectItem>
                <SelectItem value="tiktok">
                  <div className="flex items-center">
                    <Music className="w-4 h-4 mr-2" />
                    TikTok
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">URL del Video</label>
            <Input
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              required
              className="bg-black/30 border-gray-600 text-white"
              placeholder={
                formData.platform === "youtube"
                  ? "https://www.youtube.com/watch?v=..."
                  : "https://www.tiktok.com/@user/video/..."
              }
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.platform === "youtube"
                ? "Pega la URL completa del video de YouTube"
                : "Pega la URL completa del video de TikTok"}
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isSubmitting ? (
                "Guardando..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Video
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
