import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/ventures', label: 'Ventures' },
  { href: '/insights', label: 'Insights' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/consulting', label: 'Consulting' },
  { href: '/contact', label: 'Contact' },
]

const ventures = [
  { name: 'Portal HomeHub', url: 'https://portalhomehub.com' },
  { name: 'Guyana HomeHub', url: 'https://guyanahomehub.com' },
  { name: 'PivotPoint AI', url: null },
  { name: 'Pydana Collection', url: null },
]

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/darrenlbuckner',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5ZM8 19H5V8h3v11Zm-1.5-12.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM20 19h-3v-5.6c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.3-.1.2-.1.6-.1.9V19h-3V8h3v1.3a3 3 0 0 1 2.7-1.5c2 0 3.5 1.3 3.5 4.1V19Z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/darren_buckner',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.83l4.713 6.231 5.447-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/darrenlbuckner',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/darrenlbuckner',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1 — Brand */}
          <div>
            <p className="text-lg font-semibold">
              <span className="text-accent">Darren L. Buckner</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              Entrepreneur &middot; Builder &middot; Technologist &middot;
              Veteran
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted transition-colors hover:text-accent"
                >
                  <span className="block h-5 w-5">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Site Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Site
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Ventures */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Ventures
            </p>
            <ul className="mt-4 space-y-2">
              {ventures.map((v) => (
                <li key={v.name} className="text-sm">
                  {v.url ? (
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      {v.name}
                    </a>
                  ) : (
                    <span className="text-muted">{v.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-8 text-xs text-muted sm:flex-row">
          <p>&copy; 2026 Darren L. Buckner. All rights reserved.</p>
          <p>darrenlbuckner.com</p>
        </div>
      </div>
    </footer>
  )
}
