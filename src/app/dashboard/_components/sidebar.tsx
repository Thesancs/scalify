// src/app/dashboard/_components/sidebar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { SidebarNav } from './sidebar-nav';

export function AppSidebar() {
  return (
    <aside
      className={cn(
        'hidden md:fixed md:inset-y-0 md:left-0 md:z-20 md:flex md:flex-col',
        'w-16 hover:w-72 transition-[width] duration-300 ease-in-out',
        'glassmorphic border-r border-white/10 group' // Adicionado 'group' para o hover funcionar
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
        
        <SidebarNav />

      </div>
    </aside>
  );
}
