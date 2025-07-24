"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import { BookOpen, Bot, Settings, SquareTerminal, User } from "lucide-react"
import { SearchForm } from "@/app/(dashboard)/components/search-form"
import { NavMain } from "@/app/(dashboard)/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import Toogletheme from "@/app/themeswitch"
import Feedback from "./feedback"
import Logo from "./Logo"
import { NavUser } from "./nav-user"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navMainItems = [
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
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { userProfile, loading, error } = useUser()

  // Default user data for loading/error states
  const defaultUser = {
    name: "User",
    email: "",
    avatar: "/avatars/default.jpg",
  }

  return (
    <Sidebar variant="inset" {...props} className="box-shadow">
      <SidebarHeader>
        <SidebarMenu className="ml-2 py-2">
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton size="lg" asChild>
              <div>
                <Logo />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SearchForm className="py-2" />
        <NavMain items={navMainItems} />
      </SidebarContent>

      <SidebarFooter>
        <Feedback />
        <Toogletheme />
        <Button variant="ghost" asChild>
          <Link href="/settings">
            Settings
          </Link>
        </Button>

        {loading ? (
          <div className="flex items-center space-x-2 p-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center space-x-2 p-2 text-red-500">
            <User className="h-4 w-4" />
            <span className="text-sm">Error loading user</span>
          </div>
        ) : (
          <NavUser user={userProfile || defaultUser} />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
