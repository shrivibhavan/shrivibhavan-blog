import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: `${post.title} — Shrivibhavan`, description: post.excerpt }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm transition-colors mb-10 inline-block no-underline"
        style={{ color: 'var(--text-faint)' }}
      >
        ← Back to blog
      </Link>
      <header className="mb-10 animate-in">
        <div className="flex items-center gap-3 text-xs mb-4 font-mono" style={{ color: 'var(--text-faint)' }}>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1
          className="font-['Playfair_Display'] text-4xl font-bold leading-tight mb-4"
          style={{ color: 'var(--text-heading)' }}
        >
          {post.title}
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="tag tag-accent">{tag}</span>
          ))}
        </div>
      </header>
      <hr style={{ borderColor: 'var(--border)' }} className="mb-10" />
      <div className="prose-blog animate-in animate-in-delay-1">
        <MDXRemote source={post.content} />
      </div>
    </div>
  )
}
