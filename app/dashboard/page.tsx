// Removed "use client" to make this a Server Component

import { DashboardHeader } from "@/components/dashboard-header"
import { MemoryCard } from "@/components/memory-card"
import { motion } from "framer-motion"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// Mock data for memories
const mockMemories = [
  {
    id: "mem1",
    type: "video",
    title: "Deep Learning Explained: Neural Networks and Beyond",
    content: "A comprehensive video explaining the fundamentals of deep learning.",
    summary: "Covers neural network architecture, backpropagation, and applications in AI.",
    tags: ["AI", "Deep Learning", "Neural Networks", "Education"],
    timestamp: "2024-07-15T10:30:00Z",
    sourceUrl: "https://youtube.com/watch?v=example1",
  },
  {
    id: "mem2",
    type: "article",
    title: "The Future of Quantum Computing: A Decade Ahead",
    content: "An in-depth article discussing the advancements and challenges in quantum computing.",
    summary: "Explores quantum algorithms, hardware development, and potential societal impact.",
    tags: ["Quantum Computing", "Technology", "Future", "Research"],
    timestamp: "2024-07-14T14:00:00Z",
    sourceUrl: "https://example.com/quantum-computing",
  },
  {
    id: "mem3",
    type: "chat",
    title: "Discussion with AI Assistant on Productivity Hacks",
    content: "A chat transcript with an AI assistant about various productivity techniques.",
    summary: "Tips included time blocking, Pomodoro technique, and digital decluttering.",
    tags: ["Productivity", "AI", "Self-Improvement", "Chat"],
    timestamp: "2024-07-13T09:15:00Z",
  },
  {
    id: "mem4",
    type: "note",
    title: "Meeting Notes: Project Alpha Brainstorm",
    content: "Key takeaways and action items from the Project Alpha brainstorming session.",
    summary: "Decisions on feature prioritization, team roles, and next steps for development.",
    tags: ["Work", "Project Management", "Meeting", "Notes"],
    timestamp: "2024-07-12T16:45:00Z",
  },
  {
    id: "mem5",
    type: "quote",
    title: "Quote from 'Sapiens: A Brief History of Humankind'",
    content: "“You can only understand a system by trying to change it.”",
    summary: "A profound quote on understanding complex systems through active engagement.",
    tags: ["Philosophy", "Books", "History", "Quote"],
    timestamp: "2024-07-11T11:00:00Z",
    sourceUrl: "https://example.com/sapiens-book",
  },
  {
    id: "mem6",
    type: "video",
    title: "Mastering React Hooks: Advanced Patterns",
    content: "A tutorial video on advanced React Hooks usage, including custom hooks and context API.",
    summary: "Covers performance optimization with `useMemo` and `useCallback`, and state management.",
    tags: ["React", "Frontend", "Web Development", "Programming"],
    timestamp: "2024-07-10T18:20:00Z",
    sourceUrl: "https://youtube.com/watch?v=example2",
  },
  {
    id: "mem7",
    type: "article",
    title: "Understanding Blockchain Technology: A Beginner's Guide",
    content: "An introductory article explaining the core concepts of blockchain.",
    summary: "Discusses decentralization, cryptography, and various applications beyond cryptocurrency.",
    tags: ["Blockchain", "Cryptocurrency", "Technology", "Finance"],
    timestamp: "2024-07-09T08:50:00Z",
    sourceUrl: "https://example.com/blockchain-guide",
  },
  {
    id: "mem8",
    type: "note",
    title: "Recipe: Spicy Lentil Soup",
    content: "My favorite recipe for a hearty and spicy lentil soup.",
    summary: "Ingredients and step-by-step instructions for a delicious vegetarian meal.",
    tags: ["Cooking", "Recipe", "Food", "Vegetarian"],
    timestamp: "2024-07-08T19:00:00Z",
  },
]

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("DashboardPage: Session exists:", !!session) // Log session status on dashboard page

  if (!session) {
    redirect("/") // Redirect to landing if not authenticated
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 min-h-screen">
      <DashboardHeader />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {mockMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <MemoryCard memory={memory} />
          </motion.div>
        ))}
      </motion.section>
    </div>
  )
}
