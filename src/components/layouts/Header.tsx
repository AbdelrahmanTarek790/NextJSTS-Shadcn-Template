"use client"

import React, { useState, useEffect } from "react"
import { Bell, Menu, Search, User, Plus, FileText, Calendar, Image, Check, X, Settings, LogOut } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarTrigger } from "../ui/sidebar"
import { useAuth } from "@/context/AuthContext"

interface Notification {
    id: number
    title: string
    message: string
    type: string
    read: boolean
    timestamp: Date
}

export function Header({ sidebarOpen, setSidebarOpen }: { sidebarOpen?: boolean, setSidebarOpen?: (open: boolean) => void }) {
    const { user, logout } = useAuth()
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: "Welcome to NextJS Template!",
            message: "Thank you for using our template",
            type: "general",
            read: false,
            timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        },
        {
            id: 2,
            title: "Getting Started",
            message: "Check out the dashboard to explore features",
            type: "info",
            read: true,
            timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        },
    ])

    const unreadCount = notifications.filter(notification => !notification.read).length

    const markAsRead = (id: number) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        )
    }

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        )
    }

    const formatTimestamp = (timestamp: Date) => {
        const now = new Date()
        const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

        if (diffInMinutes < 1) return "Just now"
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
        return `${Math.floor(diffInMinutes / 1440)}d ago`
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="h-4 w-px bg-sidebar-border" />
            </div>
            
            <div className="flex flex-1 items-center justify-between px-4">
                <h1 className="text-lg font-semibold">Dashboard</h1>
                
                <div className="flex items-center space-x-4">
                    {/* Quick Actions - Only for admin */}
                    {user?.role === "admin" && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>Create News</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>Create Event</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Image className="mr-2 h-4 w-4" />
                                    <span>Upload Media</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <div className="flex items-center justify-between px-2 py-2">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                {unreadCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={markAllAsRead}
                                        className="text-xs"
                                    >
                                        Mark all as read
                                    </Button>
                                )}
                            </div>
                            <DropdownMenuSeparator />
                            <div className="max-h-[300px] overflow-y-auto">
                                {notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className="flex items-start space-x-2 p-3 cursor-pointer"
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div className="flex-1 space-y-1">
                                            <p className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatTimestamp(notification.timestamp)}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                                        )}
                                    </DropdownMenuItem>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={user?.avatar} alt={user?.name} />
                                    <AvatarFallback>
                                        {user?.name ? getInitials(user.name) : "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {user?.name || "User"}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}