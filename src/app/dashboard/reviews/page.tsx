'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Loader2, Sparkles, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { generateWhatsappImage } from '@/ai/flows/whatsapp-image-generator';
import { useToast } from '@/hooks/use-toast';

export default function ReviewsPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [script, setScript] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleGenerate = async () => {
    if (!name || !script) {
      toast({
        variant: 'destructive',
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha o nome e o roteiro da conversa.',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedImage(null);
    try {
      const result = await generateWhatsappImage({
        contactName: name,
        chatScript: script,
        profilePictureDataUri: profilePic,
      });
      setGeneratedImage(result.imageDataUri);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar imagem',
        description:
          'Não foi possível gerar a imagem. Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const WhatsAppGenerator = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            Configurações da Conversa
          </CardTitle>
          <CardDescription>
            Preencha os detalhes para gerar a imagem da sua conversa de WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Nome do Contato</Label>
            <Input
              id="contact-name"
              placeholder="Ex: Cliente Satisfeito"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-pic">Foto de Perfil (Opcional)</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profilePic ?? undefined} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <Input id="profile-pic" type="file" accept="image/*" onChange={handleFileChange} className="max-w-xs" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="script">Roteiro da Conversa</Label>
            <Textarea
              id="script"
              placeholder="Digite a conversa aqui. Ex:
Cliente: Olá, recebi meu produto!
Eu: Que ótimo! O que achou?"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="h-48"
            />
             <p className="text-xs text-muted-foreground">Use "Eu:" para as suas mensagens e o nome do contato para as dele.</p>
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} size="lg" className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando Imagem...
              </>
            ) : (
              'Gerar Imagem'
            )}
          </Button>
        </CardContent>
      </Card>
      <Card className="glassmorphic flex items-center justify-center">
        <CardContent className="p-6 w-full h-full">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
              <p>Aguarde, a IA está criando sua imagem...</p>
            </div>
          )}
          {generatedImage && (
            <div className="w-full h-full relative">
              <Image 
                src={generatedImage} 
                alt="Conversa gerada" 
                fill
                className="object-contain rounded-md"
              />
            </div>
          )}
          {!isLoading && !generatedImage && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <ImageIcon className="h-16 w-16 mb-4" />
              <h3 className="font-bold text-lg">Sua imagem aparecerá aqui</h3>
              <p>Preencha os dados e clique em "Gerar Imagem" para começar.</p>
            </div>
          )}
        </CardContent>
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
          Crie imagens de conversas de WhatsApp e Instagram em segundos.
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
