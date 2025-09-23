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
  const { state } = useSidebar();
  
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Sidebar
      className="glassmorphic border-r border-white/10"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarHeader className="h-16 justify-center">
            <div className="flex items-center">
                {state === 'expanded' && (
                  <Link href="/dashboard">
                    <Image
                      src="/Scalify__1_-removebg-preview.png"
                      alt="Scalify Logo"
                      width={120}
                      height={40}
                    />
                  </Link>
                )}
            </div>
        </SidebarHeader>

        <SidebarMenu className="flex-1">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
                className="justify-start data-[active=true]:bg-primary/20 data-[active=true]:text-primary"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
