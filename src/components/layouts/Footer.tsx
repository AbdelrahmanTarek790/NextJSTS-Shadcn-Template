import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-10 border-t bg-muted/10">
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="inline-grid h-6 w-6 place-items-center rounded-md bg-gradient-to-tr from-red-500 to-rose-500 text-white">✦</span>
            NextJS Template
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            A modern NextJS template with shadcn/ui and protected routes.
          </p>
          <div className="mt-3 flex gap-3 text-sm text-muted-foreground">
            <Link href="#" aria-label="Twitter">𝕏</Link>
            <Link href="#" aria-label="LinkedIn">in</Link>
            <Link href="#" aria-label="GitHub">GH</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Template</h4>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Newsletter</h4>
          <p className="mt-1 text-sm text-muted-foreground">Subscribe for updates</p>
          <form className="mt-3 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button className="bg-gradient-to-r from-red-500 to-rose-500">Subscribe</Button>
          </form>
        </div>
      </div>
      <Separator className="opacity-50" />
      <div className="mx-auto w-full max-w-[1100px] px-4 py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} NextJS Template. All rights reserved.
      </div>
    </footer>
  )
}