"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    company: "Eventos Premium",
    role: "Director Técnico",
    content:
      "Los amplificadores de ACTIVATECH han transformado completamente nuestros eventos. La calidad de sonido es excepcional y la confiabilidad es incomparable.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "María González",
    company: "Estudio Sonoro",
    role: "Ingeniera de Audio",
    content:
      "Trabajo con equipos ACTIVATECH desde hace 3 años. La precisión y claridad que ofrecen sus monitores de estudio es simplemente perfecta para nuestras producciones.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Roberto Silva",
    company: "Club Nocturno Eclipse",
    role: "Gerente General",
    content:
      "El sistema de sonido que instalamos ha sido la mejor inversión. Nuestros clientes siempre comentan sobre la calidad del audio. Excelente servicio post-venta.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Ana Rodríguez",
    company: "Iglesia San Miguel",
    role: "Coordinadora de Medios",
    content:
      "La instalación fue perfecta y el equipo funciona de manera impecable cada domingo. El soporte técnico de ACTIVATECH es excepcional.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Lo Que Dicen Nuestros Clientes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro. Conoce sus experiencias con nuestros productos.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ${
                    index === currentTestimonial ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                >
                  <div className="p-8 md:p-12">
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400/20 to-purple-500/20 flex items-center justify-center">
                        <Quote className="w-12 h-12 text-transparent bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text" />
                      </div>
                    </div>

                    <blockquote className="text-xl md:text-2xl text-center text-gray-200 mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="flex items-center justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <div className="flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-full bg-cover bg-center mr-4"
                        style={{ backgroundImage: `url(${testimonial.image})` }}
                      />
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-cyan-400">{testimonial.role}</p>
                        <p className="text-gray-400 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-gradient-to-r from-green-400 to-purple-500"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
