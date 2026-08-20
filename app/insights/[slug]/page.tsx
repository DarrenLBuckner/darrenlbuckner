import { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import type { Insight } from '@/lib/types'
import {
  PERSON_ID,
  PERSON_JOB_TITLE,
  PERSON_WORKS_FOR,
  PERSON_SAMEAS,
  PERSON_DESCRIPTION,
} from '@/lib/identity'

export const revalidate = 60

const siteUrl = 'https://www.darrenlbuckner.com'

// Optional hero image per post, keyed by slug. Mirrors the per-item pattern
// used on the Press page. Keeps images out of the DB (no schema change) while
// still feeding alt text + an ImageObject into the article's structured data.
const POST_IMAGES: Record<
  string,
  { src: string; alt: string; credit: string; width: number; height: number }
> = {
  'world-is-watching-guyana': {
    src: '/images/insights/real-estate-forward-guyana-2026.jpg',
    alt: 'Darren L. Buckner speaking at Real Estate Forward: Guyana 2026 & Beyond in Georgetown, Guyana',
    credit: 'Photo by Pascal John of Pascal Media GY',
    width: 963,
    height: 1280,
  },
}

async function getPost(slug: string): Promise<Insight | null> {
  const { data, error } = await supabaseAdmin
    .from('insights')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()
  if (error) {
    console.error(`[insights/${slug}] failed to load:`, error)
    return null
  }
  return data
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return {
      title: 'Insight Not Found',
      robots: { index: false, follow: false },
    }
  }
  const canonical = `${siteUrl}/insights/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: 'article',
      publishedTime: post.published_date,
      authors: ['Darren L. Buckner'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Inline formatter. Handles **bold** and [text](url) links within a run of
// text and returns an array of React nodes. Anything else passes through as a
// plain string. Kept intentionally small — no nesting, no single-asterisk
// italics (whole-block italics are handled at the block level below).
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let key = 0
  let match: RegExpExecArray | null
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {match[1]}
        </strong>
      )
    } else {
      const href = match[3]
      const external = /^https?:\/\//.test(href)
      nodes.push(
        <a
          key={key++}
          href={href}
          className="text-accent underline underline-offset-2 transition-colors hover:text-accent-dim"
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {match[2]}
        </a>
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

// Block-level renderer. Splits content on blank lines. Each block is one of:
// --- (rule); a bullet list (every line starts with "- "); a ## / ### heading;
// a legacy whole-line **header**; a whole-line **label:** lead-in; a whole-line
// *italic* byline; or a prose paragraph. Inline **bold** and [links] are
// applied within paragraphs, list items, and headings.
function renderContent(content: string) {
  const blocks = content.trim().split(/\n{2,}/)
  return blocks.map((raw, i) => {
    // Bullet list: a block whose every non-empty line begins with "- ".
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length > 0 && lines.every((l) => l.startsWith('- '))) {
      return (
        <ul
          key={i}
          className="my-5 list-disc space-y-2 pl-6 text-base leading-[1.8] text-foreground marker:text-accent sm:text-lg"
        >
          {lines.map((l, j) => (
            <li key={j}>{renderInline(l.replace(/^-\s+/, ''))}</li>
          ))}
        </ul>
      )
    }

    const block = raw.replace(/\s*\n\s*/g, ' ').trim()
    if (!block) return null
    if (block === '---') {
      return <hr key={i} className="my-10 border-border" />
    }

    const h3Match = block.match(/^###\s+(.+)$/)
    if (h3Match) {
      return (
        <h3
          key={i}
          className="mt-10 mb-3 text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {renderInline(h3Match[1])}
        </h3>
      )
    }

    // ## heading, or the legacy whole-line **Header** convention. A fully-bold
    // block that ends in a colon is a lead-in label, not a section heading.
    const h2Match = block.match(/^##\s+(.+)$/)
    const boldOnly = block.match(/^\*\*(.+)\*\*$/)
    if (boldOnly && boldOnly[1].endsWith(':')) {
      return (
        <p
          key={i}
          className="mt-6 mb-1 text-base font-semibold text-foreground sm:text-lg"
        >
          {boldOnly[1]}
        </p>
      )
    }
    if (h2Match || boldOnly) {
      return (
        <h2
          key={i}
          className="mt-12 mb-4 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {renderInline(h2Match ? h2Match[1] : boldOnly![1])}
        </h2>
      )
    }

    const italicMatch = block.match(/^\*([^*].*[^*])\*$/)
    if (italicMatch) {
      return (
        <p
          key={i}
          className="my-6 text-center text-base italic leading-[1.8] text-muted sm:text-lg"
        >
          {italicMatch[1]}
        </p>
      )
    }
    return (
      <p
        key={i}
        className="my-5 text-base leading-[1.8] text-foreground sm:text-lg"
      >
        {renderInline(block)}
      </p>
    )
  })
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const canonical = `${siteUrl}/insights/${post.slug}`
  const heroImage = POST_IMAGES[post.slug] ?? null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_date,
    ...(heroImage && {
      image: {
        '@type': 'ImageObject',
        url: `${siteUrl}${heroImage.src}`,
        width: heroImage.width,
        height: heroImage.height,
        caption: heroImage.alt,
      },
    }),
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Darren L. Buckner',
      url: siteUrl,
      jobTitle: PERSON_JOB_TITLE,
      worksFor: PERSON_WORKS_FOR,
      description: PERSON_DESCRIPTION,
      sameAs: PERSON_SAMEAS,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Portal HomeHub',
      url: 'https://portalhomehub.com',
    },
    mainEntityOfPage: canonical,
    url: canonical,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/insights"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
          >
            &larr; All Insights
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-accent">
            <time dateTime={post.published_date}>
              {formatDate(post.published_date)}
            </time>
            {post.read_time && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{post.read_time}</span>
              </>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {post.excerpt}
          </p>

          {heroImage && (
            <figure className="mt-10">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                priority
                sizes="(max-width: 640px) 100vw, 420px"
                className="mx-auto w-full max-w-sm rounded-xl border border-border"
              />
              <figcaption className="mt-3 text-center text-sm italic text-muted">
                {heroImage.credit}
              </figcaption>
            </figure>
          )}

          <div className="mt-12 border-t border-border pt-10">
            {renderContent(post.content)}
          </div>

          <div className="mt-16 border-t border-border pt-10 text-center">
            <p className="text-sm text-muted">
              Think we should talk?
            </p>
            <Link
              href="/consulting"
              className="mt-4 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dim"
            >
              Work With Me
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
