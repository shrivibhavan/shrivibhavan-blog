'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        setFirstName('')
        setLastName('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="newsletter-section">
      <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
        Newsletter
      </p>
      <h2
        className="font-['Playfair_Display'] text-2xl mb-2"
        style={{ color: 'var(--text-heading)' }}
      >
        Stay in the loop
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        Subscribe to receive my latest posts and reflections, straight to your inbox.
      </p>

      {status === 'success' ? (
        <div className="flex items-center gap-2.5 py-4 animate-in">
          {/* Green checkmark icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-sm font-medium" style={{ color: '#22c55e' }}>
            You&apos;re in! Check your inbox.
          </span>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          {/* Name fields row */}
          <div className="grid grid-cols-2 gap-3 newsletter-form-grid">
            <input
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="input-field"
              disabled={status === 'loading'}
            />
            <input
              type="text"
              placeholder="Last name (optional)"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="input-field"
              disabled={status === 'loading'}
            />
          </div>
          {/* Email + submit row */}
          <div className="flex gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field flex-1"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary whitespace-nowrap"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Subscribing…
                </span>
              ) : 'Subscribe'}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-xs mt-2" style={{ color: '#ef4444' }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </section>
  )
}
