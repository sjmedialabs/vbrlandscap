"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DimensionFeature {
  icon?: string
  title: string
  description?: string
}

interface Dimension {
  id: string
  tabTitle: string
  label: string
  title: string
  subtitle: string
  description: string
  images?: string[]
  features: DimensionFeature[]
  outcomes: string[]
  order: number
}

interface DimensionTabsProps {
  dimensions: Dimension[]
}

// Placeholder images for the 2x2 grid
const placeholderImages = [
  "/images/placeholder-landscape-1.jpg",
  "/images/placeholder-landscape-2.jpg",
  "/images/placeholder-landscape-3.jpg",
  "/images/placeholder-landscape-4.jpg",
]

export function DimensionTabs({ dimensions }: DimensionTabsProps) {
  const [activeTab, setActiveTab] = useState(0)
  const sortedDimensions = [...dimensions].sort((a, b) => a.order - b.order)
  const activeDimension = sortedDimensions[activeTab]

  // Get images for grid - use dimension images or placeholders
  const gridImages = activeDimension.images && activeDimension.images.length >= 4 
    ? activeDimension.images.slice(0, 4) 
    : placeholderImages

  return (
    <div>
      {/* Tab Headers */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide">
          {sortedDimensions.map((dim, index) => (
            <button
              key={dim.id}
              onClick={() => setActiveTab(index)}
              className={cn(
                "whitespace-nowrap px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px",
                activeTab === index
                  ? "border-[#2e7d32] text-[#2e7d32]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {dim.tabTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div 
        key={activeDimension.id}
        className="grid gap-8 lg:grid-cols-2 animate-in fade-in duration-300"
      >
        {/* Left Content */}
        <div className="space-y-5">
          {/* Dimension Label Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[#fef7e0] px-4 py-1.5 text-sm font-medium text-[#8b7355]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
            {activeDimension.label}
          </span>

          {/* Title with Underline */}
          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] md:text-3xl">
              <span className="border-b-2 border-[#2e7d32] pb-1">{activeDimension.title}</span>
            </h3>
          </div>

          {/* Subtitle */}
          <h4 className="text-lg font-semibold text-[#1a1a1a]">
            {activeDimension.subtitle}
          </h4>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm">
            {activeDimension.description}
          </p>

          {/* Outcomes */}
          {activeDimension.outcomes && activeDimension.outcomes.length > 0 && (
            <div className="space-y-3 pt-2">
              <p className="text-sm font-semibold text-[#d97706]">Outcome:</p>
              <div className="space-y-2">
                {activeDimension.outcomes.map((outcome, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 rounded-lg bg-[#f5f5f5] px-4 py-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fef7e0]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#d4a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right - 2x2 Image Grid */}
        <div className="grid grid-cols-2 gap-3">
          {gridImages.map((img, idx) => (
            <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={img}
                alt={`${activeDimension.title} image ${idx + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to placeholder gradient on error
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.classList.add('bg-gradient-to-br', 'from-green-100', 'to-green-200')
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation Dots (Mobile) */}
      <div className="flex justify-center gap-2 pt-8 lg:hidden">
        {sortedDimensions.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              activeTab === index ? "w-6 bg-[#2e7d32]" : "bg-gray-300"
            )}
            aria-label={`Go to dimension ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
