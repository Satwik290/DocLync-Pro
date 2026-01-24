import { useState } from 'react'
import { ChatSidebar } from '@/components/chat/chatSidebar'
import { ChatWindow } from '@/components/chat/chatWindow'

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  return (
    <div className="flex h-screen">
      <ChatSidebar onSelectChat={setSelectedChat} selectedId={selectedChat} />
      <ChatWindow appointmentId={selectedChat} />
    </div>
  )
}