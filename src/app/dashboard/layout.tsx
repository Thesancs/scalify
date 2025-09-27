import type { PropsWithChildren } from "react";
import { AppHeader } from "./_components/header";
import { AppSidebar } from "./_components/sidebar";
import { MobileSidebar } from "./_components/mobile-sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <MobileSidebar />
      <div className="flex-1 flex flex-col md:ml-16">
        <AppHeader />
        <main className="flex-1 p-4 lg:p-6 opacity-0 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
