'use client'

import { useEffect, useState } from 'react'

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    // Check sessionStorage to avoid double-counting on same session
    const viewed = sessionStorage.getItem(`viewed-${slug}`)

    if (!viewed) {
      // Increment view count
      fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
        .then(res => res.json())
        .then(data => {
          setViews(data.views)
          sessionStorage.setItem(`viewed-${slug}`, '1')
        })
        .catch(() => {
          // Silently fail — fetch count instead
          fetch(`/api/views?slug=${slug}`)
            .then(res => res.json())
            .then(data => setViews(data.views))
            .catch(() => {})
        })
    } else {
      // Already viewed in this session, just fetch count
      fetch(`/api/views?slug=${slug}`)
        .then(res => res.json())
        .then(data => setViews(data.views))
        .catch(() => {})
    }
  }, [slug])

  if (views === null) return null

  return (
    <span title={`${views.toLocaleString()} views`}>
      {views.toLocaleString()} views
    </span>
  )
}
