import { Check } from "lucide-react"
import type { ProjectFeature } from "@/lib/projects-types"

interface ProjectFeaturesProps {
  features: ProjectFeature[]
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  // Sort features by order
  const sortedFeatures = [...features].sort((a, b) => a.order - b.order)

  return (
    <section className="py-16 lg:py-24 bg-[#f5f7f0]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Key Features
          </h2>
          <p className="text-[#666] max-w-2xl mx-auto">
            Discover the standout elements that made this project a success
          </p>
        </div>

        {/* Features Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sortedFeatures.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2d6a2e] flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-medium text-[#1a1a1a]">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
