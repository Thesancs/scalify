
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreVertical, Search, UserPlus } from 'lucide-react';
import React, { useState } from 'react';

// Mock data for users
const users = [
  {
    id: '1',
    name: 'Agencia Sancs',
    email: 'agenciasancs@gmail.com',
    role: 'Owner',
    status: 'ativo',
    tags: ['VIP'],
    avatarUrl: 'https://picsum.photos/seed/sancs/40/40',
    imageHint: 'person avatar',
  },
  {
    id: '2',
    name: 'Maria Silva',
    email: 'maria.silva@example.com',
    role: 'Admin',
    status: 'ativo',
    tags: [],
    avatarUrl: 'https://picsum.photos/seed/maria-admin/40/40',
    imageHint: 'person avatar',
  },
  {
    id: '3',
    name: 'João Pereira',
    email: 'joao.pereira@example.com',
    role: 'Membro',
    status: 'trial',
    tags: ['New'],
    avatarUrl: 'https://picsum.photos/seed/joao-membro/40/40',
    imageHint: 'person avatar',
  },
    {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    role: 'Membro',
    status: 'suspenso',
    tags: ['Churn'],
    avatarUrl: 'https://picsum.photos/seed/ana-membro/40/40',
    imageHint: 'person avatar',
  },
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'Owner': return 'default';
    case 'Admin': return 'secondary';
    case 'Membro': return 'outline';
    default: return 'secondary';
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'ativo': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'trial': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'suspenso': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'secondary';
  }
};

export default function ProfilesTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const filteredUsers = users.filter(user => {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      return (
          (user.name.toLowerCase().includes(normalizedSearchTerm) || user.email.toLowerCase().includes(normalizedSearchTerm)) &&
          (statusFilter === 'todos' || user.status === statusFilter)
      );
  });

  return (
    <Card className="glassmorphic mt-4">
        <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle>Perfis de Usuário</CardTitle>
                    <CardDescription>
                        Busque, filtre e gerencie os usuários da plataforma.
                    </CardDescription>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Convidar Usuário
                </Button>
            </div>
             <div className="flex flex-col md:flex-row gap-4 pt-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Buscar por nome ou e-mail..."
                    className="w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos Status</SelectItem>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="trial">Trial</SelectItem>
                        <SelectItem value="suspenso">Suspenso</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Ações</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/10">
                <TableCell>
                    <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={user.avatarUrl} data-ai-hint={user.imageHint}/>
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    </div>
                </TableCell>
                <TableCell>
                     <Badge className={`text-xs capitalize ${getStatusBadgeVariant(user.status)}`}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                    </Badge>
                </TableCell>
                 <TableCell>
                    <div className="flex flex-wrap gap-1">
                        {user.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                </TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Alterar Cargo</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 focus:text-red-500">
                        Suspender
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        {filteredUsers.length === 0 && (
            <div className="text-center py-16">
            <h3 className="text-2xl font-bold">Nenhum usuário encontrado</h3>
            <p className="text-muted-foreground mt-2">Tente ajustar seus filtros ou o termo de busca.</p>
            </div>
        )}
        </CardContent>
    </Card>
  );
}
