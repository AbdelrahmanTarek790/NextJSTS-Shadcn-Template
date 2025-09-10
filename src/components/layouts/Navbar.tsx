import React from "react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-16 w-full max-w-[1100px] items-center justify-between px-4">
        <Link href="/" className="inline-flex items-center gap-2 font-extrabold">
          <span className="inline-grid h-6 w-6 place-items-center rounded-md bg-gradient-to-tr from-red-500 to-rose-600 text-white">✦</span>
          <span>NextJS Template</span>
        </Link>
        <div className="hidden items-center gap-6 sm:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}