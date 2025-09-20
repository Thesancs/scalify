'use client';
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  Image as ImageIcon,
  Loader2,
  Wifi,
  Signal,
  BatteryFull,
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  Camera,
  Mic,
  Plus,
  Smile,
  Triangle,
  Circle as CircleIcon,
  Square,
  Play,
  Volume2,
} from 'lucide-react';

export type MessageKind = 'text' | 'image' | 'audio';

export type ChatMessage = {
  id: string;
  sender: 'client' | 'me';
  kind?: MessageKind;
  text?: string;
  imageUrl?: string;
  audioLabel?: string;
  time?: string;
};

export type StatusBarOptions = {
  hideTop?: boolean;
  interfaceStyle?: 'android' | 'iphone';
  phoneTime?: string;
  showBackArrow?: boolean;
  showKeyboard?: boolean;
  icons?: {
    location?: boolean;
    networkLabel?: '3G' | '4G' | '5G' | 'LTE' | '';
    batteryPercent?: number;
    charging?: boolean;
    signalBars?: 0 | 1 | 2 | 3 | 4 | 5;
    wifi?: boolean;
    airplane?: boolean;
  };
};

export type ChatHeaderOptions = {
  name: string;
  status?: string;
  unreadCount?: string;
  profileUrl?: string | null;
};

export type WhatsAppLivePreviewProps = {
  options?: StatusBarOptions;
  header: ChatHeaderOptions;
  messages: ChatMessage[];
  loading?: boolean;
  error?: string | null;
  className?: string;
  hideBottom?: boolean;
};

const DEFAULT_TIME = '08:42';
const DEFAULT_PHONE_TIME = '10:04';

const StatusBar = ({ options }: { options: StatusBarOptions }) => {
  const { interfaceStyle = 'iphone', phoneTime = DEFAULT_PHONE_TIME, icons = {} } = options;
  const {
    networkLabel = 'LTE',
    batteryPercent = 80,
    charging = false,
    signalBars = 4,
    wifi = true,
  } = icons;

  if (interfaceStyle === 'android') {
    return (
      <div className="absolute top-0 left-0 right-0 h-8 px-4 flex items-center justify-end gap-2 text-white/90 bg-black/20 z-20">
        {wifi && <Wifi size={16} />}
        <span className="text-xs font-sans">{networkLabel}</span>
        <div className="flex items-center gap-0.5">
          <span className="text-xs font-sans">{batteryPercent}%</span>
          {charging ? <BatteryFull size={20} className="relative"><path d="M6 7h8v10H6z" /><path d="m10 5-3 4h4l-3 4" /></BatteryFull> : <BatteryFull size={20} />}
        </div>
      </div>
    );
  }
  // iPhone style
  return (
    <div className="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between text-white/90 z-20">
      <span className="text-sm font-semibold w-12 text-center">{phoneTime}</span>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl"></div>
      <div className="flex items-center gap-1.5">
        {wifi && <Wifi size={16} />}
        <Signal size={16} />
        <div className="flex items-center gap-0.5">
            <span className="text-xs font-sans">{batteryPercent}%</span>
            <BatteryFull size={24} className={cn(charging && 'text-green-400')} />
        </div>
      </div>
    </div>
  );
};


