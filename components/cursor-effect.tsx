"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { CircleDot } from "lucide-react"

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [trailElements, setTrailElements] = useState<Array<{ id: number; x: number; y: number }>>([])
  const trailIdRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })

      // Add a new trail element periodically
      if (trailIdRef.current % 5 === 0) {
        setTrailElements((prev) => [
          ...prev.slice(-20), // Keep only the last 20 elements
          { id: Date.now(), x: event.clientX, y: event.clientY },
        ])
      }
      trailIdRef.current++
    }

    const handleMouseEnter = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("button, a, [role='button'], [data-interactive]")) {
        setIsHoveringButton(true)
      }
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("button, a, [role='button'], [data-interactive]")) {
        setIsHoveringButton(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseEnter)
    window.addEventListener("mouseout", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseEnter)
      window.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Glow Trail */}
      {trailElements.map((trail) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.5, scale: 0.5 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: trail.x,
            top: trail.y,
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "rgba(100, 100, 255, 0.5)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 9998,
          }}
        />
      ))}

      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isHoveringButton ? 1.2 : 1,
          opacity: isHoveringButton ? 1 : 0.8,
          backgroundColor: isHoveringButton ? "rgba(100, 100, 255, 0.8)" : "rgba(100, 100, 255, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isHoveringButton ? (
          <CircleDot className="h-8 w-8 text-primary-foreground" />
        ) : (
          <div className="h-4 w-4 rounded-full bg-primary-foreground" />
        )}
      </motion.div>
    </>
  )
}
