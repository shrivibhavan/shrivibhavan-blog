import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'Shrivibhavan'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '60px',
        }}
      >
        <div style={{ position: 'absolute', top: 60, left: 60, color: '#666', fontSize: 18 }}>
          shrivibhavan.com
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: 52,
            fontWeight: 700,
            textAlign: 'center',
            maxWidth: '1000px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div style={{ position: 'absolute', bottom: 60, left: 60, color: '#555', fontSize: 18, fontStyle: 'italic' }}>
          shrivi
        </div>
        <div style={{ position: 'absolute', bottom: 60, right: 60, color: '#555', fontSize: 18 }}>
          dev blog
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
