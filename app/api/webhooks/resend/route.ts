import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const resend = getResend()
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
  const forwardTo = process.env.INBOUND_FORWARD_TO
  const from = process.env.RESEND_FROM_EMAIL

  if (!resend || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 })
  }

  const payload = await req.text()

  let event
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        'svix-id': req.headers.get('svix-id') ?? '',
        'svix-timestamp': req.headers.get('svix-timestamp') ?? '',
        'svix-signature': req.headers.get('svix-signature') ?? '',
      } as any,
      webhookSecret,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 401 })
  }

  if (event.type !== 'email.received') {
    return NextResponse.json({ received: true })
  }

  if (!forwardTo || !from) {
    console.error('Inbound email received but INBOUND_FORWARD_TO or RESEND_FROM_EMAIL is not set')
    return NextResponse.json({ received: true, forwarded: false })
  }

  const { data, error } = await resend.emails.receiving.forward({
    emailId: event.data.email_id,
    to: forwardTo,
    from,
    passthrough: true,
  })

  if (error) {
    console.error('Inbound forward error:', error)
    return NextResponse.json({ error: 'Failed to forward email.' }, { status: 500 })
  }

  return NextResponse.json({ received: true, forwarded: true, id: data.id })
}
