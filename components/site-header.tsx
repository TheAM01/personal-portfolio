import Link from 'next/link'
import { display } from './ui'
import { site } from '@/lib/site'

const nav = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#clients', label: 'Clients' },
  { href: '/#resume', label: 'Resume' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-black bg-white/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        <Link href="/" className="group relative inline-block" aria-label="Abdul Mueed portfolio home">
          <span className="absolute -inset-1 bg-black skew-x-9 group-hover:skew-x-4 transition-transform duration-300" />
          <span className="relative z-10 block px-2.5 text-lg sm:text-xl font-black tracking-tighter text-white" style={display}>
            MUEED
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hidden sm:inline-block px-3 py-1.5 text-xs font-black uppercase tracking-widest text-black/70 hover:bg-black hover:text-white transition-colors duration-150"
              style={display}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={site.me}
            className="ml-1 px-3 py-1.5 border-2 border-black bg-[#fcb345] text-xs font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-150"
            style={display}
          >
            About me
          </a>
        </nav>
      </div>
    </header>
  )
}
