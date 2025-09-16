import type { PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar";
import { AppHeader } from "./_components/header";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider
      style={{ '--sidebar-width': '240px' } as React.CSSProperties}
    >
      <AppSidebar />
      <div className="md:ml-[var(--sidebar-width)] flex flex-col flex-1 min-h-screen">
        <AppHeader />
        <main className="flex-1 p-4 lg:p-6 opacity-0 animate-fade-in">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
