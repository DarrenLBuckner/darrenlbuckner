'use client'

import { useState, type ReactNode } from 'react'

export default function PasswordGate({
  page,
  children,
}: {
  page: 'bio' | 'admin'
  children: ReactNode
}) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, page }),
      })

      if (res.ok) {
        sessionStorage.setItem(`${page}_password`, password)
        setAuthenticated(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Incorrect password')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (authenticated) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">
          {page === 'admin' ? 'Admin Access' : 'Protected Page'}
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Enter the password to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            autoFocus
          />

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
