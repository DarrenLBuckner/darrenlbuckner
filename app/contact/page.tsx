import { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Darren L. Buckner for business inquiries, press, partnerships, and speaking engagements.',
  alternates: { canonical: 'https://darrenlbuckner.com/contact' },
}

const allowedTypes = new Set([
  'general',
  'consulting',
  'speaking',
  'press',
  'partnership',
  'investment',
])

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const initialType = type && allowedTypes.has(type) ? type : 'general'
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Connect
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Reach out for business inquiries, press requests, partnerships, or
          speaking engagements.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-sm font-medium text-accent">Speaking</p>
              <p className="mt-1 text-sm text-muted">
                For keynotes, panels, and workshops, use the inquiry form or
                visit the{' '}
                <a href="/speaking" className="text-foreground hover:text-accent transition-colors">
                  speaking page
                </a>
                .
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-accent">Press</p>
              <p className="mt-1 text-sm text-muted">
                For interviews and media inquiries, include your outlet and
                deadline in the message below.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-accent">Partnerships</p>
              <p className="mt-1 text-sm text-muted">
                For business development, investment, or strategic partnerships.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-accent">Location</p>
              <p className="mt-1 text-sm text-muted">
                Based in St. Louis, Missouri. Available globally.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm initialInquiryType={initialType} />
          </div>
        </div>
      </div>
    </section>
  )
}
