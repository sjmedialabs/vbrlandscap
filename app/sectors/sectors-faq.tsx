"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { type FAQItem } from "@/lib/sectors-types"

interface SectorsFAQProps {
  faqs: FAQItem[]
}

export function SectorsFAQ({ faqs }: SectorsFAQProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null)
  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order)

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {sortedFaqs.map((faq) => {
        const isOpen = openId === faq.id

        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? "border-[#2d6a2e] bg-[#f5f7f0]"
                : "border-[#e5e8dc] bg-white hover:border-[#d0d5c0]"
            }`}
          >
            <button
              onClick={() => handleToggle(faq.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-base font-semibold text-[#1a1a1a]">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 text-[#666] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Animated Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-5">
                <p className="text-sm text-[#666] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
