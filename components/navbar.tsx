"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"

interface NavLink {
  label: string
  href: string
  order?: number
}

interface NavbarProps {
  data?: Record<string, unknown>
}

export default function Navbar({ data }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!data) return null

  const links = ((data.links as NavLink[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const ctaText = (data.ctaText as string) || ""

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <svg width="60" height="44" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 38L16 6h4l-14 32H5z" fill="#3B7D23" />
            <path d="M12 38L24 6h4L20 38h-8z" fill="#2563EB" />
            <path d="M20 38V6h4v32h-4z" fill="#1D4ED8" />
            <path d="M26 6h6l8 20-4 12h-6L26 6z" fill="#3B7D23" />
            <path d="M40 6c4 0 6 2 6 5s-2 5-6 5h-4l4-10z" fill="#3B7D23" />
            <path d="M40 20c4 0 6 2 6 5s-2 5-6 5l-4 8h-4l8-18z" fill="#3B7D23" />
            <line x1="46" y1="8" x2="54" y2="4" stroke="#8BC34A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="48" y1="14" x2="56" y2="12" stroke="#7CB342" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="sr-only">VBR Landscaping</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            className="hidden text-primary-foreground/80 transition-colors hover:text-primary-foreground xl:block"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          {ctaText && (
            <Link
              href="/contact"
              className="hidden rounded-full border-2 border-secondary bg-secondary px-5 py-2 text-sm font-bold tracking-wide text-primary uppercase transition-all hover:brightness-110 xl:block"
            >
              {ctaText}
            </Link>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-primary-foreground"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-primary-foreground/10 bg-primary/95 px-6 py-4 backdrop-blur-sm xl:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {ctaText && (
              <Link
                href="/contact"
                className="mt-2 rounded-full bg-secondary px-6 py-2.5 text-center text-sm font-bold uppercase text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {ctaText}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
