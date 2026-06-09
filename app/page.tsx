import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import NewsletterForm from '@/components/NewsletterForm'

export default function Home() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="mb-20">
        <p className="text-[#c4622d] text-sm font-mono mb-4 tracking-wider uppercase">Full-Stack Dev · Cloud · AI</p>
        <h1 className="font-['Playfair_Display'] text-5xl font-bold leading-[1.15] text-white/90 mb-6">
          Building things,<br />writing about it.
        </h1>
        <p className="text-white/50 text-lg leading-relaxed max-w-xl">
          I'm Vibhavan — a developer from India, working toward a tech career in Japan. 
          This is where I document what I learn: React, Node.js, AWS, AI agents, and the occasional life update.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/blog" className="px-5 py-2.5 bg-[#c4622d] text-white text-sm rounded-lg hover:bg-[#b3571f] transition-colors">
            Read the blog
          </Link>
          <Link href="/about" className="px-5 py-2.5 border border-white/20 text-white/70 text-sm rounded-lg hover:border-white/40 hover:text-white/90 transition-colors">
            About me
          </Link>
        </div>
      </div>

      {/* Recent posts */}
      {posts.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-['Playfair_Display'] text-2xl text-white/80">Recent Posts</h2>
            <Link href="/blog" className="text-sm text-[#c4622d] hover:underline underline-offset-4">All posts →</Link>
          </div>
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <NewsletterForm />
    </div>
  )
}

function PostCard({ post }: { post: ReturnType<typeof getAllPosts>[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="border border-white/10 rounded-xl p-5 hover:border-white/20 hover:bg-white/[0.02] transition-all">
        <div className="flex items-center gap-3 text-xs text-white/30 mb-2 font-mono">
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="text-white/80 font-medium text-lg group-hover:text-white transition-colors mb-1">{post.title}</h3>
        <p className="text-white/40 text-sm leading-relaxed">{post.excerpt}</p>
        <div className="mt-3 flex gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/30">{tag}</span>
          ))}
        </div>
      </article>
    </Link>
  )
}
