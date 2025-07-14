"use client"

import type React from "react"

import { useState } from "react"
import { Save, Phone, Clock, Globe, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface ContactInfo {
  phone: string
  email: string
  address: string
  city: string
  country: string
  website: string
  businessHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
  }
}

const initialContactInfo: ContactInfo = {
  phone: "+1 (555) 123-4567",
  email: "info@activatech.com",
  address: "Av. Tecnología 123",
  city: "Ciudad de México, México",
  country: "México",
  website: "https://activatech.com",
  businessHours: {
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM",
    wednesday: "9:00 AM - 6:00 PM",
    thursday: "9:00 AM - 6:00 PM",
    friday: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Cerrado",
  },
  socialMedia: {
    facebook: "https://facebook.com/activatech",
    instagram: "https://instagram.com/activatech",
    twitter: "https://twitter.com/activatech",
    youtube: "https://youtube.com/@activatech",
  },
}

export function ContactManagement() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would save to database here
    localStorage.setItem("activatech-contact-info", JSON.stringify(contactInfo))

    setIsLoading(false)
    toast({
      title: "Información actualizada",
      description: "Los datos de contacto han sido guardados exitosamente.",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleBusinessHoursChange = (day: string, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: value,
      },
    }))
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Configuración de Contacto</h2>
        <p className="text-gray-400">Administra la información de contacto que se muestra en el sitio web</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Contact Information */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Información Básica
            </CardTitle>
            <CardDescription className="text-gray-300">Datos principales de contacto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                <Input
                  value={contactInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="info@activatech.com"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dirección</label>
              <Input
                value={contactInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Av. Tecnología 123"
                className="bg-black/30 border-gray-600 text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ciudad</label>
                <Input
                  value={contactInfo.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Ciudad de México, México"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sitio Web</label>
                <Input
                  value={contactInfo.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://activatech.com"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Horarios de Atención
            </CardTitle>
            <CardDescription className="text-gray-300">
              Configura los horarios de atención para cada día de la semana
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(contactInfo.businessHours).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-300 capitalize">
                  {day === "monday" && "Lunes"}
                  {day === "tuesday" && "Martes"}
                  {day === "wednesday" && "Miércoles"}
                  {day === "thursday" && "Jueves"}
                  {day === "friday" && "Viernes"}
                  {day === "saturday" && "Sábado"}
                  {day === "sunday" && "Domingo"}
                </label>
                <Input
                  value={hours}
                  onChange={(e) => handleBusinessHoursChange(day, e.target.value)}
                  placeholder="9:00 AM - 6:00 PM"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Redes Sociales
            </CardTitle>
            <CardDescription className="text-gray-300">Enlaces a las redes sociales de la empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Facebook className="w-4 h-4 mr-2 text-blue-500" />
                  Facebook
                </label>
                <Input
                  value={contactInfo.socialMedia.facebook}
                  onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/activatech"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Instagram className="w-4 h-4 mr-2 text-pink-500" />
                  Instagram
                </label>
                <Input
                  value={contactInfo.socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/activatech"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                  Twitter
                </label>
                <Input
                  value={contactInfo.socialMedia.twitter}
                  onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/activatech"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Youtube className="w-4 h-4 mr-2 text-red-500" />
                  YouTube
                </label>
                <Input
                  value={contactInfo.socialMedia.youtube}
                  onChange={(e) => handleSocialMediaChange("youtube", e.target.value)}
                  placeholder="https://youtube.com/@activatech"
                  className="bg-black/30 border-gray-600 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 hover:from-green-500 hover:via-cyan-600 hover:to-purple-700 text-black font-semibold px-8"
          >
            {isLoading ? (
              "Guardando..."
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Guardar Configuración
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
