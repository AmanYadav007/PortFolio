import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aman Yadav | JavaScript Engineer & Web Solutions Expert",
  description:
    "Portfolio of Aman Yadav, a JavaScript Engineer with expertise in React.js, Three.js, HTML5 ads, and web development.",
  keywords: ["JavaScript Engineer", "Web Developer", "Three.js", "React.js", "HTML5 Ads", "SEO", "Chrome Extension"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
