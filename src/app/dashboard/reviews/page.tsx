'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, PlusCircle, Trash2, ArrowUp, ArrowDown, Sparkles, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { generateWhatsappImage } from '@/ai/flows/whatsapp-image-generator';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import WhatsAppLivePreview, {
  type ChatMessage,
  type StatusBarOptions,
  type ChatHeaderOptions,
} from '@/components/reviews/WhatsAppLivePreview';

type Message = {
  id: number;
  sender: 'Eu' | 'Contato';
  text: string;
  status: 'enviado' | 'entregue' | 'lido';
  time: string;
};

export default function ReviewsPage() {
  const { toast } = useToast();
  const [contactName, setContactName] = useState('Cliente Satisfeito');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Contato', text: 'Olá, recebi meu produto!', status: 'lido', time: '14:20' },
    { id: 2, sender: 'Eu', text: 'Que ótimo! O que achou?', status: 'lido', time: '14:21' },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getChatScript = () => {
    return messages.map(msg => `${msg.sender === 'Eu' ? 'Eu' : contactName}: ${msg.text}`).join('\n');
  }

  const handleGenerate = async () => {
    const script = getChatScript();
    if (!contactName || !script) {
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
        contactName: contactName,
        chatScript: script,
        profilePictureDataUri: profilePic,
      });
      setGeneratedImage(result.imageDataUri);
    } catch (error) {
      console.error(error);
      setError('Não foi possível gerar a imagem. Tente novamente mais tarde.');
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar imagem',
        description:
          'Ocorreu um erro inesperado. Verifique o console para mais detalhes.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const addMessage = () => {
    const lastSender = messages.length > 0 ? messages[messages.length - 1].sender : 'Contato';
    const newSender = lastSender === 'Eu' ? 'Contato' : 'Eu';
    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    setMessages([...messages, { id: newId, sender: newSender, text: '', status: 'lido', time: '14:22' }]);
  }

  const updateMessage = (id: number, newText: string) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, text: newText } : msg));
  }
  
  const deleteMessage = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
  }

  const chatMessagesForPreview: ChatMessage[] = messages.map((m): ChatMessage => ({
    id: String(m.id),
    sender: m.sender === 'Eu' ? 'me' : 'client',
    kind: 'text',
    text: m.text,
    time: m.time,
  }));

  const chatHeaderForPreview: ChatHeaderOptions = {
    name: contactName,
    profileUrl: profilePic,
    status: 'online',
  };

  const statusBarOptions: StatusBarOptions = {
    interfaceStyle: 'iphone',
    phoneTime: '10:04',
    icons: {
      networkLabel: '4G',
      batteryPercent: 80,
      charging: false,
      signalBars: 4,
      wifi: true,
    }
  }

  const WhatsAppGenerator = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
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
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="profile-pic">Foto de Perfil (Opcional)</Label>
                <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={profilePic ?? undefined} data-ai-hint="person avatar"/>
                    <AvatarFallback className="bg-muted/50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </AvatarFallback>
                </Avatar>
                <Input id="profile-pic" type="file" accept="image/*" onChange={handleFileChange} className="max-w-xs" />
                </div>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="space-y-4">
             <h3 className="font-semibold">Roteiro da Conversa</h3>
            {messages.map((message, index) => (
              <div key={message.id} className="p-3 border border-white/10 rounded-lg space-y-2">
                 <div className="flex justify-between items-center">
                    <Label>{message.sender === 'Eu' ? 'Eu (balão verde)' : `${contactName} (balão cinza)`}</Label>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0}>
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" disabled={index === messages.length - 1}>
                            <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-500" onClick={() => deleteMessage(message.id)}>
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
          
          <Separator className="bg-white/10" />

          <Button onClick={handleGenerate} disabled={isLoading} size="lg" className="w-full text-lg h-14">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Gerando Imagem...
              </>
            ) : (
               <>
                <Sparkles className="mr-2 h-5 w-5" />
                Gerar Imagem da Conversa
               </>
            )}
          </Button>
        </CardContent>
      </Card>
      <Card className="glassmorphic flex items-center justify-center p-0 lg:p-6 bg-transparent border-0 shadow-none">
         <WhatsAppLivePreview
            options={statusBarOptions}
            header={chatHeaderForPreview}
            messages={chatMessagesForPreview}
            loading={isLoading}
            error={error}
            className="w-full h-full"
          />
      </Card>
    </div>
  );

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

      <Tabs defaultValue="whatsapp" className="flex-1 mt-6 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 max-w-sm self-start bg-muted/80">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="instagram" disabled>Instagram (em breve)</TabsTrigger>
        </TabsList>
        <TabsContent value="whatsapp" className="flex-1 flex flex-col -mt-4">
          <WhatsAppGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
