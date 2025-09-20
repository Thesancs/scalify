'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';

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
    score: 'Alto'
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
    score: 'Alto'
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
    imageUrl: 'https://picsum.photos/seed/oferta-3/600/400',
    imageHint: 'healthy food',
    score: 'Baixo'
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
    imageUrl: 'https://picsum.photos/seed/oferta-4/600/400',
    imageHint: 'software interface',
    score: 'Médio'
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
    imageUrl: 'https://picsum.photos/seed/oferta-5/600/400',
    imageHint: 'cosmetics beauty',
    score: 'Médio'
  },
];

export default function OfertasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Catálogo de Ofertas
        </h1>
        <p className="text-muted-foreground">
          Encontre e filtre as melhores oportunidades para escalar.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="escalando">Escalando</SelectItem>
            <SelectItem value="estavel">Estável</SelectItem>
            <SelectItem value="queda">Em Queda</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="alto">Alto</SelectItem>
            <SelectItem value="medio">Médio</SelectItem>
            <SelectItem value="baixo">Baixo</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="infoproduto">Infoproduto</SelectItem>
            <SelectItem value="encapsulado">Encapsulado</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Formato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vsl">VSL</SelectItem>
            <SelectItem value="quiz">Quiz</SelectItem>
            <SelectItem value="landing-page">Landing Page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ofertasEscaladas.map((oferta) => (
          <Link href={`/dashboard/ofertas/${oferta.id}`} key={oferta.id}>
            <Card className="flex flex-col h-full rounded-2xl glassmorphic transition-all duration-300 hover:scale-[1.02] hover:border-primary overflow-hidden cursor-pointer">
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
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  {oferta.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{oferta.type}</Badge>
                  <Badge variant="outline" className="border-primary/50 text-primary">{oferta.format}</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Anúncios Ativos:</span>
                    <span className="font-bold text-foreground">{oferta.ads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ROAS:</span>
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
                    className={`w-full justify-center capitalize ${
                        oferta.status === 'escalando' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                        oferta.status === 'estável' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 
                        'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {oferta.status}
                  </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
