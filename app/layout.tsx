import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

// Import fonts from @fontsource
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/bebas-neue/400.css'

// Font class names
export const fontClasses = "font-sans antialiased overflow-x-hidden";

export const metadata: Metadata = {
  title: {
    default: "Hadi — Full-Stack Developer & Automation Specialist",
    template: "%s | Hadi's Portfolio"
  },
  description: "19-year-old developer from Lahore building web apps & automation in 2-3 days using Next.js, Supabase, and AI-powered development.",
  generator: "Next.js",
  applicationName: "Hadi's Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: ["Full-Stack Developer", "Web Development", "Automation", "Next.js", "Supabase", "Portfolio"],
  authors: [{ name: "Hadi", url: "https://hadi.vercel.app" }],
  creator: "Hadi",
  publisher: "Hadi",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      className="dark bg-background"
      style={{
        '--font-ibm-plex-sans': '"IBM Plex Sans", sans-serif',
        '--font-ibm-plex-mono': '"IBM Plex Mono", monospace',
        '--font-bebas': '"Bebas Neue", sans-serif'
      } as any}
      suppressHydrationWarning
    >
      <body className={fontClasses}>
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
