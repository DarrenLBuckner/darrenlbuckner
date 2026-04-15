import { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import type { StoryBlock } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Story',
  description:
    'The story of Darren L. Buckner — from North St. Louis to global tech entrepreneurship.',
  alternates: { canonical: 'https://darrenlbuckner.com/story' },
}

const eraOrder = [
  'north_stl',
  'army',
  'road',
  'la',
  'detroit',
  'atlanta',
  'guyana_connection',
  'global',
  'south_africa',
]

function getEraOrder(era: string): number {
  const idx = eraOrder.findIndex(
    (e) => e.toLowerCase() === era.toLowerCase()
  )
  return idx === -1 ? eraOrder.length : idx
}

export default async function StoryPage() {
  const { data: blocks, error } = await supabaseAdmin
    .from('story_blocks')
    .select('*')
    .eq('is_public', true)
    .order('weight', { ascending: true })

  if (error) {
    console.error('[story] failed to load story_blocks:', error)
  }

  const storyBlocks: StoryBlock[] = blocks ?? []

  const grouped = storyBlocks.reduce<Record<string, StoryBlock[]>>(
    (acc, block) => {
      const era = block.era || 'Other'
      if (!acc[era]) acc[era] = []
      acc[era].push(block)
      return acc
    },
    {}
  )

  const sortedEras = Object.keys(grouped).sort(
    (a, b) => getEraOrder(a) - getEraOrder(b)
  )

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          The Journey
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Story
        </h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          From North St. Louis to building technology for markets the world
          overlooked.
        </p>

        {/* Timeline */}
        <div className="mt-16 space-y-0">
          {sortedEras.map((era) => (
            <div key={era} className="relative border-l-2 border-border pl-8 pb-12 last:pb-0">
              {/* Era dot */}
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-accent bg-background" />

              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {era}
              </h2>

              <div className="mt-6 space-y-8">
                {grouped[era].map((block) => (
                  <article key={block.id}>
                    <h3 className="text-xl font-semibold">{block.title}</h3>
                    <p className="mt-3 text-muted leading-relaxed whitespace-pre-line">
                      {block.content}
                    </p>
                    {block.themes.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {block.themes.map((theme) => (
                          <span
                            key={theme}
                            className="rounded-full bg-surface px-3 py-1 text-xs text-muted"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
