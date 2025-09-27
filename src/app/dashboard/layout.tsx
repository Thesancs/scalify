'use client';

import type { PropsWithChildren } from "react";
import { useState } from "react";
import { AppHeader } from "./_components/header";
import { AppSidebar } from "./_components/sidebar";
import { MobileSidebar } from "./_components/mobile-sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar para Desktop */}
      <AppSidebar />
      
      {/* Sidebar para Mobile (controlada por estado) */}
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col md:ml-16">
        <AppHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 opacity-0 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
