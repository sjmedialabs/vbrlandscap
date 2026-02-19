import { getSection } from "@/lib/firestore"
import Image from "next/image"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSection("seo")
    const pages = (seo?.pages as { slug: string; title: string; description: string }[]) || []
    const page = pages.find((p) => p.slug === "/eco-matrix")
    if (page) return { title: page.title, description: page.description }
  } catch { /* fallback */ }
  return { title: "VBR ECO-MATRIX - Overview", description: "Our proprietary system transforms land into engineered living infrastructure." }
}

interface Stat { value: string; label: string; order?: number }
interface Dimension { title: string; subtitle: string; description: string; order?: number }

export default async function EcoMatrixOverviewPage() {
  let data: Record<string, unknown> | null = null
  try {
    data = await getSection("page-eco-overview")
  } catch { /* fallback */ }

  const heroTitle = (data?.heroTitle as string) || "THE VBR ECO-MATRIX"
  const heroSubtitle = (data?.heroSubtitle as string) || "Our proprietary system transforms land into engineered living infrastructure through 10 integrated dimensions of landscape intelligence."
  const heroImage = (data?.heroImage as string) || "/images/hero-bg.jpg"
  const aboutBadge = (data?.aboutBadge as string) || "About The ECO-MATRIX"
  const aboutHeading = (data?.aboutHeading as string) || "Engineering Living Infrastructure"
  const aboutDescription = (data?.aboutDescription as string) || "The VBR ECO-MATRIX is our proprietary landscape intelligence and execution system designed to transform land into engineered living infrastructure."
  const aboutDescription2 = (data?.aboutDescription2 as string) || "Unlike conventional landscaping models that treat design, planting, irrigation, and maintenance as isolated activities, the ECO-MATRIX integrates engineering, ecology, and lifecycle control into a single, accountable framework."
  const aboutDescription3 = (data?.aboutDescription3 as string) || "Each project executed by VBR Landscaping Pvt. Ltd. is governed through this system, ensuring predictable performance, ecological stability, and long-term asset value."
  const aboutImage1 = (data?.aboutImage1 as string) || "/images/about-person.jpg"
  const aboutImage2 = (data?.aboutImage2 as string) || "/images/service-1.png"
  const stats = ((data?.stats as Stat[]) || [
    { value: "10", label: "10-Dimension Architecture", order: 0 },
    { value: "100%", label: "Single-Point Accountability", order: 1 },
    { value: "360\u00b0", label: "Lifecycle Coverage", order: 2 },
    { value: "\u221e", label: "Long-term Value", order: 3 },
  ]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const dimensions = ((data?.dimensions as Dimension[]) || [
    { title: "ARCHIQ\u2122", subtitle: "Spatial Intelligence & Geo-Diagnostics", description: "Land, soil, water & climate intelligence for precise design", order: 0 },
    { title: "PLANTIQ\u2122", subtitle: "Bio-Asset Sourcing & Authentication", description: "Climate-ready plants with traceable quality", order: 1 },
    { title: "HYDRO-LOGIC\u2122", subtitle: "Integrated Water Engineering", description: "Smart irrigation & zero-logging drainage systems", order: 2 },
    { title: "CORE-BUILD\u2122", subtitle: "Outdoor Infrastructure Engineering", description: "Hardscapes built to civil & structural standards", order: 3 },
    { title: "VERTIC-TECH\u2122", subtitle: "Elevated Landscape Systems", description: "Vertical & rooftop ecosystems for urban spaces", order: 4 },
    { title: "ECO-REGEN\u2122", subtitle: "Ecological Regeneration Systems", description: "Biodiversity, restoration & carbon-positive landscapes", order: 5 },
    { title: "ECO-OFFSET\u2122", subtitle: "Environmental Performance & ESG Systems", description: "Carbon offset, ESG compliance & reporting", order: 6 },
    { title: "HUMAN-SCAPE\u2122", subtitle: "Human-Centric Landscape Systems", description: "Wellness, play, & active-use environments", order: 7 },
    { title: "SENSE-GRID\u2122", subtitle: "Integrated Sensory Infrastructure", description: "Lighting, nightscape & sensory experience", order: 8 },
    { title: "STEWARD-CARE\u2122", subtitle: "Lifecycle Stewardship & Asset Management", description: "Monitoring, maintenance & long-term value growth", order: 9 },
  ]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const bottomText = (data?.bottomText as string) || "The ECO-MATRIX\u2122 operates through 10 integrated dimensions"

  // Positions for 10 dimensions around a circle
  const circlePositions = [
    { top: "2%", left: "50%", translate: "-translate-x-1/2" },   // top center
    { top: "12%", left: "82%" },                                  // top right
    { top: "35%", left: "95%" },                                   // right
    { top: "60%", left: "90%" },                                   // bottom right
    { top: "80%", left: "72%" },                                   // lower right
    { top: "88%", left: "42%", translate: "-translate-x-1/2" },   // bottom center
    { top: "80%", left: "12%" },                                   // lower left
    { top: "60%", left: "-2%" },                                   // left
    { top: "35%", left: "-5%" },                                   // upper left
    { top: "12%", left: "12%" },                                   // top left
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1a2e0a]/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {heroTitle.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          {heroSubtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              {heroSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-16">
          {/* Images */}
          <div className="relative flex w-full gap-4 lg:w-1/2">
            <div className="relative aspect-[3/4] w-1/2 overflow-hidden rounded-2xl">
              <Image src={aboutImage1} alt="About ECO-MATRIX" fill className="object-cover" />
            </div>
            <div className="relative mt-12 aspect-[3/4] w-1/2 overflow-hidden rounded-2xl">
              <Image src={aboutImage2} alt="About ECO-MATRIX" fill className="object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block rounded-full border border-[#2d6a2e]/20 bg-[#f0f7e6] px-4 py-1.5 text-xs font-semibold tracking-wider text-[#2d6a2e] uppercase">
              {aboutBadge}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#1a1a1a] md:text-4xl">
              {aboutHeading}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#555]">{aboutDescription}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#555]">{aboutDescription2}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#555]">{aboutDescription3}</p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-[#1a1a1a]">{stat.value}</p>
                  <p className="mt-1 text-xs text-[#777]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dimension Diagram */}
      <section className="bg-[#f5f7f0] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block rounded-full border border-[#2d6a2e]/20 bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-[#2d6a2e] uppercase">
            How it Works
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] md:text-4xl">
            DIMENSION ICON LABELS
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-3xl px-6">
          {/* Circular diagram */}
          <div className="relative mx-auto aspect-square w-full max-w-xl">
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-[#2d6a2e]/30 bg-white shadow-lg">
              <p className="text-center text-xs font-extrabold leading-tight tracking-wide text-[#2d6a2e] uppercase">
                THE VBR<br />ECO-MATRIX
              </p>
            </div>

            {/* Outer ring */}
            <div className="absolute top-1/2 left-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#2d6a2e]/15" />

            {/* Dimension labels around the circle */}
            {dimensions.map((dim, i) => {
              const pos = circlePositions[i % circlePositions.length]
              return (
                <div
                  key={i}
                  className={`absolute w-36 ${pos.translate || ""}`}
                  style={{ top: pos.top, left: pos.left }}
                >
                  <p className="text-xs font-bold text-[#1a1a1a]">{dim.title}</p>
                  <p className="text-[10px] leading-snug text-[#777]">{dim.subtitle}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-[#999]">{dim.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center text-2xl font-bold leading-snug text-[#1a1a1a] md:text-3xl">
          {bottomText}
        </p>
      </section>
    </>
  )
}
