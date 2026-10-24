import Link from 'next/link'
import { Github, Linkedin, Mail, User } from 'lucide-react'
import { projects } from '@/lib/projects'
import { site } from '@/lib/site'
import { display } from './ui'

export function SiteFooter() {
  return (
    <footer className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 border-t-2 border-black/10 mt-4 sm:mt-6">
      <nav aria-label="Projects" className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
        {projects.map((p) => (
          <Link key={p.id} href={`/project/${p.id}`} className="text-xs sm:text-sm font-black text-black/60 hover:text-black hover:underline underline-offset-4" style={display}>
            {p.name}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-black/50">
        <p>© {new Date().getFullYear()} Abdul Mueed. Building with code & creativity.</p>
        <div className="flex items-center gap-2.5">
          {[
            { icon: User, href: site.me, label: 'About me' },
            { icon: Github, href: site.github, label: 'GitHub' },
            { icon: Linkedin, href: site.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${site.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-none border-2 border-black/15 flex items-center justify-center text-black/50 hover:text-white hover:border-black hover:bg-black transition-all duration-150 hover:scale-95 active:scale-85"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
