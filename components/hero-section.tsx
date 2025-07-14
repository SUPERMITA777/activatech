"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Volume2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroProducts = [
  {
    id: 1,
    name: "Amplificador Pro X1",
    image: "/placeholder.svg?height=600&width=800",
    description: "Potencia profesional para eventos de gran escala",
  },
  {
    id: 2,
    name: "Sistema de Sonido Elite",
    image: "/placeholder.svg?height=600&width=800",
    description: "Calidad de audio excepcional para profesionales",
  },
  {
    id: 3,
    name: "Amplificador Digital HD",
    image: "/placeholder.svg?height=600&width=800",
    description: "Tecnología digital de última generación",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length)
  }

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-cyan-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Volume2 className="w-8 h-8 text-cyan-400 mr-3" />
              <span className="text-cyan-400 font-semibold">ACTIVATECH</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Potencia tu</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Sonido
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Equipos de audio profesional de última generación. Amplificadores y sistemas de sonido para eventos,
              estudios y instalaciones permanentes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600 hover:from-green-500 hover:via-cyan-600 hover:to-blue-700 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Ver Productos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-transparent bg-gradient-to-r from-green-400 to-purple-500 p-[2px] hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <span className="bg-black px-6 py-2 rounded-md text-transparent bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text hover:bg-gray-900 transition-colors duration-300">
                  Contactar Ahora
                </span>
              </Button>
            </div>
          </div>

          {/* Product Slider */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden border border-cyan-500/20">
              {heroProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-300">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Slider Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {heroProducts.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-cyan-400" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
