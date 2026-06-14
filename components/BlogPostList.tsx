'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/posts'

export default function BlogPostList({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = posts.filter((p) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
    )
  })

  return (
    <div>
      {/* Search Input Container */}
      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[var(--text-faint)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by topic, tag, or title..."
          className="input-field py-2.5 w-full text-sm font-sans"
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-3.5 flex items-center text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="mb-4 text-base" style={{ color: 'var(--text-muted)' }}>
            No posts found matching &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="btn-ghost text-xs py-2 px-4 inline-flex items-center gap-1.5"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline">
              <article className={`card animate-in animate-in-delay-${Math.min(i + 1, 3)}`}>
                <div className="flex items-center gap-3 text-xs mb-2 font-mono" style={{ color: 'var(--text-faint)' }}>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2
                  className="font-medium text-lg mb-1 transition-colors"
                  style={{ color: 'var(--text)' }}
                >
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
