import { Metadata } from 'next'
import Image from 'next/image'
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

const nextGen = [
  {
    name: 'Selena Buckner',
    body:
      'U.S. Air Force veteran. Linguist. Real estate investor in Florida. Planned operator for Colombia HomeHub — the next Portal HomeHub territory launch.',
    href: null,
    linkLabel: null,
  },
  {
    name: 'Kira Buckner',
    body:
      'Co-founder of Odori — the first professional networking platform built for the global dance industry.',
    href: 'https://odori.io',
    linkLabel: 'odori.io →',
  },
  {
    name: 'Malcolm Buckner',
    body:
      'Based in Johannesburg, South Africa. Attending Crawford International School. Already sharing the platform with his own audience.',
    href: 'https://www.tiktok.com/@mal_be_trippin',
    linkLabel: '@mal_be_trippin on TikTok →',
  },
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
          <Image
            src="/images/founder/headshot.jpg"
            alt="Darren L. Buckner"
            width={288}
            height={288}
            priority
            className="mx-auto mb-8 h-28 w-28 rounded-full object-cover ring-2 ring-accent/40 sm:h-36 sm:w-36"
          />
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
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-10">
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              <div className="md:col-span-1">
                <Image
                  src="/images/founder/headshot-story.jpg"
                  alt="Darren L. Buckner portrait"
                  width={1024}
                  height={1024}
                  className="w-full rounded-lg object-cover"
                />
              </div>
              <div className="md:col-span-2">
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
          </div>
        </div>
      </section>

      {/* Origin story — Guyana connection */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Origin Story
          </p>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            The Guyana Connection
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Rochelle is Guyanese. Her late father,{' '}
            <span itemScope itemType="https://schema.org/Person">
              <span itemProp="name">Milton Pydana</span>
              <link
                itemProp="sameAs"
                href="https://en.wikipedia.org/wiki/Milton_Pydanna"
              />
              <link
                itemProp="sameAs"
                href="https://www.espncricinfo.com/cricketers/milton-pydanna-52683"
              />
            </span>
            , was a West Indies cricketer and a legend of Guyanese cricket.
            That&rsquo;s not background color. That&rsquo;s why Guyana was
            first.
          </p>
          <figure className="mt-8">
            <Image
              src="/images/founder/darren-rochelle.jpg"
              alt="Darren L. Buckner and Rochelle"
              width={720}
              height={478}
              className="w-full rounded-xl border border-border object-cover"
            />
            <figcaption className="mt-3 text-center text-sm italic text-muted">
              Darren and Rochelle — the Guyana connection.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Rochelle — the partner behind the vision */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            The Partner Behind the Vision
          </p>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Rochelle Pydana Buckner
          </h2>
          <div className="mt-6 space-y-5 text-muted leading-relaxed">
            <p>
              Rochelle Pydana Buckner is not background color. She is
              architecture.
            </p>
            <p>
              She studied at the University of Guyana before earning her
              degree in Laboratory Science from Michigan State University. She
              brought that same scientific precision to everything she has
              built alongside Darren.
            </p>
            <p>
              She is the co-founder of PivotPoint AI — the AI strategy venture
              they built together. She is the founder of Pydana Collection, a
              consumer brand she launched in Georgia, applying her science
              background to product development and rooted in her Guyanese
              heritage.
            </p>
            <p>
              She is also the reason Guyana was first. Her roots, her family,
              her late father Milton Pydana — a West Indies cricketer and
              legend of Guyanese cricket — that&rsquo;s not a footnote.
              That&rsquo;s the founding decision.
            </p>
            <p>
              The Buckner family is rooted in Johannesburg, South Africa.
              Darren moves where the work takes him — Guyana, St. Louis,
              Johannesburg. That&rsquo;s what building globally actually looks
              like.
            </p>
          </div>
        </div>
      </section>

      {/* Next Generation */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              The Next Generation
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              They&rsquo;re Already Building
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {nextGen.map((person) => (
              <div
                key={person.name}
                className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent sm:p-8"
              >
                <h3 className="text-lg font-semibold text-accent">
                  {person.name}
                </h3>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {person.body}
                </p>
                {person.href && person.linkLabel && (
                  <a
                    href={person.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-accent hover:text-accent-dim transition-colors"
                  >
                    {person.linkLabel}
                  </a>
                )}
              </div>
            ))}
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
