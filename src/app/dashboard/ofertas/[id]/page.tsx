'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart2, CheckCircle, ExternalLink, Library, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock data - in a real app, this would come from an API
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

export default function OfertaPage({ params }: { params: { id: string } }) {
  const oferta = ofertasEscaladas.find((o) => o.id === params.id);

  if (!oferta) {
    notFound();
  }
  
  const handleSave = () => {
    console.log(`Oferta "${oferta.title}" salva!`);
    // Here you would typically update a state or call an API
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 animate-fade-in">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Dashboard
        </Link>
        
        <div className="flex flex-col gap-8">
            <Card className="rounded-2xl bg-card/60 shadow-lg backdrop-blur-sm border-0">
                <CardHeader>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex-1">{oferta.title}</h1>
                        <div className={`flex items-center gap-2 text-sm font-bold ${oferta.status === 'escalando' ? 'text-green-500' : 'text-red-500'}`}>
                            {oferta.status === 'escalando' ? 'Escalando' : 'Em Risco'}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="default" className="bg-primary hover:bg-primary/80 text-sm">{oferta.type}</Badge>
                        <Badge variant="secondary" className="bg-secondary hover:bg-secondary/80 text-sm">{oferta.format}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-6 text-center">
                        <div className="rounded-lg p-4 bg-muted/50">
                            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2"><BarChart2 className="h-4 w-4" /> Anúncios</p>
                            <p className="text-2xl font-bold text-foreground">{oferta.ads}</p>
                        </div>
                        <div className="rounded-lg p-4 bg-muted/50">
                            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2"><TrendingUp className="h-4 w-4" /> ROAS</p>
                            <p className="text-2xl font-bold text-foreground">{oferta.roas}x</p>
                        </div>
                        <div className="rounded-lg p-4 bg-muted/50 col-span-2 md:col-span-1">
                            <p className="text-sm text-muted-foreground">Ticket Médio</p>
                            <p className="text-2xl font-bold text-foreground">R${oferta.ticket}</p>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-foreground mb-3">Descrição da Oferta</h2>
                        <p className="text-muted-foreground leading-relaxed">{oferta.descricao}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl bg-card/60 shadow-lg backdrop-blur-sm border-0">
                <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     <Button size="lg" className="h-16 text-lg" onClick={handleSave}>
                        <CheckCircle className="mr-2 h-6 w-6" />
                        Salvar Oferta
                    </Button>
                    <Button size="lg" variant="secondary" className="h-16 text-lg" asChild>
                        <a href="https://checkout.scalify.dev/mock" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-6 w-6" />
                            Ir para Checkout
                        </a>
                    </Button>
                     <Button size="lg" variant="outline" className="h-16 text-lg" asChild>
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