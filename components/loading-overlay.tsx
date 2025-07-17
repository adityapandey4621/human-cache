"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

export function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Simulate a loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, rgba(100, 100, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%)`,
          }}
          animate={{
            background: [
              `radial-gradient(circle at center, rgba(100, 100, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%)`,
              `radial-gradient(circle at center, rgba(100, 100, 255, 0.2) 10%, rgba(0, 0, 0, 0.9) 80%)`,
              `radial-gradient(circle at center, rgba(100, 100, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%)`,
            ],
          }}
          transition={{
            background: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl text-white font-medium tracking-wide"
            >
              Loading HumanCache...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
