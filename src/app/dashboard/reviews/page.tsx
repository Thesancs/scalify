
'use client';

import { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as htmlToImage from 'html-to-image';
import WhatsAppLivePreview, {
  type ChatMessage,
} from '@/components/reviews/WhatsAppLivePreview';
import ConversationDesigner, {
  type ConversationDesignerState,
} from '@/components/reviews/ConversationDesigner';

const initialState: ConversationDesignerState = {
  autoAlternate: true,
  nextSender: 'client',
  defaultTime: '08:42',
  messages: [
    { id: '1', sender: 'client', kind: 'text', text: 'Olá, recebi meu produto!', time: '14:20' },
    { id: '2', sender: 'me', kind: 'text', text: 'Que ótimo! O que achou?', time: '14:21' },
  ],
  options: {
    interfaceStyle: 'iphone',
    phoneTime: '10:04',
    icons: {
      networkLabel: '4G',
      batteryPercent: 80,
      signalBars: 4,
      wifi: true,
    },
  },
  header: {
    name: 'Cliente Satisfeito',
    status: 'online',
  },
};

export default function ReviewsPage() {
  const { toast } = useToast();
  const [designerState, setDesignerState] = useState<ConversationDesignerState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível encontrar a referência da visualização.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // A biblioteca html-to-image precisa de um nó DOM, então usamos a referência.
      const dataUrl = await htmlToImage.toPng(previewRef.current, { 
          cacheBust: true,
          // Aumentamos a qualidade da imagem
          pixelRatio: 2, 
      });

      const link = document.createElement('a');
      link.download = `conversa-whatsapp-${designerState.header.name.toLowerCase().replace(/ /g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('oops, something went wrong!', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar imagem',
        description: 'Não foi possível converter a visualização em imagem. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [designerState.header.name, toast]);

  const finalMessages: ChatMessage[] = designerState.messages.map((m) => ({
    id: m.id,
    sender: m.sender,
    kind: m.kind,
    text: m.text,
    imageUrl: m.imageUrl,
    audioLabel: m.audioLabel,
    time: m.time || designerState.defaultTime,
  }));

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Gerador de Reviews
        </h1>
        <p className="text-muted-foreground">
          Crie imagens de conversas de WhatsApp em segundos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 flex-1">
        <div className="flex flex-col gap-6">
          <ConversationDesigner
            initialState={designerState}
            onChange={setDesignerState}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Card className="glassmorphic w-full flex items-center justify-center p-0 lg:p-6 bg-transparent shadow-none">
            {/* Adicionamos a ref aqui para que possamos "fotografar" este componente */}
            <div ref={previewRef} className="w-full h-full">
               <WhatsAppLivePreview
                  options={designerState.options}
                  header={designerState.header}
                  messages={finalMessages}
                  className="w-full h-full"
                />
            </div>
          </Card>
          
          <Button onClick={handleDownload} disabled={isLoading} size="lg" className="w-full max-w-sm text-lg h-14">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Preparando Download...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Baixar Imagem (PNG)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
