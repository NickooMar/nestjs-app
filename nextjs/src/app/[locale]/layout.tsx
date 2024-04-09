import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Payments App",
  description: "A payments app built with Next.js and TypeScript.",
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <nav>nav</nav>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
