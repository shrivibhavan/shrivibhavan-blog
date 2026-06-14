import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, pitch } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email.' }, { status: 400 })
    }
    if (!pitch || pitch.trim().length === 0) {
      return NextResponse.json({ error: 'Pitch content cannot be empty.' }, { status: 400 })
    }

    const resend = getResend()
    const from = process.env.RESEND_FROM_EMAIL
    const to = process.env.INBOUND_FORWARD_TO ?? 'hello@shrivibhavan.com'

    if (!resend || !from) {
      console.error('Email service not configured:', { hasResend: !!resend, from })
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
    }

    const senderName = name?.trim() || 'Anonymous Writer'

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #c4622d; margin-top: 0;">New Guest Post Pitch</h2>
        <p style="font-size: 14px; color: #555; line-height: 1.5;">
          <strong>From:</strong> ${senderName}<br />
          <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 14px; font-weight: bold; color: #333; margin-bottom: 8px;">Pitch Details / Outline:</p>
        <div style="white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #111; background-color: #fafaf9; padding: 15px; border-radius: 6px; border-left: 3px solid #c4622d;">
          ${pitch}
        </div>
      </div>
    `

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `✍️ Guest Post Pitch: "${senderName}"`,
      html: htmlContent,
    })

    if (error) {
      console.error('Resend error sending pitch:', JSON.stringify(error))
      return NextResponse.json({ error: 'Failed to send pitch.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Pitch route error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
