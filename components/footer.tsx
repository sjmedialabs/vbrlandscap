import Link from "next/link"
import Image from "next/image"
import { Leaf, ChevronRight } from "lucide-react"
import { getSectorsList } from "@/lib/sectors-firestore"
import type { SectorListItem } from "@/lib/sectors-types"

interface SocialLink {
  image: string
  href: string
  label: string
  order?: number
}

interface FooterLink {
  label: string
  href: string
  order?: number
}

interface PolicyLink {
  label: string
  href: string
  order?: number
}

interface FooterProps {
  data?: Record<string, unknown>
  branding?: Record<string, unknown>
}

export default async function Footer({ data, branding }: FooterProps) {
  if (!data) return null

  // Fetch active sectors from Firestore for dynamic sector links
  let activeSectors: SectorListItem[] = []
  try {
    const allSectors = await getSectorsList()
    activeSectors = allSectors.filter((s) => s.isActive).sort((a, b) => a.order - b.order)
  } catch {
    // Fall back to CMS-managed links if fetch fails
  }

  const footerLogo = (branding?.footerLogo as string) || ""
  const brandName = (data.brandName as string) || "Landspire"
  const brandDescription = (data.brandDescription as string) || ""
  const ctaButtonText = (data.ctaButtonText as string) || "Get Appointment"
  const ctaButtonLink = (data.ctaButtonLink as string) || "/contact"
  const companyName = (data.companyName as string) || "VBR Landscaping Pvt. Ltd."
  const addressText = (data.addressText as string) || (data.address as string) || ""
  const phone = (data.phone as string) || ""
  const email = (data.email as string) || ""
  const copyright = (data.copyright as string) || ""
  const hoursWeekday = (data.hoursWeekday as string) || "9.00 am - 8.00pm"
  const hoursWeekend = (data.hoursWeekend as string) || "10.00 am - 8.00pm"
  const socialLinks = ((data.socialLinks as SocialLink[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // Company links: filter to only valid hrefs
  const companyLinks = ((data.companyLinks as FooterLink[]) || [])
    .filter((link) => link.href && link.label)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // Sector links: prefer active sectors from Firestore, fall back to CMS data
  const sectorLinks: FooterLink[] =
    activeSectors.length > 0
      ? activeSectors.map((s) => ({
          label: s.name,
          href: `/sectors?sector=${s.id}`,
          order: s.order,
        }))
      : ((data.sectorLinks as FooterLink[]) || (data.serviceLinks as FooterLink[]) || [])
          .filter((link) => link.href && link.label)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const policyLinks = ((data.policyLinks as PolicyLink[]) || [
    { label: "Terms &", href: "/terms", order: 1 },
    { label: "Privacy", href: "/privacy", order: 2 },
    { label: "Contact", href: "/contact", order: 3 },
  ])
    .filter((link) => link.href && link.label)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <footer className="relative overflow-hidden bg-primary">
      {/* ── Decorative Leaf Patterns ─────────────────── */}
      {/* Left side decorative element */}
      <div className="pointer-events-none absolute bottom-16 left-0 z-0 w-16 opacity-40 lg:w-24">
        <svg viewBox="0 0 80 180" fill="none" className="h-full w-full">
          <rect x="-20" y="20" width="50" height="140" rx="4" fill="#1b5e20" opacity="0.5" transform="rotate(-8 5 90)" />
          <rect x="-10" y="40" width="45" height="120" rx="4" fill="#2e7d32" opacity="0.4" transform="rotate(-4 10 100)" />
          <circle cx="20" cy="160" r="6" fill="#66bb6a" opacity="0.6" />
        </svg>
      </div>

      {/* Right side decorative leaf patterns */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-32 lg:w-48">
        <svg viewBox="0 0 160 500" fill="none" className="h-full w-full" preserveAspectRatio="xMaxYMid slice">
          {/* Top leaf cluster */}
          <g opacity="0.18">
            <path d="M120 40c-20 5-35 25-30 50s25 35 50 30c-5-20-25-35-50-30l30-50z" fill="#4caf50" />
            <path d="M140 50c-15 8-25 28-18 48s28 28 48 18c-8-15-28-25-48-18l18-48z" fill="#66bb6a" />
            <path d="M100 70c-18 10-28 32-20 52s30 28 52 20c-10-18-32-28-52-20l20-52z" fill="#4caf50" />
          </g>
          {/* Middle leaf cluster */}
          <g opacity="0.15">
            <path d="M130 180c-22 8-38 30-32 55s28 38 55 32c-8-22-30-38-55-32l32-55z" fill="#388e3c" />
            <path d="M150 200c-18 10-30 35-22 55s30 30 55 22c-10-18-35-30-55-22l22-55z" fill="#4caf50" />
            <path d="M110 210c-20 12-32 36-24 58s32 32 58 24c-12-20-36-32-58-24l24-58z" fill="#66bb6a" />
          </g>
          {/* Bottom leaf cluster */}
          <g opacity="0.12">
            <path d="M125 340c-22 8-38 30-32 55s28 38 55 32c-8-22-30-38-55-32l32-55z" fill="#388e3c" />
            <path d="M145 360c-18 10-30 35-22 55s30 30 55 22c-10-18-35-30-55-22l22-55z" fill="#4caf50" />
            <path d="M105 370c-20 12-32 36-24 58s32 32 58 24c-12-20-36-32-58-24l24-58z" fill="#66bb6a" />
          </g>
        </svg>
      </div>

      {/* ── Main Content ─────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8">
        {/* Top Footer: 4 Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          {/* Column 1 — Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              {footerLogo ? (
                <Image
                  src={footerLogo}
                  alt={brandName}
                  width={120}
                  height={44}
                  className="h-11 w-auto object-contain"
                />
              ) : (
                <Leaf className="h-7 w-7 text-secondary" />
              )}
              <span className="text-xl font-bold text-primary-foreground">
                {brandName}
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60">
              {brandDescription}
            </p>

            {/* Get Appointment Button */}
            <Link
              href={ctaButtonLink}
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-secondary bg-secondary pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary transition-all hover:brightness-110"
            >
              {ctaButtonText}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <ChevronRight className="h-4 w-4 text-primary" />
              </span>
            </Link>
          </div>

          {/* Column 2 — Company Links */}
          <div>
            <h3 className="text-base font-bold text-primary-foreground">
              Company
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Sectors Links */}
          <div>
            <h3 className="text-base font-bold text-primary-foreground">
              Sectors
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {sectorLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Address */}
          <div>
            <h3 className="text-base font-bold text-primary-foreground">
              Address
            </h3>
            <div className="mt-5 space-y-1">
              <p className="text-sm text-primary-foreground/80">
                {companyName}
              </p>
              <p className="text-sm leading-relaxed text-primary-foreground/60">
                {addressText}
              </p>
            </div>

            {(phone || email) && (
              <div className="mt-4">
                <h4 className="text-base font-bold text-primary-foreground">
                  Phone
                </h4>
                <div className="mt-2 space-y-1">
                  {phone && (
                    <p className="text-sm text-primary-foreground/60">
                      {phone}
                    </p>
                  )}
                  {email && (
                    <p className="text-sm text-primary-foreground/60">
                      {email}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Middle Footer: Business Hours + Social Icons ── */}
        <div className="mt-12 border-t border-primary-foreground/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Business Hours */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-12">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary-foreground">
                  Mon - Fri:
                </span>
                <span className="text-sm text-primary-foreground/60">
                  {hoursWeekday}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary-foreground">
                  Saturday:
                </span>
                <span className="text-sm text-primary-foreground/60">
                  {hoursWeekend}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-secondary"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={social.image}
                    alt={social.label}
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Footer: Copyright + Policy Links ──── */}
        <div className="mt-6 border-t border-primary-foreground/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-primary-foreground/40">{copyright}</p>
            <div className="flex items-center gap-8">
              {policyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium text-primary-foreground/60 underline decoration-primary-foreground/20 underline-offset-2 transition-colors hover:text-primary-foreground hover:decoration-primary-foreground/40"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
