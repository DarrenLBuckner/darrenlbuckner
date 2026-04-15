import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Light advisory for founders and operators. Darren L. Buckner takes on a small number of engagements around AI for founders, emerging markets strategy, and platform building on a budget.',
  alternates: { canonical: 'https://darrenlbuckner.com/consulting' },
}

const offerings = [
  {
    title: 'AI for Founders',
    body: "You don't need a technical co-founder. You need the right tools and someone who's already built with them. I'll show you how to use AI to build faster and cheaper than you thought possible.",
  },
  {
    title: 'Emerging Markets Strategy',
    body: "If you're building for the Caribbean, Africa, or Latin America — I've done it. I can help you avoid the mistakes that cost time and money in markets that don't forgive either.",
  },
  {
    title: 'Platform Building on a Budget',
    body: "I built a global PropTech platform for $150/month. If you're a non-technical founder trying to ship something real, I can help you think through what to build and how.",
  },
]

export default function ConsultingPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Advisory
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Let&rsquo;s Work Together
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            I don&rsquo;t take on many people. When I do, it&rsquo;s because I
            see something worth building.
          </p>
        </div>
      </section>

      {/* What I offer */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            What I offer
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="rounded-xl border border-border bg-surface p-6 sm:p-8"
              >
                <h3 className="text-lg font-semibold text-accent">{o.title}</h3>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Think we should talk?
          </h2>
          <p className="mt-4 text-muted">
            Send me a message. I&rsquo;ll respond personally.
          </p>
          <div className="mt-10">
            <Link
              href="/contact?type=consulting"
              className="inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dim"
            >
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
