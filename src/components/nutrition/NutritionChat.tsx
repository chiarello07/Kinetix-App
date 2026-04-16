import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export function NutritionChat() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) loadMessages()
  }, [user])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const loadMessages = async () => {
    const { data } = await supabase
      .from('nutrition_chat_messages')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  const handleSend = async () => {
    if (!input.trim() || !user) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { id: 'temp', role: 'user', content: userMsg }])
    setLoading(true)

    await supabase.from('nutrition_chat_messages').insert({
      user_id: user.id,
      role: 'user',
      content: userMsg,
    })

    setTimeout(async () => {
      const aiResponse = `Como seu assistente nutricional, analisei sua rotina! Sobre "${userMsg}", sugiro focar em aumentar sua ingestão proteica e manter a consistência. Refeições ricas em fibras e proteínas (ex: ovos ou peito de frango) vão ajudar.`

      const { data } = await supabase
        .from('nutrition_chat_messages')
        .insert({
          user_id: user.id,
          role: 'assistant',
          content: aiResponse,
        })
        .select()
        .single()

      setMessages((prev) => [...prev.filter((m) => m.id !== 'temp'), data])
      setLoading(false)
    }, 1500)
  }

  return (
    <Card className="h-[600px] flex flex-col shadow-subtle border-border/50">
      <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground mt-10">
                <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Olá! Sou sua IA Nutricional. Como posso ajudar na sua dieta hoje?</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={msg.id || i}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="p-4 rounded-2xl bg-muted rounded-tl-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
          <Input
            placeholder="Pergunte sobre refeições, macros, substituições..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-12 h-12 p-0 rounded-xl shrink-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
