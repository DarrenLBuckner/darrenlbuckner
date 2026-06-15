import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

// Four LinkedIn articles consolidated onto /insights. Bodies are the corrected
// versions from the editorial brief (NOT the raw LinkedIn text). Subheads use
// the **bold** convention the renderer understands (approach A). Editorial
// "Corrections applied" notes are intentionally excluded from `content`.
//
// NOTE: `taught-myself-to-code-at-52` (article #4) was dropped per Darren —
// it substantially duplicates the live `built-global-platform-7-months` post.

const article1 = String.raw`I've spent the last two years studying emerging real estate markets — not from a desk, but from the ground. I built a platform for them. And one pattern keeps showing up everywhere I look: the markets that win next won't be the ones that build the most. They'll be the ones that connect first.

In the Caribbean and Latin America, that moment is now. And right now, the region is fragmented.

**The Problem Is Familiar**

Every island, every country, every territory operates in isolation. Real estate professionals in Guyana don't communicate with professionals in Trinidad. Agents in Jamaica aren't plugged into what's happening in Barbados. Diaspora buyers in New York City — the same buyers sending remittances across multiple Caribbean markets simultaneously — have no single trusted platform to search, compare, and transact across the region they love.

The result is what I call the chaos economy. Facebook Marketplace. WhatsApp groups. Handwritten signs. Unverified agents. No standardized listings. No price transparency. No trust infrastructure.

This is not a small problem. The Caribbean diaspora — concentrated in New York, Toronto, London, and South Florida — collectively holds billions in untapped investment intent. They want to own property back home. They are afraid to. Not because they lack capital. Because they lack confidence in the systems.

**Guyana Is Moving First**

When I launched Guyana HomeHub in January 2026, I wasn't just building a listing site. I was building the first layer of infrastructure that the market never had: verified agents, structured listings, diaspora-facing search, and a platform built to serve buyers who've never set foot inside a Georgetown real estate office.

Guyana is the proof of concept. Oil money is reshaping property values faster than any other market in the Western Hemisphere. Guyana's GDP grew 62% in 2022 — the highest in the world — and has averaged 47% a year since, according to the IMF. A generation of diaspora buyers — children and grandchildren of people who left for a better life — are watching their homeland transform in real time. They want in. They need a trusted front door.

In less than six months: 42+ verified agents. 155+ active listings. Live on iOS and Android. This isn't a startup metric. It's market validation.

**But Guyana Was Never The Destination. It Was The Blueprint.**

Portal HomeHub was designed from day one as regional infrastructure, not a single-market app. One codebase. One database. 51 domains secured across Latin America, the Caribbean, Africa, and Asia. Launching a new territory requires one database row — not a new company, not a new codebase, not a new team.

That architecture is the point. Because what the Caribbean needs isn't 30 separate real estate platforms for 30 separate markets. It needs one trusted regional system — with local operators running each market, local professionals credentialed to a shared standard, and diaspora buyers able to search across territories the same way they search across neighborhoods.

**The Education Layer Is the Missing Piece**

Here's what I've learned that most PropTech builders miss: you can build the best platform in the world and it means nothing if the professionals using it aren't trusted.

In Guyana, approximately 90% of agents are unlicensed. Not because they aren't serious — because the licensing infrastructure takes six or more years and was never designed for people trying to build careers. The same pattern repeats across the Caribbean and into Africa. The platform without the professional standard is still chaos, just digitized chaos.

This is why the next phase of what I'm building isn't just technology. It's ecosystem. Verified agents. Standardized credentials. Education pipelines. Licensing standards built into the platform's trust layer. When a buyer in Toronto searches for a property in Georgetown on Guyana HomeHub, they should know that the agent behind that listing has been reviewed, trained, and held to a professional standard that exists nowhere else in the market.

That's the competitive moat that no competitor can copy quickly. Anyone can build a listing site. No one else is building the infrastructure of trust underneath it.

**What Regional Integration Actually Looks Like**

The Caribbean doesn't need to wait for governments to coordinate. The infrastructure can move faster than policy. When agents in Guyana, Jamaica, Trinidad, and Barbados are all operating on the same platform — with the same verification standards, the same listing structure, the same diaspora-facing search — they are already integrated, whether or not there's a regional trade agreement to support it.

This is the same lesson East Africa is teaching right now. Kenya, Rwanda, Uganda, and Tanzania didn't wait for perfect coordination. They built. They connected. And investor confidence followed. The Caribbean has every advantage East Africa has — a large, established diaspora with capital, emotional motivation to invest at home, and underserved markets with real demand. What it's been missing is someone willing to build the connective layer.

**Why This Matters Beyond Real Estate**

I'm a U.S. Army veteran. I'm a US entrepreneur with Guyanese family roots and 51 domains secured across the Global South. I didn't build Portal HomeHub because it was the easiest thing to build. I built it because I looked at these markets — markets that Zillow and CoStar and every major PropTech player walked past — and I saw not a gap, but a category.

The Zillow of the Global South doesn't exist yet. It's being built right now, starting in Guyana, expanding across the Caribbean, and ultimately serving markets across Latin America and Africa that have been waiting for this infrastructure for decades.

Integration isn't a feature. It's the product. And the Caribbean is ready for it.

---

*Darren L. Buckner is the founder of Portal HomeHub and Guyana HomeHub — the first verified real estate search platform built for Guyana and the Caribbean diaspora.*

*guyanahomehub.com | portalhomehub.com*`

