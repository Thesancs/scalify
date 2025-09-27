'use client';

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
import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/ofertas', label: 'Ofertas', icon: Tag },
  { href: '/dashboard/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/dashboard/anticlone', label: 'AntiClone', icon: Shield },
  { href: '/dashboard/clonador', label: 'Clonador', icon: Copy },
  { href: '/dashboard/metadata', label: 'Metadata', icon: FileCode },
];

interface SidebarNavProps {
    isMobile?: boolean;
}

export function SidebarNav({ isMobile = false }: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = React.useCallback(
    (href: string) => pathname === href || (href !== '/dashboard' && pathname.startsWith(href)),
    [pathname]
  );
  
  if (isMobile) {
    return (
        <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-2">
            {menuItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                <li key={item.href}>
                    <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                        'flex items-center h-12 w-full rounded-lg text-base font-medium',
                        'text-muted-foreground hover:text-foreground hover:bg-white/5',
                        'transition-colors duration-200',
                        active && 'bg-primary/20 text-primary ring-1 ring-primary/30',
                        'px-4'
                    )}
                    >
                    <Icon className="h-5 w-5 mr-4" />
                    <span>{item.label}</span>
                    </Link>
                </li>
                );
            })}
            </ul>
        </nav>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
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
                        'flex items-center justify-center h-10 w-10 rounded-lg text-sm font-medium',
                        'text-muted-foreground hover:text-foreground hover:bg-white/5',
                        'transition-colors duration-200',
                        active && 'bg-primary/20 text-primary ring-1 ring-primary/30',
                        'group-hover:w-full group-hover:justify-start group-hover:px-3' // Estilos de expansão
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap ml-4">
                        {item.label}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center" className="ml-2 group-hover:hidden">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>
    </TooltipProvider>
  );
}
