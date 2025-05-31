import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(dashboard)/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 pt-4 justify-center">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
