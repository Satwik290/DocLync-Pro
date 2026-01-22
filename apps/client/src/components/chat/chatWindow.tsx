import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChat } from '@/hooks/useChat'
import { useUserStore } from '@/store/useUserStore'
import { formatDistanceToNow } from 'date-fns'

interface ChatWindowProps {
  appointmentId: string | null
}

export function ChatWindow({ appointmentId }: ChatWindowProps) {
  const [message, setMessage] = useState('')
  const { messages, sendMessage, isTyping, typingUser, sendTypingStatus } = useChat(appointmentId)
  const { user } = useUserStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    sendMessage(message)
    setMessage('')
    sendTypingStatus(false)
  }

  const handleTyping = (value: string) => {
    setMessage(value)
    sendTypingStatus(value.length > 0)
  }

  if (!appointmentId) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Select a conversation to start chatting
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isOwn = msg.senderId === user?.id
          return (
            <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md ${isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg px-4 py-2`}>
                <p className="text-sm font-semibold">{msg.sender.name}</p>
                <p className="mt-1">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          )
        })}
        {isTyping && (
          <div className="text-sm text-muted-foreground italic">
            {typingUser} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="border-t p-4 flex gap-2">
        <Input
          value={message}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}