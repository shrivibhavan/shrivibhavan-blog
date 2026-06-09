'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const path = usePathname()
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/space', label: 'Space' },
    { href: '/visuals', label: 'Visuals' },
    { href: '/about', label: 'About' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return path === '/'
    return path.startsWith(href)
  }

  return (
    <header className="navbar">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Top Row: Logo & Toggle (on mobile) */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link
            href="/"
            className="font-['Playfair_Display'] text-base sm:text-lg font-bold tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            shrivibhavan<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>
          
          {/* Mobile Theme Toggle */}
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>

        {/* Bottom Row: Navigation Links & Desktop Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
          <nav className="flex gap-4 sm:gap-5 text-[13px] sm:text-sm font-medium">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link py-1 ${isActive(l.href) ? 'nav-link-active' : ''} ${
                  l.label === 'Home' ? 'hidden sm:inline-block' : ''
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Theme Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