const article2 = String.raw`On Friday morning, May 22, 2026, 42 people sat down at the Centre for Local Business Development in Georgetown to talk honestly about where Guyana real estate is going. Bankers. Attorneys. Agents. Government. Buyers. Sellers. People who have been in this industry for twenty years, and people who closed their first deal last month.

The event was called Real Estate Forward: Guyana 2026 & Beyond. It was organized by Sherriann Elcock and pulled together speakers from the Guyana Association of Real Estate Professionals (GAREP), the Guyana Revenue Authority, Republic Bank, GBTI, and the legal community. I sat in that room as a founder and as a listener, and I left with one line stuck in my head.

It came from Nicola Duggan, BSc., Director of GAREP. She said: the world is watching Guyana to see if its growth is managed with integrity.

That is not a soft statement. That is a thesis. And every other thing that happened in that room over the next four hours either supported it or tested it.

**Professionalism is no longer optional**

Nicola spent her keynote making one argument: an agent's reputation is the agent's brand. Licensing, due diligence, and professional standards are not bureaucratic boxes to tick. They are what determines whether Guyana ends up with a real estate industry investors trust or one they avoid.

This matters because the Guyana market is no longer just local. Oil and gas money is here. Diaspora capital from New York, Toronto, London and Miami is here. Multinational companies are setting up offices and bringing executives who need housing. Every one of those buyers is going to check whether the person selling them a property is licensed, registered, and accountable. If the answer is no, they will not just walk away from one deal. They will walk away from Guyana.

GAREP is not a polite suggestion. It is the industry's first real attempt to create accountability that holds. The agents in that room understood it. The question is whether the rest of the market does.

**The government showed up**

Representatives from the Guyana Revenue Authority (GRA) spent nearly an hour walking the room through the legal and tax realities of practicing real estate in Guyana. Licensing requirements. Income tax. Withholding tax. VAT obligations. The duty agents have to inform their clients about what they actually owe.

This was not theatre. The GRA was answering specific questions from working agents about how to stay compliant in a market that, until recently, mostly operated on handshakes and WhatsApp screenshots. That the GRA accepted the invitation and showed up to engage publicly is itself a signal: the regulator is paying attention, and the rules are going to be enforced.

For anyone who has been treating real estate in Guyana as an off-the-books side hustle, the message that morning was clear. That window is closing.

**The lawyer told some scary stories — and she was right to**

Attorney Tiffany Durant gave the room something it needed: real cases. Properties sold by people who did not actually own them. Titles that did not match the land. Buyers who handed over money before any verification happened, and lost it.

Her point was not to scare people away from the market. It was to make sure agents understood that the groundwork — title verification, ownership confirmation, paperwork done properly — is the agent's responsibility, not an optional service. If the agent does not do it, the buyer pays. And when the buyer pays, the agent's reputation, the firm's reputation, and the country's reputation all pay along with them.

This is the integrity Nicola was talking about. It does not live in policy documents. It lives in whether the agent on the ground does the work before the sale, every time.

**The banks said mortgages are not as hard as you think**

This was the section of the day that surprised me most. Representatives Clinton Robertson from Republic Bank and Saeed Jameil of Guyana Bank for Trade and Industry (GBTI) sat in front of the room and actively debunked the idea that getting a mortgage in Guyana is a brick wall.

Republic Bank walked through a product called Mortgage Move, designed to make it easier for buyers to refinance and for new buyers to acquire property. GBTI laid out the actual process — what is required, what is not, where the real friction is and where it is not. Both banks took heavy questions from the floor and answered them in plain language.

The takeaway: financing is more available than most Guyanese assume, and the banks are actively trying to compete for the business. The bottleneck is not the bank. The bottleneck is information. People do not know what is available, and the agents are not always equipped to explain it.

Closing that information gap is one of the highest-leverage things the industry can do this year.

**Technology is closing the chaos gap**

I will be brief here because this article is not about my company. But I will say this: for years, the Guyana real estate market has run on WhatsApp groups, Facebook posts, and the same listing being passed between five agents who all think they have the exclusive. Photos get stolen. Properties get duplicated. Buyers get confused. Sellers get frustrated. And serious capital, the kind that could be building this country, hesitates.

We built Guyana HomeHub to solve exactly that problem. A single platform where listings are verified, agents are accountable, and the chaos does not survive contact with the system. As I spoke at the event, Alphius Bookie sat at a laptop behind me adding new listings to the platform live, in front of the room. That is what the operation looks like.

The technology is not the story. The story is that the industry is finally professionalizing fast enough to need it.

**Where Guyana goes from here**

Sherriann Elcock closed the forum with a line that stayed with me: value your professional time, apply what you learned, and grow together as a compliant industry. That is the whole game.

Guyana has every ingredient to build a serious real estate market: oil revenue, diaspora capital, a young workforce, banks ready to lend, regulators paying attention, and an association in GAREP that is trying to set the bar where it should be. What it does not have, yet, is an industry that consistently operates at the level the moment requires.

The forty-two people in that room are part of how that changes. They showed up. They asked hard questions. They listened to the GRA and the lawyers and the banks. They are the ones who will set the standard for the next forty-two, and the four hundred and twenty after that.

The world is watching. Nicola was right about that. The next twelve months will decide what they end up writing about Guyana.

---

*Darren L. Buckner is the founder of Portal HomeHub and Guyana HomeHub.*

*guyanahomehub.com | portalhomehub.com*`

