// src/hooks/useChat.ts
import { useEffect, useState } from 'react'
import { socketService } from '../api/socket'
import { useUserStore } from '../store/useUserStore'
import type { Message } from '../types/index'

export const useChat = (appointmentId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState<string | null>(null)
  const { token } = useUserStore()

  useEffect(() => {
    if (!token || !appointmentId) return

    const socket = socketService.connect(token)

    socket.emit('join_room', appointmentId)

    socket.on('chat_history', (history: Message[]) => {
      setMessages(history)
    })

    socket.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    socket.on('user_typing', (data: { userId: string; name: string; isTyping: boolean }) => {
      setIsTyping(data.isTyping)
      setTypingUser(data.isTyping ? data.name : null)
    })

    socket.on('error', (error: { message: string }) => {
      console.error('Chat error:', error.message)
    })

    return () => {
      socket.off('chat_history')
      socket.off('receive_message')
      socket.off('user_typing')
      socket.off('error')
    }
  }, [appointmentId, token])

  const sendMessage = (message: string) => {
    if (!appointmentId) return
    socketService.emit('send_message', { appointmentId, message })
  }

  const sendTypingStatus = (isTyping: boolean) => {
    if (!appointmentId) return
    socketService.emit('typing', { appointmentId, isTyping })
  }

  return { messages, sendMessage, isTyping, typingUser, sendTypingStatus }
}

