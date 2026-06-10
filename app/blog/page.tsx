import { getAllPosts } from '@/lib/posts'
import BlogPostList from '@/components/BlogPostList'

export const metadata = {
  title: 'Blog — Shrivibhavan',
  description: 'Notes on dev, cloud, AI, and building stuff.',
  alternates: {
    canonical: 'https://shrivibhavan.com/blog',
  },
}

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
      <BlogPostList posts={posts} />
    </div>
  )
}
