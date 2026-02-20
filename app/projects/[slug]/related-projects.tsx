import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/lib/projects-types"

interface RelatedProjectsProps {
  projects: Project[]
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Related Projects
          </h2>
          <p className="text-[#666] max-w-2xl mx-auto">
            Explore more of our work that you might find interesting
          </p>
        </div>

        {/* Projects Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <article className="bg-[#f5f7f0] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.featuredImage || "/images/blog-1.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#2d6a2e]/0 group-hover:bg-[#2d6a2e]/20 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#2d6a2e] transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-[#666] text-sm mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex items-center text-[#2d6a2e] font-medium text-sm">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6a2e] text-white font-semibold rounded-full hover:bg-[#245a25] transition-colors"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
