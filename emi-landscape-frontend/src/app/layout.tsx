import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/components/SupabaseProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EMI Landscape App',
  description: 'Smart GPT-powered design',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
