import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password, page } = await request.json()

    if (!password || !page) {
      return NextResponse.json(
        { error: 'Password and page are required' },
        { status: 400 }
      )
    }

    let expectedPassword: string | undefined

    if (page === 'bio') {
      expectedPassword = process.env.BIO_PAGE_PASSWORD
    } else if (page === 'admin') {
      expectedPassword = process.env.ADMIN_PAGE_PASSWORD
    } else {
      return NextResponse.json(
        { error: 'Invalid page' },
        { status: 400 }
      )
    }

    if (!expectedPassword) {
      return NextResponse.json(
        { error: 'Page password not configured' },
        { status: 500 }
      )
    }

    if (password === expectedPassword) {
      return NextResponse.json({ authenticated: true })
    }

    return NextResponse.json(
      { error: 'Incorrect password' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
