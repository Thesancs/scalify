// src/app/dashboard/_components/sidebar.tsx
'use client';

import {
  LayoutDashboard,
  Tag,
  MessageSquare,
  Shield,
  Copy,
  FileCode,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/ofertas', label: 'Ofertas', icon: Tag },
  { href: '/dashboard/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/dashboard/anticlone', label: 'AntiClone', icon: Shield },
  { href: '/dashboard/clonador', label: 'Clonador', icon: Copy },
  { href: '/dashboard/metadata', label: 'Metadata', icon: FileCode },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = React.useCallback(
    (href: string) => pathname === href || (href !== '/dashboard' && pathname.startsWith(href)),
    [pathname]
  );

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'hidden md:fixed md:inset-y-0 md:left-0 md:z-20 md:flex md:flex-col',
          'w-16 hover:w-72 transition-[width] duration-300 ease-in-out',
          'glassmorphic border-r border-white/10 group'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Cabeçalho da Sidebar */}
          <div className="flex h-16 shrink-0 items-center justify-center">
            <Link href="/dashboard" className="flex items-center justify-center h-full w-full">
               {/* Logo Completo - aparece no hover */}
               <div className="w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                 <Image
                    src="/Scalify__1_-removebg-preview.png"
                    alt="Scalify Logo"
                    width={160}
                    height={45}
                    priority
                  />
               </div>
              {/* Ícone 'S' - visível quando recolhido */}
              <div className="absolute left-1/2 -translate-x-1/2 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                <div className="h-9 w-9 bg-white/10 ring-1 ring-white/15 text-white/90 flex items-center justify-center rounded-lg font-bold text-lg">
                  S
                </div>
              </div>
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex items-center h-10 w-full rounded-lg text-sm font-medium',
                            'text-muted-foreground hover:text-foreground hover:bg-white/5',
                             'transition-colors duration-200',
                            active && 'bg-primary/20 text-primary ring-1 ring-primary/30',
                          )}
                        >
                          <div className="flex h-10 w-12 shrink-0 items-center justify-center">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
                            {item.label}
                          </span>
                        </Link>
                      </TooltipTrigger>
                       {/* O Tooltip só aparece quando a sidebar está recolhida */}
                      <TooltipContent side="right" align="center" className="ml-2 group-hover:hidden">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </TooltipProvider>
  );
}
