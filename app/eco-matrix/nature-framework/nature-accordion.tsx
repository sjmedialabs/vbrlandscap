"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface NatureFeature {
  icon?: string
  title: string
  description?: string
}

interface NatureItem {
  id: string
  letter: string
  title: string
  subtitle: string
  description: string
  features: NatureFeature[]
  outcome: string
  order: number
}

interface NatureAccordionProps {
  items: NatureItem[]
}

// Column colors matching the exact design
const columnColors = [
  "bg-[#8b9a42]", // N - olive/yellow-green
  "bg-[#5d8a5e]", // A - medium green  
  "bg-[#6a9a8a]", // T - teal-green
  "bg-[#7cb89c]", // U - lighter teal
  "bg-[#9bcab8]", // R - light teal
  "bg-[#b8dcd0]", // E - very light mint
]

// Default feature icons - these should be uploaded to /public/images/icons/
const defaultFeatureIcons = [
  "/images/icons/nature-icon-1.png",
  "/images/icons/nature-icon-2.png",
  "/images/icons/nature-icon-3.png",
  "/images/icons/nature-icon-4.png",
]

export function NatureAccordion({ items }: NatureAccordionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0)
  const sortedItems = [...items].sort((a, b) => a.order - b.order)

  return (
    <div className="flex overflow-x-auto rounded-xl">
      {sortedItems.map((item, index) => {
        const isExpanded = hoveredIndex === index
        const bgColor = columnColors[index] || columnColors[0]

        return (
          <div
            key={item.id}
            className={cn(
              "relative overflow-hidden transition-all duration-500 ease-out cursor-pointer border-r border-white/10 last:border-r-0",
              index === 0 ? "rounded-l-xl" : "",
              index === sortedItems.length - 1 ? "rounded-r-xl" : "",
              isExpanded 
                ? "flex-[2.8] min-w-[380px]" 
                : "flex-1 min-w-[120px]",
              bgColor
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onFocus={() => setHoveredIndex(index)}
            tabIndex={0}
          >
            <div className="p-6 h-full flex flex-col min-h-[500px]">
              {/* Header */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl font-bold text-white">{item.letter}</span>
                {isExpanded && (
                  <>
                    <span className="text-white text-xl">—</span>
                    <span className="text-lg font-bold text-white">{item.title}</span>
                    <div className="ml-auto flex items-center gap-1.5 rounded-full bg-[#4a7c4e] px-3 py-1">
                      <span className="h-2 w-2 rounded-full bg-white" />
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              <p className={cn(
                "text-sm text-white leading-relaxed mb-6",
                !isExpanded && "line-clamp-3"
              )}>
                {item.description}
              </p>

              {/* Features Grid - 2x2 */}
              {item.features && item.features.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {item.features.slice(0, 4).map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3"
                    >
                      {/* Icon Circle */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/40 bg-white/10">
                        {feature.icon ? (
                          <Image
                            src={feature.icon}
                            alt=""
                            width={28}
                            height={28}
                            className="object-contain opacity-90"
                          />
                        ) : (
                          <Image
                            src={defaultFeatureIcons[idx % defaultFeatureIcons.length]}
                            alt=""
                            width={28}
                            height={28}
                            className="object-contain opacity-90"
                            onError={(e) => {
                              // Hide image on error, show fallback
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        )}
                      </div>
                      <p className={cn(
                        "text-xs font-medium text-white leading-tight pt-1",
                        !isExpanded && "line-clamp-2"
                      )}>
                        {feature.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Outcome */}
              {item.outcome && (
                <div className="mt-auto">
                  <p className="text-sm font-bold text-[#f9dc5c] mb-2">
                    Outcome:
                  </p>
                  <p className={cn(
                    "text-sm text-white leading-relaxed",
                    !isExpanded && "line-clamp-3"
                  )}>
                    {item.outcome}
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
