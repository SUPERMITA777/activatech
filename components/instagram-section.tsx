"use client"

import { useState, useEffect } from "react"
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface InstagramPost {
  id: string
  instagram_id: string
  image_url: string
  caption: string
  likes: number
  comments: number
  post_url: string
  timestamp: string
  is_visible: boolean
}

export function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInstagramPosts()
  }, [])

  const fetchInstagramPosts = async () => {
    try {
      const response = await fetch("/api/instagram/posts")
      if (response.ok) {
        const data = await response.json()
        setPosts(data.filter((post: InstagramPost) => post.is_visible).slice(0, 4))
      }
    } catch (error) {
      console.error("Error fetching Instagram posts:", error)
      // Fallback to mock data if API fails
      setPosts([
        {
          id: "1",
          instagram_id: "1",
          image_url: "/placeholder.svg?height=300&width=300",
          caption:
            "🔥 Nuevo amplificador Pro X1 en acción! Potencia profesional para tus eventos más importantes. #ACTIVATECH #AudioProfesional",
          likes: 245,
          comments: 18,
          post_url: "https://instagram.com/p/example1",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          is_visible: true,
        },
        {
          id: "2",
          instagram_id: "2",
          image_url: "/placeholder.svg?height=300&width=300",
          caption: "✨ Sistema Elite 5.1 instalado en el nuevo estudio de grabación. Calidad de sonido excepcional! 🎵",
          likes: 189,
          comments: 12,
          post_url: "https://instagram.com/p/example2",
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          is_visible: true,
        },
        {
          id: "3",
          instagram_id: "3",
          image_url: "/placeholder.svg?height=300&width=300",
          caption: "🎧 Monitores de estudio en su máximo esplendor. Perfectos para mezcla y masterización profesional.",
          likes: 156,
          comments: 9,
          post_url: "https://instagram.com/p/example3",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          is_visible: true,
        },
        {
          id: "4",
          instagram_id: "4",
          image_url: "/placeholder.svg?height=300&width=300",
          caption:
            "🚀 Behind the scenes: Instalación de sistema completo para evento corporativo. #EventosProfesionales",
          likes: 203,
          comments: 15,
          post_url: "https://instagram.com/p/example4",
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          is_visible: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d`
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Síguenos en Instagram
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-pink-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Síguenos en Instagram
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Mantente al día con nuestras últimas instalaciones, productos y eventos profesionales.
          </p>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="bg-gray-900/50 border-gray-700 overflow-hidden group hover:border-pink-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => window.open(post.post_url, "_blank")}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundImage: `url(${post.image_url})` }}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="flex items-center justify-center space-x-4 mb-2">
                        <div className="flex items-center">
                          <Heart className="w-5 h-5 mr-1" />
                          <span className="text-sm font-semibold">{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5 mr-1" />
                          <span className="text-sm font-semibold">{post.comments}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-6 h-6 mx-auto" />
                    </div>
                  </div>

                  {/* Time indicator */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatTimeAgo(post.timestamp)}
                  </div>
                </div>

                {/* Caption preview */}
                <div className="p-3">
                  <p className="text-gray-300 text-sm line-clamp-2">{post.caption}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center">
          <Button
            onClick={() => window.open("https://instagram.com/activatech", "_blank")}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Seguir @activatech
          </Button>
        </div>
      </div>
    </section>
  )
}
