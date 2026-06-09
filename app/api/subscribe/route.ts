import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

function buildWelcomeEmail(firstName?: string) {
  const name = firstName || 'there'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome</title>
</head>
<body style="margin:0;padding:24px;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;color:#1a1a1a;">
  <div style="max-width:520px;margin:0 auto;font-size:16px;line-height:1.6;color:#1a1a1a;border:1px solid #eee;border-radius:12px;padding:32px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
    
    <!-- Header with Logo and Profile Photo -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
      <tr>
        <td style="vertical-align:middle;">
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#1a1a1a;letter-spacing:-0.01em;">
            shrivibhavan<span style="color:#c4622d;">.</span>
          </p>
        </td>
        <td align="right" style="vertical-align:middle;">
          <img src="https://shrivibhavan.com/vibhavan.jpg" alt="Vibhavan" width="48" height="48" style="display:block;width:48px;height:48px;border-radius:50%;object-fit:cover;border:1px solid #e5e5e3;" />
        </td>
      </tr>
    </table>

    <p style="margin:0 0 16px 0;">Hey ${name} 👋,</p>
    
    <p style="margin:0 0 24px 0;">Thanks for subscribing to my newsletter. I really appreciate your support!</p>
    
    <p style="margin:0 0 4px 0;">Talk soon,</p>
    <p style="margin:0;font-weight:600;">Shrivibhavan</p>
    
    <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px 0;" />
    <p style="font-size:12px;color:#999;margin:0;">
      You subscribed at <a href="https://shrivibhavan.com" style="color:#999;text-decoration:underline;">shrivibhavan.com</a>. If you want to unsubscribe, just reply to this email.
    </p>
  </div>
</body>
</html>`
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName, lastName } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const resend = getResend()
    const segmentId = process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID
    const from = process.env.RESEND_FROM_EMAIL

    if (!resend || !segmentId || !from) {
      console.error('Email service not configured:', { hasResend: !!resend, segmentId, from })
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
    }

    // Step 1: Create contact in Resend
    const { data: contactData, error: contactError } = await resend.contacts.create({
      email,
      segments: [{ id: segmentId }],
      unsubscribed: false,
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
    })

    if (contactError) {
      const message = contactError.message.toLowerCase()
      const isDuplicate = message.includes('already') || message.includes('exists')
      if (!isDuplicate) {
        console.error('Resend contact error:', JSON.stringify(contactError))
        return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 400 })
      }
    }

    console.log('Contact created/exists:', contactData?.id ?? 'duplicate')

    // Step 2: Send welcome email (no idempotency key so retries work)
    const { data: emailData, error: emailError } = await resend.emails.send({
      from,
      to: [email],
      subject: firstName
        ? `Hey ${firstName}! Welcome aboard 🎉`
        : "You're in! Welcome aboard 🎉",
      html: buildWelcomeEmail(firstName),
      tags: [{ name: 'category', value: 'welcome' }],
    })

    if (emailError) {
      console.error('Resend email error:', JSON.stringify(emailError))
      return NextResponse.json(
        { error: 'Subscribed but could not send welcome email. You\'re still on the list!' },
        { status: 200 }
      )
    }

    console.log('Welcome email sent:', emailData?.id)
    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
