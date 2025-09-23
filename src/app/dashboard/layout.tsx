import type { PropsWithChildren } from "react";
import { AppHeader } from "./_components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="flex flex-1 min-h-screen">
        <AppSidebar />
        <div className="flex flex-col flex-1 md:ml-[var(--sidebar-width-icon)] group-data-[sidebar-state=expanded]:md:ml-[var(--sidebar-width)] transition-[margin-left] ease-in-out duration-300">
          <AppHeader />
          <main className="flex-1 p-4 lg:p-6 opacity-0 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
