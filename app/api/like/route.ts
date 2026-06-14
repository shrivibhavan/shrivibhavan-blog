import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { photoName } = body

    if (!photoName) {
      return NextResponse.json({ error: 'Photo name is required.' }, { status: 400 })
    }

    const resend = getResend()
    const from = process.env.RESEND_FROM_EMAIL
    const to = process.env.INBOUND_FORWARD_TO ?? 'hello@shrivibhavan.com'

    if (!resend || !from) {
      console.error('Email service not configured for likes:', { hasResend: !!resend, from })
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
    }

    // Send email notification
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: `📸 New photo like: ${photoName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Photo Like</title>
</head>
<body style="margin:0;padding:24px;background-color:#f4f4f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f2;">
    <tr>
      <td align="center" style="padding:24px 0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:480px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);border-top:3px solid #c4622d;">
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:20px;font-weight:700;color:#1a1a1a;">
                New Photo Like! 📸
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#3a3a38;">
                Someone just clicked the like button on your photo <strong>"${photoName}"</strong> in your photography gallery.
              </p>
              <p style="margin:0;font-size:12px;color:#999;border-top:1px solid #eee;padding-top:16px;">
                Sent automatically from <a href="https://shrivibhavan.com" style="color:#c4622d;text-decoration:none;">shrivibhavan.com</a>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (error) {
      console.error('Resend like notification error:', JSON.stringify(error))
      return NextResponse.json({ error: 'Failed to send notification.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('Like API error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
