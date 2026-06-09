import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata = { title: 'Blog — Shrivibhavan' }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1
          className="font-['Playfair_Display'] text-4xl font-bold mb-2"
          style={{ color: 'var(--text-heading)' }}
        >
          Blog
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Notes on dev, cloud, AI, and building stuff.
        </p>
      </div>
      {posts.length === 0 ? (
        <p className="text-center py-20" style={{ color: 'var(--text-faint)' }}>
          No posts yet. Add your first .mdx file in /posts
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => (
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
                  {post.tags.map(tag => (
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
