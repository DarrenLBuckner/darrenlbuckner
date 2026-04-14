import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import type { Venture } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Ventures',
  description:
    'The companies and platforms built by Darren L. Buckner, including Portal Home Hub.',
  alternates: { canonical: 'https://darrenlbuckner.com/ventures' },
}

export default async function VenturesPage() {
  const { data } = await supabase
    .from('ventures')
    .select('*')
    .order('display_order', { ascending: true })

  const ventures: Venture[] = data ?? []

  const featured = ventures.filter((v) => v.is_featured && v.status === 'active')
  const active = ventures.filter((v) => !v.is_featured && v.status === 'active')
  const legacy = ventures.filter((v) => v.status !== 'active')

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Portfolio
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Ventures
        </h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Companies, platforms, and projects built to serve underserved markets.
        </p>

        {/* Featured ventures */}
        {featured.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Featured
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((venture) => (
                <VentureCard key={venture.id} venture={venture} featured />
              ))}
            </div>
          </div>
        )}

        {/* Active ventures */}
        {active.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Active
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((venture) => (
                <VentureCard key={venture.id} venture={venture} />
              ))}
            </div>
          </div>
        )}

        {/* Legacy ventures */}
        {legacy.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Legacy
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {legacy.map((venture) => (
                <VentureCard key={venture.id} venture={venture} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function VentureCard({
  venture,
  featured,
}: {
  venture: Venture
  featured?: boolean
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hover ${
        featured ? 'md:p-8' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className={`font-semibold ${featured ? 'text-xl' : 'text-lg'}`}>
          {venture.name}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            venture.status === 'active'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-zinc-500/10 text-zinc-400'
          }`}
        >
          {venture.status}
        </span>
      </div>

      {venture.tagline && (
        <p className="mt-1 text-sm text-accent">{venture.tagline}</p>
      )}

      <p className="mt-3 text-sm text-muted leading-relaxed">
        {venture.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
        {venture.category && (
          <span className="rounded-full bg-background px-2.5 py-1">
            {venture.category}
          </span>
        )}
        {venture.years_active && <span>{venture.years_active}</span>}
        {venture.highlight_metric && (
          <span className="text-accent font-medium">
            {venture.highlight_metric}
          </span>
        )}
      </div>

      {venture.url && (
        <a
          href={venture.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-accent hover:text-accent-dim transition-colors"
        >
          Visit &rarr;
        </a>
      )}
    </div>
  )
}
