'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

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
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMsg(firstName.trim() ? `Welcome aboard, ${firstName.trim()}!` : "You're in! Welcome aboard.")
        setEmail('')
        setFirstName('')
        setLastName('')
      } else {
        setStatus('error')
        setMsg(data.error ?? 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMsg('Network error. Try again.')
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
        <div className="flex items-center gap-3 animate-in">
          {/* Animated checkmark */}
          <svg width="32" height="32" viewBox="0 0 52 52" className="flex-shrink-0">
            <circle
              className="checkmark-circle"
              cx="26" cy="26" r="25"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <path
              className="checkmark-check"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <div>
            <p className="text-sm font-medium" style={{ color: '#22c55e' }}>{msg}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
              Check your inbox for a welcome email.
            </p>
          </div>
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
            />
            <input
              type="text"
              placeholder="Last name (optional)"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="input-field"
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
        </form>
      )}

      {status === 'error' && (
        <p className="text-xs mt-3 animate-in" style={{ color: '#ef4444' }}>{msg}</p>
      )}
    </section>
  )
}
