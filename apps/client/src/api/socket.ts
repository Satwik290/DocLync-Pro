// src/api/socket.ts - FIXED with correct event names
import { io, Socket } from 'socket.io-client'
import type { Message } from '@/types'

// Define event interfaces matching your backend
interface ServerToClientEvents {
  chat_history: (history: Message[]) => void
  receive_message: (message: Message) => void
  user_typing: (data: { userId: string; name: string; isTyping: boolean }) => void
  error: (error: { message: string }) => void
  connect: () => void
  connect_error: (err: Error) => void
}

interface ClientToServerEvents {
  join_room: (appointmentId: string) => void
  send_message: (data: { appointmentId: string; message: string }) => void
  typing: (data: { appointmentId: string; isTyping: boolean }) => void
}

class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

  connect(token: string) {
    if (this.socket?.connected) return this.socket

    this.socket = io('http://localhost:4003', {
      auth: { token },
      autoConnect: true,
    })

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket?.id)
    })

    this.socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message)
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  getSocket() {
    return this.socket
  }

  emit(event: keyof ClientToServerEvents, data: unknown) {
    this.socket?.emit(event, data as never)
  }

  on(event: keyof ServerToClientEvents, callback: (...args: never[]) => void) {
    this.socket?.on(event, callback)
  }

  off(event: keyof ServerToClientEvents, callback?: (...args: never[]) => void) {
    this.socket?.off(event, callback)
  }
}

export const socketService = new SocketService()

