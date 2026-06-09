import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

function buildWelcomeEmail(firstName?: string) {
  const name = firstName || 'there'

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Welcome to Shrivibhavan</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * { margin: 0; padding: 0; }
    body, table, td { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .email-padding { padding: 24px 20px !important; }
      .hero-text { font-size: 26px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#050505;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;font-size:1px;color:#050505;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    Hey ${name}! Welcome to my corner of the internet. Here's what to expect →
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#050505;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Email Container -->
        <table role="presentation" class="email-container" width="100%" cellspacing="0" cellpadding="0" style="max-width:540px;">
          
          <!-- Logo Row -->
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:#e8e6e0;letter-spacing:-0.02em;">
                    shrivibhavan<span style="color:#c4622d;">.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0e0e0e;border-radius:20px;border:1px solid #1a1a1a;overflow:hidden;">
                
                <!-- Gradient accent bar -->
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg, #c4622d 0%, #e8943d 50%, #c4622d 100%);"></td>
                </tr>

                <!-- Hero Section -->
                <tr>
                  <td class="email-padding" style="padding:40px 36px 0 36px;">
                    <h1 class="hero-text" style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;color:#f5f2ec;line-height:1.2;">
                      Hey ${name}! 👋
                    </h1>
                    <p style="margin:0;font-size:20px;color:#c4622d;font-weight:500;line-height:1.4;">
                      Welcome to the club.
                    </p>
                  </td>
                </tr>

                <!-- Body Content -->
                <tr>
                  <td class="email-padding" style="padding:24px 36px 0 36px;">
                    <p style="margin:0 0 24px 0;font-size:15px;line-height:1.8;color:#a8a5a0;">
                      I'm really glad you're here. I write about the stuff I'm actually building and learning — no fluff, no clickbait. Just honest dev notes from someone figuring it out in public.
                    </p>
                  </td>
                </tr>

                <!-- What You'll Get Section -->
                <tr>
                  <td class="email-padding" style="padding:0 36px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#141414;border-radius:12px;border:1px solid #1f1f1f;">
                      <tr>
                        <td style="padding:20px 24px 8px 24px;">
                          <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#c4622d;text-transform:uppercase;letter-spacing:0.12em;">
                            📬 What you'll get
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 24px 20px 24px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding:6px 0;font-size:14px;color:#c8c5be;line-height:1.6;">
                                <span style="display:inline-block;width:24px;text-align:center;">⚡</span> Deep dives on React, Next.js & TypeScript
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:14px;color:#c8c5be;line-height:1.6;">
                                <span style="display:inline-block;width:24px;text-align:center;">☁️</span> Cloud & DevOps — AWS, Docker, CI/CD
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:14px;color:#c8c5be;line-height:1.6;">
                                <span style="display:inline-block;width:24px;text-align:center;">🤖</span> AI agents, LLM experiments & new tools
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:14px;color:#c8c5be;line-height:1.6;">
                                <span style="display:inline-block;width:24px;text-align:center;">🇯🇵</span> Career updates & the road to Japan
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td class="email-padding" style="padding:28px 36px 0 36px;" align="center">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="border-radius:12px;background:linear-gradient(135deg, #c4622d 0%, #d4723d 100%);">
                          <a href="https://shrivibhavan.com/blog" target="_blank" rel="noopener" style="display:inline-block;padding:14px 36px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:12px;letter-spacing:0.02em;">
                            Read the latest posts →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Personal note -->
                <tr>
                  <td class="email-padding" style="padding:28px 36px 36px 36px;">
                    <p style="margin:0;font-size:14px;color:#6a6860;line-height:1.7;font-style:italic;">
                      P.S. — This isn't a one-way street. Hit reply anytime, I read every email and love hearing from readers.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0 0;" align="center">
              <p style="margin:0 0 6px 0;font-size:12px;color:#3a3830;line-height:1.6;">
                You subscribed at <a href="https://shrivibhavan.com" style="color:#c4622d;text-decoration:none;">shrivibhavan.com</a>
              </p>
              <p style="margin:0;font-size:11px;color:#2a2820;line-height:1.6;">
                Kolhapur, India · Made with ☕ and curiosity
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
