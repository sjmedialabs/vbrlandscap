"use client"

import { type ProcessStep } from "@/lib/sectors-types"

interface ServiceProcessProps {
  steps: ProcessStep[]
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      {sortedSteps.map((step, idx) => (
        <div
          key={step.id}
          className="flex gap-6 items-start py-6 border-b border-[#e5e8dc] last:border-b-0"
        >
          {/* Step Number */}
          <div className="flex-shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#b9c44b] text-white">
              <span className="text-xl font-bold">{step.number}</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-[#666] leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
