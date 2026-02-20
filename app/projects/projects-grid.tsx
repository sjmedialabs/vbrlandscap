"use client"

import Image from "next/image"
import Link from "next/link"
import { type Project, type ProjectCategory } from "@/lib/projects-types"

interface ProjectsGridProps {
  projects: Project[]
  categories: ProjectCategory[]
}

export function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  // Helper to get category names from IDs
  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds.map((id) => {
      const category = categories.find((c) => c.id === id || c.slug === id)
      return category?.name || id
    })
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          className="group relative block overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
        >
          {/* Project Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {project.featuredImage ? (
              <Image
                src={project.featuredImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#e5e8dc]">
                <span className="text-[#666]">No image</span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {project.title}
              </h3>

              {/* Category Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {getCategoryNames(project.categories).slice(0, 2).map((name, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs text-white/90"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b9c44b]" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
