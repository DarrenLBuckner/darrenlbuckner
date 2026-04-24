import { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import type { PressItem } from '@/lib/types'

type ExtendedInterview = {
  pullQuote: string
  attribution: string
  summary: string
  meta: { label: string; value: string }[]
  jsonLd: Record<string, unknown>
}

const EXTENDED_INTERVIEWS: Record<string, ExtendedInterview> = {
  KP196IvQCfY: {
    pullQuote:
      "This morning we were talking with Darren Buckner. He's a CEO of Portal HomeHub and Guyana HomeHub. Check out that website — Guyana HomeHub. If you're looking to buy a new home, looking to rent a property, they brought everything in one place. Guyanahomehub.com.",
    attribution: '— Gordon Mosley, NewsSource Guyana, January 8, 2026',
    summary:
      "In this live interview on NewsSource Guyana, host Gordon Mosley spoke with Darren L. Buckner, CEO and Founder of Portal HomeHub and Guyana HomeHub, about the platform's role in Guyana's growing real estate market. Topics covered included Guyana's 34% GDP growth, the oil boom's impact on property demand, diaspora buyers seeking retirement and investment homes, the verified agent process, and the launch of guyanahomehub.com as the first digital real estate platform serving both local and overseas Guyanese buyers.",
    meta: [
      { label: 'Host', value: 'Gordon Mosley' },
      { label: 'Show', value: 'NewsSource Guyana' },
      { label: 'Date', value: 'January 8, 2026' },
      { label: 'Location', value: 'Georgetown, Guyana' },
      { label: 'Format', value: 'Live radio/TV interview' },
      { label: 'Platform mentioned', value: 'guyanahomehub.com' },
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline:
        'Darren L. Buckner, CEO of Portal HomeHub and Guyana HomeHub — NewsSource Guyana Interview',
      datePublished: '2026-01-08',
      author: {
        '@type': 'Person',
        name: 'Gordon Mosley',
      },
      publisher: {
        '@type': 'Organization',
        name: 'NewsSource Guyana',
      },
      about: [
        {
          '@type': 'Person',
          name: 'Darren L. Buckner',
          url: 'https://darrenlbuckner.com',
        },
        {
          '@type': 'Organization',
          name: 'Portal HomeHub',
          url: 'https://portalhomehub.com',
        },
        {
          '@type': 'Organization',
          name: 'Guyana HomeHub',
          url: 'https://guyanahomehub.com',
        },
      ],
    },
  },
}

export const revalidate = 60

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
  const { data, error } = await supabaseAdmin
    .from('press_items')
    .select('*')
    .order('published_date', { ascending: false })

  if (error) {
    console.error('[press] failed to load press_items:', error)
  }

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
        <p className="mt-6 max-w-2xl text-muted leading-relaxed">
          Darren L. Buckner is a U.S. Army veteran, serial entrepreneur, and
          self-taught technologist from St. Louis, Missouri. He is the founder
          of Portal HomeHub, Guyana HomeHub, and PivotPoint AI &mdash; building
          the Zillow of the Global South across the Caribbean, Africa, and
          Latin America.
        </p>

        {/* Video embeds */}
        {videoItems.length > 0 && (
          <div className="mt-16 space-y-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Video &amp; Interviews
            </h2>
            {videoItems.map((item) => {
              const ytId = getYouTubeId(item.embed_url!)!
              const extended = EXTENDED_INTERVIEWS[ytId]
              return (
                <article key={item.id} className="space-y-8">
                  {extended && (
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(extended.jsonLd),
                      }}
                    />
                  )}
                  <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: '56.25%' }}
                    >
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

                  {extended && (
                    <div className="grid gap-10 lg:grid-cols-3">
                      <blockquote className="lg:col-span-2 rounded-xl border-l-4 border-accent bg-surface p-6 sm:p-8">
                        <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                          &ldquo;{extended.pullQuote}&rdquo;
                        </p>
                        <footer className="mt-4 text-sm text-accent">
                          {extended.attribution}
                        </footer>
                      </blockquote>

                      <dl className="rounded-xl border border-border bg-surface p-6 text-sm sm:p-8">
                        {extended.meta.map((m) => (
                          <div
                            key={m.label}
                            className="flex flex-col gap-0.5 border-b border-border py-2 last:border-b-0 last:pb-0 first:pt-0"
                          >
                            <dt className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                              {m.label}
                            </dt>
                            <dd className="text-foreground">{m.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className="lg:col-span-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                          Interview Summary
                        </p>
                        <p className="mt-4 text-muted leading-relaxed">
                          {extended.summary}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
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
