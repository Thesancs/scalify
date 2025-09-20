'use client';
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Loader2, Wifi, Signal, BatteryFull } from 'lucide-react';


export type ChatMessage = {
  id: string;
  sender: 'client' | 'me';
  text: string;
  time?: string;
};

type Props = {
  contactName: string;
  avatarUrl?: string | null;
  messages: ChatMessage[];
  loading?: boolean;
  error?: string | null;
  className?: string;
};

const DEFAULT_TIME = '08:42';

/**
 * A client-side component that renders a live preview of a WhatsApp conversation
 * inside a smartphone-like frame. It updates in real-time as props change.
 */
const WhatsAppLivePreview: React.FC<Props> = ({
  contactName,
  avatarUrl,
  messages,
  loading = false,
  error = null,
  className,
}) => {
  const sanitizedMessages = useMemo(() => {
    const validMessages = messages.filter((msg) => msg.text && msg.text.trim().length > 0);
    console.log('[WhatsAppLivePreview]', { contactName, messagesLength: validMessages.length });
    return validMessages;
  }, [messages, contactName]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-black/20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-sm">Atualizando preview...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-400 bg-red-500/10 p-4">
          <ImageIcon className="h-12 w-12" />
          <h3 className="mt-4 font-semibold">Erro no Preview</h3>
          <p className="mt-1 text-sm text-red-400/80">{error}</p>
        </div>
      );
    }
    
    if (sanitizedMessages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                <ImageIcon className="h-16 w-16 mb-4" />
                <h3 className="font-bold text-lg">Sua imagem aparecerá aqui</h3>
                <p>Preencha os dados e adicione mensagens para começar.</p>
            </div>
        )
    }

    return (
       <div 
        className="h-full w-full bg-contain"
        style={{ backgroundImage: "url('/whatsapp-bg.png')"}}
      >
        <div className="flex h-full flex-col justify-end p-4 space-y-2">
            <AnimatePresence initial={false}>
                {sanitizedMessages.map((message) => (
                <motion.div
                    key={message.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={cn(
                    'flex max-w-[80%] items-end gap-2',
                    message.sender === 'me' ? 'self-end' : 'self-start'
                    )}
                >
                    <div
                    className={cn(
                        'relative rounded-lg px-3 py-2 text-sm text-gray-800 shadow-md',
                        message.sender === 'me'
                        ? 'bg-[#d9fdd3] rounded-tr-none'
                        : 'bg-white rounded-tl-none'
                    )}
                    >
                    <p className="text-black">{message.text}</p>
                    <div className="flex justify-end items-center gap-1 mt-1 h-3">
                        <span className="text-xs text-gray-400">
                          {message.time || DEFAULT_TIME}
                        </span>
                        {message.sender === 'me' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 -mb-0.5">
                                <path d="M1.5 12.5L5.5 16.5L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 12.5L11 16.5L22.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.5 5L12.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </div>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("aspect-[9/18] h-full max-h-[800px] w-auto max-w-full mx-auto bg-[#0D0D0D] rounded-[40px] border-[10px] border-black overflow-hidden shadow-2xl relative", className)}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

        {/* Header */}
         <header className="absolute top-0 left-0 right-0 z-10 flex items-center p-3 bg-[#075e54] text-white">
            <Avatar className="h-9 w-9 mr-3 border-2 border-white/50">
                <AvatarImage src={avatarUrl ?? undefined} alt={contactName} data-ai-hint="person avatar" />
                <AvatarFallback className="bg-gray-600 text-lg">
                    {contactName?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h2 className="font-semibold text-base">{contactName}</h2>
                <p className="text-xs text-white/80">online</p>
            </div>
            <div className="flex items-center gap-3 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.99 16.51c-1.26-1.57-2-3.48-2-5.51 0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8c-1.95 0-3.78-.7-5.24-1.87l-3.76 1.87 1.99-3.49zm8.01-13.51c-5.52 0-10 4.48-10 10 0 2.34.81 4.51 2.16 6.25l-2.16 3.75 3.86-1.93c1.7.99 3.66 1.58 5.75 1.58 5.52 0 10-4.48 10-10s-4.48-10-10-10zm2.5 12.5h-5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h5c.28 0 .5.22.5.5s-.22.5-.5.5zm0-3h-5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h5c.28 0 .5.22.5.5s-.22.5-.5.5zm0-3h-5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h5c.28 0 .5.22.5.5s-.22.5-.5.5z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v-2h2v2z"/></svg>
            </div>
        </header>

        {/* Content */}
        <main className="absolute top-[60px] bottom-0 left-0 right-0 overflow-y-auto">
          {renderContent()}
        </main>
    </div>
  );
};
export default WhatsAppLivePreview;
