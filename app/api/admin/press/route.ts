import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, ...pressData } = body

    // Verify admin password
    if (password !== process.env.ADMIN_PAGE_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!pressData.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('press_items')
      .insert({
        title: pressData.title,
        outlet: pressData.outlet || null,
        url: pressData.url || null,
        embed_url: pressData.embed_url || null,
        type: pressData.type || 'article',
        published_date: pressData.published_date || new Date().toISOString().split('T')[0],
        is_featured: pressData.is_featured || false,
      })

    if (error) {
      console.error('Press insert error:', error)
      return NextResponse.json(
        { error: 'Failed to add press item' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
