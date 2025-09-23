// src/components/app-sidebar.tsx
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Tag,
  MessageSquare,
  Shield,
  Copy,
  FileCode,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import * as React from 'react';
import { cn } from '@/lib/utils';

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
  const { state } = useSidebar(); // 'expanded' | 'collapsed'

  const isActive = React.useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + '/'),
    [pathname]
  );

  return (
    <Sidebar
      collapsible="icon"
      // Larguras firmes + glassmorphism; funciona com data-[state] do shadcn/ui
      className={[
        'glassmorphic border-r border-white/10',
        'data-[state=expanded]:w-72',
        'data-[state=collapsed]:w-16',
        'transition-[width] duration-200 ease-out',
      ].join(' ')}
    >
      <SidebarContent>
        <SidebarHeader className="h-16 items-center justify-center">
            <Link 
              href="/dashboard" 
              className={cn(
                "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg",
                "flex items-center justify-center transition-all",
                state === 'collapsed' && "h-9 w-9 bg-white/10 ring-1 ring-white/15 text-white/90"
              )}
            >
              <div className={cn("transition-opacity duration-200", state === 'collapsed' ? 'opacity-0 w-0 h-0' : 'opacity-100')}>
                <Image
                  src="/Scalify__1_-removebg-preview.png"
                  alt="Scalify Logo"
                  width={120}
                  height={40}
                  priority={false}
                />
              </div>
               <span className={cn("absolute transition-opacity duration-200", state === 'expanded' ? 'opacity-0' : 'opacity-100')}>
                 S
               </span>
            </Link>
        </SidebarHeader>

        <SidebarMenu className="flex-1 px-2">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={item.label} // aparece automaticamente no modo ícone
                  className={[
                    'justify-start rounded-xl',
                    'hover:bg-white/10 hover:text-white',
                    'data-[active=true]:bg-primary/20',
                    'data-[active=true]:text-primary',
                    'data-[active=true]:ring-1 data-[active=true]:ring-primary/30',
                    'transition-[opacity,transform] duration-200',
                  ].join(' ')}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => console.log('[Sidebar] navigate ->', item.href)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
