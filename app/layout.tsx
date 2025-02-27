import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import type React from 'react' // Added import for React

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FlashPass Studio',
  description: 'Plataforma de gestión de eventos para productores'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
