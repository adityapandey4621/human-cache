"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Review {
  name: string
  rating: number
  text: string
  emoji: string
  profile: string
}

interface ReviewCarouselProps {
  reviews: Review[]
}

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 6000) // Change review every 6 seconds

    return () => clearInterval(interval)
  }, [reviews.length])

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[250px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute w-full"
        >
          <Card className="bg-card/80 backdrop-blur-lg text-card-foreground p-6 border border-primary/10 shadow-xl">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <img
                  src={reviews[currentIndex].profile || "/placeholder.svg"}
                  alt={reviews[currentIndex].name}
                  className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-semibold text-primary-foreground text-lg">{reviews[currentIndex].name}</p>
                  <div className="flex items-center">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-muted-foreground" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xl italic mb-4 text-primary-foreground/90">"{reviews[currentIndex].text}"</p>
              <div className="flex gap-2">
                <span className="text-2xl">{reviews[currentIndex].emoji}</span>
                <span className="text-base text-muted-foreground">
                  #
                  {reviews[currentIndex].emoji === "🧠"
                    ? "insight"
                    : reviews[currentIndex].emoji === "✨"
                      ? "magic"
                      : reviews[currentIndex].emoji === "🔐"
                        ? "secure"
                        : reviews[currentIndex].emoji === "❤️"
                          ? "emotion"
                          : "learn"}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
