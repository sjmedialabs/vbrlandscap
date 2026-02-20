"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Send } from "lucide-react"
import { type SectorListItem, type ExpertCard } from "@/lib/sectors-types"

interface SectorsSidebarProps {
  title: string
  sectors: SectorListItem[]
  expertCard: ExpertCard
}

export function SectorsSidebar({ title, sectors, expertCard }: SectorsSidebarProps) {
  const searchParams = useSearchParams()
  const sectorParam = searchParams.get("sector")

  // Resolve initial sector: from URL param if it matches an active sector, else first
  const initialSectorId =
    sectorParam && sectors.some((s) => s.id === sectorParam)
      ? sectorParam
      : sectors[0]?.id || ""

  const [activeSector, setActiveSector] = useState<string>(initialSectorId)

  // When the URL param matches a valid sector, switch to it and load content
  useEffect(() => {
    if (sectorParam && sectors.some((s) => s.id === sectorParam) && sectorParam !== activeSector) {
      setActiveSector(sectorParam)
      window.dispatchEvent(new CustomEvent("sectorChange", { detail: { sectorId: sectorParam } }))
    }
    // Only run when sectorParam changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectorParam])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSectorClick = (sectorId: string) => {
    setActiveSector(sectorId)
    // Dispatch custom event for content component to listen
    window.dispatchEvent(new CustomEvent("sectorChange", { detail: { sectorId } }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const res = await fetch("/api/sectors/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", phone: "", message: "" })
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Sectors List Card */}
      <div className="rounded-2xl border border-[#e5e8dc] bg-[#f9faf5] p-6">
        <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">{title}</h3>
        <nav className="space-y-2">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => handleSectorClick(sector.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSector === sector.id
                  ? "bg-[#2d6a2e] text-white"
                  : "bg-white border border-[#e5e8dc] text-[#1a1a1a] hover:border-[#2d6a2e] hover:text-[#2d6a2e]"
              }`}
            >
              {sector.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Expert Card */}
      <div className="rounded-2xl bg-[#f0f4e8] p-6 text-center">
        <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
          {expertCard.image ? (
            <Image
              src={expertCard.image}
              alt="Expert"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#2d6a2e]">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          )}
        </div>
        <h4 className="text-base font-bold text-[#1a1a1a] mb-1">
          {expertCard.title || "Need help? Talk to expert."}
        </h4>
        <p className="text-sm text-[#666] mb-4">
          {expertCard.subtitle || "Contact With us for any advice"}
        </p>
        <Link
          href={expertCard.buttonLink || "/contact"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d6a2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#245a25] transition-colors"
        >
          {expertCard.buttonText || "Contact Us"}
        </Link>
      </div>

      {/* More Services Form */}
      <div className="rounded-2xl border border-[#e5e8dc] bg-white p-6">
        <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">More Services</h3>
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-[#e5e8dc] bg-[#f9faf5] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-[#2d6a2e]"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-[#e5e8dc] bg-[#f9faf5] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-[#2d6a2e]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full rounded-lg border border-[#e5e8dc] bg-[#f9faf5] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-[#2d6a2e]"
            />
            <input
              type="tel"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border border-[#e5e8dc] bg-[#f9faf5] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-[#2d6a2e]"
            />
          </div>
          <textarea
            placeholder="Write a Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-[#e5e8dc] bg-[#f9faf5] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-[#2d6a2e] resize-none"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors ${
              submitStatus === "success"
                ? "bg-green-600"
                : submitStatus === "error"
                ? "bg-red-500"
                : "bg-[#2d6a2e] hover:bg-[#245a25]"
            } ${isSubmitting ? "opacity-60" : ""}`}
          >
            <Send className="h-4 w-4" />
            {submitStatus === "success"
              ? "Message Sent!"
              : submitStatus === "error"
              ? "Try Again"
              : isSubmitting
              ? "Sending..."
              : "SEND A MESSAGE"}
          </button>
        </form>
      </div>
    </aside>
  )
}
