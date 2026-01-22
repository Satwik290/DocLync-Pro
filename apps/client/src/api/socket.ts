import { io, Socket } from 'socket.io-client'

// 1. Define your event interfaces
interface ServerToClientEvents {
  messageReceived: (data: { roomId: string; message: string; senderId: string }) => void;
  error: (err: { message: string }) => void;
}

interface ClientToServerEvents {
  sendMessage: (data: { roomId: string; message: string }) => void;
  joinRoom: (roomId: string) => void;
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

  // Use the eslint-disable comments right above the lines using 'any'
  emit<K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0]
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.socket?.emit(event as any, data as any)
  }

  on<K extends keyof ServerToClientEvents>(
    event: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: any
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.socket?.on(event as any, callback)
  }

  off<K extends keyof ServerToClientEvents>(
    event: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback?: any
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.socket?.off(event as any, callback)
  }
}

export const socketService = new SocketService()