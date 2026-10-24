import { getProject, projects } from '@/lib/projects'
import { ogImage, ogSize } from '@/lib/og'

export const alt = 'Project by Abdul Mueed'
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return projects.map((p) => ({ projectId: p.id }))
}

export default async function Image({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  const p = getProject(projectId)!
  return ogImage({ title: p.name, subtitle: p.tagline, kicker: `${p.category} · by Abdul Mueed`, cover: `/projects/${p.id}/cover.jpg` })
}
