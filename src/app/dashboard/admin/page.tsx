
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreVertical, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for users
const users = [
  {
    id: '1',
    name: 'Agencia Sancs',
    email: 'agenciasancs@gmail.com',
    role: 'Owner',
    avatarUrl: 'https://picsum.photos/seed/sancs/40/40',
    imageHint: 'person avatar',
  },
  {
    id: '2',
    name: 'Maria Silva',
    email: 'maria.silva@example.com',
    role: 'Admin',
    avatarUrl: 'https://picsum.photos/seed/maria-admin/40/40',
    imageHint: 'person avatar',
  },
  {
    id: '3',
    name: 'João Pereira',
    email: 'joao.pereira@example.com',
    role: 'Membro',
    avatarUrl: 'https://picsum.photos/seed/joao-membro/40/40',
    imageHint: 'person avatar',
  },
    {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    role: 'Membro',
    avatarUrl: 'https://picsum.photos/seed/ana-membro/40/40',
    imageHint: 'person avatar',
  },
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'Owner':
      return 'default';
    case 'Admin':
      return 'secondary';
    case 'Membro':
      return 'outline';
    default:
      return 'secondary';
  }
};


export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl py-8 animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Painel de Administração
            </h1>
            <p className="text-muted-foreground">
            Gerencie usuários, permissões e outras configurações do sistema.
            </p>
        </div>
        <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Adicionar Usuário
        </Button>
      </div>

      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <CardDescription>
            Atualmente, existem {users.length} usuários na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/10">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} data-ai-hint={user.imageHint}/>
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
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
                        <DropdownMenuItem>Alterar Cargo</DropdownMenuItem>
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
