import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getSection } from "@/lib/firestore"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Send } from "lucide-react"
import { ContactForm } from "./contact-form"

export const dynamic = "force-dynamic"

// Dynamic SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  let seo: Record<string, unknown> | null = null
  try {
    seo = await getSection("seo")
  } catch { /* ignore */ }

  const pages = (seo?.pages as { slug: string; title: string; description: string; ogImage?: string; keywords?: string }[]) || []
  const match = pages.find((p) => p.slug === "/contact")

  return {
    title: match?.title || "Contact Us - VBR Landscaping",
    description: match?.description || "Get in touch with VBR Landscaping. Book an appointment or reach out for any queries.",
    keywords: match?.keywords || "",
    openGraph: match?.ogImage ? { images: [{ url: match.ogImage }] } : undefined,
  }
}

export default async function ContactPage() {
  let contactData: Record<string, unknown> | null = null
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    const [contactResult, navData, footerData, brandingData] = await Promise.all([
      getSection("page-contact"),
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
    ])
    contactData = contactResult
    navbar = navData
    footer = footerData
    branding = brandingData
  } catch (error) {
    console.error("[ContactPage] Failed to fetch sections:", error)
  }

  // ─── Hero Fallbacks ───
  const heroTitle = (contactData?.heroTitle as string) || "Contact Us"
  const heroBreadcrumb = (contactData?.heroBreadcrumb as string) || "Contact Us"
  const heroImage = (contactData?.heroImage as string) || "/images/hero-bg.jpg"

  // ─── Contact Info Fallbacks ───
  const addressTitle = (contactData?.addressTitle as string) || "Address Line"
  const addressLines = (contactData?.addressLines as string[]) || [
    "Bowery St, New York, 37 USA",
    "NY 10013USA",
  ]
  const phoneTitle = (contactData?.phoneTitle as string) || "Phone Number"
  const phones = (contactData?.phones as string[]) || [
    "+0175 - 005 - 0088 0175-005",
    "+0175 - 005 - 0088",
  ]
  const emailTitle = (contactData?.emailTitle as string) || "Mail Adress"
  const emails = (contactData?.emails as string[]) || [
    "info@yourdomain.com",
    "email@example.com",
  ]

  // ─── Map Fallbacks ───
  const mapEmbedUrl = (contactData?.mapEmbedUrl as string) || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542!2d-0.1195!3d51.5034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c38c8cd1d9%3A0xb78f2474b9a45aa9!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1234567890"

  // ─── Form Settings Fallbacks ───
  const formBadge = (contactData?.formBadge as string) || "Get IN Touch"
  const formHeading = (contactData?.formHeading as string) || "Book An Appointment"
  const formSuccessMessage = (contactData?.formSuccessMessage as string) || "Your message has been sent successfully. We will get back to you soon."
  const formEnabled = contactData?.formEnabled !== false

  // ─── Newsletter Fallbacks ───
  const newsHeading = (contactData?.newsletterHeading as string) || "Stay Updated With Expert Advice"
  const newsDescription = (contactData?.newsletterDescription as string) || "Join our mailing list to receive professional landscaping tips and exclusive"
  const newsPlaceholder = (contactData?.newsletterPlaceholder as string) || "Enter your email"

  return (
    <main className="min-h-screen bg-[#f5f7f0]">
      <Navbar data={navbar ?? undefined} branding={branding ?? undefined} />

      {/* ═══════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative min-h-[280px] flex items-center justify-center overflow-hidden pt-20">
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center">
          <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl mb-6">
            {heroTitle}
          </h1>
          <nav className="flex items-center justify-center gap-4 text-base text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-[#b9c44b]">{heroBreadcrumb}</span>
          </nav>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT INFO CARDS
         ═══════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-[#f5f7f0]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Address Card */}
            <div className="rounded-2xl bg-white border border-[#e8ebe0] p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-[#c5a44e]/40 bg-[#fdf8ed]">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 3C12.2 3 7.5 7.7 7.5 13.5C7.5 21.75 18 33 18 33S28.5 21.75 28.5 13.5C28.5 7.7 23.8 3 18 3ZM18 17.25C15.93 17.25 14.25 15.57 14.25 13.5C14.25 11.43 15.93 9.75 18 9.75C20.07 9.75 21.75 11.43 21.75 13.5C21.75 15.57 20.07 17.25 18 17.25Z" fill="#c5a44e"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{addressTitle}</h3>
              <div className="space-y-1">
                {addressLines.map((line, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{line}</p>
                ))}
              </div>
            </div>

            {/* Phone Card */}
            <div className="rounded-2xl bg-white border border-[#e8ebe0] p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-[#c5a44e]/40 bg-[#fdf8ed]">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M10.05 15.9C12.05 19.82 15.18 22.94 19.1 24.95L22.1 21.95C22.47 21.58 23.01 21.47 23.48 21.63C25.04 22.14 26.72 22.41 28.5 22.41C29.33 22.41 30 23.08 30 23.91V28.5C30 29.33 29.33 30 28.5 30C15.52 30 5 19.48 5 6.5C5 5.67 5.67 5 6.5 5H11.1C11.93 5 12.6 5.67 12.6 6.5C12.6 8.29 12.87 9.96 13.38 11.52C13.53 11.99 13.43 12.52 13.05 12.9L10.05 15.9Z" fill="#c5a44e"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{phoneTitle}</h3>
              <div className="space-y-1">
                {phones.map((phone, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{phone}</p>
                ))}
              </div>
            </div>

            {/* Email Card */}
            <div className="rounded-2xl bg-white border border-[#e8ebe0] p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-[#c5a44e]/40 bg-[#fdf8ed]">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M30 6H6C4.35 6 3.015 7.35 3.015 9L3 27C3 28.65 4.35 30 6 30H30C31.65 30 33 28.65 33 27V9C33 7.35 31.65 6 30 6ZM30 12L18 19.5L6 12V9L18 16.5L30 9V12Z" fill="#c5a44e"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{emailTitle}</h3>
              <div className="space-y-1">
                {emails.map((email, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{email}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MAP + APPOINTMENT FORM
         ═══════════════════════════════════════ */}
      <section className="pb-16 lg:pb-24 bg-[#f5f7f0]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white border border-[#e8ebe0] p-6 md:p-10 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left – Google Map */}
              <div className="relative w-full overflow-hidden rounded-2xl min-h-[360px] lg:min-h-[460px]">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "100%", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VBR Location Map"
                />
              </div>

              {/* Right – Appointment Form */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4d9c4] px-4 py-1.5 mb-4">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  <span className="text-sm font-medium text-foreground">{formBadge}</span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-6">
                  {formHeading}
                </h2>

                {/* Form */}
                <ContactForm
                  enabled={formEnabled}
                  successMessage={formSuccessMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NEWSLETTER SECTION
         ═══════════════════════════════════════ */}
      <section className="py-8 bg-[#e8f0c8]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <h3 className="text-2xl font-bold text-foreground whitespace-nowrap">
              {newsHeading.split(' ').slice(0, 3).join(' ')}<br className="hidden sm:block" />
              {newsHeading.split(' ').slice(3).join(' ')}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs text-center lg:text-left">
              {newsDescription}
            </p>
            <form className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                placeholder={newsPlaceholder}
                className="flex-1 rounded-full bg-white border border-[#d4d9c4] px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer data={footer ?? undefined} branding={branding ?? undefined} />
    </main>
  )
}
