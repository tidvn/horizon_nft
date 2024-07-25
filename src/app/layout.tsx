import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/common/theme-provider"
import ContextProvider from "@/contexts"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type RootLayoutProps = {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <ThemeProvider attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ContextProvider>
            <Toaster />
            {children}ß
          </ContextProvider>

        </body>
      </ThemeProvider>
    </html>
  )
}
