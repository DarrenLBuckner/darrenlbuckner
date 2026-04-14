import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div>
            <p className="text-lg font-semibold">Darren L. Buckner</p>
            <p className="mt-1 text-sm text-muted">
              Entrepreneur &middot; Builder &middot; Technologist &middot; Veteran
            </p>
          </div>

          <div className="flex gap-6 text-sm text-muted">
            <Link href="/story" className="hover:text-foreground transition-colors">
              Story
            </Link>
            <Link href="/ventures" className="hover:text-foreground transition-colors">
              Ventures
            </Link>
            <Link href="/speaking" className="hover:text-foreground transition-colors">
              Speaking
            </Link>
            <Link href="/press" className="hover:text-foreground transition-colors">
              Press
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Darren L. Buckner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
