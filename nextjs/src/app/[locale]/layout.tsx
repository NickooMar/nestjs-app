import { NextIntlClientProvider, useMessages } from "next-intl"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import SessionWrapper from "@/app/components/SessionWrapper"

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
  const messages = useMessages()

  return (
    <SessionWrapper>
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
              <div>{children}</div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionWrapper>
  )
}
