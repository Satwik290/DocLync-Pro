// src/api/socket.ts
import { io, Socket } from 'socket.io-client'

class SocketService {
  private socket: Socket | null = null
  
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

  emit(event: string, data: any) {
    this.socket?.emit(event, data)
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback)
  }

  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback)
  }
}

export const socketService = new SocketService()