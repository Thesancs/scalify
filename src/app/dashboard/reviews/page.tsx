'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Send, Sparkles, User } from 'lucide-react';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const InstagramAvatar = () => (
  <div className="relative h-10 w-10">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"></div>
      <div className="absolute inset-0.5 rounded-full bg-background p-0.5">
          <Avatar className="h-full w-full">
              <AvatarFallback className="bg-transparent">
                  <Sparkles className="text-white" />
              </AvatarFallback>
          </Avatar>
      </div>
  </div>
)

const ChatMessage = ({ message, style }: { message: Message, style: 'whatsapp' | 'instagram' }) => {
    const isUser = message.sender === 'user';
    
    const whatsappBubbleStyles = isUser
        ? 'bg-[#075e54] text-white rounded-tr-none'
        : 'bg-muted/80 text-white rounded-tl-none';

    const instagramBubbleStyles = isUser
        ? 'bg-blue-500 text-white rounded-br-none'
        : 'bg-muted/80 text-white rounded-bl-none';

    const bubbleStyles = style === 'whatsapp' ? whatsappBubbleStyles : instagramBubbleStyles;

    return (
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                style === 'whatsapp' ? (
                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                        <AvatarFallback className="bg-primary/20">
                            <Sparkles className="text-primary" />
                        </AvatarFallback>
                    </Avatar>
                ) : <InstagramAvatar />
            )}
            <div className={`max-w-md rounded-2xl p-4 whitespace-pre-wrap ${bubbleStyles}`}>
                <p>{message.text}</p>
            </div>
            {isUser && (
                <Avatar className="h-10 w-10 border">
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
            )}
        </div>
    );
};

export default function ReviewsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Olá! Sobre qual produto ou nicho você gostaria de gerar uma review hoje?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        sender: 'ai',
        text: `Excelente! Aqui está uma sugestão de review para "${userMessage.text}":\n\n"Simplesmente incrível! Usei este produto e os resultados foram visíveis em poucos dias. A qualidade superou todas as minhas expectativas. Recomendo a todos que procuram uma solução eficaz e de confiança. Nota 10/10!"`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const ChatInterface = ({ style }: { style: 'whatsapp' | 'instagram' }) => (
    <Card className="flex-1 mt-6 flex flex-col glassmorphic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            Assistente de Reviews
          </CardTitle>
          <CardDescription>
            Descreva o produto e a IA criará uma review para você no estilo {style === 'whatsapp' ? 'WhatsApp' : 'Instagram'}.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} style={style} />
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
                {style === 'whatsapp' ? (
                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                        <AvatarFallback className="bg-primary/20">
                            <Sparkles className="text-primary" />
                        </AvatarFallback>
                    </Avatar>
                ) : <InstagramAvatar />}
                <div className="max-w-md rounded-2xl p-4 bg-muted/80 rounded-bl-none">
                   <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-0"></span>
                        <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-150"></span>
                        <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-300"></span>
                   </div>
                </div>
              </div>
          )}
        </CardContent>
        <CardFooter className="border-t border-white/10 p-4">
          <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            {style === 'instagram' && <Heart className="text-muted-foreground h-6 w-6 cursor-pointer hover:text-red-500" />}
            <Input
              type="text"
              placeholder="Ex: um encapsulado para foco e memória..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="h-12 text-base"
            />
            <Button type="submit" size="lg" className="h-12" disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
  )

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
       <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Gerador de Reviews
        </h1>
        <p className="text-muted-foreground">
          Crie avaliações autênticas e persuasivas em segundos.
        </p>
      </div>
      
      <Tabs defaultValue="whatsapp" className="flex-1 mt-6 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 max-w-sm self-start bg-muted/80">
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>
          <TabsContent value="whatsapp" className="flex-1 flex flex-col -mt-4">
            <ChatInterface style="whatsapp" />
          </TabsContent>
          <TabsContent value="instagram" className="flex-1 flex flex-col -mt-4">
            <ChatInterface style="instagram" />
          </TabsContent>
        </Tabs>
    </div>
  );
}
