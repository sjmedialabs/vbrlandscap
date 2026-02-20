import {
  Settings,
  Brain,
  Users,
  BookOpen,
  Wrench,
  Leaf,
  Cog,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react"
import type { CultureHighlight } from "@/lib/careers-types"

interface CultureSectionProps {
  heading: string
  description: string
  highlights: CultureHighlight[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings,
  Brain,
  Users,
  BookOpen,
  Wrench,
  Leaf,
  Cog,
  Lightbulb,
  Target,
  Zap,
}

export function CultureSection({ heading, description, highlights }: CultureSectionProps) {
  const sortedHighlights = [...highlights].sort((a, b) => a.order - b.order)

  return (
    <section className="py-20 bg-[#faf8f3]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
          {heading}
        </h2>

        {/* Description */}
        <p className="text-[#666] text-sm leading-relaxed mb-12 max-w-xl">
          {description}
        </p>

        {/* Highlights Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {sortedHighlights.map((highlight) => {
            const IconComponent = iconMap[highlight.icon] || Settings
            return (
              <div key={highlight.id} className="flex items-start gap-4">
                {/* Circular Icon */}
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5e9] border border-[#c8e6c9]">
                  <IconComponent className="h-6 w-6 text-[#2d6a2e]" />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#1a1a1a] mb-1">
                    {highlight.title}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
