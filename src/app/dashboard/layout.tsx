
'use client';

import { type PropsWithChildren, useState, useEffect } from "react";
import { AppHeader } from "./_components/header";
import { AppSidebar } from "./_components/sidebar";
import { MobileSidebar } from "./_components/mobile-sidebar";
import { useAuth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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
