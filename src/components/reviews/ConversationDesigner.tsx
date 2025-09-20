'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowDown,
  ArrowUp,
  PlusCircle,
  Settings,
  Trash2,
} from 'lucide-react';
import type {
  ChatHeaderOptions,
  ChatMessage,
  StatusBarOptions,
} from './WhatsAppLivePreview';

type Sender = 'client' | 'me';
type Kind = 'text' | 'image' | 'audio';
export type DraftMsg = {
  id: string;
  sender: Sender;
  kind: Kind;
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
  audioLabel?: string;
  time?: string;
};

export type ConversationDesignerState = {
  autoAlternate: boolean;
  nextSender: Sender;
  defaultTime: string;
  messages: DraftMsg[];
  options: StatusBarOptions;
  header: ChatHeaderOptions;
};

type ConversationDesignerProps = {
  initialState: ConversationDesignerState;
  onChange: (state: ConversationDesignerState) => void;
};

const ConversationDesigner: React.FC<ConversationDesignerProps> = ({
  initialState,
  onChange,
}) => {
  const [state, setState] = useState(initialState);

  const handleStateChange = (newState: Partial<ConversationDesignerState>) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
    onChange(updatedState);
  };
  
  const handleHeaderChange = (newHeader: Partial<ChatHeaderOptions>) => {
    handleStateChange({ header: { ...state.header, ...newHeader } });
  }

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleHeaderChange({ profileUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addMessage = () => {
    const lastSender = state.messages.length > 0 ? state.messages[state.messages.length - 1].sender : 'client';
    const newSender = lastSender === 'me' ? 'client' : 'me';
    const newId = state.messages.length > 0 ? String(Math.max(...state.messages.map(m => parseInt(m.id))) + 1) : '1';
    
    const newMessages = [...state.messages, { id: newId, sender: newSender, kind: 'text' as const, text: '', time: '14:22' }];
    handleStateChange({ messages: newMessages });
  }

  const updateMessage = (id: string, newText: string) => {
    const newMessages = state.messages.map(msg => msg.id === id ? { ...msg, text: newText } : msg);
    handleStateChange({ messages: newMessages });
  }
  
  const deleteMessage = (id: string) => {
    const newMessages = state.messages.filter(msg => msg.id !== id);
    handleStateChange({ messages: newMessages });
  }


  return (
    <Card className="glassmorphic">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="text-primary h-6 w-6" />
          Editor da Conversa
        </CardTitle>
        <CardDescription>
          Crie a conversa balão a balão e personalize os detalhes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border border-white/10 rounded-lg">
          <h3 className="font-semibold">Configurações do Topo</h3>
          <div className="space-y-2">
            <Label htmlFor="contact-name">Nome do Contato</Label>
            <Input
              id="contact-name"
              placeholder="Ex: Cliente Satisfeito"
              value={state.header.name}
              onChange={(e) => handleHeaderChange({ name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-pic">Foto de Perfil (Opcional)</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={state.header.profileUrl ?? undefined} data-ai-hint="person avatar" />
                <AvatarFallback className="bg-muted/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </AvatarFallback>
              </Avatar>
              <Input
                id="profile-pic"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="max-w-xs"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-4">
          <h3 className="font-semibold">Roteiro da Conversa</h3>
          {state.messages.map((message, index) => (
            <div
              key={message.id}
              className="p-3 border border-white/10 rounded-lg space-y-2"
            >
              <div className="flex justify-between items-center">
                <Label>
                  {message.sender === 'me'
                    ? 'Eu (balão verde)'
                    : `${state.header.name} (balão cinza)`}
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={index === state.messages.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-400 hover:text-red-500"
                    onClick={() => deleteMessage(message.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder={`Mensagem de ${message.sender}...`}
                value={message.text}
                onChange={(e) => updateMessage(message.id, e.target.value)}
                className="h-20"
              />
            </div>
          ))}
          <Button onClick={addMessage} variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Mensagem
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationDesigner;
