"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { BookOpen, Bot, SquareTerminal } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import Toogletheme  from "@/app/themeswitch";
import Feedback from "./feedback";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Assignment",
      url: "/assignment",
      icon: Bot,
    },
    {
      title: "document-ai",
      url: "/document-ai",
      icon: SquareTerminal,
    },
    {
      title: "Classes",
      url: "/classes",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu className="ml-2 py-2">
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SearchForm className="py-2" />
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <Toogletheme/>
        <Feedback/>
      </SidebarFooter>
    </Sidebar>
  );
}