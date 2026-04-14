import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, organization, inquiry_type, message, context } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Insert into inquiry_leads
    const { error: dbError } = await supabaseAdmin
      .from('inquiry_leads')
      .insert({
        name,
        email,
        organization: organization || null,
        inquiry_type: inquiry_type || 'general',
        message,
        context: context || null,
        is_read: false,
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save inquiry' },
        { status: 500 }
      )
    }

    // Send notification email via Resend
    try {
      await resend.emails.send({
        from: 'DLB Website <onboarding@resend.dev>',
        to: ['darren@darrenlbuckner.com'],
        subject: `New ${inquiry_type || 'general'} inquiry from ${name}`,
        html: `
          <h2>New Inquiry from darrenlbuckner.com</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
          <p><strong>Type:</strong> ${inquiry_type || 'general'}</p>
          ${context ? `<p><strong>Event Details:</strong> ${context}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      })
    } catch (emailError) {
      // Log but don't fail — the inquiry is saved
      console.error('Email send error:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
