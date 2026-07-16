'use client'
import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const scrollPosition = window.scrollY
        const percentage = (scrollPosition / totalHeight) * 100
        setProgress(Math.min(percentage, 100))
      } else {
        setProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run once on mount to handle initial scroll state
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3px',
        backgroundColor: 'var(--accent)',
        zIndex: 9999,
        transition: 'width 0.15s ease-out',
        pointerEvents: 'none',
      }}
    />
  )
}

