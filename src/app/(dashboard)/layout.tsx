import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import HoverDevCards from "@/components/dock";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <div className={`${GeistSans.className} flex flex-col`}>
          <main className="flex flex-1 flex-col gap-4 p-4 pt-4 justify-center">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
