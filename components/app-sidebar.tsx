"use client"

import { SidebarHeader } from "@/components/ui/sidebar"

import * as React from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronUp,
  Home,
  Lightbulb,
  type LucideIcon,
  MessageSquareText,
  PanelLeft,
  Settings,
  Sparkles,
  User2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { signOut } from "@/app/auth/actions" // Import signOut action
import { createClientSupabaseClient } from "@/lib/supabase/client" // Import client-side Supabase client

interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

const mainItems: MenuItem[] = [
  {
    title: "Timeline",
    url: "/dashboard", // Changed to /dashboard as / is now landing
    icon: Home,
  },
  {
    title: "Summaries",
    url: "/summaries",
    icon: Sparkles,
  },
  {
    title: "Flashcards",
    url: "/flashcards",
    icon: Lightbulb,
  },
  {
    title: "Mood Journal",
    url: "/mood-journal",
    icon: MessageSquareText,
  },
]

const utilityItems: MenuItem[] = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const [isRecording, setIsRecording] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState<string | null>(null)

  React.useEffect(() => {
    const supabase = createClientSupabaseClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email)
      }
    })
  }, [])

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <PanelLeft />
                  <span>HumanCache</span>
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>New Memory</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Import Data</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Utilities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between p-2">
              <Label htmlFor="recording-mode" className={`${state === "collapsed" ? "sr-only" : ""}`}>
                Recording Mode
              </Label>
              <Switch
                id="recording-mode"
                checked={isRecording}
                onCheckedChange={setIsRecording}
                aria-label="Toggle recording mode"
              />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <span>{userEmail || "Loading..."}</span> {/* Display user email */}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  {" "}
                  {/* Call signOut action */}
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
