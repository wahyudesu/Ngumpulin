"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { BookOpen, Bot, SquareTerminal } from "lucide-react";
import { SearchForm } from "@/app/(dashboard)/components/search-form";
import { NavMain } from "@/app/(dashboard)/components/nav-main";
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
import Toogletheme from "@/app/themeswitch";
import Feedback from "./feedback";
import Logo from "./Logo";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "user",
    // email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Assignment",
      url: "/assignment",
      icon: Bot,
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
    <Sidebar variant="inset" {...props} className="box-shadow">
      <SidebarHeader>
        <SidebarMenu className="ml-2 py-2">
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton size="lg" asChild>
              <div>
                <Logo/>
              </div>
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
        <Toogletheme />
        <Feedback />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
