"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Save, MessageCircle, Brain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface TrainingData {
  id: string
  question: string
  answer: string
  keywords: string[]
  category: string
  isActive: boolean
}

const mockTrainingData: TrainingData[] = [
  {
    id: "1",
    question: "¿Cuáles son los precios de los amplificadores?",
    answer:
      "Nuestros amplificadores van desde $899 (Digital HD) hasta $1,299 (Pro X1). Todos incluyen garantía de 2 años.",
    keywords: ["precio", "costo", "amplificador", "cuanto"],
    category: "Precios",
    isActive: true,
  },
  {
    id: "2",
    question: "¿Qué garantía tienen los productos?",
    answer:
      "Todos nuestros productos incluyen garantía de 2 años y soporte técnico especializado. También ofrecemos servicio de instalación.",
    keywords: ["garantia", "garantía", "soporte", "servicio"],
    category: "Garantía",
    isActive: true,
  },
  {
    id: "3",
    question: "¿Cómo puedo contactarlos?",
    answer:
      "Puedes contactarnos al +1 (555) 123-4567 o por email a info@activatech.com. Horario: Lun-Vie 9AM-6PM, Sáb 10AM-4PM.",
    keywords: ["contacto", "telefono", "teléfono", "email", "horario"],
    category: "Contacto",
    isActive: true,
  },
]

export function ChatTraining() {
  const [trainingData, setTrainingData] = useState<TrainingData[]>(mockTrainingData)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<TrainingData | null>(null)
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    keywords: "",
    category: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const keywords = formData.keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k)

    if (editingItem) {
      // Update existing item
      setTrainingData((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...item, ...formData, keywords } : item)),
      )
      toast({
        title: "Entrenamiento actualizado",
        description: "La respuesta del chat ha sido actualizada exitosamente.",
      })
    } else {
      // Add new item
      const newItem: TrainingData = {
        id: Date.now().toString(),
        ...formData,
        keywords,
        isActive: true,
      }
      setTrainingData((prev) => [...prev, newItem])
      toast({
        title: "Entrenamiento agregado",
        description: "Nueva respuesta agregada al chat exitosamente.",
      })
    }

    setFormData({ question: "", answer: "", keywords: "", category: "" })
    setEditingItem(null)
    setShowForm(false)
  }

  const handleEdit = (item: TrainingData) => {
    setEditingItem(item)
    setFormData({
      question: item.question,
      answer: item.answer,
      keywords: item.keywords.join(", "),
      category: item.category,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setTrainingData((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Entrenamiento eliminado",
      description: "La respuesta ha sido eliminada del chat.",
    })
  }

  const toggleActive = (id: string) => {
    setTrainingData((prev) => prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)))
  }

  const categories = [...new Set(trainingData.map((item) => item.category))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Entrenamiento del Chat IA</h2>
          <p className="text-gray-400">Configura las respuestas automáticas del asistente virtual</p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null)
            setFormData({ question: "", answer: "", keywords: "", category: "" })
            setShowForm(true)
          }}
          className="bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 hover:from-green-500 hover:via-cyan-600 hover:to-purple-700 text-black font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Respuesta
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{trainingData.length}</p>
                <p className="text-gray-400">Respuestas Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-cyan-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{trainingData.filter((item) => item.isActive).length}</p>
                <p className="text-gray-400">Respuestas Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageCircle className="w-8 h-8 text-purple-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{categories.length}</p>
                <p className="text-gray-400">Categorías</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Form */}
      {showForm && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">{editingItem ? "Editar Respuesta" : "Nueva Respuesta"}</CardTitle>
            <CardDescription className="text-gray-300">
              Configura cómo debe responder el asistente virtual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pregunta de Ejemplo</label>
                  <Input
                    value={formData.question}
                    onChange={(e) => setFormData((prev) => ({ ...prev, question: e.target.value }))}
                    placeholder="¿Cuál es el precio del amplificador?"
                    required
                    className="bg-black/30 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="Precios, Garantía, Contacto..."
                    required
                    className="bg-black/30 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Palabras Clave (separadas por comas)
                </label>
                <Input
                  value={formData.keywords}
                  onChange={(e) => setFormData((prev) => ({ ...prev, keywords: e.target.value }))}
                  placeholder="precio, costo, cuanto, amplificador"
                  required
                  className="bg-black/30 border-gray-600 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  El bot activará esta respuesta cuando detecte estas palabras
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Respuesta del Bot</label>
                <Textarea
                  value={formData.answer}
                  onChange={(e) => setFormData((prev) => ({ ...prev, answer: e.target.value }))}
                  placeholder="Nuestros amplificadores van desde $899 hasta $1,299..."
                  required
                  rows={4}
                  className="bg-black/30 border-gray-600 text-white resize-none"
                />
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
                  {editingItem ? "Actualizar" : "Guardar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Training Data List */}
      <div className="space-y-4">
        {trainingData.map((item) => (
          <Card key={item.id} className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge
                      variant="outline"
                      className={`${
                        item.isActive ? "border-green-500 text-green-400" : "border-gray-500 text-gray-400"
                      }`}
                    >
                      {item.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${item.isActive ? "border-cyan-500 text-cyan-400" : "border-gray-500 text-gray-400"}`}
                    >
                      {item.isActive ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{item.question}</h3>
                  <p className="text-gray-300 mb-3">{item.answer}</p>

                  <div className="flex flex-wrap gap-1">
                    {item.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(item.id)}
                    className={`${
                      item.isActive ? "border-yellow-500 text-yellow-400" : "border-green-500 text-green-400"
                    } bg-transparent`}
                  >
                    {item.isActive ? "Desactivar" : "Activar"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="border-cyan-500 text-cyan-400 bg-transparent"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="border-red-500 text-red-400 bg-transparent"
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
