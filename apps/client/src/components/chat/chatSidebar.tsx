import { useEffect, useState } from 'react'
import { chatApi } from '@/api/axios'
import type { ChatListItem } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface ChatSidebarProps {
  onSelectChat: (appointmentId: string) => void
  selectedId: string | null
}

export function ChatSidebar({ onSelectChat, selectedId }: ChatSidebarProps) {
  const [chats, setChats] = useState<ChatListItem[]>([])

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await chatApi.get('/list')
        setChats(data)
      } catch (err) {
        console.error('Failed to fetch chats:', err)
      }
    }
    fetchChats()
  }, [])

  return (
    <div className="w-80 border-r bg-card overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <div className="divide-y">
        {chats.map((chat) => (
          <button
            key={chat.appointmentId}
            onClick={() => onSelectChat(chat.appointmentId)}
            className={`w-full p-4 text-left hover:bg-accent transition-colors ${
              selectedId === chat.appointmentId ? 'bg-accent' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">{chat.chatPartner}</h3>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(chat.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

