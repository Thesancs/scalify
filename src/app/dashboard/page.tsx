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
import { ArrowRight, BarChart2, TrendingUp, Ticket, Clock, Star, TrendingDown, ArrowRightCircle } from 'lucide-react';
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
    score: 'Alto',
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
    imageUrl: 'https://picsum.photos/seed/oferta-3/600/400',
    imageHint: 'healthy food',
  },
];

const kpis = [
    {
        title: "Ofertas em alta (24h)",
        value: "5",
        description: "↑ em destaque",
        icon: TrendingUp,
        href: "/dashboard/ofertas?filtro=alta"
    },
    {
        title: "Variação de criativos (7d)",
        value: "+12%",
        description: "quantidade e consistência",
        icon: BarChart2,
        href: "/dashboard/ofertas?filtro=criativos"
    },
    {
        title: "Ticket médio",
        value: "R$354",
        description: "preço de entrada observado",
        icon: Ticket,
        href: "/dashboard/ofertas?filtro=ticket"
    },
    {
        title: "Tendência 7d",
        value: "Estável",
        description: "↑ subindo · → estável · ↓ em queda",
        icon: Clock,
        href: "/dashboard/ofertas?filtro=tendencia"
    }
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Bem-vindo à Scalify
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Descubra e acompanhe ofertas que realmente escalam. Atualizamos os sinais diariamente para você decidir em minutos.
        </p>
      </div>

       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
            <Link href={kpi.href} key={kpi.title}>
                 <Card className="flex flex-col rounded-2xl glassmorphic transition-all duration-300 hover:scale-[1.02] hover:border-primary h-full cursor-pointer">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base text-muted-foreground font-medium">
                            <kpi.icon className="h-4 w-4" />
                            {kpi.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className="text-xs text-muted-foreground">{kpi.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>


      <div className="flex flex-col gap-8">
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">
                Ofertas Escaladas — prontas para seu próximo teste
            </h2>
            <p className="text-muted-foreground mb-4 max-w-3xl">
                Curadoria baseada em volume de anúncios, consistência criativa e tendência dos últimos 7 dias.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ofertasEscaladas.map((oferta) => (
                    <Card
                        key={oferta.id}
                        className="flex flex-col h-full rounded-2xl glassmorphic transition-all duration-300 hover:border-primary/80 overflow-hidden group"
                    >
                        <div className="relative w-full aspect-video">
                            <Image
                                src={oferta.imageUrl}
                                alt={`Capa da oferta ${oferta.title}`}
                                fill
                                className="object-cover"
                                data-ai-hint={oferta.imageHint}
                            />
                             <div className="absolute top-2 right-2">
                                <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                                    Score: {oferta.score}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-bold text-foreground">{oferta.title}</CardTitle>
                             <div className="flex flex-wrap gap-2 pt-2">
                                <Badge variant="secondary">{oferta.type}</Badge>
                                <Badge variant="outline" className="border-primary/50 text-primary">{oferta.format}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center justify-between" title="Indicador de verba e tração">
                                    <span className="flex items-center gap-2"><BarChart2 className="h-4 w-4" /> Anúncios ativos:</span>
                                    <span className="font-bold text-foreground">{oferta.ads}</span>
                                </div>
                                <div className="flex items-center justify-between" title="Referência de eficiência — não é garantia">
                                    <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> ROAS observado:</span>
                                    <span className="font-bold text-foreground">{oferta.roas}x</span>
                                </div>
                                <div className="flex items-center justify-between" title="Preço praticado recentemente">
                                    <span className="flex items-center gap-2"><Ticket className="h-4 w-4"/> Ticket médio:</span>
                                    <span className="font-bold text-foreground">R${oferta.ticket}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-4">
                            <Badge
                                variant={oferta.status === 'escalando' ? 'default' : 'destructive'}
                                className={`w-full justify-center capitalize ${
                                    oferta.status === 'escalando' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                                    oferta.status === 'estável' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 
                                    'bg-red-500/20 text-red-400 border-red-500/30'
                                }`}
                            >
                                {oferta.status}
                            </Badge>
                             <div className="w-full grid grid-cols-2 gap-2">
                                <Button asChild className="w-full">
                                    <Link href={`/dashboard/ofertas/${oferta.id}`}>Ver Detalhes</Link>
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Star className="mr-2 h-4 w-4" />
                                    Salvar
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
