import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import type { PressItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Press',
  description:
    'Press coverage and media features about Darren L. Buckner and Portal Home Hub.',
  alternates: { canonical: 'https://darrenlbuckner.com/press' },
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/
  )
  return match?.[1] ?? null
}

export default async function PressPage() {
  const { data } = await supabase
    .from('press_items')
    .select('*')
    .order('published_date', { ascending: false })

  const pressItems: PressItem[] = data ?? []

  const featured = pressItems.filter((p) => p.is_featured)
  const rest = pressItems.filter((p) => !p.is_featured)

  // Items with embeddable video
  const videoItems = pressItems.filter(
    (p) => p.embed_url && getYouTubeId(p.embed_url)
  )

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Media
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Press
        </h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Coverage, interviews, and features about Darren L. Buckner and his
          ventures.
        </p>

        {/* Video embeds */}
        {videoItems.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Video &amp; Interviews
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {videoItems.map((item) => {
                const ytId = getYouTubeId(item.embed_url!)
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-border bg-surface overflow-hidden"
                  >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${ytId}`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted">{item.outlet}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Featured press */}
        {featured.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Featured
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((item) => (
                <PressCard key={item.id} item={item} featured />
              ))}
            </div>
          </div>
        )}

        {/* All press */}
        {rest.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              All Coverage
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <PressCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {pressItems.length === 0 && (
          <p className="mt-16 text-center text-muted">
            Press coverage coming soon.
          </p>
        )}
      </div>
    </section>
  )
}

function PressCard({
  item,
  featured,
}: {
  item: PressItem
  featured?: boolean
}) {
  const date = new Date(item.published_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hover ${
        featured ? 'md:p-8' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-background px-2.5 py-1 text-xs text-muted">
          {item.type}
        </span>
        {item.is_featured && (
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent font-medium">
            Featured
          </span>
        )}
      </div>

      <h3 className={`mt-4 font-semibold ${featured ? 'text-xl' : 'text-lg'}`}>
        {item.title}
      </h3>

      <div className="mt-2 flex items-center gap-2 text-sm text-muted">
        <span className="font-medium">{item.outlet}</span>
        <span>&middot;</span>
        <span>{date}</span>
      </div>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-accent hover:text-accent-dim transition-colors"
        >
          {item.type === 'video' || item.type === 'interview'
            ? 'Watch'
            : 'Read Article'}{' '}
          &rarr;
        </a>
      )}
    </div>
  )
}
