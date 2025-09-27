
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Upload, KeyRound, Save } from 'lucide-react';

export default function PerfilPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Meu Perfil
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e configurações de conta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna de Ações/Navegação (Opcional) */}
        <div className="md:col-span-1">
          {/* Pode adicionar navegação aqui no futuro, como "Segurança", "Notificações" etc. */}
        </div>

        {/* Coluna Principal de Conteúdo */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Card de Informações Pessoais */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize sua foto e detalhes pessoais aqui.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-primary/50">
                  <AvatarImage
                    src="https://picsum.photos/seed/user-avatar/80/80"
                    alt="Usuário Teste"
                    data-ai-hint="person avatar"
                  />
                  <AvatarFallback>UT</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="profile-picture" className="mb-2 block">Foto de Perfil</Label>
                  <div className="flex">
                    <Input id="profile-picture" type="file" className="hidden" />
                    <Button variant="outline" asChild>
                       <label htmlFor="profile-picture" className="cursor-pointer">
                         <Upload className="mr-2 h-4 w-4" />
                         Carregar Imagem
                       </label>
                    </Button>
                  </div>
                   <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF até 10MB.</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue="Usuário Teste" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Endereço de E-mail</Label>
                <Input id="email" type="email" defaultValue="teste@scalify.com" disabled />
                <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado.</p>
              </div>
               <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          {/* Card de Senha */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle>Gerenciamento de Senha</CardTitle>
              <CardDescription>
                Altere sua senha para manter sua conta segura.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button variant="secondary">
                <KeyRound className="mr-2 h-4 w-4" />
                Alterar Senha
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
