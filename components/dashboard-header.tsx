import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <h1 className="text-3xl font-bold">HumanCache Dashboard</h1>
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search memories..." className="w-full rounded-lg bg-background pl-9" />
      </div>
    </header>
  )
}
