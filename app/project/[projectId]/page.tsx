import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Globe, PlayCircle } from 'lucide-react'
import { projects, getProject } from '@/lib/projects'
import { site } from '@/lib/site'
import { Gallery } from '@/components/gallery'
import { JsonLd } from '@/components/json-ld'
import { ProjectCard } from '@/components/project-card'
import { Button, Favicon, Panel, Tag, display, tilt } from '@/components/ui'

type Props = { params: Promise<{ projectId: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ projectId: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params
  const p = getProject(projectId)
  if (!p) return {}
  const title = `${p.name} — ${p.tagline}`
  const url = `/project/${p.id}`
  return {
    title,
    description: p.summary,
    keywords: [p.name, ...p.keywords, 'Abdul Mueed'],
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title, description: p.summary, siteName: site.name },
    twitter: { card: 'summary_large_image', title, description: p.summary },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params
  const p = getProject(projectId)
  if (!p) notFound()

  const idx = projects.indexOf(p)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const others = projects.filter((x) => x.id !== p.id).slice(0, 3)
  const pageUrl = `${site.url}/project/${p.id}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: p.name,
      headline: p.tagline,
      description: p.summary,
      url: p.liveUrl,
      mainEntityOfPage: pageUrl,
      applicationCategory: p.applicationCategory,
      operatingSystem: 'Web',
      image: p.images.map((i) => `${site.url}${i.src}`),
      screenshot: p.images.map((i) => ({ '@type': 'ImageObject', url: `${site.url}${i.src}`, caption: i.alt })),
      featureList: p.features.map((f) => f.title),
      keywords: p.keywords.join(', '),
      audience: { '@type': 'Audience', audienceType: p.audience },
      author: { '@type': 'Person', name: site.author, url: site.me },
      creator: { '@type': 'Person', name: site.author, url: site.me },
      ...(p.demoUrl && { sameAs: [p.demoUrl] }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Portfolio', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${site.url}/#projects` },
        { '@type': 'ListItem', position: 3, name: p.name, item: pageUrl },
      ],
    },
  ]

  const details: [string, React.ReactNode][] = [
    ['Category', p.category],
    ['Built for', p.audience],
    ['My role', p.role],
    ['Platform', 'Web app'],
  ]

  return (
    <article className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className="mb-8 sm:mb-12">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black/45" style={display}>
          <li>
            <Link href="/" className="hover:text-black hover:underline underline-offset-4">Portfolio</Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden />
          <li>
            <Link href="/#projects" className="hover:text-black hover:underline underline-offset-4">Projects</Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden />
          <li aria-current="page" className="text-black">{p.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start mb-12 sm:mb-20">
        <div className="space-y-5 sm:space-y-7">
          <div className="flex flex-wrap gap-2">
            <Tag accent>{p.category}</Tag>
            {p.usedBy.length > 0 && <Tag>In production</Tag>}
            {p.demoUrl && <Tag>Live demo</Tag>}
          </div>
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-black skew-x-9 group-hover:skew-x-4 transition-transform duration-300" />
            <h1 className="relative z-10 text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white px-4 sm:px-6 py-2 uppercase" style={display}>
              {p.name}
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-black font-black uppercase tracking-widest pl-1 leading-snug" style={display}>
            {p.tagline}
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed pl-1">{p.summary}</p>
          <div className="flex flex-wrap gap-3 sm:gap-4 pl-1 pt-1">
            <Button href={p.liveUrl}>
              <Globe className="w-4 h-4" /> Live site
            </Button>
            {p.demoUrl && (
              <Button href={p.demoUrl} variant="accent">
                <PlayCircle className="w-4 h-4" /> Try the demo
              </Button>
            )}
          </div>
        </div>
        <div className="lg:pt-10">
          <Gallery images={p.images} name={p.name} />
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_340px] gap-0 lg:gap-8 items-start">
        <div>
          <Panel kicker="Overview" title={`About ${p.name}`}>
            <div className="space-y-6 sm:space-y-8">
              {[
                ['The problem', p.about.problem],
                ['The solution', p.about.solution],
                [`How ${p.name} solves it`, p.about.approach],
                ['What you get', p.about.benefits],
              ].map(([label, text], i) => (
                <section key={label} className="grid sm:grid-cols-[150px_1fr] gap-2 sm:gap-6">
                  <h3 className="flex sm:flex-col items-baseline sm:items-start gap-2 sm:gap-1" style={display}>
                    <span className="text-xs font-black text-black/30">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`text-sm sm:text-base font-black uppercase tracking-wide leading-tight ${i === 2 ? 'bg-[#fcb345] px-1.5 -mx-1.5' : ''}`}>{label}</span>
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-black/75 leading-relaxed">{text}</p>
                </section>
              ))}
              <section className="border-2 border-black bg-black text-white p-5 sm:p-6">
                <h3 className="flex items-baseline gap-2 mb-3" style={display}>
                  <span className="text-xs font-black text-white/40">05</span>
                  <span className="text-sm sm:text-base font-black uppercase tracking-wide">Under the hood</span>
                </h3>
                <p className="text-xs sm:text-sm lg:text-[15px] text-white/80 leading-relaxed">{p.about.technical}</p>
              </section>
            </div>
          </Panel>

          <Panel kicker="What it does" title="Key Features">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {p.features.map((f, i) => (
                <div key={f.title} className="group relative border-2 border-black bg-white p-4 sm:p-5 hover:bg-black hover:text-white transition-colors duration-150">
                  <span className="absolute top-3 right-4 text-xs font-black text-black/20 group-hover:text-white/30" style={display}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base sm:text-lg font-black mb-1.5 pr-8" style={display}>
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/60 group-hover:text-white/75 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
            {p.highlights.length > 0 && (
              <ul className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm sm:text-base text-black/75">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 bg-[#fcb345] border-2 border-black flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {p.usedBy.length > 0 && (
            <Panel kicker="In production" title="Used By">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {p.usedBy.map((c) => (
                  <a
                    key={c.name}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden border-2 border-black bg-white p-4 sm:p-6 hover:bg-black hover:text-white ${tilt}`}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br ${p.color}`} />
                    <div className="relative z-10 flex items-start gap-4">
                      <Favicon logo={c.logo} name={c.name} size="lg" />
                      <div>
                        <h3 className="text-lg sm:text-xl font-black leading-tight" style={display}>
                          {c.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-black/50 group-hover:text-white/70 mt-0.5">{c.domain}</p>
                        <p className="mt-2 text-xs sm:text-sm text-black/65 group-hover:text-white/80">{c.note}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Panel>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 mb-12 sm:mb-20" aria-label="Project details">
          <div className="relative">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" aria-hidden />
            <div className="relative border-[3px] border-black bg-white p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-black mb-4" style={display}>
                Details
              </h2>
              <dl className="divide-y-2 divide-black/10">
                {details.map(([k, v]) => (
                  <div key={k} className="py-3 first:pt-0">
                    <dt className="text-[11px] font-black uppercase tracking-widest text-black/40" style={display}>
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-black">{v}</dd>
                  </div>
                ))}
                <div className="py-3">
                  <dt className="text-[11px] font-black uppercase tracking-widest text-black/40 mb-2" style={display}>
                    Tech
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </dd>
                </div>
                {p.integrations.length > 0 && (
                  <div className="py-3">
                    <dt className="text-[11px] font-black uppercase tracking-widest text-black/40 mb-2" style={display}>
                      Integrations
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {p.integrations.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </dd>
                  </div>
                )}
                {p.usedBy.length > 0 && (
                  <div className="py-3">
                    <dt className="text-[11px] font-black uppercase tracking-widest text-black/40" style={display}>
                      Used by
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-black">{p.usedBy.map((c) => c.name).join(', ')}</dd>
                  </div>
                )}
                <div className="pt-3 space-y-2">
                  <dt className="sr-only">Links</dt>
                  <dd>
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 border-2 border-black px-3 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors">
                      <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> {new URL(p.liveUrl).host}</span>
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </a>
                  </dd>
                  {p.demoUrl && (
                    <dd>
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 border-2 border-black bg-[#fcb345] px-3 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors">
                        <span className="flex items-center gap-2"><PlayCircle className="w-4 h-4" /> {new URL(p.demoUrl).host}</span>
                        <ArrowRight className="w-4 h-4 -rotate-45" />
                      </a>
                    </dd>
                  )}
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>

      {/* Prev / next */}
      <nav aria-label="More projects" className="grid grid-cols-2 gap-3 sm:gap-4 mb-12 sm:mb-20">
        {[
          { p: prev, label: 'Previous', icon: ArrowLeft, align: 'items-start text-left' },
          { p: next, label: 'Next', icon: ArrowRight, align: 'items-end text-right' },
        ].map(({ p: x, label, icon: Icon, align }) => (
          <Link
            key={label}
            href={`/project/${x.id}`}
            rel={label === 'Next' ? 'next' : 'prev'}
            className={`group relative overflow-hidden border-2 border-black bg-white p-4 sm:p-6 flex flex-col ${align} hover:bg-black hover:text-white ${tilt}`}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br ${x.color}`} />
            <span className="relative z-10 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-black/45 group-hover:text-white/60" style={display}>
              {label === 'Previous' && <Icon className="w-3.5 h-3.5" />} {label} {label === 'Next' && <Icon className="w-3.5 h-3.5" />}
            </span>
            <span className="relative z-10 mt-1 text-xl sm:text-3xl font-black tracking-tight" style={display}>
              {x.name}
            </span>
            <span className="relative z-10 hidden sm:block mt-1 text-xs text-black/50 group-hover:text-white/70">{x.tagline}</span>
          </Link>
        ))}
      </nav>

      <Panel kicker="Keep exploring" title="Other Projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {others.map((o) => (
            <ProjectCard key={o.id} project={o} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/#projects" variant="outline" external={false}>
            All projects <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Panel>
    </article>
  )
}
