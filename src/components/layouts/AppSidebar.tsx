"use client"

import * as React from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Users, Newspaper, Calendar, Image, Settings, Bell, LogOut, Home, UserCircle, ChevronRight, Clock } from "lucide-react"
import { NavMain } from "../ui/nav-main"
import { useAuth } from "@/context/AuthContext"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const { user, isAuthenticated, logout } = useAuth()

    // Define navigation items
    const navItems = [{ title: "Dashboard", url: "/dashboard", icon: Home, role: ["user", "admin"] }]

    const handleLogout = () => {
        logout()
    }

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Home className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">NextJS Template</span>
                                    <span className="truncate text-xs">{user?.role || "User"} Dashboard</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} userRole={user?.role} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div className="flex items-center gap-2 p-2">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user?.avatar} alt={user?.name} />
                                    <AvatarFallback className="rounded-lg">{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.name || "User"}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout} aria-label="Logout">
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
