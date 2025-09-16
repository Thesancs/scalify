import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, ShieldCheck, Upload, TrendingUp, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ofertasEscaladas = [
  {
    id: '1',
    title: 'Método de 7 Segundos',
    type: 'Infoproduto',
    format: 'VSL',
    ads: 670,
    roas: 2,
    ticket: 297,
    status: 'escalando',
    imageUrl: 'https://picsum.photos/seed/oferta-1/600/400',
    imageHint: 'abstract technology',
    descricao: 'Descubra o método que está revolucionando o mercado digital. Uma estratégia de vendas rápida e eficaz para alavancar seus resultados em tempo recorde.'
  },
  {
    id: '2',
    title: 'Bactéria Gordurosa',
    type: 'Encapsulado',
    format: 'Landing Page',
    ads: 180,
    roas: 2,
    ticket: 467,
    status: 'escalando',
    imageUrl: 'https://picsum.photos/seed/oferta-2/600/400',
    imageHint: 'health science',
    descricao: 'A fórmula inovadora que atua diretamente na queima de gordura localizada. Um produto com alta conversão e ticket elevado, ideal para escalar suas campanhas.'
  },
  {
    id: '3',
    title: '100 Receitas Ricas em Proteínas',
    type: 'Infoproduto',
    format: 'Quiz',
    ads: 140,
    roas: 2,
    ticket: 30,
    status: 'risco',
    imageUrl: 'https://picsum.photos/seed/oferta-3/600/400',
    imageHint: 'healthy food',
    descricao: 'Um e-book completo com 100 receitas para quem busca uma alimentação saudável e rica em proteínas. Perfeito para nichos de fitness e bem-estar.'
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Bem-vindo à Scalify
        </h1>
        <p className="text-muted-foreground">
          Sua jornada do primeiro passo à grande escala.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                Ofertas Escaladas
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {ofertasEscaladas.map((oferta) => (
                    <Link href={`/dashboard/ofertas/${oferta.id}`} key={oferta.id} className="cursor-pointer">
                        <Card
                            className={`flex flex-col h-full rounded-2xl glassmorphic transition-all duration-300 hover:scale-[1.02] hover:border-primary overflow-hidden`}
                        >
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={oferta.imageUrl}
                                    alt={`Capa da oferta ${oferta.title}`}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={oferta.imageHint}
                                />
                            </div>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-bold text-foreground">{oferta.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">{oferta.type}</Badge>
                                    <Badge variant="outline" className="border-primary/50 text-primary">{oferta.format}</Badge>
                                </div>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><BarChart2 className="h-4 w-4" /> Anúncios Ativos:</span>
                                        <span className="font-bold text-foreground">{oferta.ads}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> ROAS:</span>
                                        <span className="font-bold text-foreground">{oferta.roas}x</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Ticket Médio:</span>
                                        <span className="font-bold text-foreground">R${oferta.ticket}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                 <Badge
                                    variant={oferta.status === 'escalando' ? 'default' : 'destructive'}
                                    className={`w-full justify-center ${oferta.status === 'escalando' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}
                                >
                                    {oferta.status === 'escalando' ? 'Escalando' : 'Em Risco'}
                                </Badge>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Card Anticlone */}
        <Card className="flex flex-col rounded-2xl glassmorphic transition-all duration-300 hover:scale-[1.02] hover:border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl text-foreground">
              <span>Proteções ativas</span>
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-muted-foreground">
              tentativas de clonagem bloqueadas
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Badge variant="outline" className='border-green-500/50 text-green-500'>Ativo</Badge>
            <p className="text-xs text-muted-foreground">
              Última em: 15/09/2025
            </p>
          </CardFooter>
        </Card>

        {/* Card Clonador de Ofertas */}
        <Card className="flex flex-col rounded-2xl glassmorphic transition-all duration-300 hover:scale-[1.02] hover:border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl text-foreground">
             <span>Clonar Oferta</span>
             <Copy className="h-5 w-5 text-primary"/>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <Input
              type="text"
              placeholder="Insira o link da página que deseja clonar"
            />
            <Button className="w-full">Clonar</Button>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground w-full text-center">Cole um link para começar.</p>
          </CardFooter>
        </Card>

        {/* Card Removedor de Metadados */}
        <Card className="flex flex-col rounded-2xl glassmorphic transition-all duration-300 hover:scale-[1.02] hover:border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl text-foreground">
              <span>Limpador de Metadados</span>
              <Upload className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Remova dados EXIF e outras informações de suas imagens com apenas 1
              clique.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Acessar Removedor
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
