"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const features = ["Smart Memory", "Recall Timeline", "Privacy Firewall", "Quote Extraction", "Mood Mapping"]

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 2000) // Change feature every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-10 overflow-hidden flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-xl md:text-2xl font-medium text-primary-foreground"
        >
          {features[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
