'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // On route change, reset and re-trigger the animation
    if (pathname !== prevPathname.current) {
      setIsVisible(false)
      prevPathname.current = pathname

      // Small delay to let the DOM update, then fade in
      const timer = setTimeout(() => setIsVisible(true), 30)
      return () => clearTimeout(timer)
    } else {
      // Initial mount
      const timer = setTimeout(() => setIsVisible(true), 30)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return (
    <div
      className="page-transition"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {children}
    </div>
  )
}
