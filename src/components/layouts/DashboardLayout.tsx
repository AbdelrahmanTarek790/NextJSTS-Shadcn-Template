"use client"

import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { redirect } from "next/navigation"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Header } from "./Header"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { isAuthenticated, loading } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        redirect("/login")
    }

    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "16rem",
                "--header-height": "4rem",
            } as React.CSSProperties}
        >
            <AppSidebar />
            
            <SidebarInset>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <main className="flex-1 overflow-y-auto p-4 md:p-6">
                                {children}
                            </main>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}