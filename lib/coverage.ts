import { PERSON_ID } from '@/lib/identity'

/** A hardcoded press item that carries its own JSON-LD. Used for coverage that
 *  needs machine-readable schema — a bare `press_items` row renders a card but
 *  emits nothing. Person references use PERSON_ID only; never hardcode
 *  name/description/sameAs here. */
export type CoverageItem = {
  outlet: string
  format: string
  title: string
  date: string
  url: string
  cta: string
  pullQuote?: string
  attribution?: string
  jsonLd: Record<string, unknown>
}

export const BLACKNEWS_NBL_URL =
  'https://blacknews.com/news/darren-buckner-black-army-veteran-taught-himself-how-to-code-selected-national-speaker-126th-national-business-league-conference/'

export const BLACKNEWS_NBL_HEADLINE =
  'Black Army Veteran Who Taught Himself How to Code Selected as National Speaker at 126th National Business League Conference'

// BlackNews.com feature on the NBL National Speaker selection. Placed content
// (same class as newsroom.gy) — valuable as an entity-resolution citation, never
// cited as independent for notability. Highest-weight press node of 2026.
export const NATIONAL_SPEAKER_COVERAGE: CoverageItem[] = [
  {
    outlet: 'BlackNews.com',
    format: 'Feature Article',
    title: BLACKNEWS_NBL_HEADLINE,
    date: 'August 18, 2026',
    url: BLACKNEWS_NBL_URL,
    cta: 'Read on BlackNews.com',
    pullQuote:
      "It was chaos. But chaos you control is just work nobody's done yet.",
    attribution: '— Darren L. Buckner, on building Portal HomeHub alone with AI',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: BLACKNEWS_NBL_HEADLINE,
      description:
        'BlackNews.com profiles U.S. Army veteran Darren L. Buckner, who taught himself to code with AI and built Portal HomeHub for the Global South, on his selection as a National Speaker at the 126th National Business League Conference in Atlanta.',
      datePublished: '2026-08-18',
      url: BLACKNEWS_NBL_URL,
      articleSection: 'Business',
      publisher: {
        '@type': 'Organization',
        name: 'BlackNews.com',
        url: 'https://blacknews.com',
      },
      about: [
        { '@type': 'Person', '@id': PERSON_ID },
        {
          '@type': 'Organization',
          name: 'Portal HomeHub',
          url: 'https://portalhomehub.com',
        },
        {
          '@type': 'Organization',
          name: 'PivotPoint AI',
          url: 'https://www.pivotpointai.io',
        },
        {
          '@type': 'Event',
          '@id': 'https://www.darrenlbuckner.com/speaking#nbl-2026',
        },
      ],
      mentions: [
        {
          '@type': 'Organization',
          name: 'The National Business League',
          url: 'https://nationalbusinessleague.org',
        },
        {
          '@type': 'Organization',
          name: 'Guyana HomeHub',
          url: 'https://guyanahomehub.com',
        },
      ],
    },
  },
]

/** Outlets that have covered Darren, for the "As seen in" strip. Text
 *  wordmarks — no logo files, no trademark assets to manage. */
export const AS_SEEN_IN = [
  { name: 'BlackNews.com', href: BLACKNEWS_NBL_URL },
  {
    name: 'National Business League',
    href: 'https://www.darrenlbuckner.com/speaking#nbl-2026',
  },
  {
    name: 'News Room Guyana',
    href: 'https://newsroom.gy/2026/06/11/guyana-homehub-brings-verified-property-search-to-the-international-building-expo-2026/',
  },
  { name: 'NCN Guyana', href: 'https://www.facebook.com/share/v/18UhFdmKTt/' },
  { name: 'NewsSource Guyana', href: 'https://youtu.be/KP196IvQCfY' },
  {
    name: 'Ignite Television',
    href: 'https://www.youtube.com/watch?v=fgXTgTgzOMI',
  },
]
