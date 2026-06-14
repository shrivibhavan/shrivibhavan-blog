'use client'
import { useState } from 'react'

interface SuggestionBoxProps {
  postSlug: string
  postTitle: string
}

export default function SuggestionBox({ postSlug, postTitle }: SuggestionBoxProps) {
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
    } catch {
      setStatus('error')
    }
  }

  const isQA = postSlug === 'pixel-perfect-eye'
  const title = isQA ? "👁️ Spot a Visual Glitch on This Site?" : "Have a suggestion or feedback?"
  const description = isQA 
    ? "Put your Design QA eye to the test. If you spotted a 1px misalignment, a stray pixel in a logo, or a rendering bug anywhere on this blog, report it below. Let's dissect the CSS together!" 
    : "Let me know what you think of this post, or suggest what I should write next."
  const placeholder = isQA 
    ? "Describe the visual glitch: where is it located, what is wrong with it, and what should the CSS or HTML fix be? (e.g. 'On the Space page, the mobile navbar has a 1px stray border...')" 
    : "Type your feedback, topic request, or suggestion here..."
  const buttonText = isQA ? "Report Glitch" : "Send feedback"
  const buttonSubmittingText = isQA ? "Reporting..." : "Sending..."

  return (
    <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
      <h3 className="font-['Playfair_Display'] text-xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
        {title}
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        {description}
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
          <span style={{ color: 'var(--text-heading)' }}>
            {isQA ? 'Thank you! Your glitch report has been logged and sent to Shrivi.' : 'Thank you! Your feedback has been sent directly to Shrivi.'}
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder={placeholder}
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
              {status === 'submitting' ? buttonSubmittingText : buttonText}
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

