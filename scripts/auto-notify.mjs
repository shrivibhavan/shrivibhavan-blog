import { Resend } from 'resend'
import {
  getAllPostSlugs,
  getNotifiedSlugsFromResend,
  getResendConfig,
  getSeededNotifiedSlugs,
  loadEnv,
  sendPostBroadcast,
} from './lib/notify-utils.mjs'

loadEnv()

const isProduction =
  process.env.VERCEL_ENV === 'production' || process.env.AUTO_NOTIFY === 'true'

if (!isProduction) {
  console.log('auto-notify: skipped (not a production deploy)')
  process.exit(0)
}

const { apiKey, segmentId, from, siteUrl } = getResendConfig()
if (!apiKey || !segmentId || !from) {
  console.log('auto-notify: skipped (Resend env vars not configured)')
  process.exit(0)
}

const resend = new Resend(apiKey)
const allSlugs = getAllPostSlugs()
const seeded = getSeededNotifiedSlugs()
const alreadyNotified = await getNotifiedSlugsFromResend(resend)

for (const slug of seeded) alreadyNotified.add(slug)

const pending = allSlugs.filter(slug => !alreadyNotified.has(slug))

if (pending.length === 0) {
  console.log('auto-notify: no new posts to notify')
  process.exit(0)
}

console.log(`auto-notify: sending ${pending.length} post(s): ${pending.join(', ')}`)

let failures = 0
for (const slug of pending) {
  const result = await sendPostBroadcast(resend, { slug, segmentId, from, siteUrl })
  if (result.ok) {
    console.log(`auto-notify: sent "${result.title}" (${result.broadcastId})`)
  } else {
    failures++
    console.error(`auto-notify: failed for ${slug}:`, result.error)
  }
}

if (failures > 0) {
  console.error(`auto-notify: ${failures} notification(s) failed`)
}

process.exit(0)
