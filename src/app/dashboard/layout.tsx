import type { PropsWithChildren } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar";
import { AppHeader } from "./_components/header";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider
      style={{ '--sidebar-width': '240px' } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 lg:p-6 opacity-0 animate-fade-in">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
