'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, User } from 'lucide-react';

type Message = {
  sender: 'user' | 'ai';
  text: string;
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

      <Card className="flex-1 mt-6 flex flex-col glassmorphic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            Assistente de Reviews
          </CardTitle>
          <CardDescription>
            Descreva o produto e a IA criará uma review para você.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                message.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-10 w-10 border-2 border-primary/50">
                  <AvatarFallback className="bg-primary/20">
                    <Sparkles className="text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md rounded-2xl p-4 text-white whitespace-pre-wrap ${
                  message.sender === 'user'
                    ? 'bg-primary/80 rounded-br-none'
                    : 'bg-muted/80 rounded-bl-none'
                }`}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border-2 border-primary/50">
                  <AvatarFallback className="bg-primary/20">
                    <Sparkles className="text-primary" />
                  </AvatarFallback>
                </Avatar>
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
            <Input
              type="text"
              placeholder="Ex: um encapsulado para foco e memória..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="h-12 text-base"
            />
            <Button type="submit" size="lg" className="h-12" disabled={isLoading}>
              <Sparkles className="mr-2 h-5 w-5" />
              Gerar
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
