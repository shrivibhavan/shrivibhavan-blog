import { getAllPosts } from '@/lib/posts'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const postEntries = posts.map((post) => ({
    url: `https://shrivibhavan.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.8,
  }))

  return [
    { url: 'https://shrivibhavan.com', lastModified: new Date(), priority: 1.0 },
    { url: 'https://shrivibhavan.com/blog', lastModified: new Date(), priority: 0.9 },
    { url: 'https://shrivibhavan.com/about', lastModified: new Date(), priority: 0.8 },
    { url: 'https://shrivibhavan.com/space', lastModified: new Date(), priority: 0.7 },
    { url: 'https://shrivibhavan.com/visuals', lastModified: new Date(), priority: 0.7 },
    ...postEntries,
  ]
}
