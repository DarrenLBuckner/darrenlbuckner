import { Metadata } from 'next'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About',
  description:
    'Darren L. Buckner — entrepreneur, builder, technologist, and U.S. Army veteran. Founder of Portal Home Hub, a global real estate platform serving the Caribbean, Africa, and Latin America.',
  alternates: { canonical: 'https://darrenlbuckner.com/about' },
}

const stats = [
  { value: '7 Months', label: 'to Launch' },
  { value: '51 Countries', label: 'Secured' },
  { value: 'U.S. Army Veteran', label: '1989–1995' },
]

export default async function AboutPage() {
  const { data: bio, error } = await supabaseAdmin
    .from('bios')
    .select('content')
    .eq('context_slug', 'speaking_bureau')
    .eq('is_current', true)
    .single()

  if (error) {
    console.error('[about] failed to load bio:', error)
  }

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Entrepreneur &middot; Builder &middot; Technologist &middot; Veteran
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Darren L. Buckner
          </h1>
        </div>
      </section>

      {/* Bio */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-10">
            {bio?.content ? (
              <div className="space-y-5 text-muted leading-relaxed whitespace-pre-line">
                {bio.content}
              </div>
            ) : (
              <p className="text-muted">
                Bio temporarily unavailable. Please check back shortly.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stat callouts */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-xl border border-border bg-surface p-6 text-center"
              >
                <p className="text-2xl font-bold text-accent sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Go Deeper
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted leading-relaxed">
            Read the full origin story, or book Darren to speak at your next
            event.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/story"
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dim"
            >
              Read My Full Story
            </Link>
            <Link
              href="/speaking"
              className="rounded-full border border-border px-8 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Book for Speaking
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