const ChatHeader = ({ header }: { header: ChatHeaderOptions }) => {
    return (
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center p-3 pt-12 bg-[#075e54] text-white">
            <Avatar className="h-10 w-10 mr-3 border-2 border-white/50">
                <AvatarImage src={header.profileUrl ?? undefined} alt={header.name} data-ai-hint="person avatar" />
                <AvatarFallback className="bg-gray-600 text-lg">
                    {header.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h2 className="font-semibold text-lg">{header.name}</h2>
                {header.status && <p className="text-sm text-white/80">{header.status}</p>}
            </div>
            <div className="flex items-center gap-5 text-white/90">
                <Video size={24} />
                <Phone size={24} />
                <MoreVertical size={24} />
            </div>
        </header>
    );
}

const ChatInput = ({ hidden, showKeyboard }: { hidden?: boolean, showKeyboard?: boolean }) => {
    if (hidden) return null;
    if (showKeyboard) {
        return (
             <div className="h-[290px] w-full bg-[#1c1c1c] flex-shrink-0" />
        )
    }
    return (
        <div className="h-14 bg-[#075e54] flex items-center px-2 py-2 gap-2">
            <div className="flex-1 bg-white rounded-full flex items-center px-4 gap-2">
                <Smile className="text-gray-500" />
                <span className="text-gray-400 text-lg flex-1">Mensagem</span>
                <Paperclip className="text-gray-500 -rotate-45" />
                <Camera className="text-gray-500" />
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Mic className="text-white" />
            </div>
        </div>
    )
}


const WhatsAppLivePreview: React.FC<WhatsAppLivePreviewProps> = ({
  options = {},
  header,
  messages,
  loading = false,
  error = null,
  className,
  hideBottom = false,
}) => {
  const sanitizedMessages = useMemo(() => {
    return messages.filter((msg) => (msg.text && msg.text.trim().length > 0) || msg.imageUrl || msg.audioLabel);
  }, [messages]);

  console.log('[WhatsAppLivePreview] v2', { 
      contactName: header.name, 
      messagesLength: sanitizedMessages.length,
      options,
  });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-black/20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-sm">Gerando imagem...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-400 bg-red-500/10 p-4">
          <ImageIcon className="h-12 w-12" />
          <h3 className="mt-4 font-semibold">Erro ao Gerar Imagem</h3>
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
                        'relative rounded-lg px-3 py-1.5 text-sm text-gray-800 shadow-md',
                        message.sender === 'me'
                        ? 'bg-[#d9fdd3] rounded-tr-none'
                        : 'bg-white rounded-tl-none'
                    )}
                    >
                    
                    {message.kind === 'image' && message.imageUrl && (
                        <img src={message.imageUrl} alt="chat image" className="rounded-md mb-1" data-ai-hint="user content" />
                    )}

                    {message.kind === 'audio' && (
                        <div className="flex items-center gap-2 pr-4">
                            <Play className="h-6 w-6 text-green-600 fill-green-600"/>
                            <div className="h-1 w-24 bg-gray-300 rounded-full relative">
                                <div className="absolute top-0 left-0 h-1 w-2/3 bg-green-600 rounded-full"></div>
                                <div className="absolute -top-0.5 left-2/3 h-2 w-2 bg-green-600 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-500">{message.audioLabel || '0:00'}</span>
                        </div>
                    )}
                    
                    {message.text && <p className="text-black whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-600 underline">$1</a>') }} />}

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
    <div className={cn("aspect-[9/18] h-full max-h-[800px] w-auto max-w-full mx-auto bg-[#1c1c1c] rounded-[40px] border-[10px] border-black overflow-hidden shadow-2xl relative flex flex-col", className)}>
        
        {!options.hideTop && <StatusBar options={options} />}
        
        <ChatHeader header={header} />

        <main className="flex-1 overflow-y-auto mt-[96px]">
          {renderContent()}
        </main>
        
        <ChatInput hidden={hideBottom} showKeyboard={options.showKeyboard} />

    </div>
  );
};
export default React.memo(WhatsAppLivePreview);

export const __TEST_CASES__ = {
  minimal: {
    header: { name: 'Cliente Satisfeito' },
    messages: [
      { id: '1', sender: 'client' as const, text: 'Olá, recebi meu produto!' },
      { id: '2', sender: 'me' as const, text: 'Que ótimo! O que achou?' },
    ],
  },
  prankshitLike: {
    options: {
        interfaceStyle: 'iphone' as const,
        phoneTime: '10:04',
        icons: {
            networkLabel: '4G' as const,
            batteryPercent: 50,
            charging: true,
            signalBars: 1 as const,
            wifi: true,
        }
    },
    header: {
        name: 'Maria Souza',
        status: 'online',
        profileUrl: 'https://picsum.photos/seed/maria/200/200'
    },
    messages: [
      { id: '1', sender: 'client' as const, text: 'Oi!' },
      { id: '2', sender: 'me' as const, kind: 'image' as const, imageUrl: 'https://picsum.photos/seed/chat-img/600/400'},
      { id: '3', sender: 'client' as const, text: 'Uau! E sobre o link? https://scalify.com' },
      { id: '4', sender: 'me' as const, kind: 'audio' as const, audioLabel: '0:12'},
    ],
  },
};
