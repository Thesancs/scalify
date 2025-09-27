import type { PropsWithChildren } from "react";
import { AppHeader } from "./_components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 flex flex-col w-full group-data-[sidebar-state=expanded]:md:ml-72 group-data-[sidebar-state=collapsed]:md:ml-16 transition-[margin-left] duration-200 ease-out">
          <AppHeader />
          <div className="flex-1 p-4 lg:p-6 opacity-0 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
