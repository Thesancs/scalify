
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, BarChart2, Ticket, TrendingUp, Star, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ofertas as ofertasEscaladas } from '@/lib/ofertas-data';


export default function OfertasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [scoreFilter, setScoreFilter] = useState('todos');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [formatFilter, setFormatFilter] = useState('todos');

  const normalizeString = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const filteredOfertas = ofertasEscaladas.filter(oferta => {
    const normalizedSearchTerm = normalizeString(searchTerm);
    const normalizedTitle = normalizeString(oferta.title);

    return (
      (normalizedTitle.includes(normalizedSearchTerm)) &&
      (statusFilter === 'todos' || oferta.status === statusFilter) &&
      (scoreFilter === 'todos' || oferta.score.toLowerCase() === scoreFilter) &&
      (typeFilter === 'todos' || oferta.type.toLowerCase() === typeFilter) &&
      (formatFilter === 'todos' || oferta.format.toLowerCase().replace(/ /g, '-') === formatFilter)
    );
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Catálogo de Ofertas
        </h1>
        <p className="text-muted-foreground">
          Encontre e priorize o que vale testar agora.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar por nome da oferta..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Status</SelectItem>
              <SelectItem value="escalando">Escalando</SelectItem>
              <SelectItem value="estável">Estável</SelectItem>
              <SelectItem value="queda">Em Queda</SelectItem>
            </SelectContent>
          </Select>
          <Select value={scoreFilter} onValueChange={setScoreFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Scores</SelectItem>
              <SelectItem value="alto">Alto</SelectItem>
              <SelectItem value="médio">Médio</SelectItem>
              <SelectItem value="baixo">Baixo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="infoproduto">Infoproduto</SelectItem>
              <SelectItem value="encapsulado">Encapsulado</SelectItem>
              <SelectItem value="saas">SaaS</SelectItem>
            </SelectContent>
          </Select>
          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Formatos</SelectItem>
              <SelectItem value="vsl">VSL</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="landing-page">Landing Page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredOfertas.map((oferta) => (
          <Card key={oferta.id} className="glassmorphic flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:border-primary overflow-hidden group">
            <Link href={`/dashboard/ofertas/${oferta.id}`} className="flex flex-col flex-grow">
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
                <div className="absolute bottom-2 left-2 right-2">
                   <Badge
                    variant={
                      oferta.status === 'escalando' ? 'default'
                      : oferta.status === 'estável' ? 'secondary'
                      : 'destructive'
                    }
                    className={`w-full justify-center capitalize ${
                        oferta.status === 'escalando' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                        oferta.status === 'estável' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 
                        'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {oferta.status}
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
                <div className="space-y-2 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center justify-between">
                    <span className='flex items-center gap-2'><BarChart2 className="h-4 w-4"/> Anúncios Ativos:</span>
                    <span className="font-bold text-foreground">{oferta.ads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className='flex items-center gap-2'><TrendingUp className="h-4 w-4"/> ROAS:</span>
                    <span className="font-bold text-foreground">{oferta.roas}x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className='flex items-center gap-2'><Ticket className="h-4 w-4"/> Ticket Médio:</span>
                    <span className="font-bold text-foreground">R${oferta.ticket}</span>
                  </div>
                </div>
              </CardContent>
            </Link>
            <CardFooter className="p-2 border-t border-white/10 mt-auto">
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="ghost" size="sm">
                  <Star className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/ofertas/${oferta.id}`}>
                    Ver Detalhes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
       {filteredOfertas.length === 0 && (
        <div className="col-span-full text-center py-16">
          <h3 className="text-2xl font-bold text-foreground">Nenhuma oferta encontrada</h3>
          <p className="text-muted-foreground mt-2">Tente ajustar seus filtros ou o termo de busca.</p>
        </div>
      )}
    </div>
  );
}
