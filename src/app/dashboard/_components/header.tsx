'use client';

import { LogOut, User, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';

export function AppHeader() {
  
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/30 px-4 backdrop-blur-lg md:px-6">
      <div className="flex items-center gap-4 md:hidden">
        {/* Botão de Menu para Mobile */}
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir Menu</span>
                </Button>
            </SheetTrigger>
            {/* O SheetContent está no componente MobileSidebar */}
        </Sheet>
      </div>

       {/* Espaçador para centralizar o DropdownMenu no desktop */}
      <div className="hidden md:flex"></div>


      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="Usuário Teste" data-ai-hint="person avatar"/>
                <AvatarFallback>UT</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glassmorphic">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Usuário Teste</p>
                <p className="text-xs leading-none text-muted-foreground">
                  teste@scalify.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
