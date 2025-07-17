"use client"

import { useState, useEffect } from "react"

export function MouseGradientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 100, 255, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
        opacity: 0.8, // Adjust opacity for subtlety
      }}
    />
  )
}
