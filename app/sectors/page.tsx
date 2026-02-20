import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getSection } from "@/lib/firestore"
import {
  getSectorsList,
  getSectorContent,
  getSectorsPageData,
  defaultSectorsList,
  defaultSectorContent,
  defaultPageSettings,
  type SectorListItem,
  type SectorContent,
  type SectorsPageData,
} from "@/lib/sectors-firestore"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SectorsSidebar } from "./sectors-sidebar"
import { SectorsContent } from "./sectors-content"
import { ServiceProcess } from "./service-process"
import { SectorsFAQ } from "./sectors-faq"
import { SectorsNewsletter } from "./sectors-newsletter"

export const dynamic = "force-dynamic"

// Dynamic SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  let seo: Record<string, unknown> | null = null
  try {
    seo = await getSection("seo")
  } catch { /* ignore */ }

  const pages = (seo?.pages as { slug: string; title: string; description: string; ogImage?: string; keywords?: string }[]) || []
  const match = pages.find((p) => p.slug === "/sectors")

  return {
    title: match?.title || "Our Sectors - VBR Landscaping",
    description: match?.description || "Explore the sectors we serve with professional landscaping services.",
    keywords: match?.keywords || "",
    openGraph: match?.ogImage ? { images: [{ url: match.ogImage }] } : undefined,
  }
}

export default async function SectorsPage() {
  // Fetch all required data
  let sectorsList: SectorListItem[] = []
  let pageData: SectorsPageData | null = null
  let defaultContent: SectorContent | null = null
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    const [sectorsListData, pageDataResult, navData, footerData, brandingData] = await Promise.all([
      getSectorsList(),
      getSectorsPageData(),
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
    ])
    
    sectorsList = sectorsListData.length > 0 ? sectorsListData.filter(s => s.isActive) : defaultSectorsList
    pageData = pageDataResult || defaultPageSettings
    navbar = navData
    footer = footerData
    branding = brandingData

    // Get content for the first sector as default
    if (sectorsList.length > 0) {
      const firstSectorContent = await getSectorContent(sectorsList[0].id)
      defaultContent = firstSectorContent || {
        id: `content_${sectorsList[0].id}`,
        sectorId: sectorsList[0].id,
        ...defaultSectorContent,
      }
    }
  } catch (error) {
    console.error("[SectorsPage] Failed to fetch data:", error)
    sectorsList = defaultSectorsList
    pageData = defaultPageSettings
  }

  // Fallback values
  const heroTitle = pageData?.heroTitle || "Our Sectors"
  const heroBackground = pageData?.heroBackgroundImage || "/images/hero-bg.jpg"
  const sidebarTitle = pageData?.sidebarTitle || "Sectors List"
  const processTitle = pageData?.processTitle || "Service Process"
  const faqTitle = pageData?.faqTitle || "Frequently Asked Questions"

  // Content with fallbacks
  const content = defaultContent || {
    id: "default",
    sectorId: "default",
    ...defaultSectorContent,
  }

  return (
    <main className="min-h-screen bg-[#f5f7f0]">
      <Navbar data={navbar ?? undefined} branding={branding ?? undefined} />

      {/* Hero Section */}
      <section className="relative min-h-[280px] flex items-center justify-center overflow-hidden pt-20">
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
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center">
          <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl mb-6">
            {heroTitle}
          </h1>
          <nav className="flex items-center justify-center gap-4 text-base text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#b9c44b]">•</span>
            <span className="text-[#b9c44b]">Sectors</span>
          </nav>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Left Sidebar */}
            <SectorsSidebar
              title={sidebarTitle}
              sectors={sectorsList}
              expertCard={content.expertCard}
            />

            {/* Main Content Area */}
            <SectorsContent
              content={content}
              sectorsList={sectorsList}
            />
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10">
            {processTitle}
          </h2>
          <ServiceProcess steps={content.processSteps} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10">
            {faqTitle}
          </h2>
          <SectorsFAQ faqs={content.faqs} />
        </div>
      </section>

      {/* Newsletter Section */}
      <SectorsNewsletter
        heading={pageData?.newsletterHeading || "Stay Updated With Expert Advice"}
        description={pageData?.newsletterDescription || "Join our mailing list to receive professional landscaping tips and exclusive updates."}
        buttonText={pageData?.newsletterButtonText || "Subscribe"}
        placeholder={pageData?.newsletterPlaceholder || "Enter your email"}
      />

      <Footer data={footer ?? undefined} branding={branding ?? undefined} />
    </main>
  )
}
