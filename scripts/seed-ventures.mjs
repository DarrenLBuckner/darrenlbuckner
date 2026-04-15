import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

const ventures = [
  {
    name: 'Portal HomeHub',
    slug: 'portal-home-hub',
    tagline: 'Building the Zillow of the Global South',
    description:
      'Portal HomeHub is the parent platform powering real estate infrastructure across the Caribbean, Latin America, and Africa. Built entirely with AI tools over 7 months with no co-founder and no dev agency.',
    url: 'https://portalhomehub.com',
    status: 'active',
    category: 'technology',
    years_active: '2025–present',
    highlight_metric: '51 markets secured',
    is_featured: true,
    display_order: 1,
  },
  {
    name: 'Guyana HomeHub',
    slug: 'guyana-home-hub',
    tagline: "Guyana's first digital real estate platform",
    description:
      'Guyana HomeHub is the flagship territory of Portal HomeHub — the first platform to bring verified property listings, trusted agents, and secure transactions to the Guyanese real estate market.',
    url: 'https://guyanahomehub.com',
    status: 'active',
    category: 'technology',
    years_active: '2025–present',
    highlight_metric: 'Live in 177 countries',
    is_featured: true,
    display_order: 2,
  },
  {
    name: 'PivotPoint AI',
    slug: 'pivotpoint-ai',
    tagline: 'AI strategy for non-technical founders',
    description:
      'PivotPoint AI helps entrepreneurs use artificial intelligence as a practical business tool — not a buzzword. Co-founded with Rochelle Pydana Buckner.',
    url: null,
    status: 'active',
    category: 'technology',
    years_active: '2024–present',
    highlight_metric: 'Co-founded with Rochelle Pydana Buckner',
    is_featured: true,
    display_order: 3,
  },
  {
    name: 'Pydana Collection',
    slug: 'pydana-collection',
    tagline: 'A brand rooted in Guyanese heritage',
    description:
      "Pydana Collection is a consumer brand founded by Rochelle Pydana Buckner, rooted in Guyanese culture and heritage. Paused during the family's relocation to Johannesburg, South Africa.",
    url: null,
    status: 'legacy',
    category: 'consumer_brand',
    years_active: '2015–2024',
    highlight_metric: 'Founded by Rochelle Pydana Buckner',
    is_featured: false,
    display_order: 4,
  },
]

const { data, error } = await supabase
  .from('ventures')
  .upsert(ventures, { onConflict: 'slug' })
  .select('slug, name, status, display_order')

if (error) {
  console.error('upsert failed:', error)
  process.exit(1)
}

console.log(`upserted ${data.length} ventures:`)
for (const row of data) {
  console.log(`  [${row.display_order}] ${row.slug.padEnd(20)} ${row.status.padEnd(8)} ${row.name}`)
}
