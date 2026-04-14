import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import type { SpeakingTopic } from '@/lib/types'
import InquiryForm from './InquiryForm'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Book Darren L. Buckner to speak on entrepreneurship, PropTech, AI-first development, and building for underserved markets.',
  alternates: { canonical: 'https://darrenlbuckner.com/speaking' },
}

export default async function SpeakingPage() {
  const { data } = await supabase
    .from('speaking_topics')
    .select('*')
    .order('display_order', { ascending: true })

  const topics: SpeakingTopic[] = data ?? []

  const featured = topics.filter((t) => t.is_featured)
  const rest = topics.filter((t) => !t.is_featured)

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Engagements
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Speaking
        </h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Darren L. Buckner speaks on entrepreneurship, building with AI,
          PropTech innovation, and creating technology for underserved markets.
        </p>

        {/* Featured topics */}
        {featured.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Signature Topics
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((topic) => (
                <TopicCard key={topic.id} topic={topic} featured />
              ))}
            </div>
          </div>
        )}

        {/* Other topics */}
        {rest.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Additional Topics
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        )}

        {/* Inquiry form */}
        <div className="mt-24 border-t border-border pt-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Book Darren L. Buckner
            </h2>
            <p className="mt-3 text-muted">
              Interested in having Darren L. Buckner speak at your event?
              Fill out the form below.
            </p>
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}

function TopicCard({
  topic,
  featured,
}: {
  topic: SpeakingTopic
  featured?: boolean
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hover ${
        featured ? 'md:p-8' : ''
      }`}
    >
      <h3 className={`font-semibold ${featured ? 'text-xl' : 'text-lg'}`}>
        {topic.title}
      </h3>
      <p className="mt-3 text-sm text-muted leading-relaxed">
        {topic.description}
      </p>
      {topic.audience_fit.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {topic.audience_fit.map((audience) => (
            <span
              key={audience}
              className="rounded-full bg-background px-2.5 py-1 text-xs text-muted"
            >
              {audience}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
