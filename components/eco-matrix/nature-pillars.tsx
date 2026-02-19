"use client"

import { useState } from "react"

interface Pillar {
  letter: string
  title: string
  description: string
  feature1Title: string
  feature2Title: string
  feature3Title: string
  feature4Title: string
  outcomeTitle: string
  outcomeDescription: string
  order?: number
}

interface NaturePillarsProps {
  pillars: Pillar[]
}

// Colors for each pillar column
const pillarColors = [
  { bg: "bg-[#2d6a2e]", text: "text-white", headerBg: "bg-[#2d6a2e]", letterBg: "bg-[#1d4a1e]" },
  { bg: "bg-[#4a8c2a]", text: "text-white", headerBg: "bg-[#4a8c2a]", letterBg: "bg-[#3a7020]" },
  { bg: "bg-[#6d8c21]", text: "text-white", headerBg: "bg-[#6d8c21]", letterBg: "bg-[#5a7418]" },
  { bg: "bg-[#c5a72e]", text: "text-white", headerBg: "bg-[#c5a72e]", letterBg: "bg-[#a88e22]" },
  { bg: "bg-[#8fbc5a]", text: "text-white", headerBg: "bg-[#8fbc5a]", letterBg: "bg-[#72a040]" },
  { bg: "bg-[#a8d08d]", text: "text-[#1a1a1a]", headerBg: "bg-[#a8d08d]", letterBg: "bg-[#8bb870]" },
]

export default function NaturePillars({ pillars }: NaturePillarsProps) {
  const [expandedIndex, setExpandedIndex] = useState(0)

  return (
    <div className="flex gap-2">
      {pillars.map((pillar, i) => {
        const isExpanded = expandedIndex === i
        const colors = pillarColors[i % pillarColors.length]
        const features = [
          pillar.feature1Title,
          pillar.feature2Title,
          pillar.feature3Title,
          pillar.feature4Title,
        ].filter(Boolean)

        return (
          <div
            key={i}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out ${
              colors.bg
            } ${isExpanded ? "flex-[4]" : "flex-[0.6]"}`}
            onMouseEnter={() => setExpandedIndex(i)}
            onClick={() => setExpandedIndex(i)}
          >
            {/* Collapsed state */}
            <div
              className={`absolute inset-0 flex items-start justify-center pt-8 transition-opacity duration-300 ${
                isExpanded ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <span className={`text-4xl font-extrabold ${colors.text}`}>
                {pillar.letter}
              </span>
            </div>

            {/* Expanded content */}
            <div
              className={`h-full min-h-[480px] p-6 transition-opacity duration-500 ${
                isExpanded ? "opacity-100" : "pointer-events-none opacity-0"
              } ${colors.text}`}
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold">{pillar.letter}</span>
                <span className="text-sm font-medium opacity-80">{" \u2014 "}</span>
                <span className="text-sm font-bold">{pillar.title}</span>
                <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs leading-relaxed opacity-85">
                {pillar.description}
              </p>

              {/* Features grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {features.map((feat, fi) => (
                  <div key={fi} className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
                      </svg>
                    </div>
                    <p className="text-[11px] leading-snug opacity-90">{feat}</p>
                  </div>
                ))}
              </div>

              {/* Outcome */}
              <div className="mt-6">
                <p className="text-xs font-bold">{pillar.outcomeTitle}</p>
                <p className="mt-1 text-[11px] leading-relaxed opacity-85">
                  {pillar.outcomeDescription}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
