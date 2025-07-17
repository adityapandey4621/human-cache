import type React from "react"
import { cookies } from "next/headers"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css"
import { MouseGradientBackground } from "@/components/mouse-gradient-background"
import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans" // Using Geist Sans for headings

// Configure the Inter font for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en" className={`${GeistSans.variable} ${inter.variable} dark`}>
      <body>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <main className="flex-1 flex flex-col relative z-10">
            <div className="p-4">
              {/* SidebarTrigger is kept for consistency, but the main CTA is on the page */}
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </SidebarProvider>
        <MouseGradientBackground />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
