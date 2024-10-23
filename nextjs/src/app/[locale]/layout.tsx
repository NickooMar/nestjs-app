import { use } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "../components/Navbar/Navbar"
import SessionWrapper from "../components/Session/SessionWrapper"

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

export default function LocaleLayout(props: Readonly<LocaleLayoutProps>) {
  const params = use(props.params);

  const {
    locale
  } = params;

  const {
    children
  } = props;

  const messages = useMessages()

  return (
    <SessionWrapper>
      <html lang={locale} suppressHydrationWarning={true}>
        <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div>{children}</div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionWrapper>
  )
}
