import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import type { Insight } from '@/lib/types'

export const revalidate = 60

const siteUrl = 'https://darrenlbuckner.com'

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

// Minimal block-level renderer. Splits content on blank lines. Each block is
// one of: --- (rule), **header**, *italic paragraph*, or a prose paragraph.
// Inline formatting beyond whole-paragraph italics is not supported, which
// is sufficient for the current post format.
function renderContent(content: string) {
  const blocks = content.trim().split(/\n{2,}/)
  return blocks.map((raw, i) => {
    const block = raw.replace(/\s*\n\s*/g, ' ').trim()
    if (!block) return null
    if (block === '---') {
      return <hr key={i} className="my-10 border-border" />
    }
    const headerMatch = block.match(/^\*\*(.+)\*\*$/)
    if (headerMatch) {
      return (
        <h2
          key={i}
          className="mt-12 mb-4 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {headerMatch[1]}
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
        {block}
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_date,
    author: {
      '@type': 'Person',
      name: 'Darren L. Buckner',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Darren L. Buckner',
      url: siteUrl,
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
