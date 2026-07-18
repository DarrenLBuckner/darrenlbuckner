import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import type { SpeakingTopic } from '@/lib/types'
import { PERSON_ID } from '@/lib/identity'
import InquiryForm from './InquiryForm'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Book Darren L. Buckner to speak on entrepreneurship, PropTech, AI-first development, and building for underserved markets.',
  alternates: { canonical: 'https://www.darrenlbuckner.com/speaking' },
}

const formats = [
  { label: 'Keynote', detail: '30–60 minutes' },
  { label: 'Panel', detail: 'Moderated or panelist' },
  { label: 'Fireside Chat', detail: 'Conversational format' },
  { label: 'Workshop', detail: '90 min – half day' },
]

// 126th National Business League Conference — National Speaker credential.
// Hardcoded + dedicated section (mirrors BUILDING_EXPO_COVERAGE on /press): the
// speaking_topics table has no columns for venue, session title, or dates, and
// DDL cannot run via the JS client. The Person is referenced by PERSON_ID only
// (from lib/identity.ts) so the entity never drifts — never hardcode Darren's
// name/description/sameAs/jobTitle here. Conference @id lives on www so the
// subEvent's superEvent back-reference stays on the canonical host.
const NBL_CONFERENCE_ID = 'https://www.darrenlbuckner.com/speaking#nbl-2026'

const NBL_EVENT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  '@id': NBL_CONFERENCE_ID,
  name: '126th National Business League Conference',
  startDate: '2026-08-19',
  endDate: '2026-08-22',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  url: 'https://nationalbusinessleague.org/conference',
  location: {
    '@type': 'Place',
    name: 'Hilton Atlanta Hotel',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Atlanta',
      addressRegion: 'GA',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'The National Business League',
    foundingDate: '1900',
    url: 'https://nationalbusinessleague.org',
  },
  performer: { '@type': 'Person', '@id': PERSON_ID },
  subEvent: {
    '@type': 'Event',
    '@id': 'https://www.darrenlbuckner.com/speaking#nbl-2026-project-2035',
    name: 'The Future Is Already Here: How One Veteran Built the Zillow of the Global South with AI — For Under $200 a Month',
    startDate: '2026-08-21',
    endDate: '2026-08-22',
    superEvent: { '@id': NBL_CONFERENCE_ID },
    performer: { '@type': 'Person', '@id': PERSON_ID },
    description:
      'Featured Speaker session in Project 2035: The National Economic Sovereignty Think Tank, on building a multi-country real estate platform with AI as the only development team for under $200 a month.',
  },
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

        {/* Speaker bio */}
        <div className="mt-12 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">
            Speaker Bio
          </p>
          <p className="leading-relaxed">
            Darren L. Buckner is an American entrepreneur, Army veteran, and
            self-taught technologist who built Portal Home Hub — a global real
            estate platform serving the Caribbean, Africa, and Latin America.
            Born in North St. Louis, Missouri, he served in the U.S. Army from
            1989 to 1995 before spending decades in construction, real estate,
            and technology. He used AI tools including Claude and ChatGPT to
            teach himself full-stack development and build production platforms
            from scratch.
          </p>
        </div>

        {/* Speaking formats */}
        <div className="mt-16">
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Formats
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {formats.map((f) => (
              <div
                key={f.label}
                className="rounded-lg border border-border bg-surface p-4 text-center"
              >
                <p className="font-semibold">{f.label}</p>
                <p className="mt-1 text-xs text-muted">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* National Business League Conference 2026 — National Speaker credential */}
        <div className="mt-16 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(NBL_EVENT_JSONLD) }}
          />
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Featured Engagement
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            National Business League Conference 2026
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 leading-relaxed">
            <p>
              Darren L. Buckner is a confirmed National Speaker at the 126th
              National Business League Conference, August 19–22, 2026, at the
              Hilton Atlanta Hotel in Atlanta, Georgia. He was selected from 643
              applications.
            </p>
            <p>
              He also serves as a Featured Speaker in Project 2035: The National
              Economic Sovereignty Think Tank, August 21–22, 2026.
            </p>
            <p className="font-semibold text-foreground">
              Session: The Future Is Already Here — How One Veteran Built the
              Zillow of the Global South with AI, For Under $200 a Month
            </p>
            <p className="text-muted">
              Building technology is no longer limited to people with a
              technical background or a large budget. Darren built a
              multi-country real estate platform in seven months, using AI as
              his only development team, for under $200 a month. The session
              covers how that was done, and what it means for founders building
              in markets the industry has written off.
            </p>
            <p className="text-muted">
              Founded in 1900 by Booker T. Washington and headquartered in
              Tuskegee, Alabama, the National Business League is the oldest Black
              business organization in the United States. The 126th Conference is
              hosted by the National Alliance for Black Business, in partnership
              with the World Conference of Mayors and the National Black Chamber
              of Commerce, and sponsored by Traffic Sales &amp; Profit.
            </p>
          </div>
        </div>

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

        {/* Booking logistics */}
        <div className="mt-16 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-4">Booking Information</h2>
          <div className="grid gap-6 sm:grid-cols-2 text-sm">
            <div>
              <p className="font-medium text-accent">Availability</p>
              <p className="mt-1 text-muted">
                Virtual and in-person engagements. U.S.-based &mdash; available
                to travel domestically and internationally.
              </p>
            </div>
            <div>
              <p className="font-medium text-accent">Lead Time</p>
              <p className="mt-1 text-muted">
                4–6 weeks preferred for in-person events. Virtual engagements
                can be accommodated with shorter notice.
              </p>
            </div>
            <div>
              <p className="font-medium text-accent">Technical Requirements</p>
              <p className="mt-1 text-muted">
                Lapel or handheld microphone, HDMI connection for slides,
                confidence monitor if available.
              </p>
            </div>
            <div>
              <p className="font-medium text-accent">Fees</p>
              <p className="mt-1 text-muted">
                Speaking fees vary by event type, audience size, and format.
                Submit an inquiry below for a custom quote.
              </p>
            </div>
          </div>
        </div>

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
