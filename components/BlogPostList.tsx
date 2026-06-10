'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/posts'

export default function BlogPostList({ posts }: { posts: Post[] }) {
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts

  return (
    <div>
      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
            activeTag === null
              ? 'bg-[var(--accent)] text-white'
              : 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTag === tag
                ? 'bg-[var(--accent)] text-white'
                : 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <p className="text-center py-12" style={{ color: 'var(--text-faint)' }}>
          No posts tagged "{activeTag}"
        </p>
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
