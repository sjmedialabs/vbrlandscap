"use client"

import { useState } from "react"
import Image from "next/image"

interface DimensionData {
  name: string
  subtitle: string
  description: string
  outcome1: string
  outcome2: string
  image1: string
  image2: string
  image3: string
  image4: string
  order?: number
}

interface DimensionTabsProps {
  dimensions: DimensionData[]
}

export default function DimensionTabs({ dimensions }: DimensionTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = dimensions[activeIndex]
  if (!active) return null

  return (
    <div>
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-[#e5e5e5]">
        {dimensions.map((dim, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 px-4 py-3 text-xs font-semibold tracking-wide transition-colors ${
              i === activeIndex
                ? "border-b-2 border-[#2d6a2e] text-[#2d6a2e]"
                : "text-[#777] hover:text-[#1a1a1a]"
            }`}
          >
            {dim.name}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Left: Text */}
        <div className="w-full lg:w-5/12">
          <span className="inline-block rounded-full bg-[#1a1a1a] px-4 py-1.5 text-[10px] font-semibold tracking-widest text-white uppercase">
            Dimension {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-3xl font-extrabold leading-tight text-[#2d6a2e] md:text-4xl">
            {active.name.replace("\u2122", "")}
          </h3>
          <p className="mt-1 text-lg font-semibold text-[#1a1a1a]">{active.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#555]">{active.description}</p>

          {/* Outcomes */}
          {(active.outcome1 || active.outcome2) && (
            <div className="mt-6">
              <p className="text-xs font-bold tracking-wider text-[#c5a72e] uppercase">Outcome:</p>
              <div className="mt-3 flex flex-col gap-3">
                {active.outcome1 && (
                  <div className="flex items-start gap-3 rounded-xl bg-[#f5f7f0] px-4 py-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2d6a2e]/10">
                      <svg className="h-4 w-4 text-[#2d6a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#333]">{active.outcome1}</p>
                  </div>
                )}
                {active.outcome2 && (
                  <div className="flex items-start gap-3 rounded-xl bg-[#f5f7f0] px-4 py-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2d6a2e]/10">
                      <svg className="h-4 w-4 text-[#2d6a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#333]">{active.outcome2}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: 2x2 Image Grid */}
        <div className="w-full lg:w-7/12">
          <div className="grid grid-cols-2 gap-3">
            {[active.image1, active.image2, active.image3, active.image4].map((img, i) =>
              img ? (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={img} alt={`${active.name} image ${i + 1}`} fill className="object-cover" />
                </div>
              ) : (
                <div key={i} className="aspect-[4/3] rounded-xl bg-[#e5e5e5]" />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
