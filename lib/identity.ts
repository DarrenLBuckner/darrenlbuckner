// Single source of truth for Darren L. Buckner's identity graph.
//
// Every Person/author JSON-LD block on the site imports from here so the
// entity `@id`, `sameAs` links, and descriptions can never drift apart again
// (a mismatched LinkedIn URL across pages was blocking Google from merging the
// nodes into one entity). Change a value ONCE here and it updates site-wide.
//
// To add a new profile (e.g. Crunchbase, Wellfound) later: add the URL to
// PERSON_SAMEAS below — nothing else to touch.

/** Stable node identifier that unifies every Person block into one entity. */
export const PERSON_ID = 'https://www.darrenlbuckner.com/#darren'

/** Canonical job title — identical across every Person block. */
export const PERSON_JOB_TITLE = 'Founder & CEO, Portal HomeHub'

/** Canonical, verified profiles. Must be byte-for-byte identical everywhere. */
export const PERSON_SAMEAS = [
  'https://portalhomehub.com',
  'https://guyanahomehub.com',
  'https://www.youtube.com/@DarrenLBuckner',
  'https://www.linkedin.com/in/darrenlbuckner',
  'https://x.com/darren_buckner',
  'https://www.wikidata.org/wiki/Q140560350',
]

/** Canonical one-sentence bio reused across schema blocks. */
export const PERSON_DESCRIPTION =
  'U.S. Army veteran and self-taught technologist from St. Louis, Missouri. Founder of Portal HomeHub, Guyana HomeHub, and PivotPoint AI — building the Zillow of the Global South.'

/** Disambiguation statement — separates this Darren L. Buckner from the
 *  Portland, Oregon "Workfrom" founder of a similar name. */
export const PERSON_DISAMBIGUATION =
  'Darren L. Buckner is a St. Louis, Missouri-based entrepreneur, U.S. Army veteran (1989–1995), and founder of Portal HomeHub, Guyana HomeHub, and PivotPoint AI. He is a distinct individual and is not affiliated with Workfrom, the Portland, Oregon-based company, or its founder of a similar name.'
