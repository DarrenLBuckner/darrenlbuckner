import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

// Raw content with hard-wrapped lines as authored. Normalize blank-line
// separated blocks so each paragraph becomes a single flowing line.
const rawContent = String.raw`It started with a meeting.

My business partner Qumar looked at me and said we need something like this. A platform. A real one. Something that could do for the Caribbean what Zillow did for America.

I went out and found developers. Got quotes. And when they told me what it would cost, I said the same thing out loud that I was thinking inside — I could get a degree or a certification for less than that.

So I went home and opened ChatGPT.

My first question was simple: "If I wanted to build a website like Zillow, could you help me?"

It said yes.

That was May 2025.

---

**What the next seven months actually looked like**

I do construction. I own rental properties. I have a life outside of a screen.

So my days looked like this — go handle the real world, come home, sit down, and build.

It started downstairs in the living room. Then I got too busy and put a small desk in the bedroom. Just me and the glow of a laptop. My wife waking up at 2am saying "Babe, you're not in bed yet?"

The tools cost about $220 a month. Some months more. GitHub Copilot. ChatGPT $20. Claude Max $200. A few others I tried along the way just to see what would work.

But here's what I want you to hear — it was never about the money. It was about the time. The dedication. Showing up every night when I was tired and didn't know what I was doing and doing it anyway.

Because I didn't know what I was doing. I want to be clear about that. I messed up constantly. It was crazy how many times I had to start over.

---

**The night I destroyed everything**

July. Three months in.

I had been building what was then called Caribbean HomeHub. Three months of work. Nights, weekends, construction jobs during the day and code at night.

And I destroyed it.

Not a small bug. Not a broken feature. I mean I wiped it out. Three months of work gone over a weekend.

Most people would have stopped there. And honestly — I did stop.

I spent two weeks trying to salvage it. Going back through old files, old projects, old chat histories, trying to piece it back together. It wouldn't come back. I had literally broken it beyond repair.

So I stopped completely. Didn't touch the computer for another two weeks. Didn't even look at it. I was that pissed. Four weeks total — two trying to fix the unfixable, two just sitting with the fact that I had destroyed three months of work with my own hands.

Then I started over. From scratch. With everything I had learned from the version I just killed.

That version was better.

---

**What I actually built**

By December 2025 — seven months after that first ChatGPT conversation — Guyana HomeHub was live. The first digital real estate platform in Guyana. Verified listings. Trusted agents. Secure transactions. Live in 177 countries.

Portal HomeHub — the platform powering it — now has 51 markets secured across the Caribbean, Latin America, and Africa.

No co-founder. No dev agency. No venture capital.

Just AI tools, a bedroom desk, and a lot of late nights.

---

**What I'd tell a 55 year old who thinks they can't build**

They're right.

If you believe you can't — I agree with you. You can't. I'm not going to try to convince you otherwise.

But here's what I'll say about the 25 year old who thinks they can't do it either. My wife tells my son the same thing every time he comes back saying he doesn't know something. She shuts it down immediately. She says — you grew up in an age where everything is in your back pocket. You can pull the answer to anything out of thin air in 30 seconds. If you say you can't do something now, that's completely on you. No excuses left.

And she's right.

You can be 25 with every tool in the world at your fingertips and still can't build because you decided you couldn't.

Or you can be 54, sitting at a bedroom desk at 2am, and build a global platform — because your father's voice is still in your head saying:

*You got two arms. Two legs. Two eyes. A nose you can breathe out of. Your health. Your brain. You can think.*

*Then why the hell can't you do it?*

Age is not the variable. Mindset is the only variable. Always has been.

---

*Darren L. Buckner is the Founder & CEO of Portal HomeHub — building real estate infrastructure for the Caribbean, Latin America, and Africa. Learn more at darrenlbuckner.com*`

// Normalize: split on blank lines to get blocks. Each block is either a
// horizontal rule (---), a bold header, an italic paragraph, or prose.
// Store as-is (already normalized by virtue of the raw string literal above
// having one line per block).
const content = rawContent.trim()

const post = {
  slug: 'built-global-platform-7-months',
  title:
    "I Built a Global Real Estate Platform in 7 Months. Here's Exactly How I Did It.",
  excerpt:
    'No co-founder. No dev agency. No venture capital. Just AI tools, a bedroom desk, and a lot of late nights.',
  content,
  published_date: '2026-04-15',
  is_published: true,
  read_time: '5 min read',
}

const { data, error } = await supabase
  .from('insights')
  .upsert(post, { onConflict: 'slug' })
  .select('slug, title, is_published, published_date')
  .single()

if (error) {
  console.error('upsert failed:', error)
  process.exit(1)
}

console.log(`upserted: ${data.slug} — ${data.title}`)
console.log(`published=${data.is_published} on ${data.published_date}`)
