import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Shrivibhavan — Dev Blog',
  description: 'Thoughts on full-stack development, DevOps, AI, and the tech journey to Japan.',
  openGraph: {
    title: 'Shrivibhavan — Dev Blog',
    description: 'Full-stack dev, cloud, AI, and the road to Japan.',
    url: 'https://shrivibhavan.com',
    siteName: 'shrivibhavan.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 py-8 text-center text-sm text-white/30 mt-20">
          © {new Date().getFullYear()} Shrivibhavan · Built with Next.js
        </footer>
      </body>
    </html>
  )
}
