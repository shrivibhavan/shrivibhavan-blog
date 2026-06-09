import { Metadata } from 'next'
import SpaceContent from '@/components/SpaceContent'

export const metadata: Metadata = {
  title: 'Space — Shrivibhavan',
  description: 'A curated collection of my favorite tools, tech, music playlists, and podcasts.',
}

export default function SpacePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Title */}
      <div className="mb-12 animate-in">
        <h1
          className="font-['Playfair_Display'] text-4xl font-bold mb-2"
          style={{ color: 'var(--text-heading)' }}
        >
          Space
        </h1>
        <p style={{ color: 'var(--text-faint)' }}>
          A curated collection of my favorite tools, tech, playlists, and podcasts
        </p>
      </div>

      <SpaceContent />
    </div>
  )
}
