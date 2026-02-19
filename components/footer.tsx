import Link from "next/link"
import Image from "next/image"
import { Leaf, MapPin, Phone, Mail } from "lucide-react"

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

interface FooterProps {
  data?: Record<string, unknown>
  branding?: Record<string, unknown>
}

export default function Footer({ data, branding }: FooterProps) {
  if (!data) return null

  const footerLogo = (branding?.footerLogo as string) || ""
  const brandName = data.brandName as string
  const brandDescription = data.brandDescription as string
  const address = data.address as string
  const phone = data.phone as string
  const email = data.email as string
  const copyright = data.copyright as string
  const socialLinks = ((data.socialLinks as SocialLink[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const companyLinks = ((data.companyLinks as FooterLink[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const serviceLinks = ((data.serviceLinks as FooterLink[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              {footerLogo ? (
                <Image src={footerLogo} alt={brandName} width={120} height={44} className="h-11 w-auto object-contain" />
              ) : (
                <Leaf className="h-7 w-7 text-secondary" />
              )}
              <span className="text-xl font-bold text-primary-foreground">{brandName}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60">{brandDescription}</p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-secondary" aria-label={social.label}>
                  <Image src={social.image} alt={social.label} width={16} height={16} className="h-4 w-4 object-contain" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary-foreground uppercase">Company</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary-foreground uppercase">Services</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary-foreground uppercase">Address</h3>
            <ul className="mt-4 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/60">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/60">{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/60">{email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-primary-foreground/40">{copyright}</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-primary-foreground/40 transition-colors hover:text-primary-foreground/60">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-primary-foreground/40 transition-colors hover:text-primary-foreground/60">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
