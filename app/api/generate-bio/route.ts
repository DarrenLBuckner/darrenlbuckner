import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin } from '@/lib/supabase'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(request: NextRequest) {
  try {
    const { contextSlug } = await request.json()

    if (!contextSlug) {
      return NextResponse.json(
        { error: 'contextSlug is required' },
        { status: 400 }
      )
    }

    // Check for cached current bio
    const { data: cachedBio } = await supabaseAdmin
      .from('bios')
      .select('content')
      .eq('context_slug', contextSlug)
      .eq('is_current', true)
      .single()

    if (cachedBio) {
      return NextResponse.json({ bio: cachedBio.content })
    }

    // Fetch context profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('context_profiles')
      .select('*')
      .eq('slug', contextSlug)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Context profile not found' },
        { status: 404 }
      )
    }

    // Fetch matching story blocks
    let query = supabaseAdmin
      .from('story_blocks')
      .select('*')
      .eq('is_public', true)
      .order('weight', { ascending: true })

    const { data: storyBlocks } = await query

    // Filter blocks by required/excluded themes
    const filteredBlocks = (storyBlocks ?? []).filter((block) => {
      const blockThemes: string[] = block.themes ?? []

      if (profile.excluded_themes?.length > 0) {
        const hasExcluded = blockThemes.some((t: string) =>
          profile.excluded_themes.includes(t)
        )
        if (hasExcluded) return false
      }

      if (profile.required_themes?.length > 0) {
        const hasRequired = blockThemes.some((t: string) =>
          profile.required_themes.includes(t)
        )
        return hasRequired
      }

      return true
    })

    // Assemble story content
    const storyContent = filteredBlocks
      .map(
        (block) =>
          `[${block.era}] ${block.title}\n${block.content}`
      )
      .join('\n\n---\n\n')

    // Generate bio with Claude
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are writing a professional bio for Darren L. Buckner.

Context: ${profile.label} — ${profile.description}
Tone: ${profile.tone}
Target length: approximately ${profile.bio_length} words

IMPORTANT RULES:
- Always use his full name "Darren L. Buckner" on first reference
- Write in third person
- Match the specified tone exactly
- Stay within the target word count
- Do not fabricate any facts — only use information from the story blocks below
- Do not include any preamble, headers, or meta-commentary — just the bio text

STORY BLOCKS:
${storyContent}

Write the bio now:`,
        },
      ],
    })

    const bioContent =
      message.content[0].type === 'text' ? message.content[0].text : ''

    const wordCount = bioContent.split(/\s+/).length

    // Mark old bios as not current
    await supabaseAdmin
      .from('bios')
      .update({ is_current: false })
      .eq('context_slug', contextSlug)

    // Cache the new bio
    await supabaseAdmin.from('bios').insert({
      context_slug: contextSlug,
      content: bioContent,
      word_count: wordCount,
      generated_at: new Date().toISOString(),
      is_current: true,
    })

    return NextResponse.json({ bio: bioContent })
  } catch (error) {
    console.error('Bio generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate bio' },
      { status: 500 }
    )
  }
}
