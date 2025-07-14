import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image src="/logo.png" alt="ACTIVATECH Logo" width={32} height={32} className="rounded-full" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-400 via-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                ACTIVATECH
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Equipos de audio profesional de última generación para eventos, estudios y instalaciones permanentes.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 hover:bg-clip-text transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 hover:bg-clip-text transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 hover:bg-clip-text transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 hover:bg-clip-text transition-all duration-200"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#productos" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="#videos" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Productos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Amplificadores
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Sistemas de Sonido
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Parlantes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Mezcladoras
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                info@activatech.com
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ACTIVATECH. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
