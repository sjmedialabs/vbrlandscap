import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getSection } from "@/lib/firestore"
import {
  getCareersPageData,
  defaultCareersPageData,
  type CareersPageData,
} from "@/lib/careers-firestore"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PerksSection } from "./perks-section"
import { CultureSection } from "./culture-section"
import { WorkEnvironmentSection } from "./work-environment-section"
import { CareersCTA } from "./careers-cta"
import { CareersNewsletter } from "./careers-newsletter"

export const dynamic = "force-dynamic"

// Dynamic SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  let seo: Record<string, unknown> | null = null
  try {
    seo = await getSection("seo")
  } catch { /* ignore */ }

  const pages = (seo?.pages as { slug: string; title: string; description: string; ogImage?: string; keywords?: string }[]) || []
  const match = pages.find((p) => p.slug === "/careers")

  return {
    title: match?.title || "Careers - VBR Landscaping",
    description: match?.description || "Build living infrastructure. Grow with purpose. Join our team at VBR Landscaping.",
    keywords: match?.keywords || "",
    openGraph: match?.ogImage ? { images: [{ url: match.ogImage }] } : undefined,
  }
}

export default async function CareersPage() {
  // Fetch all required data
  let pageData: CareersPageData | null = null
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    const [pageDataResult, navData, footerData, brandingData] = await Promise.all([
      getCareersPageData(),
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
    ])

    pageData = pageDataResult || defaultCareersPageData
    navbar = navData
    footer = footerData
    branding = brandingData
  } catch (error) {
    console.error("[CareersPage] Failed to fetch data:", error)
    pageData = defaultCareersPageData
  }

  // Fallback values
  const heroTitle = pageData?.heroTitle || "Build Living Infrastructure. Grow With Purpose."
  const heroBackground = pageData?.heroImage || "/images/hero-bg.jpg"
  const breadcrumb = pageData?.heroBreadcrumb || "Career"

  return (
    <main className="min-h-screen bg-[#f5f7f0]">
      <Navbar data={navbar ?? undefined} branding={branding ?? undefined} />

      {/* Hero Section */}
      <section className="relative min-h-[320px] flex items-center justify-center overflow-hidden pt-20">
        {heroBackground && (
          <Image
            src={heroBackground}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto leading-tight">
            {heroTitle}
          </h1>
          <nav className="flex items-center justify-center gap-4 text-base text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-[#b9c44b]">{breadcrumb}</span>
          </nav>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <PerksSection
        label={pageData?.perksLabel || "Life at VBR"}
        heading={pageData?.perksHeading || "Perks & benefits"}
        perks={pageData?.perks || []}
      />

      {/* Culture Highlights Section */}
      <CultureSection
        heading={pageData?.cultureHeading || "Culture Highlights"}
        description={pageData?.cultureDescription || ""}
        highlights={pageData?.cultureHighlights || []}
      />

      {/* Work Environment Section */}
      <WorkEnvironmentSection
        heading={pageData?.workEnvironment?.heading || "Work Environment Section"}
        description={pageData?.workEnvironment?.description || ""}
        image={pageData?.workEnvironment?.image || "/images/blog-1.jpg"}
      />

      {/* Green CTA Section */}
      <CareersCTA
        label={pageData?.ctaSection?.label || "Let's join us"}
        heading={pageData?.ctaSection?.heading || "At VBR, you don't just grow your career"}
        subheading={pageData?.ctaSection?.subheading || "you help build landscapes that are designed to endure."}
        placeholder={pageData?.ctaSection?.placeholder || "Your email address"}
        buttonText={pageData?.ctaSection?.buttonText || "Subscribe"}
      />

      {/* Newsletter Section */}
      <CareersNewsletter
        heading={pageData?.newsletterHeading || "Stay Updated With Expert Advice"}
        description={pageData?.newsletterDescription || "Join our mailing list to receive professional landscaping tips and exclusive"}
        buttonText={pageData?.newsletterButtonText || "Subscribe"}
        placeholder={pageData?.newsletterPlaceholder || "Enter your email"}
      />

      <Footer data={footer ?? undefined} branding={branding ?? undefined} />
    </main>
  )
}
