'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, BarChart2, Library, Star, Ticket, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    score: 'Alto',
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
    status: 'queda',
    score: 'Baixo',
    descricao: 'Um e-book completo com 100 receitas para quem busca uma alimentação saudável e rica em proteínas. Perfeito para nichos de fitness e bem-estar.'
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
    descricao: 'Solução B2B com ticket alto e demanda crescente. Pouca concorrência e alto potencial de escala no Brasil.'
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
    descricao: 'Kit com produtos de beleza naturais, com foco em sustentabilidade e bem-estar. Mercado em alta com público fiel.'
  },
];

export default function OfertaPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const oferta = ofertasEscaladas.find((o) => o.id === params.id);

  if (!oferta) {
    notFound();
  }
  
  const handleSaveToWatchlist = () => {
    toast({
        title: 'Oferta Salva!',
        description: `"${oferta.title}" foi adicionada à sua Watchlist. Vamos avisar se algo mudar.`,
    })
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 animate-fade-in">
        <Link href="/dashboard/ofertas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Catálogo
        </Link>
        
        <div className="flex flex-col gap-8">
            <Card className="rounded-2xl glassmorphic border-0">
                <CardHeader>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex-1">{oferta.title}</h1>
                        <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm text-base">
                            Score de Escala: {oferta.score}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm">{oferta.type}</Badge>
                        <Badge variant="outline" className="border-primary/50 text-primary text-sm">{oferta.format}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-4 mb-8">
                        <p className="text-muted-foreground leading-relaxed">{oferta.descricao}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                        <Card className="glassmorphic">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><BarChart2 className="h-4 w-4"/> Anúncios Ativos</CardTitle>
                                <CardDescription className="text-xs">Indicador de verba e tração.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-foreground">{oferta.ads}</p>
                            </CardContent>
                        </Card>
                         <Card className="glassmorphic">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4"/> ROAS Observado</CardTitle>
                                <CardDescription className="text-xs">Referência de eficiência — não é garantia.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-foreground">{oferta.roas}x</p>
                            </CardContent>
                        </Card>
                         <Card className="glassmorphic">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Ticket className="h-4 w-4"/> Ticket Médio</CardTitle>
                                <CardDescription className="text-xs">Preço praticado recentemente.</CardDescription>
                            </CardHeader>
                             <CardContent>
                                <p className="text-3xl font-bold text-foreground">R${oferta.ticket}</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl glassmorphic border-0">
                <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Button size="lg" className="h-16 text-lg" variant="outline" onClick={handleSaveToWatchlist}>
                        <Star className="mr-2 h-6 w-6" />
                        Adicionar à Watchlist
                    </Button>
                     <Button size="lg" className="h-16 text-lg" asChild>
                        <Link href={`/anuncios/${oferta.id}`}>
                           <Library className="mr-2 h-6 w-6" />
                           Ver Anúncios
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
