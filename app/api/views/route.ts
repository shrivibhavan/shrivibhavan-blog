import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const VIEWS_FILE = path.join(process.cwd(), 'data', 'views.json')

function getViews(): Record<string, number> {
  try {
    if (fs.existsSync(VIEWS_FILE)) {
      return JSON.parse(fs.readFileSync(VIEWS_FILE, 'utf-8'))
    }
  } catch {
    // If file is corrupted, start fresh
  }
  return {}
}

function saveViews(views: Record<string, number>) {
  const dir = path.dirname(VIEWS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2))
}

// GET — fetch view count for a slug
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  const views = getViews()
  return NextResponse.json({ views: views[slug] ?? 0 })
}

// POST — increment view count for a slug
export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json()

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }

    const views = getViews()
    views[slug] = (views[slug] ?? 0) + 1
    saveViews(views)

    return NextResponse.json({ views: views[slug] })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
