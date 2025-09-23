import type { PropsWithChildren } from "react";
import { AppHeader } from "./_components/header";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <AppHeader />
      <main className="flex-1 p-4 lg:p-6 opacity-0 animate-fade-in">
        {children}
      </main>
    </div>
  );
}
