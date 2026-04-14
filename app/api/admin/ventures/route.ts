import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, ...ventureData } = body

    // Verify admin password
    if (password !== process.env.ADMIN_PAGE_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!ventureData.name || !ventureData.slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('ventures')
      .insert({
        name: ventureData.name,
        slug: ventureData.slug,
        tagline: ventureData.tagline || null,
        description: ventureData.description || null,
        url: ventureData.url || null,
        status: ventureData.status || 'active',
        category: ventureData.category || null,
        years_active: ventureData.years_active || null,
        highlight_metric: ventureData.highlight_metric || null,
        display_order: ventureData.display_order || 0,
        is_featured: ventureData.is_featured || false,
      })

    if (error) {
      console.error('Venture insert error:', error)
      return NextResponse.json(
        { error: 'Failed to add venture' },
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
