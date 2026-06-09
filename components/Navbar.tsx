'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const path = usePathname()
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-['Playfair_Display'] text-lg font-semibold tracking-tight text-white/90">
          shrivibhavan<span className="text-[#c4622d]">.</span>
        </Link>
        <nav className="flex gap-6 text-sm text-white/50">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-white/90 ${path === l.href ? 'text-white/90' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
