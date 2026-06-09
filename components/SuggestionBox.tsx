'use client'
import { useState } from 'react'

interface SuggestionBoxProps {
  postSlug: string
  postTitle: string
}

export default function SuggestionBox({ postSlug, postTitle }: { postSlug: string, postTitle: string }) {
  const [suggestion, setSuggestion] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!suggestion.trim()) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postSlug, postTitle, suggestion }),
      })
      if (res.ok) {
        setStatus('success')
        setSuggestion('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
      <h3 className="font-['Playfair_Display'] text-xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
        Have a suggestion or feedback?
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        Let me know what you think of this post, or suggest what I should write next.
      </p>

      {status === 'success' ? (
        <div 
          className="p-4 rounded-xl text-sm leading-relaxed border flex items-center gap-3 animate-in"
          style={{ 
            backgroundColor: 'var(--accent-soft)',
            borderColor: 'rgba(196, 98, 45, 0.3)'
          }}
        >
          <span className="text-lg">✉️</span>
          <span style={{ color: 'var(--text-heading)' }}>Thank you! Your feedback has been sent directly to Shrivi.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Type your feedback, topic request, or suggestion here..."
            className="input-field min-h-[100px] resize-y"
            disabled={status === 'submitting'}
            required
          />
          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
              disabled={status === 'submitting' || !suggestion.trim()}
            >
              {status === 'submitting' ? 'Sending...' : 'Send feedback'}
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
  )
}
