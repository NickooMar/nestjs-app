import { NextIntlClientProvider, useMessages } from "next-intl"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Payments App",
  description: "A payments app built with Next.js and TypeScript.",
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<LocaleLayoutProps>) {
  // Receive messages provided in `i18n.ts`
  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <nav>nav</nav>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
