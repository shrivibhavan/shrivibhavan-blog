import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import CrispSummary from '@/components/CrispSummary'
import SuggestionBox from '@/components/SuggestionBox'
import ReadingProgress from '@/components/ReadingProgress'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}`
  return {
    title: `${post.title} — Shrivi`,
    description: post.excerpt,
    alternates: { canonical: `https://shrivibhavan.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://shrivibhavan.com/blog/${slug}`,
      siteName: 'shrivibhavan.com',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.date,
      authors: ['Shrivibhavan'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'datePublished': post.date,
    'image': `/api/og?title=${encodeURIComponent(post.title)}`,
    'author': {
      '@type': 'Person',
      'name': 'Shrivibhavan',
      'url': 'https://shrivibhavan.com',
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Shrivibhavan',
      'url': 'https://shrivibhavan.com',
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://shrivibhavan.com/blog/${post.slug}`,
    },
  }

  return (
    <>
      <ReadingProgress />
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* JSON-LD Structured Data Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

        {/* Dynamic TL;DR Crisp Summary Box */}
        {post.tldr && <CrispSummary tldr={post.tldr} />}

        <hr style={{ borderColor: 'var(--border)' }} className="mb-10" />
        <div className="prose-blog animate-in animate-in-delay-1 mb-10">
          <MDXRemote source={post.content} />
        </div>

        {/* Suggestion and Feedback Box */}
        <SuggestionBox postSlug={post.slug} postTitle={post.title} />
      </div>
    </>
  )
}
