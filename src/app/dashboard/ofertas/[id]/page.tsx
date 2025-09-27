
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, BarChart2, Library, Star, Ticket, TrendingUp, ExternalLink, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Mock data
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
    score: 'Alto',
    porque: 'Alto volume de novos criativos e expansão para outros mercados. O momento de testar é agora.',
    imageUrl: 'https://picsum.photos/seed/oferta-1/600/400',
    imageHint: 'abstract technology',
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
    score: 'Alto',
    porque: 'Sinais de saturação no público principal, mas com bom ROAS. Vale o teste em um novo ângulo.',
    imageUrl: 'https://picsum.photos/seed/oferta-2/600/400',
    imageHint: 'health science',
  },
  {
    id: '3',
    title: '100 Receitas Ricas em Proteínas',
    type: 'Infoproduto',
    format: 'Quiz',
    ads: 140,
    roas: 2,
    ticket: 30,
    status: 'queda',
    score: 'Baixo',
    porque: 'Apesar da queda, o ticket baixo pode ser uma barreira de entrada menor para novos públicos.',
    imageUrl: 'https://picsum.photos/seed/oferta-3/600/400',
    imageHint: 'healthy food',
  },
   {
    id: '4',
    title: 'Automação para SaaS',
    type: 'SaaS',
    format: 'Landing Page',
    ads: 320,
    roas: 3,
    ticket: 997,
    status: 'escalando',
    score: 'Médio',
    porque: 'Solução B2B com ticket alto e demanda crescente. Pouca concorrência e alto potencial de escala no Brasil.',
    imageUrl: 'https://picsum.photos/seed/oferta-4/600/400',
    imageHint: 'software interface',
  },
  {
    id: '5',
    title: 'Kit de Beleza Natural',
    type: 'Encapsulado',
    format: 'VSL',
    ads: 95,
    roas: 2.5,
    ticket: 197,
    status: 'estável',
    score: 'Médio',
    porque: 'Mercado em alta com público fiel e baixa concorrência em anúncios de vídeo.',
    imageUrl: 'https://picsum.photos/seed/oferta-5/600/400',
    imageHint: 'cosmetics beauty',
  },
];

export default function OfertaPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const oferta = ofertasEscaladas.find((o) => o.id === params.id);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  if (!oferta) {
    notFound();
  }
  
  const handleWatchlistToggle = () => {
    setIsWatchlisted(!isWatchlisted);
    toast({
        title: !isWatchlisted ? 'Oferta Salva!' : 'Oferta Removida!',
        description: `"${oferta.title}" foi ${!isWatchlisted ? 'adicionada à' : 'removida da'} sua Watchlist.`,
    })
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 animate-fade-in">
        <Link href="/dashboard/ofertas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Catálogo
        </Link>
        
        <div className="flex flex-col gap-8">
            {/* Hero Validado */}
            <Card className="glassmorphic rounded-2xl overflow-hidden">
                {oferta.imageUrl && (
                    <div className="relative w-full aspect-video">
                        <Image
                            src={oferta.imageUrl}
                            alt={`Banner da oferta ${oferta.title}`}
                            fill
                            className="object-cover"
                            data-ai-hint={oferta.imageHint}
                        />
                    </div>
                )}
                <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className='flex items-center gap-4'>
                          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{oferta.title}</h1>
                          <Button variant="ghost" size="icon" onClick={handleWatchlistToggle} className="text-muted-foreground hover:text-primary">
                            <Star className={cn("h-7 w-7 transition-all", isWatchlisted && "fill-primary text-primary")} />
                          </Button>
                        </div>
                        <div className='flex flex-col items-end gap-2'>
                          <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm text-base">
                              Score de Escala: {oferta.score}
                          </Badge>
                           <Badge
                              variant={
                                oferta.status === 'escalando' ? 'default'
                                : oferta.status === 'estável' ? 'secondary'
                                : 'destructive'
                              }
                              className={`capitalize ${
                                  oferta.status === 'escalando' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                                  oferta.status === 'estável' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 
                                  'bg-red-500/20 text-red-400 border-red-500/30'
                              }`}
                            >
                              {oferta.status}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm">{oferta.type}</Badge>
                        <Badge variant="outline" className="border-primary/50 text-primary text-sm">{oferta.format}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-4">
                      <h4 className="font-semibold text-foreground mb-1">Por que agora?</h4>
                      <p className="text-muted-foreground leading-relaxed">{oferta.porque}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Metricas Chave */}
            <Card className="glassmorphic rounded-2xl">
                <CardHeader>
                    <CardTitle>Métricas-Chave</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glassmorphic">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><BarChart2 className="h-4 w-4"/> Anúncios Ativos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-foreground">{oferta.ads}</p>
                            <CardDescription className="text-xs mt-1">Sinal de verba e tração.</CardDescription>
                        </CardContent>
                    </Card>
                     <Card className="glassmorphic">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4"/> ROAS Observado</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-foreground">{oferta.roas}x</p>
                            <CardDescription className="text-xs mt-1">Referência de eficiência — não é garantia.</CardDescription>
                        </CardContent>
                    </Card>
                     <Card className="glassmorphic">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Ticket className="h-4 w-4"/> Ticket Médio</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <p className="text-3xl font-bold text-foreground">R${oferta.ticket}</p>
                            <CardDescription className="text-xs mt-1">Preço de entrada observado.</CardDescription>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
            
            {/* Ações Rápidas */}
            <Card className="glassmorphic rounded-2xl">
                <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <Button size="lg" className="h-16 text-lg" asChild>
                        <Link href={`/anuncios/${oferta.id}`}>
                           <Library className="mr-2 h-6 w-6" />
                           Ver Anúncios
                        </Link>
                    </Button>
                    <Button size="lg" className="h-16 text-lg" variant="outline" asChild>
                        <Link href="#">
                           <ExternalLink className="mr-2 h-6 w-6" />
                           Ver Página
                        </Link>
                    </Button>
                     <Button size="lg" className="h-16 text-lg" variant="outline" asChild>
                        <Link href="#">
                           <ShoppingCart className="mr-2 h-6 w-6" />
                           Ver Checkout
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    