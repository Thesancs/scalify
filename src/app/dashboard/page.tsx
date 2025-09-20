'use client';

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
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowRight,
  CheckCircle,
  Flame,
  Star,
  Ticket,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const validadas48h = [
  {
    id: '1',
    title: 'Método de 7 Segundos',
    veredicto: 'Priorize',
    veredictoColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    porque:
      'Alto volume de novos criativos e expansão para outros mercados. O momento de testar é agora.',
    sinais: {
      anuncios: '670+',
      tendencia: 'Alta',
      ticket: 'R$297',
    },
    minerador: {
      nome: 'João P.',
      avatarUrl: 'https://picsum.photos/seed/joao/40/40',
      hint: 'person'
    },
  },
  {
    id: '2',
    title: 'Bactéria Gordurosa',
    veredicto: 'Teste',
    veredictoColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    porque:
      'Sinais de saturação no público principal, mas com bom ROAS. Vale o teste em um novo ângulo.',
    sinais: {
      anuncios: '180',
      tendencia: 'Estável',
      ticket: 'R$467',
    },
    minerador: {
      nome: 'Maria S.',
      avatarUrl: 'https://picsum.photos/seed/maria/40/40',
      hint: 'person'
    },
  },
];

const recomendacaoEspecialista = {
  id: '4',
  title: 'Automação para SaaS',
  veredicto: 'Priorize',
  veredictoColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  porque:
    'Solução B2B com ticket alto e demanda crescente. Pouca concorrência e alto potencial de escala no Brasil.',
  sinais: {
    anuncios: '320',
    tendencia: 'Crescente',
    ticket: 'R$997',
  },
};

const mineracaoHoje = [
  { id: 1, nome: 'Protocolo Zero Cal', minerador: '@ana.martins', status: 'Em triagem' },
  { id: 2, nome: 'Voz Mestra IA', minerador: '@carlos.roberto', status: 'Em validação' },
  { id: 3, nome: 'Gota Seca Max', minerador: '@bia_oliveira', status: 'Em triagem' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Hoje na Scalify
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          O que a comunidade minerou e o especialista validou.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">
              Validadas nas últimas 48h
            </h2>
            <p className="text-muted-foreground mb-4 max-w-3xl">
              Nossos especialistas confirmaram o potencial. Analise e prepare seu teste.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {validadas48h.map((oferta) => (
                <Card
                  key={oferta.id}
                  className="flex flex-col h-full rounded-2xl glassmorphic transition-all duration-300 hover:border-primary/80 overflow-hidden group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="flex items-center gap-2 bg-black/50 text-white backdrop-blur-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Validado pelo Especialista
                      </Badge>
                       <Badge className={oferta.veredictoColor}>
                        {oferta.veredicto}
                      </Badge>
                    </div>
                     <CardTitle className="text-xl font-bold text-foreground pt-4">{oferta.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex-grow space-y-4">
                     <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center justify-between" title="Indicador de verba e tração">
                              <span className="flex items-center gap-2"><Flame className="h-4 w-4" /> Anúncios ativos:</span>
                              <span className="font-bold text-foreground">{oferta.sinais.anuncios}</span>
                          </div>
                          <div className="flex items-center justify-between" title="Tendência dos últimos 7 dias">
                              <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Tendência 7d:</span>
                              <span className="font-bold text-foreground">{oferta.sinais.tendencia}</span>
                          </div>
                          <div className="flex items-center justify-between" title="Preço praticado recentemente">
                              <span className="flex items-center gap-2"><Ticket className="h-4 w-4"/> Ticket médio:</span>
                              <span className="font-bold text-foreground">{oferta.sinais.ticket}</span>
                          </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-1">Por que agora?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{oferta.porque}</p>
                      </div>
                  </CardContent>

                  <CardFooter className="grid grid-cols-2 gap-2">
                     <Button asChild className="w-full">
                          <Link href={`/dashboard/ofertas/${oferta.id}`}>Ver Detalhes</Link>
                      </Button>
                      <Button variant="outline" className="w-full">
                          <Star className="mr-2 h-4 w-4" />
                          Salvar
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Lateral */}
        <div className="flex flex-col gap-8">
            {/* Recomendação do Especialista */}
            <div>
                 <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                    Recomendação do Especialista
                 </h2>
                 <Card className="rounded-2xl glassmorphic border-primary/50">
                     <CardHeader>
                         <div className="flex justify-between items-center">
                            <CardTitle className="text-xl font-bold">{recomendacaoEspecialista.title}</CardTitle>
                             <Badge className={recomendacaoEspecialista.veredictoColor}>
                                {recomendacaoEspecialista.veredicto}
                            </Badge>
                         </div>
                     </CardHeader>
                     <CardContent>
                          <h4 className="font-semibold text-sm text-foreground mb-1">Por que agora?</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{recomendacaoEspecialista.porque}</p>
                     </CardContent>
                     <CardFooter>
                         <Button asChild className="w-full">
                             <Link href={`/dashboard/ofertas/${recomendacaoEspecialista.id}`}>
                                Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                             </Link>
                         </Button>
                     </CardFooter>
                 </Card>
            </div>
             {/* Mineração de Hoje */}
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                    Mineração de Hoje
                </h2>
                <Card className="rounded-2xl glassmorphic">
                    <CardContent className="p-4">
                        <Table>
                            <TableBody>
                                {mineracaoHoje.map((item) => (
                                    <TableRow key={item.id} className="border-b-white/10">
                                        <TableCell className="font-medium text-foreground py-3">
                                            <Link href="#" className="hover:underline">{item.nome}</Link>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-right py-3">{item.minerador}</TableCell>
                                        <TableCell className="text-right py-3">
                                             <Badge variant={item.status === 'Em validação' ? 'default' : 'secondary'} className="capitalize text-xs whitespace-nowrap">
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="p-2">
                        <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary">
                            Ver Fila Completa <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
