import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { display, tilt } from './ui'

export function ProjectCard({ project, priority, featured }: { project: Project; priority?: boolean; featured?: boolean }) {
  return (
    <div className={`relative bg-[#fcb345] w-full h-full ${featured ? 'lg:col-span-2' : ''}`}>
      <Link
        href={`/project/${project.id}`}
        className={`group block w-full h-full relative overflow-hidden rounded-none border-2 border-black bg-white cursor-pointer hover:bg-black hover:text-white ${tilt}`}
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br ${project.color}`} />
        <div className="relative z-10 flex flex-col h-full">
          <div className={`relative aspect-[16/10] border-b-2 border-black overflow-hidden bg-neutral-100 ${featured ? 'lg:aspect-[33/10] lg:[&_img]:object-center' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.images[0].src}
              alt={project.images[0].alt}
              width={1600}
              height={1000}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : undefined}
              className="w-full h-full object-cover object-top grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
            />
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-white border-2 border-black text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-black" style={display}>
              {project.category}
            </span>
            {project.usedBy.length > 0 && (
              <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#fcb345] border-2 border-black text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-black" style={display}>
                In production
              </span>
            )}
          </div>
          <div className="flex flex-col flex-1 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black mb-2" style={display}>
              {project.name}
            </h3>
            <p className="text-xs sm:text-sm text-black/60 group-hover:text-white/80 transition-colors duration-150 mb-4">{project.tagline}</p>
            <div className="flex items-center gap-2 mt-auto text-xs font-medium text-black/50 group-hover:text-white/70 transition-colors duration-150">
              <span>View project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
