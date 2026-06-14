import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { postSlug, postTitle, suggestion } = body

    if (!suggestion || suggestion.trim().length === 0) {
      return NextResponse.json({ error: 'Suggestion cannot be empty.' }, { status: 400 })
    }

    const resend = getResend()
    const from = process.env.RESEND_FROM_EMAIL
    const to = process.env.INBOUND_FORWARD_TO ?? 'hello@shrivibhavan.com'

    if (!resend || !from) {
      console.error('Email service not configured:', { hasResend: !!resend, from })
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #c4622d; margin-top: 0;">New Blog Feedback / Suggestion</h2>
        <p style="font-size: 14px; color: #555;">
          <strong>Post Title:</strong> ${postTitle}<br />
          <strong>Slug:</strong> <code>${postSlug}</code>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #111; background-color: #fafaf9; padding: 15px; border-radius: 6px; border-left: 3px solid #c4622d;">
          ${suggestion}
        </p>
      </div>
    `

    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `New feedback on: ${postTitle}`,
      html: htmlContent,
    })

    if (error) {
      console.error('Resend error sending suggestion:', JSON.stringify(error))
      return NextResponse.json({ error: 'Failed to send suggestion.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Suggest route error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
