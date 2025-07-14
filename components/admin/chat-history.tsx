"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Calendar, User, Bot, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

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
  userQuestions: number
  botResponses: number
}

export function ChatHistory() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("")

  useEffect(() => {
    // Load chat history from localStorage
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
        userQuestions: session.messages.filter((msg: any) => msg.sender === "user").length,
        botResponses: session.messages.filter((msg: any) => msg.sender === "bot").length,
      }))
      setChatSessions(parsedHistory)
    }
  }, [])

  const filteredSessions = chatSessions.filter((session) => {
    const matchesSearch =
      searchTerm === "" || session.messages.some((msg) => msg.content.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDate = filterDate === "" || session.startTime.toDateString() === new Date(filterDate).toDateString()

    return matchesSearch && matchesDate
  })

  const totalSessions = chatSessions.length
  const totalMessages = chatSessions.reduce((acc, session) => acc + session.messages.length, 0)
  const avgMessagesPerSession = totalSessions > 0 ? Math.round(totalMessages / totalSessions) : 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Historial de Conversaciones</h2>
        <p className="text-gray-400">Revisa todas las conversaciones del chat con IA</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageCircle className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{totalSessions}</p>
                <p className="text-gray-400">Conversaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-cyan-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{totalMessages}</p>
                <p className="text-gray-400">Mensajes Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{avgMessagesPerSession}</p>
                <p className="text-gray-400">Promedio por Chat</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar en conversaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/30 border-gray-600 text-white"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="pl-10 bg-black/30 border-gray-600 text-white"
          />
        </div>
        <Button
          onClick={() => {
            setSearchTerm("")
            setFilterDate("")
          }}
          variant="outline"
          className="border-gray-600 text-gray-300"
        >
          <Filter className="w-4 h-4 mr-2" />
          Limpiar
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sessions List */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Conversaciones ({filteredSessions.length})</CardTitle>
            <CardDescription className="text-gray-300">
              Selecciona una conversación para ver los detalles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {filteredSessions.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No se encontraron conversaciones</p>
                ) : (
                  filteredSessions
                    .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
                    .map((session) => (
                      <div
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedSession?.id === session.id
                            ? "bg-cyan-500/20 border border-cyan-500/50"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="text-white font-medium">
                              {session.messages[1]?.content.substring(0, 40) || "Nueva conversación"}...
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {session.userQuestions} preguntas
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {session.botResponses} respuestas
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-xs">{session.lastActivity.toLocaleDateString()}</p>
                            <p className="text-gray-400 text-xs">
                              {session.lastActivity.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Session Details */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {selectedSession ? "Detalles de la Conversación" : "Selecciona una Conversación"}
            </CardTitle>
            {selectedSession && (
              <CardDescription className="text-gray-300">
                Iniciada el {selectedSession.startTime.toLocaleDateString()} a las{" "}
                {selectedSession.startTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {selectedSession ? (
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {selectedSession.messages.map((message) => (
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
                </div>
              </ScrollArea>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Selecciona una conversación para ver los mensajes</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
