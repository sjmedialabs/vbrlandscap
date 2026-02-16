"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

const stats = [
  {
    icon: "/images/icon-aloe.png",
    value: "10k +",
    label: "Hearts We've\nTouched",
  },
  {
    icon: "/images/icon-eye.png",
    value: "25 +",
    label: "Years of\nexperienced",
  },
  {
    icon: "/images/icon-hand-plant.png",
    value: "250",
    label: "Personal expert\nnursing",
  },
  {
    icon: "/images/icon-landscape.png",
    value: "15 +",
    label: "Senior care\nconsulting Award",
  },
]

const projects = [
  {
    tag: "Landscaping",
    title: "Creating patios, decks, and recreational",
    href: "/services/patios",
  },
  {
    tag: "Landscaping",
    title: "Tailored landscaping designs that reflect each client\u2019s",
    href: "/services/landscaping-design",
  },
  {
    tag: "Landscaping",
    title: "Designed by Nature, Built by Experts",
    href: "/services/nature-design",
  },
  {
    tag: "Landscaping",
    title: "Modern Backyard Makeover in California",
    href: "/services/backyard-makeover",
  },
]

export default function StatsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="px-6 py-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl">
        {/* Stats Bar - dark green */}
        <div className="bg-[#1a3a2a] px-8 py-8 lg:px-12 lg:py-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.value} className="flex items-center gap-4">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={stat.icon}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-contain opacity-60"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-bold text-white lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="whitespace-pre-line text-xs leading-tight text-white/70">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Grid - single background image spanning all 4 columns */}
        <div className="relative">
          {/* Single background image for the entire grid */}
          <Image
            src="/images/stats-bg.png"
            alt="Landscaped garden"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark gradient overlay on the full image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

          {/* 4-column grid on top */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href={project.href}
                className="group relative flex aspect-[3/4] flex-col justify-end border-r border-white/10 p-6 last:border-r-0 sm:aspect-[3/4]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* White overlay on hover */}
                <div
                  className={`absolute inset-0 bg-white/15 transition-all duration-500 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Tag */}
                  <span className="mb-3 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    {project.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold leading-snug text-white">
                    {project.title}
                  </h3>

                  {/* Read More button - shown on hover */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      hoveredIndex === index
                        ? "mt-4 max-h-20 opacity-100"
                        : "mt-0 max-h-0 opacity-0"
                    }`}
                  >
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
