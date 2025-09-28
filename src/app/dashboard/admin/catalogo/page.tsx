
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreVertical, PlusCircle } from 'lucide-react';
import Image from 'next/image';

// Mock data - using the same data from a-ofertas page for consistency
const ofertas = [
  {
    id: '1',
    title: 'Método de 7 Segundos',
    type: 'Infoproduto',
    format: 'VSL',
    status: 'escalando',
    imageUrl: '/Desparasitar.PNG',
    imageHint: 'health product',
  },
  {
    id: '2',
    title: 'Bactéria Gordurosa',
    type: 'Encapsulado',
    format: 'Landing Page',
    status: 'escalando',
    imageUrl: 'https://picsum.photos/seed/oferta-2/40/40',
    imageHint: 'health science',
  },
  {
    id: '3',
    title: '100 Receitas Ricas em Proteínas',
    type: 'Infoproduto',
    format: 'Quiz',
    status: 'queda',
    imageUrl: 'https://picsum.photos/seed/oferta-3/40/40',
    imageHint: 'healthy food',
  },
   {
    id: '4',
    title: 'Automação para SaaS',
    type: 'SaaS',
    format: 'Landing Page',
    status: 'escalando',
    imageUrl: 'https://picsum.photos/seed/oferta-4/40/40',
    imageHint: 'software interface',
  },
  {
    id: '5',
    title: 'Kit de Beleza Natural',
    type: 'Encapsulado',
    format: 'VSL',
    status: 'estável',
    imageUrl: 'https://picsum.photos/seed/oferta-5/40/40',
    imageHint: 'cosmetics beauty',
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'escalando':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'estável':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'queda':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'secondary';
  }
};


export default function CatalogoAdminPage() {
  return (
    <div className="container mx-auto max-w-7xl py-8 animate-fade-in space-y-8">
      <Card className="glassmorphic">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Gerenciamento de Catálogo</CardTitle>
                <CardDescription>
                  Adicione, edite ou remova as ofertas da plataforma.
                </CardDescription>
              </div>
              <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Oferta
              </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Oferta</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ofertas.map((oferta) => (
                <TableRow key={oferta.id} className="hover:bg-muted/10">
                  <TableCell>
                    <div className="flex items-center gap-4">
                        <Image 
                            src={oferta.imageUrl} 
                            alt={oferta.title} 
                            width={40} 
                            height={40} 
                            className="rounded-md object-cover"
                            data-ai-hint={oferta.imageHint}
                        />
                      <span className="font-medium">{oferta.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {oferta.type}
                  </TableCell>
                   <TableCell className="text-muted-foreground">
                    <Badge variant="outline" className="border-primary/50 text-primary">{oferta.format}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`capitalize ${getStatusBadgeVariant(oferta.status)}`}>
                      {oferta.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 focus:text-red-500">
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
