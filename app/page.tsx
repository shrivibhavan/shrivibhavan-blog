import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import NewsletterForm from '@/components/NewsletterForm'

export default function Home() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="mb-20 animate-in">
        <div className="mb-6 w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--accent)] shadow-sm">
          <img
            src="/vibhavan.jpg"
            alt="Shrivibhavan"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm font-mono mb-4 tracking-wider uppercase" style={{ color: 'var(--accent)' }}>
          Developer
        </p>
        <h1
          className="font-['Playfair_Display'] text-5xl font-bold leading-[1.15] mb-6"
          style={{ color: 'var(--text-heading)' }}
        >
          Building things,<br />writing about it.
        </h1>
        <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-muted)' }}>
          I&apos;m Shrivi — a developer who works across any technology. 
          This is where I document what I build and what I learn along the way.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/blog" className="btn-primary inline-block text-center no-underline">
            Read the blog
          </Link>
          <Link href="/about" className="btn-ghost inline-block text-center no-underline">
            About me
          </Link>
        </div>
      </div>

      {/* Recent posts */}
      {posts.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl" style={{ color: 'var(--text-heading)' }}>
                Recent Posts
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-faint)' }}>
                Latest thoughts and deep dives
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm hover:underline underline-offset-4"
              style={{ color: 'var(--accent)' }}
            >
              All posts →
            </Link>
          </div>
          <div className="space-y-4">
            {posts.map((post, i) => (
              <div key={post.slug} className={`animate-in animate-in-delay-${i + 1}`}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <div className="animate-in">
        <NewsletterForm />
      </div>
    </div>
  )
}

function PostCard({ post }: { post: ReturnType<typeof getAllPosts>[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block no-underline">
      <article className="card">
        <div className="flex items-center gap-3 text-xs mb-2 font-mono" style={{ color: 'var(--text-faint)' }}>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3
          className="font-medium text-lg mb-1 transition-colors"
          style={{ color: 'var(--text)' }}
        >
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
        <div className="mt-3 flex gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </article>
    </Link>
  )
}
