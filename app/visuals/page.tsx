import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: 'Visuals — Shrivibhavan',
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
      // Format file name into a clean title
      const namePart = file.replace(/\.[^/.]+$/, '') // strip extension
      
      // Check if it's a camera timestamp name (e.g., IMG_20260425_070340)
      const imgMatch = namePart.match(/^IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})$/i)
      let name = ''
      
      if (imgMatch) {
        const year = imgMatch[1]
        const monthIndex = parseInt(imgMatch[2], 10) - 1
        const day = parseInt(imgMatch[3], 10)
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
        name = `${months[monthIndex]} ${day}, ${year}`
      } else {
        name = namePart
          .split(/[_-]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      return {
        src: `/photos/${file}`,
        name,
        fileName: file,
      }
    })
}

export default function VisualsPage() {
  const photos = getPhotos()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Title */}
      <div className="mb-12 animate-in">
        <h1
          className="font-['Playfair_Display'] text-4xl font-bold mb-2"
          style={{ color: 'var(--text-heading)' }}
        >
          Visuals
        </h1>
        <p className="text-lg font-medium" style={{ color: 'var(--text-faint)' }}>
          Capturing light, shadows, and the stories in between.
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="card text-center p-12 animate-in animate-in-delay-1">
          <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-heading)' }}>
            No visuals yet 📸
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
