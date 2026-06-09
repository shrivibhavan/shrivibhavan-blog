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
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Welcome</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 24px 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">

  <div style="display:none;font-size:1px;color:#f4f4f2;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    Hey ${name} — thanks for subscribing. Here's a quick hello.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f2;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" class="container" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          
          <!-- Thin accent line -->
          <tr>
            <td style="height:3px;background-color:#c4622d;"></td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:36px 32px;">

              <!-- Logo -->
              <p style="margin:0 0 28px 0;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#1a1a1a;letter-spacing:-0.01em;">
                shrivibhavan<span style="color:#c4622d;">.</span>
              </p>

              <!-- Greeting -->
              <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#1a1a1a;">
                Hey ${name},
              </p>

              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:#3a3a38;">
                Thanks for subscribing — means a lot, genuinely.
              </p>

              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:#3a3a38;">
                I write about things I'm building and learning. Mostly React, Next.js, cloud stuff (AWS, Docker), and lately a lot about AI agents. I'm also documenting my journey of moving to Japan for a tech career, so that shows up too.
              </p>

              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:#3a3a38;">
                I try to keep posts practical — the kind of stuff I wish existed when I was stuck on something at 2am. No filler.
              </p>

              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#3a3a38;">
                If you want to check out what's already there:
              </p>

              <!-- Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 28px 0;">
                <tr>
                  <td style="border-radius:8px;background-color:#c4622d;">
                    <a href="https://shrivibhavan.com/blog" target="_blank" style="display:inline-block;padding:11px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Browse posts
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign off -->
              <p style="margin:0 0 4px 0;font-size:15px;line-height:1.7;color:#3a3a38;">
                Talk soon,
              </p>
              <p style="margin:0;font-size:15px;color:#1a1a1a;font-weight:600;">
                Vibhavan
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 32px 28px 32px;border-top:1px solid #eee;">
              <p style="margin:16px 0 0 0;font-size:12px;color:#999;line-height:1.6;">
                You signed up at <a href="https://shrivibhavan.com" style="color:#c4622d;text-decoration:none;">shrivibhavan.com</a>. 
                Hit reply anytime — I read everything.
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
