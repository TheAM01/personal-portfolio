import Link from 'next/link'
import { ArrowRight, Download, FileText } from 'lucide-react'
import { projects, clients } from '@/lib/projects'
import { site } from '@/lib/site'
import { ProjectCard } from '@/components/project-card'
import { JsonLd } from '@/components/json-ld'
import { Button, Favicon, Panel, Tag, display, tilt } from '@/components/ui'

const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI / LLM integration', 'DevOps', 'Product Design', 'Full-Stack Development']

export default function Home() {
  const stats = [
    { value: projects.length, label: 'Products shipped' },
    { value: projects.filter((p) => p.demoUrl).length, label: 'Live demos' },
    { value: clients.length, label: 'Companies in production' },
    { value: '9', label: 'Years building' },
  ]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
      author: { '@type': 'Person', name: site.author },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.author,
      url: site.me,
      jobTitle: 'Software Architect & Full Stack Engineer',
      email: `mailto:${site.email}`,
      sameAs: site.sameAs,
      knowsAbout: skills,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Projects by Abdul Mueed',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${site.url}/project/${p.id}`,
        name: p.name,
      })),
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="space-y-6 sm:space-y-8 mb-12 sm:mb-20" aria-labelledby="hero-title">
        <div className="space-y-4">
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-black/40 pl-1" style={display}>
            Abdul Mueed / Portfolio
          </p>
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-black skew-x-9 group-hover:skew-x-4 transition-transform duration-300" />
            <h1 id="hero-title" className="relative z-10 text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none text-white px-4 sm:px-6 py-2" style={display}>
              WORK
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-black font-black uppercase tracking-widest pl-1" style={display}>
            Products I&apos;ve designed, built & shipped
          </p>
        </div>
        <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed pl-1">
          I&apos;m Abdul Mueed, a software architect and full-stack engineer. These are the SaaS products I&apos;ve taken from idea to production — AI agents, outreach
          engines, scheduling tools and platforms used by real companies every day.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4 pl-1">
          <Button href="#projects" external={false}>
            See the projects <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="/resume.pdf" variant="accent" external={false} download>
            Resume <Download className="w-4 h-4" />
          </Button>
          <Button href={`mailto:${site.email}`} variant="outline">
            Get in touch
          </Button>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
          {stats.map((s) => (
            <div key={s.label} className="border-2 border-black bg-white p-4 sm:p-5 shadow-[4px_4px_0_0_#000]">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter" style={display}>
                  {s.value}
                  {typeof s.value === 'string' && <span className="text-[#fcb345]">+</span>}
                </span>
                <span className="block mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black/50">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Projects */}
      <Panel id="projects" kicker={`${projects.length} products`} title="Projects">
        {/* Two wide cards on desktop so 7 projects fill three full rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-row-dense gap-4 sm:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} priority={i < 3} featured={p.id === 'krest' || p.id === 'krispin'} />
          ))}
        </div>
      </Panel>

      {/* Companies using the products */}
      <Panel id="clients" kicker="In production" title="Companies Running My Products">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {clients.map((c) => (
            <Link
              key={c.name}
              href={`/project/${c.project.id}`}
              className={`group relative overflow-hidden rounded-none border-2 border-black bg-white p-4 sm:p-5 lg:p-6 cursor-pointer hover:bg-black hover:text-white ${tilt}`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br ${c.project.color}`} />
              <div className="relative z-10 flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                  <Favicon logo={c.logo} name={c.name} />
                  <div>
                    <h3 className="text-base sm:text-lg font-black leading-tight" style={display}>
                      {c.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-black/50 group-hover:text-white/70 transition-colors duration-150 mt-0.5">{c.domain}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-black/60 group-hover:text-white/80 transition-colors">{c.note}</p>
                <span className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#fcb345] border-2 border-black text-[11px] font-black uppercase tracking-wider text-black" style={display}>
                  Uses {c.project.name} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Panel>

      {/* Resume */}
      <Panel id="resume" kicker="Hiring?" title="Resume">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed">
              Nearly a decade of building scalable systems and polished products — from system architecture to delivery, plus the DevOps and infrastructure that keeps
              enterprise apps running. Grab the full resume below, or{' '}
              <a href={site.me} className="font-bold text-black underline underline-offset-4 decoration-2 decoration-[#fcb345] hover:bg-[#fcb345]">
                read more about me
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
          <div className="relative group max-w-fit">
            <div className="absolute inset-0 border-[6px] border-black translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200" />
            <div className="absolute inset-0 bg-[#fcb345] -z-10 translate-x-4 translate-y-4 opacity-70 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />
            <a
              href="/resume.pdf"
              download
              className="relative z-10 flex items-center gap-4 bg-white border-[4px] border-black p-5 sm:p-7 rotate-[-1deg] group-hover:rotate-0 transition-transform duration-300"
            >
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
              <span>
                <span className="block text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-black leading-none" style={display}>
                  Download resume
                </span>
                <span className="block mt-1 text-sm text-black/40 font-bold">PDF</span>
              </span>
            </a>
          </div>
        </div>
      </Panel>
    </div>
  )
}
