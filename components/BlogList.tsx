'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/posts'

export default function BlogList({ posts }: { posts: Post[] }) {
  const [selectedTag, setSelectedTag] = useState<string>('All')

  // Collect all unique tags across all posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])))

  // Filter posts based on selected tag
  const filteredPosts = selectedTag === 'All'
    ? posts
    : posts.filter((post) => post.tags?.includes(selectedTag))

  return (
    <div>
      {/* Horizontal scrollable pill row */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        <button
          onClick={() => setSelectedTag('All')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            selectedTag === 'All'
              ? 'bg-[var(--accent)] text-white shadow-sm'
              : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTag === tag
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center py-20" style={{ color: 'var(--text-faint)' }}>
          No posts found with tag &quot;{selectedTag}&quot;.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline animate-in">
              <article className="card">
                <div className="flex items-center gap-3 text-xs mb-2 font-mono" style={{ color: 'var(--text-faint)' }}>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2
                  className="font-medium text-lg mb-1 transition-colors group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--text)' }}
                >
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedTag(tag)
                      }}
                      className={`tag transition-colors cursor-pointer ${
                        selectedTag === tag ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]' : ''
                      }`}
                    >
                      {tag}
                    </span>
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
