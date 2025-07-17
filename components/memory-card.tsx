import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, FileText, MessageSquare, Quote, NotebookPen, CalendarDays } from "lucide-react"

interface Memory {
  id: string
  type: "video" | "article" | "chat" | "note" | "quote"
  title: string
  content: string
  summary?: string
  tags?: string[]
  timestamp: string
  sourceUrl?: string
}

interface MemoryCardProps {
  memory: Memory
}

const typeIcons = {
  video: Video,
  article: FileText,
  chat: MessageSquare,
  note: NotebookPen,
  quote: Quote,
}

export function MemoryCard({ memory }: MemoryCardProps) {
  const Icon = typeIcons[memory.type]
  const formattedDate = new Date(memory.timestamp).toLocaleString()

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {Icon && <Icon className="h-4 w-4" />}
          <span className="capitalize">{memory.type}</span>
          <span className="ml-auto flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {formattedDate}
          </span>
        </div>
        <CardTitle className="text-lg line-clamp-2">{memory.title}</CardTitle>
        {memory.summary && <CardDescription className="line-clamp-3">{memory.summary}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        {memory.tags && memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {memory.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {memory.sourceUrl && (
          <a
            href={memory.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline mt-2"
          >
            View Source
          </a>
        )}
      </CardContent>
    </Card>
  )
}
