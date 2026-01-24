import { useEffect, useState, useCallback } from 'react'
import { socketService } from '@/api/socket'
import { useUserStore } from '@/store/useUserStore'
import type { Message } from '@/types'

export const useChat = (appointmentId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState<string | null>(null)
  const { token } = useUserStore()

  useEffect(() => {
    if (!token || !appointmentId) {
      console.log('⚠️ Chat not initialized:', { hasToken: !!token, appointmentId })
      return
    }

    console.log('💬 Initializing chat for appointment:', appointmentId)
    
    const socket = socketService.connect(token)

    // Join room
    socketService.emit('join_room', appointmentId)
    console.log('📡 Joined room:', appointmentId)

    // Listen for chat history
    const handleChatHistory = (history: Message[]) => {
      console.log('📜 Chat history received:', history.length, 'messages')
      setMessages(history)
    }

    // Listen for new messages
    const handleReceiveMessage = (message: Message) => {
      console.log('📨 New message received:', message)
      setMessages((prev) => [...prev, message])
    }

    // Listen for typing indicators
    const handleUserTyping = (data: { userId: string; name: string; isTyping: boolean }) => {
      console.log('✍️ Typing status:', data)
      setIsTyping(data.isTyping)
      setTypingUser(data.isTyping ? data.name : null)
    }

    // Listen for errors
    const handleError = (error: { message: string }) => {
      console.error('❌ Chat error:', error.message)
    }

    socket.on('chat_history', handleChatHistory as never)
    socket.on('receive_message', handleReceiveMessage as never)
    socket.on('user_typing', handleUserTyping as never)
    socket.on('error', handleError as never)

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up chat listeners')
      socket.off('chat_history', handleChatHistory as never)
      socket.off('receive_message', handleReceiveMessage as never)
      socket.off('user_typing', handleUserTyping as never)
      socket.off('error', handleError as never)
    }
  }, [appointmentId, token])

  const sendMessage = useCallback((message: string) => {
    if (!appointmentId) {
      console.warn('⚠️ Cannot send message: No appointment selected')
      return
    }
    console.log('📤 Sending message:', message)
    socketService.emit('send_message', { appointmentId, message })
  }, [appointmentId])

  const sendTypingStatus = useCallback((isTyping: boolean) => {
    if (!appointmentId) return
    socketService.emit('typing', { appointmentId, isTyping })
  }, [appointmentId])

  return { messages, sendMessage, isTyping, typingUser, sendTypingStatus }
}