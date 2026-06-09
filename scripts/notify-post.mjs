import { Resend } from 'resend'
import { getResendConfig, loadEnv, sendPostBroadcast } from './lib/notify-utils.mjs'

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: npm run notify -- <slug>')
  process.exit(1)
}

loadEnv()

const { apiKey, segmentId, from, siteUrl } = getResendConfig()
if (!apiKey || !segmentId || !from) {
  console.error('Missing RESEND_API_KEY, RESEND_SEGMENT_ID, or RESEND_FROM_EMAIL')
  process.exit(1)
}

const resend = new Resend(apiKey)
const result = await sendPostBroadcast(resend, { slug, segmentId, from, siteUrl })

if (!result.ok) {
  console.error('Broadcast failed:', result.error)
  process.exit(1)
}

console.log(`Sent "${result.title}" (broadcast ${result.broadcastId})`)
