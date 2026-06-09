'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMsg('You\'re subscribed! I\'ll notify you when I publish.')
        setEmail('')
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
    <section className="border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
      <p className="text-[#c4622d] text-xs font-mono uppercase tracking-widest mb-3">Newsletter</p>
      <h2 className="font-['Playfair_Display'] text-2xl text-white/80 mb-2">Get new posts by email</h2>
      <p className="text-white/40 text-sm mb-6">No spam. Just occasional posts on dev, cloud, and career.</p>
      {status === 'success' ? (
        <p className="text-green-400 text-sm">{msg}</p>
      ) : (
        <form onSubmit={submit} className="flex gap-3">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2.5 bg-[#c4622d] text-white text-sm rounded-lg hover:bg-[#b3571f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-red-400 text-xs mt-2">{msg}</p>}
    </section>
  )
}
