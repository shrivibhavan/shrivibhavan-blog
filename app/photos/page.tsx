import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: 'Photos — Shrivibhavan',
  description: 'Moments captured through my lens. A collection of street photography, landscapes, and visual stories.',
}

interface Photo {
  src: string
  name: string
  fileName: string
}

function getPhotos(): Photo[] {
  const photosDir = path.join(process.cwd(), 'public', 'photos')
  if (!fs.existsSync(photosDir)) {
    return []
  }

  const files = fs.readdirSync(photosDir)
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })
    .map((file) => {
      // Format file name into a clean title, e.g. tokyo_night.png -> Tokyo Night
      const name = file
        .replace(/\.[^/.]+$/, '') // strip extension
        .split(/[_-]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      return {
        src: `/photos/${file}`,
        name,
        fileName: file,
      }
    })
}

export default function PhotosPage() {
  const photos = getPhotos()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Title */}
      <div className="mb-12 animate-in">
        <h1
          className="font-['Playfair_Display'] text-4xl font-bold mb-2"
          style={{ color: 'var(--text-heading)' }}
        >
          Photos
        </h1>
        <p className="text-lg font-medium" style={{ color: 'var(--text-faint)' }}>
          Capturing light, shadows, and the stories in between.
        </p>
        <p className="text-sm mt-3 leading-relaxed max-w-xl" style={{ color: 'var(--text-muted)' }}>
          A collection of visual diaries. Tap any photo to view full screen. Click the heart to send a quiet, anonymous ping straight to my inbox!
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="card text-center p-12 animate-in animate-in-delay-1">
          <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-heading)' }}>
            No photos yet 📸
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Pasting image files into the <code>public/photos/</code> folder will automatically render them here.
          </p>
        </div>
      ) : (
        <div className="animate-in animate-in-delay-1">
          <PhotoGallery photos={photos} />
        </div>
      )}
    </div>
  )
}
