import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Long-form writing from Darren L. Buckner on AI, emerging markets, and building platforms that matter.',
  alternates: { canonical: 'https://darrenlbuckner.com/insights' },
}

export default function InsightsPage() {
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
          that matter. First post coming soon.
        </p>
      </div>
    </section>
  )
}
