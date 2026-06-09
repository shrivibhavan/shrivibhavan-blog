'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const path = usePathname()
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/gears', label: 'Gears' },
    { href: '/photos', label: 'Photos' },
    { href: '/about', label: 'About' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return path === '/'
    return path.startsWith(href)
  }

  return (
    <header className="navbar">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-['Playfair_Display'] text-base sm:text-lg font-semibold tracking-tight"
          style={{ color: 'var(--text)' }}
        >
          shrivibhavan<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        <div className="flex items-center gap-1">
          <nav className="flex gap-3 sm:gap-5 text-xs sm:text-sm mr-1 sm:mr-2">
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
