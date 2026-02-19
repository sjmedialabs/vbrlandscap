import { getSection } from "@/lib/firestore"
import Image from "next/image"
import type { Metadata } from "next"
import DimensionTabs from "@/components/eco-matrix/dimension-tabs"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSection("seo")
    const pages = (seo?.pages as { slug: string; title: string; description: string }[]) || []
    const page = pages.find((p) => p.slug === "/eco-matrix/10-dimensions")
    if (page) return { title: page.title, description: page.description }
  } catch { /* fallback */ }
  return { title: "10-Dimension Architecture - VBR ECO-MATRIX", description: "10 integrated dimensions of landscape intelligence." }
}

interface DimensionData {
  name: string
  subtitle: string
  description: string
  outcome1: string
  outcome2: string
  image1: string
  image2: string
  image3: string
  image4: string
  order?: number
}

export default async function TenDimensionsPage() {
  let data: Record<string, unknown> | null = null
  try {
    data = await getSection("page-eco-dimensions")
  } catch { /* fallback */ }

  const heroTitle = (data?.heroTitle as string) || "10 integrated dimensions"
  const heroSubtitle = (data?.heroSubtitle as string) || "Together, these dimensions function as a unified operating system, eliminating fragmented execution and ensuring single-point accountability across the entire landscape lifecycle."
  const heroImage = (data?.heroImage as string) || "/images/hero-bg.jpg"
  const sectionBadge = (data?.sectionBadge as string) || "10-Dimension Architecture"
  const sectionHeading = (data?.sectionHeading as string) || "Making Your Landscape\nDreams a Reality"

  const dimensions: DimensionData[] = ((data?.dimensions as DimensionData[]) || [
    { name: "ARCHIQ\u2122", subtitle: "Geo-Diagnostics & Spatial Intelligence", description: "ARCHIQ\u2122 establishes the scientific foundation of every project. Through detailed soil diagnostics, water profiling, and micro-climate analysis, land conditions are translated into data-driven master planning and design intelligence.", outcome1: "Design feasibility validated before execution", outcome2: "Reduced failure risk and long-term performance assurance", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 0 },
    { name: "PLANTIQ\u2122", subtitle: "Bio-Asset Sourcing & Authentication", description: "PLANTIQ\u2122 ensures every plant is climate-ready, disease-screened, and traceable from nursery to site. Our bio-asset authentication process guarantees quality and long-term viability.", outcome1: "Traceable plant quality assurance", outcome2: "Reduced plant mortality and replacement costs", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 1 },
    { name: "HYDRO-LOGIC\u2122", subtitle: "Integrated Water Engineering", description: "HYDRO-LOGIC\u2122 provides smart irrigation design, rainwater harvesting, and zero-logging drainage systems engineered for each site's specific hydrology.", outcome1: "Water-efficient landscapes", outcome2: "Zero waterlogging and drainage compliance", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 2 },
    { name: "CORE-BUILD\u2122", subtitle: "Outdoor Infrastructure Engineering", description: "CORE-BUILD\u2122 delivers hardscapes and structural elements built to civil engineering standards, ensuring durability and aesthetic integration.", outcome1: "Structural durability assurance", outcome2: "Code-compliant outdoor infrastructure", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 3 },
    { name: "VERTIC-TECH\u2122", subtitle: "Elevated Landscape Systems", description: "VERTIC-TECH\u2122 designs and installs vertical gardens, green walls, and rooftop ecosystems for urban environments.", outcome1: "Maximized green space in urban settings", outcome2: "Improved building thermal performance", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 4 },
    { name: "ECO-REGEN\u2122", subtitle: "Ecological Regeneration Systems", description: "ECO-REGEN\u2122 focuses on biodiversity restoration, native species reintroduction, and creating carbon-positive landscapes.", outcome1: "Measurable biodiversity improvement", outcome2: "Carbon sequestration reporting", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 5 },
    { name: "ECO-OFFSET\u2122", subtitle: "Environmental Performance & ESG", description: "ECO-OFFSET\u2122 integrates ESG compliance, carbon offset tracking, and environmental performance reporting into every project.", outcome1: "ESG-compliant project delivery", outcome2: "Verified carbon offset documentation", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 6 },
    { name: "HUMAN-SCAPE\u2122", subtitle: "Human-Centric Landscape Systems", description: "HUMAN-SCAPE\u2122 designs wellness-oriented spaces including play areas, sensory gardens, and active-use environments.", outcome1: "Enhanced user wellness and engagement", outcome2: "Inclusive design for all age groups", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 7 },
    { name: "SENSE-GRID\u2122", subtitle: "Integrated Sensory Infrastructure", description: "SENSE-GRID\u2122 creates immersive nightscapes and sensory experiences through lighting, sound, and ambient design.", outcome1: "24/7 landscape experience design", outcome2: "Energy-efficient sensory systems", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 8 },
    { name: "STEWARD-CARE\u2122", subtitle: "Lifecycle Stewardship & Asset Management", description: "STEWARD-CARE\u2122 provides ongoing monitoring, maintenance protocols, and asset value growth strategies.", outcome1: "Predictable maintenance scheduling", outcome2: "Long-term asset value appreciation", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 9 },
  ]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image src={heroImage} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1a2e0a]/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          {heroSubtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              {heroSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full border border-[#2d6a2e]/20 bg-[#f0f7e6] px-4 py-1.5 text-xs font-semibold tracking-wider text-[#2d6a2e] uppercase">
            {sectionBadge}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#1a1a1a] md:text-4xl">
            {sectionHeading.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-6">
          <DimensionTabs dimensions={dimensions} />
        </div>
      </section>
    </>
  )
}
