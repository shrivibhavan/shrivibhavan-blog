'use client'
import { useState, useEffect } from 'react'

interface Photo {
  src: string
  name: string
  fileName: string
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({})
  const [newlyLiked, setNewlyLiked] = useState<Record<string, boolean>>({})

  // Load liked status from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vibhavan-photos-liked')
    if (saved) {
      try {
        setLikedPhotos(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleLike = async (photo: Photo, e: React.MouseEvent) => {
    e.stopPropagation() // prevent opening lightbox
    const key = photo.fileName
    if (likedPhotos[key]) return // already liked

    // 1. Mark as liked in local state and localStorage
    const nextLiked = { ...likedPhotos, [key]: true }
    setLikedPhotos(nextLiked)
    localStorage.setItem('vibhavan-photos-liked', JSON.stringify(nextLiked))

    // 2. Track as newly liked in this session to trigger animation
    setNewlyLiked((prev) => ({ ...prev, [key]: true }))

    // 3. Trigger the Resend email notification in the background
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

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0))
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, photos])

  return (
    <div>
      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {photos.map((photo, index) => {
          const isLiked = likedPhotos[photo.fileName]
          return (
            <div
              key={photo.fileName}
              className="card overflow-hidden group flex flex-col justify-between"
            >
              <div
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.name}
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
                    className={`w-4 h-4 ${
                      newlyLiked[photo.fileName] ? 'animate-heart-pop' : ''
                    } ${
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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setLightboxIndex(null)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation keys */}
          <button
            className="absolute left-6 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1))
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-6 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0))
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Active Image container */}
          <div
            className="max-w-[90vw] max-h-[80vh] flex flex-col items-center gap-4"
          >
            <img
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].name}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white/80 font-medium text-lg">{photos[lightboxIndex].name}</p>
          </div>
        </div>
      )}
    </div>
  )
}
