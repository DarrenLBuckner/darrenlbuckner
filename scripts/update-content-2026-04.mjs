import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(url, key)

async function getBlock(era, weight) {
  const { data, error } = await supabase
    .from('story_blocks')
    .select('*')
    .eq('era', era)
    .eq('weight', weight)
    .single()
  if (error) throw new Error(`getBlock ${era}/${weight}: ${error.message}`)
  return data
}

async function updateBlock(id, fields) {
  const { error } = await supabase
    .from('story_blocks')
    .update(fields)
    .eq('id', id)
  if (error) throw new Error(`updateBlock ${id}: ${error.message}`)
}

async function ensureBlock(row) {
  const { data: existing } = await supabase
    .from('story_blocks')
    .select('id')
    .eq('era', row.era)
    .eq('title', row.title)
    .maybeSingle()
  if (existing) {
    await updateBlock(existing.id, row)
    return { id: existing.id, action: 'updated' }
  }
  const { data, error } = await supabase
    .from('story_blocks')
    .insert(row)
    .select('id')
    .single()
  if (error) throw new Error(`insert ${row.era}/${row.title}: ${error.message}`)
  return { id: data.id, action: 'inserted' }
}

// --- Story blocks: updates to existing rows ------------------------------

// detroit w=1: add daughters sentence; remove standalone Sorilbran reference
const detroit1 = await getBlock('detroit', 1)
const detroit1New = `Detroit in the late 1990s was a city under pressure — economically strained, full of overlooked neighborhoods, and filled with properties most people avoided. For Darren, that was not a deterrent. It was signal. He arrived with a young family, limited resources, and no interest in staying dependent on anyone else for long. His daughters Selena and Kira were young. He was building for them before he knew what he was building. He took two jobs simultaneously: Frito-Lay on early morning shifts, Time Warner Cable on day shifts. One car between them, and she needed it. So Darren adapted — he started taking the work van home after hours. Stack income. Create options. Move forward.`
await updateBlock(detroit1.id, { content: detroit1New })
console.log('updated detroit w=1')

// la w=4: rename title, minimize Sorilbran references
const la4 = await getBlock('la', 4)
const la4NewTitle = "Family — Selena's Arrival"
const la4NewContent = `In California, Darren met Sorilbran, the mother of his two daughters. His first daughter Selena was born there — and every decision after that carried weight beyond him. Over the following years the family grew to include a second daughter, Kira. By 2009 the marriage had ended — no collapse, no prolonged conflict, just a transition handled with clarity. Darren stayed connected through what mattered most: his daughters.`
await updateBlock(la4.id, { title: la4NewTitle, content: la4NewContent })
console.log('updated la w=4')

// global w=6: append Selena/Kira/Malcolm sentences
const global6 = await getBlock('global', 6)
const global6Append = `\n\nSelena, his eldest daughter and U.S. Air Force veteran, is the planned operator for Colombia HomeHub — the next Portal HomeHub territory launch. Kira, his younger daughter, co-founded Odori (odori.io) — the first professional networking platform built for the global dance industry. Malcolm, his son, is already in Johannesburg and already sharing the platform.`
if (!global6.content.includes('Colombia HomeHub')) {
  await updateBlock(global6.id, { content: global6.content + global6Append })
  console.log('updated global w=6')
} else {
  console.log('global w=6 already has appended content, skipping')
}

// global w=9 (Malcolm): fix TikTok handle
const global9 = await getBlock('global', 9)
if (global9.content.includes('@malfrfr')) {
  const fixed = global9.content.replace(/@malfrfr/g, '@mal_be_trippin')
  await updateBlock(global9.id, { content: fixed })
  console.log('updated global w=9 (Malcolm TikTok handle)')
} else {
  console.log('global w=9 Malcolm handle already correct, skipping')
}

// --- Story blocks: new rows ----------------------------------------------

// atlanta w=6: Pydana Collection block
const pydanaBlock = await ensureBlock({
  era: 'atlanta',
  weight: 6,
  title: 'Pydana Collection — Science Meets Heritage',
  content:
    "In Georgia, Rochelle launched Pydana Collection — a consumer brand she built by applying her Laboratory Science degree from Michigan State University. She didn't follow a trend. She followed her training.",
  themes: ['family', 'ventures'],
  audience_fit: ['founder_story'],
  tone: 'factual',
  is_public: true,
})
console.log(`pydana block ${pydanaBlock.action}`)

// guyana_connection era
const guyanaBlock = await ensureBlock({
  era: 'guyana_connection',
  weight: 1,
  title: 'The Guyana Connection',
  content:
    'Rochelle is Guyanese. Her late father, Milton Pydana, was a West Indies cricketer and a legend of Guyanese cricket. That personal connection — family, heritage, trust — is why Guyana was the first market. Not market analysis. Not a spreadsheet. A family dinner conversation that turned into a founding decision.',
  themes: ['guyana', 'family', 'origin'],
  audience_fit: ['founder_story'],
  tone: 'factual',
  is_public: true,
})
console.log(`guyana_connection block ${guyanaBlock.action}`)

// south_africa era
const saBlock = await ensureBlock({
  era: 'south_africa',
  weight: 1,
  title: 'The Family Is Rooted in Johannesburg',
  content:
    "The Buckner family is rooted in Johannesburg, South Africa. Darren moves where the work takes him — Guyana, St. Louis, Johannesburg. That's not instability. That's what building globally actually looks like.",
  themes: ['family', 'global'],
  audience_fit: ['founder_story'],
  tone: 'factual',
  is_public: true,
})
console.log(`south_africa block ${saBlock.action}`)

// --- Press: update Gordon Mosley row outlet -----------------------------

const { data: gordon, error: gordonErr } = await supabase
  .from('press_items')
  .select('*')
  .eq('embed_url', 'https://youtu.be/KP196IvQCfY')
  .single()
if (gordonErr) throw new Error(`find gordon mosley: ${gordonErr.message}`)

if (gordon.outlet !== 'NewsSource Guyana') {
  const { error: updErr } = await supabase
    .from('press_items')
    .update({ outlet: 'NewsSource Guyana' })
    .eq('id', gordon.id)
  if (updErr) throw new Error(`update gordon outlet: ${updErr.message}`)
  console.log('updated press_items outlet: Gordon Mosley -> NewsSource Guyana')
} else {
  console.log('press_items outlet already correct, skipping')
}

console.log('\nDONE')
