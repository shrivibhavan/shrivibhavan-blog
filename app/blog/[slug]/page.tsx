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
      <Link href="/blog" className="text-sm text-white/30 hover:text-white/60 transition-colors mb-10 inline-block">← Back to blog</Link>
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs text-white/30 mb-4 font-mono">
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white/90 leading-tight mb-4">{post.title}</h1>
        <p className="text-white/50 text-lg">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-[#c4622d]/40 text-[#c4622d]/80">{tag}</span>
          ))}
        </div>
      </header>
      <hr className="border-white/10 mb-10" />
      <div className="prose-blog">
        <MDXRemote source={post.content} />
      </div>
    </div>
  )
}
