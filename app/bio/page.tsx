import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import type { ContextProfile } from '@/lib/types'
import BioGenerator from './BioGenerator'
import PasswordGate from '@/app/components/PasswordGate'

export const metadata: Metadata = {
  title: 'Bio',
  description:
    'Generate a context-specific bio for Darren L. Buckner — tailored for press, events, panels, and more.',
  alternates: { canonical: 'https://darrenlbuckner.com/bio' },
}

export default async function BioPage() {
  const { data } = await supabase
    .from('context_profiles')
    .select('*')
    .order('label', { ascending: true })

  const profiles: ContextProfile[] = data ?? []

  return (
    <PasswordGate page="bio">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Adaptive
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Bio Generator
          </h1>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            Select a context below to generate a tailored bio for
            Darren L. Buckner. Each bio is dynamically composed from his story
            to match the audience and format.
          </p>

          <BioGenerator profiles={profiles} />
        </div>
      </section>
    </PasswordGate>
  )
}
