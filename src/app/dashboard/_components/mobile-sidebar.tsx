// src/app/dashboard/_components/mobile-sidebar.tsx
'use client';

import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarNav } from './sidebar-nav';

export function MobileSidebar() {
  return (
    <Sheet>
      {/* O SheetTrigger está no AppHeader */}
      <SheetContent side="left" className="p-0 w-72 glassmorphic border-r border-white/10">
        <div className="flex h-full flex-col">
          {/* Cabeçalho da Sidebar */}
          <div className="flex h-16 shrink-0 items-center justify-center px-6">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/Scalify__1_-removebg-preview.png"
                alt="Scalify Logo"
                width={160}
                height={45}
                priority
              />
            </Link>
          </div>

          {/* Adicionando SidebarNav com isMobile prop */}
          <SidebarNav isMobile />
        </div>
      </SheetContent>
    </Sheet>
  );
}
