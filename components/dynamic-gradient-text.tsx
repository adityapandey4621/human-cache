"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DynamicGradientTextProps extends React.ComponentProps<typeof motion.h1> {
  text: string
  className?: string
  gradientColors?: string[]
}

export function DynamicGradientText({
  text,
  className,
  gradientColors = ["#8A2BE2", "#FF00FF", "#00FFFF"], // Default: BlueViolet, Magenta, Cyan
  ...props
}: DynamicGradientTextProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    const currentRef = textRef.current
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`,
    backgroundSize: "200% 200%", // Make gradient larger than text for movement
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    transition: "background 0.1s linear", // Smooth transition for gradient movement
  } as React.CSSProperties // Type assertion for custom CSS properties

  return (
    <motion.h1
      ref={textRef}
      style={gradientStyle}
      className={cn(
        "text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter leading-tight mb-6",
        className,
      )}
      {...props}
    >
      {text}
    </motion.h1>
  )
}
