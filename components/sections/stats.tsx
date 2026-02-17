"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

interface StatItem {
  icon: string
  value: string
  label: string
  order?: number
}

interface ProjectItem {
  tag: string
  title: string
  href: string
  order?: number
}

interface StatsProps {
  data?: Record<string, unknown>
}

export default function StatsSection({ data }: StatsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (!data) return null

  const backgroundImage = data.backgroundImage as string
  const statsItems = ((data.stats as StatItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const projects = ((data.projects as ProjectItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="px-6 py-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl">
        {/* Stats Bar */}
        <div className="bg-[#1a3a2a] px-8 py-8 lg:px-12 lg:py-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {statsItems.map((stat) => (
              <div key={stat.value} className="flex items-center gap-4">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image src={stat.icon} alt="" fill sizes="48px" className="object-contain opacity-60" />
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</p>
                  <p className="whitespace-pre-line text-xs leading-tight text-white/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="relative">
          <Image src={backgroundImage} alt="Landscaped garden" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href={project.href}
                className="group relative flex aspect-[3/4] flex-col justify-end border-r border-white/10 p-6 last:border-r-0 sm:aspect-[3/4]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`absolute inset-0 bg-white/15 transition-all duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`} />
                <div className="relative z-10">
                  <span className="mb-3 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">{project.tag}</span>
                  <h3 className="text-lg font-bold leading-snug text-white">{project.title}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ${hoveredIndex === index ? "mt-4 max-h-20 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#c5d94e] px-5 py-2.5 text-sm font-semibold text-[#1a3a2a] transition-colors hover:bg-[#d4e85d]">
                      Read More
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a3a2a]">
                        <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
