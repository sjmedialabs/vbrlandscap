"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { type SectorContent, type SectorListItem, defaultSectorContent } from "@/lib/sectors-types"

interface SectorsContentProps {
  content: SectorContent
  sectorsList: SectorListItem[]
}

export function SectorsContent({ content: initialContent, sectorsList }: SectorsContentProps) {
  const [content, setContent] = useState<SectorContent>(initialContent)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleSectorChange = async (event: CustomEvent<{ sectorId: string }>) => {
      const { sectorId } = event.detail
      setIsLoading(true)

      try {
        const res = await fetch(`/api/sectors/${sectorId}`)
        if (res.ok) {
          const data = await res.json()
          setContent(data)
        } else {
          // Use default content if fetch fails
          setContent({
            id: `content_${sectorId}`,
            sectorId,
            ...defaultSectorContent,
          })
        }
      } catch (error) {
        console.error("Failed to fetch sector content:", error)
        setContent({
          id: `content_${sectorId}`,
          sectorId,
          ...defaultSectorContent,
        })
      } finally {
        setIsLoading(false)
      }
    }

    window.addEventListener("sectorChange", handleSectorChange as unknown as EventListener)
    return () => {
      window.removeEventListener("sectorChange", handleSectorChange as unknown as EventListener)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-80 bg-[#e5e8dc] rounded-2xl" />
        <div className="space-y-4">
          <div className="h-6 bg-[#e5e8dc] rounded w-1/3" />
          <div className="h-4 bg-[#e5e8dc] rounded w-full" />
          <div className="h-4 bg-[#e5e8dc] rounded w-full" />
          <div className="h-4 bg-[#e5e8dc] rounded w-2/3" />
        </div>
      </div>
    )
  }

  // Get current sector name for heading
  const currentSector = sectorsList.find(s => s.id === content.sectorId)
  const sectorName = currentSector?.name || "Professional Turfing Services"

  return (
    <div className="space-y-8">
      {/* Main Featured Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
        {content.mainImage ? (
          <Image
            src={content.mainImage}
            alt={sectorName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#e5e8dc]">
            <span className="text-[#666]">No image available</span>
          </div>
        )}
      </div>

      {/* Description Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">{sectorName}</h2>
        <div className="text-[#555] leading-relaxed space-y-4">
          {content.description.split("\n\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      {content.galleryImages && content.galleryImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {content.galleryImages.map((image, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md group"
            >
              <Image
                src={image}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