const article3 = String.raw`His name is Qumar. He runs Beyond the Boundary Real Estate in Georgetown, Guyana. He's 25 years old. He played cricket at the youth level for Guyana and the West Indies before he ever sold a house. And he's one of the few real estate agents in Guyana operating with a full license.

That last part is the one I want you to sit with for a second.

I've been on the ground in Guyana. I've talked to agents, attorneys, buyers, and sellers — locals and diaspora. From what I see operating in the market, most agents don't carry a license. They're working off Facebook Marketplace, WhatsApp groups, and word of mouth. Some of them are good people doing honest work. Some of them are not.

The diaspora can't tell which is which from a screenshot.

**What Qumar told me about the wire transfer**

I asked him about fraud. Not theoretical fraud. Real fraud. The kind of thing diaspora buyers in Brooklyn and Toronto and London worry about at 2 a.m. when they're sending money to a country they haven't lived in for twenty years.

He didn't hedge. He told me about a buyer who was interested in a property. Someone tried to forge a wire transfer — claimed they sent the funds, never did. Qumar caught it because Qumar is licensed, registered with the Guyana Revenue Authority, and works with attorneys on every transaction.

Then he said something that stopped me.

"Let's say, for instance, you might have a matter that ends up in the court, or whatever it is, but you're not licensed. You basically lost the case already. Because you're not licensed to do real estate."

Read that again. If your agent in Guyana isn't licensed and something goes wrong, you've already lost. You didn't even walk in the courtroom yet. You've already lost.

That's what diaspora buyers are walking into when they hand money to a stranger on Facebook.

**Why I built Guyana HomeHub**

My wife Rochelle is Guyanese. Her late father, Milton Pydana, was a West Indies cricketer, a legend of Guyanese cricket. Family is the reason Guyana was the first market for Portal HomeHub. Not market analysis. A family conversation that turned into a founding decision.

But the why I kept building? That came from listening.

Buyers in the diaspora kept telling me the same story. They want to invest back home. They want to buy property for their parents. They want a piece of the country that made them. And they don't know who to trust. They send money and pray. They get screenshots and pray. They fly down with cash and pray.

Praying is not infrastructure.

Guyana HomeHub is the trust layer. Every agent on the platform is verified. Every listing is in one place — searchable, reviewable, and not buried under Facebook chaos. When a diaspora buyer clicks on Qumar's profile, they see a licensed agent, a registered company, and a real human being who has accountability to the Guyana Revenue Authority and to the platform.

That's what Qumar said when I asked him why he came on board:

"I think this is something that the Guyanese people have been waiting for a long time. Both the realtors and the clients, because I have a lot of clients that would search for properties on Facebook and go through the whole hassle. Now you can be able to see all the listings in one place."

**What this means if you're in the diaspora**

If you're sending money to Guyana — or thinking about it — three things from this conversation:

One. Ask if your agent is licensed. Not whether they're "the best in the business." Not whether your cousin knows them. Whether they hold a real estate license registered with the Guyana Revenue Authority. If they don't, and the deal goes sideways, you have no court that will help you.

Two. Use a system that vets agents before you do. That's the entire point of what we built at Guyana HomeHub. Every agent on our platform is verified. You don't have to investigate them yourself. We already did.

Three. Use an attorney. Qumar said it. The attorney we interviewed earlier this year — Tiffany Durant — said it. Every transaction in Guyana that involves real money should have a licensed attorney protecting you. Not after something goes wrong. Before.

**If you want to talk to Qumar**

He gave me his WhatsApp on camera and said diaspora buyers can reach him directly:

WhatsApp: +592-705-9857

He's a licensed agent. Beyond the Boundary Real Estate. Georgetown, Guyana. Tell him I sent you.

**The bigger picture**

Guyana is the first deployment. Portal HomeHub — the platform underneath Guyana HomeHub — is built to do this same thing across the Caribbean, Africa, and Latin America. The Zillow of the Global South. Built by a U.S. Army veteran from Greater St. Louis with AI tools as the only development team. Co-founded with my wife at PivotPoint AI. Designed for the next billion homeowners in markets the rest of the world has overlooked for thirty years.

They deserve better than Facebook chaos.

Somebody had to build it. So we did.

---

*Darren L. Buckner — Founder & CEO, Portal HomeHub*

*Greater St. Louis, Missouri · U.S. Army Veteran*

*guyanahomehub.com | portalhomehub.com*`

