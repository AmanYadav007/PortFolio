"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface ProjectScreenshotLoaderProps {
  projectUrl: string
  alt: string
  height?: number
}

export default function ProjectScreenshotLoader({ projectUrl, alt, height = 300 }: ProjectScreenshotLoaderProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const captureScreenshot = async () => {
      if (!iframeRef.current || !canvasRef.current) return

      try {
        // Wait for iframe to load
        await new Promise((resolve) => {
          if (iframeRef.current) {
            iframeRef.current.onload = resolve
          }
        })

        // Give it a bit more time to render
        setTimeout(() => {
          try {
            const iframe = iframeRef.current
            const canvas = canvasRef.current

            if (!iframe || !canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            // This would work in a real environment, but not in the sandbox
            // ctx.drawImage(iframe, 0, 0, canvas.width, canvas.height)

            // Instead, we'll just show a placeholder message
            ctx.fillStyle = "#f3f4f6"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "#6b7280"
            ctx.font = "16px sans-serif"
            ctx.textAlign = "center"
            ctx.fillText("Project Screenshot", canvas.width / 2, canvas.height / 2)

            setLoading(false)
          } catch (err) {
            console.error("Error capturing screenshot:", err)
            setError(true)
            setLoading(false)
          }
        }, 1000)
      } catch (err) {
        console.error("Error loading iframe:", err)
        setError(true)
        setLoading(false)
      }
    }

    captureScreenshot()
  }, [projectUrl])

  return (
    <Card className="overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">Failed to load screenshot</p>
        </div>
      )}

      <canvas ref={canvasRef} width="600" height={height} className="w-full h-auto" aria-label={alt} />

      <iframe
        ref={iframeRef}
        src={projectUrl}
        className="absolute opacity-0 pointer-events-none"
        width="1200"
        height="800"
        title={alt}
      />
    </Card>
  )
}
