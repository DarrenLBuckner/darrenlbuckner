import { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { PressItem } from '@/lib/types'

export const metadata: Metadata = {
  alternates: { canonical: 'https://darrenlbuckner.com' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Darren L. Buckner',
  alternateName: 'Darren Buckner',
  jobTitle: 'Entrepreneur & Founder',
  description:
    'American entrepreneur, real estate developer, Army veteran, and self-taught technologist. Founder of Portal Home Hub — a global real estate platform for the Caribbean, Africa, and Latin America.',
  url: 'https://darrenlbuckner.com',
  knowsAbout: [
    'Real Estate Development',
    'PropTech',
    'Caribbean Real Estate',
    'African Real Estate',
    'Latin American Real Estate',
    'Technology Entrepreneurship',
    'AI-Assisted Development',
    'Full-Stack Software Development',
    'Military Leadership',
  ],
  sameAs: [
    'https://portalhomehub.com',
    'https://guyanahomehub.com',
    'https://www.youtube.com/@DarrenLBuckner',
  ],
  birthPlace: {
    '@type': 'Place',
    name: 'North St. Louis, Missouri',
  },
  nationality: 'American',
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Entrepreneur',
    },
    {
      '@type': 'Occupation',
      name: 'Real Estate Developer',
    },
    {
      '@type': 'Occupation',
      name: 'Technologist',
    },
  ],
}

const badges = [
  { label: 'U.S. Army Veteran', detail: '1989-1995' },
  { label: 'Founder, Portal Home Hub', detail: 'Global PropTech' },
  { label: 'Self-Taught Technologist', detail: 'AI-First Builder' },
]

export default async function HomePage() {
  const { data: pressItems } = await supabase
    .from('press_items')
    .select('*')
    .eq('is_featured', true)
    .order('published_date', { ascending: false })
    .limit(1)

  const latestPress: PressItem | null = pressItems?.[0] ?? null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Entrepreneur &middot; Builder &middot; Technologist &middot; Veteran
        </p>
        <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Darren L. Buckner
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          He didn&rsquo;t wait for the tools to exist. He built them — for the
          markets the world forgot.
        </p>

        {/* Credential badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="rounded-full border border-border bg-surface px-5 py-2.5"
            >
              <span className="text-sm font-medium">{badge.label}</span>
              <span className="ml-2 text-xs text-muted">{badge.detail}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/story"
            className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dim"
          >
            Read My Story
          </Link>
          <Link
            href="/speaking"
            className="rounded-full border border-border px-8 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Book for Speaking
          </Link>
        </div>
      </section>

      {/* Latest Press */}
      {latestPress && (
        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Latest Press
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {latestPress.title}
            </h2>
            <p className="mt-2 text-muted">{latestPress.outlet}</p>
            <div className="mt-6 flex justify-center gap-4">
              {latestPress.url && (
                <a
                  href={latestPress.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:text-accent-dim transition-colors"
                >
                  Read Article &rarr;
                </a>
              )}
              <Link
                href="/press"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                View All Press
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About preview */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Building Technology for the Global South
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted leading-relaxed">
            Born in North St. Louis. Served six years in the U.S. Army. Spent
            decades in construction and real estate across 30+ states. Then
            taught himself to code using Claude and ChatGPT — and built Portal
            Home Hub, a global real estate platform connecting buyers to
            properties across the Caribbean, Africa, and Latin America. The
            markets that billion-dollar platforms overlooked.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-muted leading-relaxed">
            Based in St. Louis, Missouri with deep ties to Guyana and South
            Africa.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Link
              href="/ventures"
              className="text-sm text-accent hover:text-accent-dim transition-colors"
            >
              Explore Ventures &rarr;
            </Link>
            <Link
              href="/story"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Read the Full Story &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
