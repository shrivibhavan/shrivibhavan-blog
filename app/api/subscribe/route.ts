import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

function buildWelcomeEmail(firstName?: string) {
  const greeting = firstName ? `Hey ${firstName}` : 'Hey there'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Shrivibhavan</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background-color:#111111;border-radius:16px;border:1px solid #1f1f1f;overflow:hidden;">
          
          <!-- Accent top bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,transparent,#c4622d,transparent);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 24px 32px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#f5f2ec;letter-spacing:-0.02em;">
                shrivibhavan<span style="color:#c4622d;">.</span>
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 32px 32px 32px;">
              <h1 style="margin:0 0 16px 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:#f5f2ec;line-height:1.3;">
                ${greeting}, welcome! 👋
              </h1>
              
              <p style="margin:0 0 20px 0;font-size:15px;line-height:1.7;color:#c8c5be;">
                Thanks for subscribing. I write about the things I'm building and learning — from full-stack dev to cloud, AI, and the occasional career reflection.
              </p>

              <p style="margin:0 0 12px 0;font-size:13px;font-weight:600;color:#e8e6e0;text-transform:uppercase;letter-spacing:0.08em;">
                What to expect
              </p>
              
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px 0;width:100%;">
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#c8c5be;line-height:1.5;">
                    <span style="color:#c4622d;font-weight:bold;margin-right:8px;">→</span> Deep dives on React, Next.js, and TypeScript
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#c8c5be;line-height:1.5;">
                    <span style="color:#c4622d;font-weight:bold;margin-right:8px;">→</span> Cloud & DevOps notes (AWS, Docker, CI/CD)
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#c8c5be;line-height:1.5;">
                    <span style="color:#c4622d;font-weight:bold;margin-right:8px;">→</span> AI agents, LLM experiments, and new tools
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#c8c5be;line-height:1.5;">
                    <span style="color:#c4622d;font-weight:bold;margin-right:8px;">→</span> Career updates and the road to Japan 🇯🇵
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:10px;background-color:#c4622d;">
                    <a href="https://shrivibhavan.com/blog" target="_blank" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">
                      Read the blog →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none;border-top:1px solid #1f1f1f;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <p style="margin:0;font-size:12px;color:#5a5850;line-height:1.6;">
                You're receiving this because you subscribed at
                <a href="https://shrivibhavan.com" style="color:#c4622d;text-decoration:none;">shrivibhavan.com</a>.
                <br />Hit reply if you want to say hi — I read every email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const { email, firstName, lastName } = await req.json()
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
    ...(firstName ? { firstName } : {}),
    ...(lastName ? { lastName } : {}),
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
      subject: firstName
        ? `Welcome, ${firstName}! You're in 🎉`
        : "Welcome! You're subscribed 🎉",
      html: buildWelcomeEmail(firstName),
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
