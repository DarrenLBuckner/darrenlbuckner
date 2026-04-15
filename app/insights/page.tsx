import { Metadata } from 'next'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'
import type { Insight } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Long-form writing from Darren L. Buckner on AI, emerging markets, and building platforms that matter.',
  alternates: { canonical: 'https://darrenlbuckner.com/insights' },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function InsightsIndexPage() {
  const { data, error } = await supabaseAdmin
    .from('insights')
    .select('*')
    .eq('is_published', true)
    .order('published_date', { ascending: false })

  if (error) {
    console.error('[insights] failed to load insights:', error)
  }

  const posts: Insight[] = data ?? []

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Insights
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Thinking Out Loud.
        </h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Long-form articles on AI, emerging markets, and building platforms
          that matter.
        </p>

        {posts.length > 0 ? (
          <div className="mt-16 space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-muted">
                  <time dateTime={post.published_date}>
                    {formatDate(post.published_date)}
                  </time>
                  {post.read_time && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.read_time}</span>
                    </>
                  )}
                </div>
                <h2 className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-muted leading-relaxed">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-sm font-medium text-accent">
                  Read the post &rarr;
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-muted leading-relaxed">
            First post coming soon.
          </p>
        )}
      </div>
    </section>
  )
}
