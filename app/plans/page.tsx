// Removed "use client" to make this a Server Component

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// Pricing plan data
const pricingPlans = [
  {
    name: "Free Plan",
    price: "Free",
    interval: "",
    features: [
      "Basic timeline of visited items",
      "Limited storage (e.g., 100 memories)",
      "Manual note-taking",
      "Community support",
    ],
    buttonText: "Start for Free",
  },
  {
    name: "Pro Plan",
    price: "$20",
    interval: "/month",
    features: [
      "Enhanced timeline & unlimited storage",
      "Automated data capture (titles, URLs)",
      "Basic transcription (e.g., 10 hours/month)",
      "Short notes & highlights",
      "Email support",
    ],
    buttonText: "Get Pro",
    highlight: false,
  },
  {
    name: "Premium Plan",
    price: "$180",
    interval: "/year",
    features: [
      "All Pro features",
      "Advanced transcription & summarization",
      "Movie & book review generation",
      "Emotional tone & keyword extraction",
      "Flashcards & learning recall tools",
      "Mood journaling & personal reflection",
      "Priority support",
    ],
    buttonText: "Go Premium",
    highlight: true,
  },
]

export default async function PlansPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/") // Redirect to landing if not authenticated
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground relative z-10 p-4 md:p-6 font-body">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 animate-fade-in-up text-primary-foreground">
        Choose Your Memory Plan
      </h1>
      <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto mb-16 animate-fade-in-up delay-200">
        Unlock the full potential of your personal memory system. Select the plan that best fits your needs and start
        retaining more.
      </p>
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto w-full">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          >
            <Card
              className={cn(
                "flex flex-col bg-card/80 backdrop-blur-lg text-card-foreground border border-primary/10 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/30 hover:border-primary/50",
                plan.highlight && "border-primary shadow-lg scale-[1.03] bg-primary/10",
              )}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold font-heading text-primary">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  <span className="text-5xl font-extrabold text-primary">{plan.price}</span>
                  {plan.interval && <span className="text-2xl">{plan.interval}</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow px-6 py-4">
                <ul className="space-y-3 text-base">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
