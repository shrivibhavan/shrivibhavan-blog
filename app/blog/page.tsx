import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata = { title: 'Blog — Shrivibhavan' }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white/90 mb-2">Blog</h1>
      <p className="text-white/40 mb-12">Notes on dev, cloud, AI, and building stuff.</p>
      {posts.length === 0 ? (
        <p className="text-white/30 text-center py-20">No posts yet. Add your first .mdx file in /posts</p>
      ) : (
        <div className="space-y-5">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="border border-white/10 rounded-xl p-5 hover:border-white/20 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-3 text-xs text-white/30 mb-2 font-mono">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-white/80 font-medium text-lg group-hover:text-white transition-colors mb-1">{post.title}</h2>
                <p className="text-white/40 text-sm leading-relaxed">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/30">{tag}</span>
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
