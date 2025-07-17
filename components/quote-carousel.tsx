"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const quotes = [
  { text: "Memory is the diary that we all carry about with us.", author: "Oscar Wilde" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  { text: "The more I learn, the more I realize how much I don't know.", author: "Albert Einstein" },
  { text: "To live is to suffer, to survive is to find some meaning in the suffering.", author: "Friedrich Nietzsche" },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
]

export function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 5000) // Change quote every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-24 flex flex-col justify-center items-center text-center max-w-xl mx-auto mt-8 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col justify-center items-center"
        >
          <p className="text-lg md:text-xl italic text-primary-foreground/90 mb-2">"{quotes[currentIndex].text}"</p>
          <p className="text-sm text-muted-foreground">- {quotes[currentIndex].author}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
