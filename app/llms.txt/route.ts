import { projects } from '@/lib/projects'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

// Plain-text summary of the portfolio for AI tools (https://llmstxt.org), generated from the same data as the pages.
export function GET() {
  const lines = [
    '# Abdul Mueed — Portfolio',
    '',
    `> ${site.description}`,
    '',
    'Abdul Mueed is a software architect and full-stack engineer with nearly a decade of experience. He designs, builds and runs SaaS products end to end: architecture, engineering, AI integration, DevOps and infrastructure.',
    '',
    `- About: ${site.me}`,
    `- Resume: ${site.url}/resume.pdf`,
    `- Email: ${site.email}`,
    '',
    '## Projects',
    '',
    ...projects.map((p) => {
      const companies = p.usedBy.filter((c) => c.domain !== 'mueed.xyz').map((c) => c.name)
      return `- [${p.name}](${site.url}/project/${p.id}): ${p.tagline}.${companies.length ? ` Used by ${companies.join(', ')}.` : ''}`
    }),
    '',
    ...projects.flatMap((p) => [
      `## ${p.name}`,
      '',
      `${p.tagline}. ${p.summary}`,
      '',
      `- Page: ${site.url}/project/${p.id}`,
      `- Live: ${p.liveUrl}`,
      ...(p.demoUrl ? [`- Demo: ${p.demoUrl}`] : []),
      `- Category: ${p.category}`,
      `- Built for: ${p.audience}`,
      `- Role: ${p.role}`,
      `- Tech: ${p.stack.join(', ')}`,
      ...(p.integrations.length ? [`- Integrations: ${p.integrations.join(', ')}`] : []),
      ...(p.usedBy.length ? [`- Used by: ${p.usedBy.map((c) => `${c.name} (${c.domain}) — ${c.note}`).join('; ')}`] : []),
      '',
      `Problem: ${p.about.problem}`,
      '',
      `Solution: ${p.about.solution}`,
      '',
      `How ${p.name} solves it: ${p.about.approach}`,
      '',
      `Benefits: ${p.about.benefits}`,
      '',
      `Technical: ${p.about.technical}`,
      '',
      'Features:',
      ...p.features.map((f) => `- ${f.title}: ${f.body}`),
      '',
    ]),
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
