'use client'
import { useState } from 'react'

export default function CrispSummary({ tldr }: { tldr?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  if (!tldr) return null

  return (
    <div className="mb-8 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-lg transition-all text-left focus:outline-none hover:bg-[var(--accent-soft)]"
        style={{ color: 'var(--text-heading)' }}
      >
        <span className="flex items-center gap-2">
          <span>⚡</span> Crisp Summary (TL;DR)
        </span>
        <span 
          className="text-xs transition-transform duration-300" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div 
          className="px-4 pb-4 pt-3 text-sm leading-relaxed border-t border-[var(--border)] animate-in" 
          style={{ color: 'var(--text-secondary)' }}
        >
          {tldr}
        </div>
      )}
    </div>
  )
}
