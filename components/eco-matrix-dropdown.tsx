"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  label: string
  href: string
  description?: string
  order: number
}

interface Capability {
  id: string
  title: string
  description: string
  icon?: string
  order: number
}

interface EcoMatrixDropdownProps {
  label: string
  leftItems: MenuItem[]
  capabilities: Capability[]
  isScrolled?: boolean
}

export function EcoMatrixDropdown({ label, leftItems, capabilities, isScrolled }: EcoMatrixDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sort items by order
  const sortedLeftItems = [...leftItems].sort((a, b) => a.order - b.order)
  const sortedCapabilities = [...capabilities].sort((a, b) => a.order - b.order)

  // Handle hover with delay for desktop
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsMobileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        setIsMobileOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Desktop Trigger */}
      <button
        className={cn(
          "hidden xl:flex items-center gap-1 text-sm font-medium transition-colors",
          isScrolled 
            ? "text-primary-foreground/90 hover:text-primary-foreground" 
            : "text-primary-foreground/90 hover:text-primary-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Mobile Trigger */}
      <button
        className={cn(
          "xl:hidden flex items-center gap-1 text-sm font-medium transition-colors",
          "text-primary-foreground/90 hover:text-primary-foreground"
        )}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-expanded={isMobileOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isMobileOpen && "rotate-180"
        )} />
      </button>

      {/* Desktop Mega Dropdown */}
      <div
        className={cn(
          "absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 transform",
          "hidden xl:block",
          "w-[800px] rounded-2xl border border-border bg-white p-6 shadow-xl",
          "transition-all duration-200 origin-top",
          isOpen 
            ? "opacity-100 scale-100 pointer-events-auto" 
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="grid grid-cols-5 gap-6">
          {/* Left Section - Menu Links */}
          <div className="col-span-2 space-y-1">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              ECO-MATRIX
            </p>
            {sortedLeftItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-primary/5"
                onClick={() => setIsOpen(false)}
              >
                <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                {item.description && (
                  <span className="block mt-0.5 text-xs text-muted-foreground">{item.description}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Section - Capabilities Grid */}
          <div className="col-span-3 border-l border-border pl-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Capabilities
            </p>
            <div className="grid grid-cols-2 gap-3">
              {sortedCapabilities.map((cap) => (
                <div
                  key={cap.id}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-primary/5"
                >
                  {cap.icon ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Image 
                        src={cap.icon} 
                        alt="" 
                        width={24} 
                        height={24} 
                        className="h-6 w-6 object-contain" 
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <span className="text-sm font-bold text-primary">
                        {cap.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground">{cap.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <div className="xl:hidden absolute left-0 top-full z-50 mt-2 w-screen max-w-[calc(100vw-3rem)] -translate-x-1/2 rounded-xl border border-border bg-white p-4 shadow-lg">
          <div className="space-y-4">
            {/* Menu Links */}
            <div className="space-y-1">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                ECO-MATRIX
              </p>
              {sortedLeftItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-primary/5"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Capabilities */}
            <div className="border-t border-border pt-4 space-y-1">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Capabilities
              </p>
              <div className="grid grid-cols-2 gap-2">
                {sortedCapabilities.map((cap) => (
                  <div
                    key={cap.id}
                    className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-primary/5"
                  >
                    {cap.icon ? (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Image 
                          src={cap.icon} 
                          alt="" 
                          width={16} 
                          height={16} 
                          className="h-4 w-4 object-contain" 
                        />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <span className="text-xs font-bold text-primary">
                          {cap.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <p className="text-xs font-medium text-foreground">{cap.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Default menu data for when database is not seeded
export const defaultEcoMatrixMenu = {
  leftItems: [
    {
      id: "10-dimensions",
      label: "10-Dimension Architecture",
      href: "/eco-matrix/10-dimensions",
      description: "Our comprehensive landscape intelligence framework",
      order: 0,
    },
    {
      id: "nature-framework",
      label: "N.A.T.U.R.E Framework",
      href: "/eco-matrix/nature-framework",
      description: "Six-pillar engineering methodology",
      order: 1,
    },
    {
      id: "overview",
      label: "ECO-MATRIX Overview",
      href: "/eco-matrix/overview",
      description: "Learn about our proprietary system",
      order: 2,
    },
  ],
  capabilities: [
    {
      id: "archiq",
      title: "ARCHIQ™",
      description: "Geo-Diagnostics & Spatial Intelligence",
      order: 0,
    },
    {
      id: "plantiq",
      title: "PLANTIQ™",
      description: "Bio-Asset Sourcing & Authentication",
      order: 1,
    },
    {
      id: "hydro-logic",
      title: "HYDRO-LOGIC™",
      description: "Integrated Water Engineering",
      order: 2,
    },
    {
      id: "core-build",
      title: "CORE-BUILD™",
      description: "Outdoor Infrastructure Engineering",
      order: 3,
    },
    {
      id: "vertic-tech",
      title: "VERTIC-TECH™",
      description: "Elevated Landscape Systems",
      order: 4,
    },
    {
      id: "eco-regen",
      title: "ECO-REGEN™",
      description: "Ecological Regeneration Systems",
      order: 5,
    },
  ],
}
