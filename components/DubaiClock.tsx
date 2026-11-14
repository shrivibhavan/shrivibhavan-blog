'use client'
import { useEffect, useState } from 'react'

const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dubai', ...opts }).format(d)

export default function DubaiClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    const first = setTimeout(tick, 0)
    const id = setInterval(tick, 1000)
    return () => {
      clearTimeout(first)
      clearInterval(id)
    }
  }, [])

  const time = now ? fmt(now, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) : '--:--:-- --'
  const hour = now ? Number(fmt(now, { hour: 'numeric', hour12: false })) % 24 : 12
  const isDay = hour >= 6 && hour < 18

  return (
    <div className="dubai-clock" title="Local time in Dubai (GST, UTC+4)">
      <span className="dubai-clock-dot" aria-hidden="true" />
      <span className="dubai-clock-place">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Currently working in Dubai, UAE
      </span>
      <span className="dubai-clock-sep" aria-hidden="true" />
      <span className="dubai-clock-time" suppressHydrationWarning>
        <span aria-hidden="true">{isDay ? '☀' : '☾'}</span>
        <time>{time}</time>
        <span className="dubai-clock-tz">GST</span>
      </span>
    </div>
  )
}
