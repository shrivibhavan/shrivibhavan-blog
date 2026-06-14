import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim()
  }
}

export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const segmentId = process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID
  const from = process.env.RESEND_FROM_EMAIL
  const siteUrl = process.env.SITE_URL ?? 'https://www.shrivibhavan.com'
  return { apiKey, segmentId, from, siteUrl }
}

export function getAllPostSlugs() {
  const postsDir = path.join(process.cwd(), 'posts')
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

export function getSeededNotifiedSlugs() {
  const filePath = path.join(process.cwd(), 'data', 'notified-posts.json')
  if (!fs.existsSync(filePath)) return new Set()
  try {
    const slugs = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return new Set(Array.isArray(slugs) ? slugs : [])
  } catch {
    return new Set()
  }
}

export function broadcastNameForSlug(slug) {
  return `post:${slug}`
}

export async function getNotifiedSlugsFromResend(resend) {
  const notified = new Set()
  let after

  try {
    do {
      const options = after ? { after } : undefined
      const { data, error } = await resend.broadcasts.list(options)
      if (error) {
        console.warn(`auto-notify: could not list broadcasts (${error.message}). Falling back to local seed list.`)
        return notified
      }

      for (const broadcast of data?.data ?? []) {
        if (broadcast.name?.startsWith('post:')) {
          notified.add(broadcast.name.slice('post:'.length))
        }
      }

      after = data?.has_more ? data.data.at(-1)?.id : undefined
    } while (after)
  } catch (err) {
    console.warn(`auto-notify: broadcast list unavailable (${err.message}). Falling back to local seed list.`)
  }

  return notified
}

export async function sendPostBroadcast(resend, { slug, segmentId, from, siteUrl }) {
  const postPath = path.join(process.cwd(), 'posts', `${slug}.mdx`)
  const { data: frontmatter } = matter(fs.readFileSync(postPath, 'utf8'))
  const title = frontmatter.title ?? slug
  const excerpt = frontmatter.excerpt ?? ''
  const postUrl = `${siteUrl}/blog/${slug}`

  const { data, error } = await resend.broadcasts.create({
    segmentId,
    from,
    name: broadcastNameForSlug(slug),
    subject: `New post: ${title}`,
    previewText: excerpt,
    html: `
      <p>I just published a new post on the blog:</p>
      <h2><a href="${postUrl}">${title}</a></h2>
      <p>${excerpt}</p>
      <p><a href="${postUrl}">Read it here →</a></p>
      <p style="color:#888;font-size:12px;">You're receiving this because you subscribed at shrivibhavan.com.</p>
    `,
    send: true,
  })

  if (error) return { ok: false, slug, title, error }
  return { ok: true, slug, title, broadcastId: data.id }
}
