import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(url, key)

const { data: sb } = await supabase
  .from('story_blocks')
  .select('*')
  .order('era')
  .order('weight')

const wanted = sb.filter(r =>
  (r.era === 'detroit') ||
  (r.era === 'la' && r.weight === 4) ||
  (r.era === 'atlanta' && r.weight === 5) ||
  (r.era === 'global' && [6, 7, 8, 9].includes(r.weight)) ||
  (r.content || '').toLowerCase().includes('sorilbran')
)

for (const r of wanted) {
  console.log(`\n=== [${r.era}] w=${r.weight} "${r.title}" (id=${r.id}) ===`)
  console.log(r.content)
}

console.log('\n=== blocks mentioning Sorilbran ===')
for (const r of sb.filter(r => (r.content || '').toLowerCase().includes('sorilbran'))) {
  console.log(`  [${r.era}] w=${r.weight} "${r.title}"`)
}
