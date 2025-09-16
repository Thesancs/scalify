'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    imageHint: 'software interface'
  },
  {
    id: '5',
    title: 'Kit de Beleza Natural',
    type: 'Encapsulado',
    format: 'VSL',
    ads: 95,
    roas: 2.5,
    ticket: 197,
    status: 'risco',
    imageUrl: 'https://picsum.photos/seed/oferta-5/600/400',
    imageHint: 'cosmetics beauty'
  },
];

export default function OfertasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Ofertas Escaladas
        </h1>
        <p className="text-muted-foreground">
          Encontre as melhores oportunidades para escalar.
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
            <SelectItem value="risco">Em Risco</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Nicho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="saude">Saúde</SelectItem>
            <SelectItem value="financas">Finanças</SelectItem>
            <SelectItem value="educacao">Educação</SelectItem>
            <SelectItem value="beleza">Beleza</SelectItem>
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
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pt">Português</SelectItem>
            <SelectItem value="en">Inglês</SelectItem>
            <SelectItem value="es">Espanhol</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ofertasEscaladas.map((oferta) => (
          <Link href={`/dashboard/ofertas/${oferta.id}`} key={oferta.id}>
            <Card className="flex flex-col h-full rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-secondary overflow-hidden cursor-pointer">
              <div className="relative w-full aspect-video">
                <Image
                  src={oferta.imageUrl}
                  alt={`Capa da oferta ${oferta.title}`}
                  fill
                  className="object-cover"
                  data-ai-hint={oferta.imageHint}
                />
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
               <CardContent>
                 <Badge
                    variant={oferta.status === 'escalando' ? 'default' : 'destructive'}
                    className={`w-full justify-center ${oferta.status === 'escalando' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}
                  >
                    {oferta.status === 'escalando' ? 'Escalando' : 'Em Risco'}
                  </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
