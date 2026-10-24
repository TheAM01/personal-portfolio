import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      images: projects.map((p) => `${site.url}${p.images[0].src}`),
    },
    ...projects.map((p) => ({
      url: `${site.url}/project/${p.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: p.images.map((i) => `${site.url}${i.src}`),
    })),
  ]
}
