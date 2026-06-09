import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
  }

  const resend = getResend()
  const segmentId = process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID
  const from = process.env.RESEND_FROM_EMAIL

  if (!resend || !segmentId || !from) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
  }

  const { error: contactError } = await resend.contacts.create({
    email,
    segments: [{ id: segmentId }],
    unsubscribed: false,
  })

  if (contactError) {
    const message = contactError.message.toLowerCase()
    const isDuplicate = message.includes('already') || message.includes('exists')
    if (!isDuplicate) {
      console.error('Resend contact error:', contactError)
      return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 400 })
    }
  }

  const { error: emailError } = await resend.emails.send(
    {
      from,
      to: [email],
      subject: "You're subscribed to Shrivibhavan",
      html: `<p>Thanks for subscribing! I'll email you when I publish new posts on dev, cloud, and career.</p><p>— Shrivibhavan</p>`,
      tags: [{ name: 'category', value: 'welcome' }],
    },
    { idempotencyKey: `welcome-subscriber/${email}` },
  )

  if (emailError) {
    console.error('Resend email error:', emailError)
    return NextResponse.json({ error: 'Could not send confirmation email. Try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
