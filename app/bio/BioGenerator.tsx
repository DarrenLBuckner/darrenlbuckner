'use client'

import { useState } from 'react'
import type { ContextProfile } from '@/lib/types'

export default function BioGenerator({
  profiles,
}: {
  profiles: ContextProfile[]
}) {
  const [selectedSlug, setSelectedSlug] = useState('')
  const [bio, setBio] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const selectedProfile = profiles.find((p) => p.slug === selectedSlug)

  async function handleGenerate() {
    if (!selectedSlug) return
    setStatus('loading')
    setBio('')
    setErrorMessage('')
    setCopied(false)

    try {
      const res = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contextSlug: selectedSlug }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to generate bio')
      }

      const data = await res.json()
      setBio(data.bio)
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(bio)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-12">
      {/* Profile selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="context" className="block text-sm font-medium mb-2">
            Select Context
          </label>
          <select
            id="context"
            value={selectedSlug}
            onChange={(e) => {
              setSelectedSlug(e.target.value)
              setStatus('idle')
              setBio('')
            }}
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">Choose a context...</option>
            {profiles.map((profile) => (
              <option key={profile.slug} value={profile.slug}>
                {profile.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleGenerate}
          disabled={!selectedSlug || status === 'loading'}
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Generating...' : 'Generate Bio'}
        </button>
      </div>

      {/* Profile description */}
      {selectedProfile && (
        <p className="mt-4 text-sm text-muted">
          {selectedProfile.description}
          {selectedProfile.bio_length > 0 && (
            <span className="ml-2 text-xs">
              (~{selectedProfile.bio_length} words, {selectedProfile.tone} tone)
            </span>
          )}
        </p>
      )}

      {/* Loading state */}
      {status === 'loading' && (
        <div className="mt-8 flex items-center gap-3 text-muted">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <span className="text-sm">Generating bio with AI...</span>
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <p className="text-sm text-red-400">{errorMessage}</p>
        </div>
      )}

      {/* Generated bio */}
      {status === 'done' && bio && (
        <div className="mt-8">
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <p className="whitespace-pre-line leading-relaxed">{bio}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleCopy}
              className="rounded-full border border-border px-6 py-2 text-sm transition-colors hover:bg-surface"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={handleGenerate}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
