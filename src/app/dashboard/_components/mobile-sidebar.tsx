'use client';

import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarNav } from './sidebar-nav';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 w-72 glassmorphic border-r border-white/10">
        <div className="flex h-full flex-col">
          {/* Cabeçalho da Sidebar */}
          <div className="flex h-16 shrink-0 items-center justify-center px-6">
            <Link href="/dashboard" className="flex items-center" onClick={onClose}>
              <Image
                src="/Logo Scalify.png"
                alt="Scalify Logo"
                width={140}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Adicionando SidebarNav com isMobile prop e onClick para fechar */}
          <div onClick={onClose}>
            <SidebarNav isMobile />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
