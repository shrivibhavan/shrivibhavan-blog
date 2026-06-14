'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Photo {
  src: string
  name: string
  fileName: string
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({})
  const [newlyLiked, setNewlyLiked] = useState<Record<string, boolean>>({})

  // Load liked status from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vibhavan-photos-liked')
    if (saved) {
      setTimeout(() => {
        try { setLikedPhotos(JSON.parse(saved)) } catch (e) { console.error(e) }
      }, 0)
    }
  }, [])

  const handleLike = async (photo: Photo, e: React.MouseEvent) => {
    e.stopPropagation()
    const key = photo.fileName
    if (likedPhotos[key]) return
    const nextLiked = { ...likedPhotos, [key]: true }
    setLikedPhotos(nextLiked)
    localStorage.setItem('vibhavan-photos-liked', JSON.stringify(nextLiked))
    setNewlyLiked((prev) => ({ ...prev, [key]: true }))
    try {
      await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoName: photo.name }),
      })
    } catch (err) {
      console.error('Failed to send like notification:', err)
    }
  }

  return (
    <div>
      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {photos.map((photo) => {
          const isLiked = likedPhotos[photo.fileName]
          return (
            <div
              key={photo.fileName}
              className="card overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3
                    className="font-semibold text-base transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-heading)' }}
                  >
                    {photo.name}
                  </h3>
                </div>
                <button
                  onClick={(e) => handleLike(photo, e)}
                  disabled={isLiked}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    isLiked
                      ? 'border-red-200/50 bg-red-50/10 text-red-500 cursor-default'
                      : 'border-[var(--border)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-200/50 hover:bg-red-50/5 cursor-pointer'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${newlyLiked[photo.fileName] ? 'animate-heart-pop' : ''} ${
                      isLiked ? 'fill-current' : 'transition-transform group-hover:scale-110'
                    }`}
                    fill={isLiked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
