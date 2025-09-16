'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Copy,
  FileCode2,
  LayoutDashboard,
  ShieldCheck,
  Star,
  Tag,
} from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Sidebar } from '@/components/ui/sidebar';
import React from 'react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/ofertas', label: 'Ofertas', icon: Tag },
  { href: '/dashboard/reviews', label: 'Reviews', icon: Star },
  { href: '/dashboard/anticlone', label: 'Anticlone', icon: ShieldCheck },
  { href: '/dashboard/clonador', label: 'Clonador', icon: Copy },
  { href: '/dashboard/metadata', label: 'Metadata', icon: FileCode2 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-white/10 bg-black/40 backdrop-blur-xl" collapsible="icon">
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Scalify
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              {index === 3 && <SidebarSeparator className="my-2 border-b border-white/10" />}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className="group h-auto gap-3 py-3 px-4 text-base transition-all duration-300 hover:bg-white/10 data-[active=true]:bg-white/15 data-[active=true]:text-primary"
                  isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon className="h-6 w-6 group-data-[active=true]:text-primary" />
                    <span className="group-data-[active=true]:text-primary">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
