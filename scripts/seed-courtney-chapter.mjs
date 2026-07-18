// Courtney chapter + factual corrections for /story (story_blocks).
//
// Idempotent. Safe to re-run: content edits are applied via exact-substring
// replacement guarded by assertions (they no-op once already applied and abort
// if the source copy has drifted), and the new tribute row upserts on a fixed
// id. No DDL, no new columns, no other rows touched.
//
// Run:  node --env-file=.env.local scripts/seed-courtney-chapter.mjs

import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supabase = createClient(url, key)

// Row ids (from Phase 1 audit)
const ID_DARLENE = 'a9d31351-738c-426a-aaba-a1f1ebbf28f6' // north_stl w6
const ID_COURTNEY_EXISTING = '3bd48879-64ff-4fe3-83f4-da7846071648' // global w10
const ID_CANONICAL = '504c7c38-b3c6-4c1a-b0d5-54693cd0e5a2' // global w13 -> w15
const ID_NEW = 'b7c3f1a4-2d6e-4f8b-9a1c-5e2d8b4a6c90' // new global w14

// --- exact-substring replace with idempotency + drift guard ---
function replaceOnce(content, oldStr, newStr, label) {
  if (content.includes(oldStr)) {
    const next = content.replace(oldStr, newStr)
    if (next.includes(oldStr)) throw new Error(`[${label}] oldStr still present after replace`)
    return next
  }
  if (content.includes(newStr) && newStr.length > 0) {
    console.log(`  [${label}] already applied — no-op`)
    return content
  }
  throw new Error(`[${label}] neither old nor new substring found — copy drift, aborting`)
}
// removal variant: succeeds if the removed marker is gone
function removeOnce(content, oldStr, absentMarker, label) {
  if (content.includes(oldStr)) return content.replace(oldStr, '')
  if (!content.includes(absentMarker)) {
    console.log(`  [${label}] already applied — no-op`)
    return content
  }
  throw new Error(`[${label}] target present but exact substring not matched — copy drift, aborting`)
}

async function fetchOne(id) {
  const { data, error } = await supabase
    .from('story_blocks')
    .select('id, title, era, weight, content')
    .eq('id', id)
    .single()
  if (error) throw new Error(`fetch ${id} failed: ${error.message}`)
  return data
}

async function updateFields(id, fields) {
  const { error } = await supabase.from('story_blocks').update(fields).eq('id', id)
  if (error) throw new Error(`update ${id} failed: ${error.message}`)
}

// ---------- Correction A: Darlene death year 2025 -> 2026 ----------
{
  const row = await fetchOne(ID_DARLENE)
  const next = replaceOnce(
    row.content,
    'She passed on February 4, 2025.',
    'She passed on February 4, 2026.',
    'Correction A (Darlene 2025->2026)'
  )
  if (next !== row.content) await updateFields(ID_DARLENE, { content: next })
}

// ---------- Correction B: existing Courtney block ----------
{
  const row = await fetchOne(ID_COURTNEY_EXISTING)
  let next = replaceOnce(
    row.content,
    'In 2023 he was diagnosed with multiple myeloma.',
    'In 2022 he was diagnosed with multiple myeloma.',
    'Correction B1 (diagnosis 2023->2022)'
  )
  next = removeOnce(
    next,
    ' It is 2025. Courtney is still fighting. Darren is still here.',
    'Courtney is still fighting',
    'Correction B2 (remove present-tense trio)'
  )
  if (next !== row.content) await updateFields(ID_COURTNEY_EXISTING, { content: next })
}

// ---------- (A) reweight: Canonical Reference 13 -> 15 ----------
await updateFields(ID_CANONICAL, { weight: 15 })

// ---------- Correction C: new Courtney tribute block (verbatim) ----------
const tributeParagraphs = [
  `I handed my brother his first hammer in Detroit. He was nineteen. We worked side by side for more than twenty years — Detroit to Atlanta, site to site. Courtney wasn't help. He was my brother.`,
  `They diagnosed him with multiple myeloma in 2022. When it got bad, I brought him to St. Louis to be near family. We worked properties together. He lived with me in a house we'd fixed up.`,
  `Then his body started taking it back. Two years of wheelchairs, walkers, physical therapy — him fighting to get up out of that chair. He couldn't build with me anymore. So we switched. When our mother's house caught fire, Courtney ran the paperwork and I ran the site, and together we put her house back together. She lived in it four months before she passed, in February 2026.`,
  `Five months later, my brother went back into the hospital.`,
  `The last time I saw him, I was leaving for Guyana — the Building Expo. He gave me a fist bump. He told me I'd done everything I could do. That I wasn't a doctor. That there was nothing left to fix. Then he said the thing only he would know to say: "You got people depending on you." The agents. The volunteers. Everybody who feeds a family through something I built. "I'm out. You got people depending on you. Go ahead, man."`,
  `He said he'd try to be here when I got back. He said he loved me.`,
  `I was in Guyana when he passed. June 27, 2026. I didn't go to that Expo for the credential. I went because Courtney Jamal Buckner gave me a fist bump and told me to go.`,
]
const tributeContent = tributeParagraphs.join('\n\n')

const newBlock = {
  id: ID_NEW,
  title: "You've Done Everything You Can Do",
  content: tributeContent,
  era: 'global',
  weight: 14,
  themes: ['family', 'loss', 'legacy'],
  audience_fit: ['press_interview', 'radio_interview', 'speaking_bureau'],
  tone: 'raw',
  is_public: true,
}

{
  const { error } = await supabase
    .from('story_blocks')
    .upsert(newBlock, { onConflict: 'id' })
  if (error) throw new Error(`upsert new block failed: ${error.message}`)
}

// ---------- verification dump ----------
console.log('\n=== POST-CHANGE VERIFICATION ===')
for (const id of [ID_DARLENE, ID_COURTNEY_EXISTING, ID_CANONICAL, ID_NEW]) {
  const r = await fetchOne(id)
  console.log(`\n--- id=${r.id} | era=${r.era} | weight=${r.weight} | ${JSON.stringify(r.title)} ---`)
  console.log(r.content)
}
console.log('\nDone.')
