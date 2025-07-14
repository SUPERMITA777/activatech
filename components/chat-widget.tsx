"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Minimize2, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatSession {
  id: string
  messages: Message[]
  startTime: Date
  lastActivity: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize chat session
  useEffect(() => {
    if (isOpen && !currentSession) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        messages: [
          {
            id: "1",
            content: "¡Hola! Soy el asistente virtual de ACTIVATECH. ¿En qué puedo ayudarte hoy?",
            sender: "bot",
            timestamp: new Date(),
          },
        ],
        startTime: new Date(),
        lastActivity: new Date(),
      }
      setCurrentSession(newSession)
    }
  }, [isOpen, currentSession])

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("activatech-chat-history")
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        lastActivity: new Date(session.lastActivity),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }))
      setChatHistory(parsedHistory)
    }
  }, [])

  // Save to localStorage when session updates
  useEffect(() => {
    if (currentSession && currentSession.messages.length > 1) {
      const updatedHistory = [...chatHistory.filter((s) => s.id !== currentSession.id), currentSession]
      setChatHistory(updatedHistory)
      localStorage.setItem("activatech-chat-history", JSON.stringify(updatedHistory))
    }
  }, [currentSession])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession?.messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentSession) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      lastActivity: new Date(),
    }
    setCurrentSession(updatedSession)
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, botMessage],
        lastActivity: new Date(),
      }
      setCurrentSession(finalSession)
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Knowledge base responses
    if (input.includes("precio") || input.includes("costo") || input.includes("cuanto")) {
      return "Nuestros precios varían según el producto. Los amplificadores van desde $899 hasta $2,499. ¿Te interesa algún producto en particular?"
    }

    if (input.includes("amplificador") || input.includes("amplificadores")) {
      return "Tenemos varios amplificadores profesionales: Pro X1 ($1,299), Digital HD ($899), y más. Todos con garantía y soporte técnico. ¿Necesitas especificaciones técnicas?"
    }

    if (input.includes("sistema") || input.includes("sistemas")) {
      return "Nuestro Sistema Elite 5.1 ($2,499) es perfecto para instalaciones permanentes. Incluye configuración 5.1 canales y 3000W de potencia total."
    }

    if (input.includes("parlante") || input.includes("parlantes") || input.includes("monitor")) {
      return "Los Parlantes Studio Monitor ($649) son ideales para grabación profesional. Woofer de 8 pulgadas y respuesta de 35Hz-22kHz."
    }

    if (input.includes("garantia") || input.includes("garantía")) {
      return "Todos nuestros productos incluyen garantía de 2 años y soporte técnico especializado. También ofrecemos servicio de instalación."
    }

    if (input.includes("instalacion") || input.includes("instalación")) {
      return "Ofrecemos servicio de instalación profesional para todos nuestros productos. Nuestro equipo técnico se encarga de la configuración completa."
    }

    if (input.includes("contacto") || input.includes("telefono") || input.includes("teléfono")) {
      return "Puedes contactarnos al +1 (555) 123-4567 o por email a info@activatech.com. Horario: Lun-Vie 9AM-6PM, Sáb 10AM-4PM."
    }

    if (input.includes("hola") || input.includes("buenos") || input.includes("buenas")) {
      return "¡Hola! Bienvenido a ACTIVATECH. Somos especialistas en equipos de audio profesional. ¿En qué producto estás interesado?"
    }

    if (input.includes("gracias")) {
      return "¡De nada! Estoy aquí para ayudarte con cualquier consulta sobre nuestros productos de audio profesional."
    }

    // Default response
    return "Entiendo tu consulta. Te recomiendo contactar a nuestro equipo técnico para una asesoría personalizada. ¿Te gustaría que te proporcione nuestros datos de contacto?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const loadChatSession = (session: ChatSession) => {
    setCurrentSession(session)
    setShowHistory(false)
  }

  const startNewChat = () => {
    setCurrentSession(null)
    setShowHistory(false)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 hover:from-green-500 hover:via-cyan-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-6 h-6 text-black" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-80 bg-gray-900/95 border-gray-700 backdrop-blur-md transition-all duration-300 ${
          isMinimized ? "h-16" : "h-96"
        }`}
      >
        <CardHeader className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-purple-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <CardTitle className="text-sm text-white">Asistente ACTIVATECH</CardTitle>
                <p className="text-xs text-green-400">En línea</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-gray-400 hover:text-white"
                onClick={() => setShowHistory(!showHistory)}
                title="Historial de conversaciones"
              >
                <History className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-gray-400 hover:text-white"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-gray-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {showHistory ? (
              <div className="flex-1 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold">Historial de Conversaciones</h3>
                  <Button
                    size="sm"
                    onClick={startNewChat}
                    className="bg-gradient-to-r from-green-400 to-purple-500 text-black text-xs"
                  >
                    Nueva Conversación
                  </Button>
                </div>
                <ScrollArea className="h-60">
                  <div className="space-y-2">
                    {chatHistory.length === 0 ? (
                      <p className="text-gray-400 text-sm text-center py-8">No hay conversaciones anteriores</p>
                    ) : (
                      chatHistory
                        .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
                        .map((session) => (
                          <div
                            key={session.id}
                            onClick={() => loadChatSession(session)}
                            className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-white text-sm font-medium">
                                  {session.messages[1]?.content.substring(0, 30) || "Nueva conversación"}...
                                </p>
                                <p className="text-gray-400 text-xs">{session.messages.length} mensajes</p>
                              </div>
                              <p className="text-gray-400 text-xs">{session.lastActivity.toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentSession?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-green-400 to-purple-500 text-black"
                              : "bg-gray-800 text-white"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 text-cyan-400" />}
                            {message.sender === "user" && <User className="w-4 h-4 mt-0.5" />}
                            <div>
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === "user" ? "text-black/70" : "text-gray-400"
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-800 text-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4 text-cyan-400" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje..."
                      className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-to-r from-green-400 to-purple-500 hover:from-green-500 hover:to-purple-600 text-black"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}
