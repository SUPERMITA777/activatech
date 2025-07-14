"use client"

import { useState } from "react"
import { Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const videos = [
  {
    id: 1,
    title: "Amplificador Pro X1 - Demo Completo",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ", // YouTube video ID
    platform: "youtube",
    description: "Demostración completa del amplificador Pro X1 en acción",
  },
  {
    id: 2,
    title: "Instalación Sistema Elite 5.1",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    platform: "youtube",
    description: "Guía paso a paso para la instalación del sistema Elite 5.1",
  },
  {
    id: 3,
    title: "Comparativa Amplificadores",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    platform: "youtube",
    description: "Comparación entre nuestros diferentes modelos de amplificadores",
  },
  {
    id: 4,
    title: "Setup Profesional en Vivo",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    platform: "tiktok",
    description: "Montaje de equipo profesional para evento en vivo",
  },
]

export function VideosSection() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)

  const getEmbedUrl = (video: (typeof videos)[0]) => {
    if (video.platform === "youtube") {
      return `https://www.youtube.com/embed/${video.embedId}?autoplay=1`
    } else if (video.platform === "tiktok") {
      return `https://www.tiktok.com/embed/v2/${video.embedId}`
    }
    return ""
  }

  return (
    <section id="videos" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Videos y Demos
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mira nuestros productos en acción. Demos, tutoriales y casos de uso reales.
          </p>
        </div>

        {/* Video Player */}
        {selectedVideo && (
          <div className="mb-12">
            <Card className="bg-gray-900/50 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <iframe
                    src={getEmbedUrl(selectedVideo)}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-300">{selectedVideo.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="bg-gray-900/50 border-gray-700 hover:border-transparent hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        video.platform === "youtube" ? "bg-red-500 text-white" : "bg-black text-white"
                      }`}
                    >
                      {video.platform.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black bg-transparent"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Ver Más Videos
          </Button>
        </div>
      </div>
    </section>
  )
}
