'use client'
import { useState } from 'react'

export default function GuestPitchForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pitch, setPitch] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !pitch.trim()) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, pitch }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setPitch('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
      {!isOpen ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-bold mb-1" style={{ color: 'var(--text-heading)' }}>
              ✍️ Want to write a post here?
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Have an interesting dev tip, cloud tutorial, or guest draft? I&apos;m always looking for guest posts.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="btn-ghost text-xs py-2 px-4 whitespace-nowrap self-start sm:self-center"
          >
            Pitch an Idea
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-xl border animate-in" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Playfair_Display'] text-lg font-bold" style={{ color: 'var(--text-heading)' }}>
              ✍️ Pitch your Guest Post / Idea
            </h3>
            <button
              onClick={() => {
                setIsOpen(false)
                setStatus('idle')
              }}
              className="text-[var(--text-faint)] hover:text-[var(--text)] text-xs transition-colors cursor-pointer"
              aria-label="Close form"
            >
              Cancel
            </button>
          </div>

          {status === 'success' ? (
            <div
              className="p-4 rounded-xl text-sm leading-relaxed border flex items-center gap-3 animate-in"
              style={{
                backgroundColor: 'var(--accent-soft)',
                borderColor: 'rgba(196, 98, 45, 0.3)',
              }}
            >
              <span className="text-lg">✉️</span>
              <span style={{ color: 'var(--text-heading)' }}>
                Thank you! Your pitch has been sent directly to Shrivi. I&apos;ll get back to you soon.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pitch-name" className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    Your Name (optional)
                  </label>
                  <input
                    id="pitch-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="input-field text-xs py-2"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div>
                  <label htmlFor="pitch-email" className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    Your Email (required)
                  </label>
                  <input
                    id="pitch-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="input-field text-xs py-2"
                    disabled={status === 'submitting'}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pitch-content" className="block text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Outline / Pitch Details
                </label>
                <textarea
                  id="pitch-content"
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Describe your topic, why it fits this blog, and a rough outline or draft link..."
                  className="input-field text-xs min-h-[120px] resize-y"
                  disabled={status === 'submitting'}
                  required
                />
              </div>
              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-5 flex items-center gap-2"
                  disabled={status === 'submitting' || !email.trim() || !pitch.trim()}
                >
                  {status === 'submitting' ? 'Sending Pitch...' : 'Send Pitch'}
                </button>
                {status === 'error' && (
                  <span className="text-xs text-red-500 animate-in">
                    Could not send. Please try again.
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