const posts = [
  {
    slug: 'caribbean-real-estate-integration',
    title:
      "The Caribbean's Next Real Estate Advantage Is Integration. Guyana Is Moving First.",
    excerpt:
      "Every island, every territory operates in isolation. The markets that win next won't be the ones that build the most. They'll be the ones that connect first.",
    content: article1.trim(),
    published_date: '2026-06-14',
    is_published: true,
    read_time: '6 min read',
  },
  {
    slug: 'world-is-watching-guyana',
    title:
      'The World Is Watching Guyana. Here Is What 42 People in a Room Told Me About 2026.',
    excerpt:
      "Bankers, attorneys, agents, regulators — 42 people sat down in Georgetown to talk honestly about where Guyana real estate is going. Here's what they told me.",
    content: article2.trim(),
    published_date: '2026-05-24',
    is_published: true,
    read_time: '6 min read',
  },
  {
    slug: 'licensed-agent-diaspora-guyana',
    title:
      'I Sat Down With a Licensed Real Estate Agent in Guyana. He Told Me Something Diaspora Buyers Need to Hear.',
    excerpt:
      "A licensed agent in Georgetown told me something every diaspora buyer sending money home needs to hear: if your agent isn't licensed and the deal goes wrong, you've already lost.",
    content: article3.trim(),
    published_date: '2026-05-05',
    is_published: true,
    read_time: '5 min read',
  },
]

for (const post of posts) {
  const { data, error } = await supabase
    .from('insights')
    .upsert(post, { onConflict: 'slug' })
    .select('slug, title, is_published, published_date, read_time')
    .single()

  if (error) {
    console.error(`upsert failed for ${post.slug}:`, error)
    process.exit(1)
  }

  console.log(
    `upserted: ${data.slug} — published=${data.is_published} on ${data.published_date} (${data.read_time})`
  )
}

console.log('\nDone. Seeded ' + posts.length + ' articles.')
