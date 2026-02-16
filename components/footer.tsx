import Link from "next/link"
import { Leaf, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about#team" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
]

const serviceLinks = [
  { label: "Design & Planning", href: "/services/design" },
  { label: "Tree & Plant Care", href: "/services/tree-care" },
  { label: "Drainage Systems", href: "/services/drainage" },
  { label: "Seasonal Clean-up", href: "/services/cleanup" },
  { label: "Maintenance", href: "/services/maintenance" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-7 w-7 text-secondary" />
              <span className="text-xl font-bold text-primary-foreground">
                Landscope
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60">
              We are a full-service landscaping company dedicated to
              transforming outdoor spaces with sustainable and innovative design
              solutions.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/60 transition-colors hover:bg-secondary hover:text-secondary-foreground"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary-foreground uppercase">
              Company
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
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

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary-foreground uppercase">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((link) => (
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

          {/* Address */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary-foreground uppercase">
              Address
            </h3>
            <ul className="mt-4 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/60">
                  123 Green Valley Road, Garden District, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/60">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/60">
                  info@landscope.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-primary-foreground/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-primary-foreground/40">
              {"Copyright 2026 Landscope. All rights reserved."}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-primary-foreground/40 transition-colors hover:text-primary-foreground/60"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-primary-foreground/40 transition-colors hover:text-primary-foreground/60"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
