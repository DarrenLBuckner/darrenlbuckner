import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

// "The Real Estate Agent Problem in Guyana (And How to Spot a Scammer)".
// Formatted for the /insights renderer: ## / ### headings, "- " bullet lists,
// inline **bold** and [links]. The document's H1 title, top byline block, and
// the editorial footer (word count / channels / CTA) are intentionally
// excluded — the title and date are rendered from the row's own fields, and the
// closing byline follows the same *italic* house style as the other posts.
const content = String.raw`## The Chaos

Somewhere in New York, a Guyanese diaspora member opens Facebook. She's been saving for five years to buy a house back home—a place for her parents to live, an investment for her retirement. She finds a listing: a three-bedroom in Georgetown, $250,000, "verified" (whatever that means), photos look good. She messages the agent on WhatsApp.

The conversation feels professional. The agent sends more photos, a floor plan, a "list of documents." Over three weeks, through a tangle of time zone delays and FaceTime calls, they negotiate. She sends a deposit—$25,000—to "hold the property." The agent assures her it's held in escrow.

The property goes silent. WhatsApp messages go unanswered. When she finally reaches the actual property owner, it turns out the agent was not authorized to represent the property. The "escrow" account was the agent's personal bank account. Her deposit is gone.

This is not hypothetical. This happens in Guyana's real estate market dozens of times per month.

The facts are blunt:

- **No mandatory agent licensing** in Guyana means anyone with a WhatsApp account and a list of property photos can call themselves an agent.
- **Facebook Marketplace and private WhatsApp channels** remain the dominant transaction channels, with no verification layer and no recourse when deals go bad.
- **Diaspora buyers**, who represent a significant and growing share of Guyana's real estate demand, are the most vulnerable. They cannot visit the property in person. They depend entirely on an agent's integrity and professionalism.
- **Title disputes, fraud, and lost deposits** are common enough that experienced Guyanese investors now assume they will lose money at least once before they figure out the system.

The market has grown—Guyana's real estate sector is worth over $25 billion and growing at 20-35% annually, fueled by the oil boom, diaspora capital, and international developer interest. But the infrastructure to transact safely has not kept pace. The result is a market where **chaos is the default operating condition**, and trust is a commodity you have to hunt for.

## Why This Matters Now

Three forces are converging to make this problem urgent:

**1. Diaspora capital is flooding in.** Guyanese living in the US, Canada, and the UK are returning capital home—not always to move back, but to invest. This pool of capital is large, growing, and completely vulnerable to fraud because distance removes accountability.

**2. Institutional capital is arriving.** Oil company executives, international developers, sovereign wealth funds—they expect professional-grade real estate transactions. They will not tolerate Facebook-based deals and handshake agreements. When institutional players start avoiding the market because the friction is too high, everyone loses.

**3. The market is approaching inflection point.** At $25+ billion in size and growing faster than the economy, Guyana's real estate market is too big to stay chaotic. Professionalization is coming—either imposed by government regulation, or built by the market itself. The agents who build systems now will own the market when standards arrive. The ones who don't will be locked out.

## The Four Pillars of a Trustworthy Agent

After years of building real estate technology, including direct experience placing transactions in emerging markets, I've learned that a trustworthy agent rests on four concrete pillars. Not a vibe. Not a recommendation from a friend of a friend. Not a testimonial on their WhatsApp status. **Verifiable facts.**

### Pillar 1: Government-Issued ID

An agent should have a current, verifiable government-issued ID. This is the floor.

Why? It creates accountability. A fake name does not. A person willing to put their real identity behind their work—one that can be matched to property records, transaction history, and bank accounts—has skin in the game.

**What to ask:** "Can you provide your government-issued ID and confirm the name matches all property records and transaction documentation?"

**Red flags:**

- Reluctance to share ID
- ID does not match the name they introduce themselves with
- ID is expired or from a country where they claim no connection

### Pillar 2: Completed Transactions

An agent should be able to point to at least 2-3 **completed transactions** where they represented buyer, seller, or both. Not listings. Closed deals.

Why? Because closed deals mean contracts were signed, money moved, titles transferred, and disputes (if any) were resolved. A closed deal is evidence that an agent knows how to navigate the legal and financial complexity of a transaction from start to finish. It also means there are references—a buyer or seller who can confirm the agent delivered.

**What to ask:** "Can you provide the names of three properties you've closed in the last 24 months? I'd like to contact the buyer or seller to confirm."

**Red flags:**

- Only listings, no closed deals
- Deals that are "pending" or "almost closed" but never finalize
- Reluctance or vagueness about providing references
- References who cannot be reached or who do not confirm the transaction

### Pillar 3: Professional or Client Reference

An agent should have a professional reference—someone in banking, real estate, development, government, or law who can vouch for their competence and integrity.

Why? Because a professional reference carries weight. A banker who has processed transactions with this agent knows whether their deals close cleanly or fall apart. A lawyer who has handled their closings knows whether they understand the legal framework. A developer who has worked with them knows whether they deliver buyers who actually close.

**What to ask:** "Who is a professional reference I can contact—a banker, lawyer, or developer you've worked with?"

**Red flags:**

- No professional reference available
- Reference is a personal friend, not a professional
- Reference speaks vaguely about the agent's work
- Reference cannot be reached or declines to comment

### Pillar 4: Confirmed Active Reachability

An agent should be reachable and responsive during reasonable business hours, through multiple channels (not just WhatsApp), and should provide a physical address where they can be located.

Why? Because when something goes wrong in a transaction—a title issue, a survey discrepancy, a dispute over terms—you need to reach your agent immediately. An agent who is reachable only via WhatsApp at 11 PM and goes silent for days is not a professional. An agent without a known physical address cannot be held accountable if fraud occurs.

**What to ask:** "What are your business hours? What's your office address? How can I reach you if there's an urgent issue during a transaction?"

**Red flags:**

- Only WhatsApp communication, no phone number or email
- No physical office address
- Slow or inconsistent response times (days between messages)
- Different phone numbers or email addresses across different listings

## Beyond the Four Pillars: Structural Red Flags

Beyond the four pillars, there are structural red flags that should cause you to walk away immediately:

**Pressure to move fast.** A legitimate agent wants you to make a good decision, not a quick one. If an agent is pushing you to send money before you've done due diligence—before you've verified the title, inspected the property, hired a lawyer—they are not working in your interest.

**Requests for deposits to personal accounts.** Deposits should go into an escrow account held by a lawyer or licensed broker, not the agent's personal bank account. If an agent insists otherwise, that is fraud.

**Inconsistencies in property information.** If the price, size, or features of the property change between conversations, or if different agents represent the same property with different stories, something is wrong. Legitimate properties have consistent information across all channels.

**No written agreement.** Every transaction should begin with a signed offer, contingent on due diligence. If an agent is handling deals on handshakes and WhatsApp voice messages, they are not legitimate.

**Unwillingness to involve a lawyer.** A professional agent wants a lawyer involved in every transaction. It protects both parties. An agent who discourages legal review is a warning signal.

## What Due Diligence Looks Like (Your Checklist)

Once you have identified an agent who passes the four pillars, due diligence is your responsibility. Here is what that looks like:

### Title verification

- The property title should be registered at Guyana's Deeds Registry. Your lawyer should verify ownership, confirm no liens or mortgages, and check for any disputes.
- Unregistered properties or "customary title" properties are high-risk. Do not proceed without legal counsel.

### Physical inspection

- If you are diaspora-based, hire a local surveyor or engineer to inspect the property. This costs $500-1,000 and can save you tens of thousands in hidden defects.
- In a tropical climate, pay special attention to: roof condition, water damage, drainage, foundation settling, termite damage, and electrical systems.

### Survey verification

- The property boundaries should be surveyed by a licensed surveyor. Old or missing surveys are red flags.
- Boundary disputes with neighbors are common in Guyana. A current survey and a lawyer's title search will flag these.

### Purchase agreement

- The agreement should specify: exact property address, price, contingencies (title approval, inspection approval, financing), earnest money amount and escrow arrangement, closing date, and responsibility for taxes, utilities, and repairs before closing.
- Do not sign without a lawyer reviewing it.

### Final walkthrough

- Before money moves to close, verify the property is in the condition promised and all agreed-upon repairs have been completed.

## The Root Cause: No Accountability Layer

The underlying problem is simple: **there is no mandatory accountability layer in Guyana's real estate market.** Agents can operate without licensing, without bonding, without oversight, and without consequences for fraud.

This is changing—slowly. Guyana's government has drafted a Real Estate Agents and Brokers Bill to establish licensing standards. But legislation takes time. Until standards are law, the market will remain chaotic.

**The practical implication for you:** Do not wait for the government to solve this. Protect yourself now. Use the four pillars. Do the due diligence. Hire a lawyer. If you cannot verify all four pillars, walk away—no matter how good the property looks.

## What a Trustworthy Platform Should Look Like

Over the last few years, I've worked to build real estate infrastructure for emerging markets. One lesson is clear: **a platform's job is to be the accountability layer.** Not to make transactions faster, not to show the most listings, but to be the system that makes bad actors more expensive to operate and good actors more valuable.

A trustworthy platform should:

- **Verify agents** through the four pillars before they can represent properties
- **Require written contracts** signed digitally before money moves
- **Manage escrow** so deposits don't go to personal accounts
- **Display transaction history** so buyers know an agent's track record
- **Maintain dispute resolution** so there's recourse when things go wrong
- **Keep records clean** so every transaction is transparent and traceable

These are not novel ideas. They are standard in mature markets. They should be standard in emerging markets too.

## The Bottom Line

Guyana's real estate market is growing fast and creating wealth. But growth without infrastructure creates risk. The agents worth working with are the ones who have already adopted professional standards—who verify their identity, close real transactions, have professional references, and are reachable and accountable.

Start with the four pillars. Do your due diligence. Hire a lawyer. If something feels off, walk away.

The diaspora capital flowing into Guyana is significant. It deserves professional representation. Demand it.

---

*Darren L. Buckner is a US-based entrepreneur building real estate infrastructure for emerging markets. He is the founder of Portal HomeHub, a multi-territory property platform operating across the Caribbean, Latin America, Africa, and Asia. He is also a U.S. Army veteran.*

*darrenlbuckner.com | guyanahomehub.com*`

const post = {
  slug: 'how-to-spot-a-real-estate-scammer-guyana',
  title: 'The Real Estate Agent Problem in Guyana (And How to Spot a Scammer)',
  excerpt:
    'A diaspora buyer wires $25,000 to hold a house back home. The agent vanishes—the "escrow" was a personal bank account. It happens in Guyana dozens of times a month. Here are the four pillars that separate a real agent from a scammer, and the due diligence that protects your money.',
  content: content.trim(),
  published_date: '2026-08-20',
  is_published: true,
  read_time: '11 min read',
}

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
