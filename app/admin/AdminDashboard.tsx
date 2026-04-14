'use client'

import { useState } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'
const labelClass = 'block text-sm font-medium mb-2'

export default function AdminDashboard() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Internal
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Admin
        </h1>
        <p className="mt-4 text-muted">
          Add press items and ventures directly from here.
        </p>

        <div className="mt-16 space-y-20">
          <PressForm />
          <VentureForm />
        </div>
      </div>
    </section>
  )
}

function PressForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    const form = e.currentTarget
    const fd = new FormData(form)

    const body = {
      password: sessionStorage.getItem('admin_password') || '',
      title: fd.get('title') as string,
      outlet: fd.get('outlet') as string,
      url: fd.get('url') as string,
      embed_url: fd.get('embed_url') as string,
      type: fd.get('type') as string,
      published_date: fd.get('published_date') as string,
      is_featured: fd.get('is_featured') === 'on',
    }

    try {
      const res = await fetch('/api/admin/press', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to add press item')
      }

      setStatus('success')
      form.reset()
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Add Press Item</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="press-title" className={labelClass}>Title *</label>
            <input type="text" id="press-title" name="title" required className={inputClass} placeholder="Article title" />
          </div>
          <div>
            <label htmlFor="press-outlet" className={labelClass}>Outlet</label>
            <input type="text" id="press-outlet" name="outlet" className={inputClass} placeholder="Publication name" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="press-url" className={labelClass}>URL</label>
            <input type="url" id="press-url" name="url" className={inputClass} placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="press-embed" className={labelClass}>Embed URL</label>
            <input type="url" id="press-embed" name="embed_url" className={inputClass} placeholder="https://..." />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="press-type" className={labelClass}>Type</label>
            <select id="press-type" name="type" className={inputClass}>
              <option value="article">Article</option>
              <option value="interview">Interview</option>
              <option value="radio">Radio</option>
              <option value="video">Video</option>
              <option value="podcast">Podcast</option>
            </select>
          </div>
          <div>
            <label htmlFor="press-date" className={labelClass}>Published Date</label>
            <input type="date" id="press-date" name="published_date" className={inputClass} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="press-featured" name="is_featured" className="h-4 w-4 rounded border-border accent-accent" />
          <label htmlFor="press-featured" className="text-sm">Featured</label>
        </div>

        {status === 'error' && <p className="text-sm text-red-400">{error}</p>}
        {status === 'success' && <p className="text-sm text-green-400">Press item added successfully.</p>}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Adding...' : 'Add Press Item'}
        </button>
      </form>
    </div>
  )
}

function VentureForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    const form = e.currentTarget
    const fd = new FormData(form)

    const body = {
      password: sessionStorage.getItem('admin_password') || '',
      name: fd.get('name') as string,
      slug: fd.get('slug') as string,
      tagline: fd.get('tagline') as string,
      description: fd.get('description') as string,
      url: fd.get('url') as string,
      status: fd.get('status') as string,
      category: fd.get('category') as string,
      years_active: fd.get('years_active') as string,
      highlight_metric: fd.get('highlight_metric') as string,
      display_order: parseInt(fd.get('display_order') as string) || 0,
      is_featured: fd.get('is_featured') === 'on',
    }

    try {
      const res = await fetch('/api/admin/ventures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to add venture')
      }

      setStatus('success')
      form.reset()
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Add Venture</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="v-name" className={labelClass}>Name *</label>
            <input type="text" id="v-name" name="name" required className={inputClass} placeholder="Venture name" />
          </div>
          <div>
            <label htmlFor="v-slug" className={labelClass}>Slug *</label>
            <input type="text" id="v-slug" name="slug" required className={inputClass} placeholder="venture-slug" />
          </div>
        </div>

        <div>
          <label htmlFor="v-tagline" className={labelClass}>Tagline</label>
          <input type="text" id="v-tagline" name="tagline" className={inputClass} placeholder="Short tagline" />
        </div>

        <div>
          <label htmlFor="v-description" className={labelClass}>Description</label>
          <textarea id="v-description" name="description" rows={4} className={`${inputClass} resize-none`} placeholder="Full description" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="v-url" className={labelClass}>URL</label>
            <input type="url" id="v-url" name="url" className={inputClass} placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="v-status" className={labelClass}>Status</label>
            <select id="v-status" name="status" className={inputClass}>
              <option value="active">Active</option>
              <option value="legacy">Legacy</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="v-category" className={labelClass}>Category</label>
            <select id="v-category" name="category" className={inputClass}>
              <option value="technology">Technology</option>
              <option value="real_estate">Real Estate</option>
              <option value="construction">Construction</option>
              <option value="consumer_brand">Consumer Brand</option>
            </select>
          </div>
          <div>
            <label htmlFor="v-years" className={labelClass}>Years Active</label>
            <input type="text" id="v-years" name="years_active" className={inputClass} placeholder="2020–Present" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="v-metric" className={labelClass}>Highlight Metric</label>
            <input type="text" id="v-metric" name="highlight_metric" className={inputClass} placeholder="e.g. 10K+ users" />
          </div>
          <div>
            <label htmlFor="v-order" className={labelClass}>Display Order</label>
            <input type="number" id="v-order" name="display_order" className={inputClass} defaultValue={0} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="v-featured" name="is_featured" className="h-4 w-4 rounded border-border accent-accent" />
          <label htmlFor="v-featured" className="text-sm">Featured</label>
        </div>

        {status === 'error' && <p className="text-sm text-red-400">{error}</p>}
        {status === 'success' && <p className="text-sm text-green-400">Venture added successfully.</p>}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Adding...' : 'Add Venture'}
        </button>
      </form>
    </div>
  )
}
