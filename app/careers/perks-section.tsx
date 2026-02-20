import { Sprout, TreeDeciduous, Users, Leaf, Heart, Star, Briefcase, Award } from "lucide-react"
import type { PerkItem } from "@/lib/careers-types"

interface PerksSectionProps {
  label: string
  heading: string
  perks: PerkItem[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout,
  TreeDeciduous,
  Users,
  Leaf,
  Heart,
  Star,
  Briefcase,
  Award,
}

export function PerksSection({ label, heading, perks }: PerksSectionProps) {
  const sortedPerks = [...perks].sort((a, b) => a.order - b.order)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-block rounded-full bg-[#2d6a2e]/10 px-5 py-2 text-sm font-semibold text-[#2d6a2e]">
            {label}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2d6a2e] mb-16">
          {heading}
        </h2>

        {/* Perks Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sortedPerks.map((perk) => {
            const IconComponent = iconMap[perk.icon] || Sprout
            return (
              <div key={perk.id} className="text-center">
                {/* Circular Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f5e9]">
                  <IconComponent className="h-10 w-10 text-[#2d6a2e]" />
                </div>
                {/* Title */}
                <h3 className="text-xl font-bold text-[#2d6a2e] mb-3">
                  {perk.title}
                </h3>
                {/* Description */}
                <p className="text-[#666] text-sm leading-relaxed max-w-xs mx-auto">
                  {perk.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
