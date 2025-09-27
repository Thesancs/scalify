
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsappImage } from '@/ai/flows/whatsapp-image-generator';
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
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const getChatScript = (messages: ConversationDesignerState['messages'], header: ConversationDesignerState['header']) => {
    return messages
      .map((msg) => `${msg.sender === 'me' ? 'Eu' : header.name}: ${msg.text}`)
      .join('\n');
  };
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `conversa-whatsapp-${designerState.header.name.toLowerCase().replace(/ /g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = async () => {
    const script = getChatScript(designerState.messages, designerState.header);
    if (!designerState.header.name || !script) {
      toast({
        variant: 'destructive',
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha o nome do contato e adicione pelo menos uma mensagem.',
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const result = await generateWhatsappImage({
        contactName: designerState.header.name,
        chatScript: script,
        profilePictureDataUri: designerState.header.profileUrl || null,
      });
      setGeneratedImage(result.imageDataUri);
    } catch (error) {
      console.error(error);
      const errorMessage = 'Não foi possível gerar a imagem. Tente novamente mais tarde.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar imagem',
        description: 'Ocorreu um erro inesperado. Verifique o console para mais detalhes.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
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
           <Button onClick={handleGenerate} disabled={isLoading} size="lg" className="w-full text-lg h-14">
              {isLoading ? (
              <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Gerando Imagem...
              </>
              ) : (
              <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Gerar Imagem
              </>
              )}
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">
            <Card className="glassmorphic w-full flex items-center justify-center p-0 lg:p-6 bg-transparent shadow-none">
                <WhatsAppLivePreview
                    options={designerState.options}
                    header={designerState.header}
                    messages={finalMessages}
                    loading={isLoading}
                    error={error}
                    generatedImage={generatedImage}
                    className="w-full h-full"
                />
            </Card>
            {generatedImage && !isLoading && !error && (
                <Button onClick={handleDownload} size="lg" className="w-full max-w-sm text-lg h-14">
                    <Download className="mr-2 h-5 w-5" />
                    Baixar Imagem (PNG)
                </Button>
            )}
        </div>
      </div>
    </div>
  );
}
