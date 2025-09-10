import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="mx-auto max-w-[1100px] px-4 py-20 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
              <span className="inline-grid h-2 w-2 place-items-center rounded-full bg-green-500"></span>
              Ready to use template
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              NextJS TypeScript
              <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
                {" "}shadcn/ui Template
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A modern, production-ready starter template with Next.js 14, TypeScript, 
              shadcn/ui components, and built-in protected routes authentication.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted/10 py-20">
          <div className="mx-auto max-w-[1100px] px-4">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Everything you need to get started
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-tr from-red-500 to-rose-600 flex items-center justify-center text-white text-2xl">
                  ⚡
                </div>
                <h3 className="mt-4 text-lg font-semibold">Fast & Modern</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Built with Next.js 14, TypeScript, and Tailwind CSS for optimal performance.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-tr from-red-500 to-rose-600 flex items-center justify-center text-white text-2xl">
                  🔐
                </div>
                <h3 className="mt-4 text-lg font-semibold">Protected Routes</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Built-in authentication system with role-based access control.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-tr from-red-500 to-rose-600 flex items-center justify-center text-white text-2xl">
                  🎨
                </div>
                <h3 className="mt-4 text-lg font-semibold">shadcn/ui Components</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Beautiful, accessible UI components ready to use out of the box.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="mx-auto max-w-[1100px] px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              About This Template
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              This template provides a solid foundation for building modern web applications
              with clean architecture, type safety, and great developer experience.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/login">Start Building</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
