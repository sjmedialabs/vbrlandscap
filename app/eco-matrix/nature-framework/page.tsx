import { getSection } from "@/lib/firestore"
import Image from "next/image"
import type { Metadata } from "next"
import NaturePillars from "@/components/eco-matrix/nature-pillars"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSection("seo")
    const pages = (seo?.pages as { slug: string; title: string; description: string }[]) || []
    const page = pages.find((p) => p.slug === "/eco-matrix/nature-framework")
    if (page) return { title: page.title, description: page.description }
  } catch { /* fallback */ }
  return { title: "N.A.T.U.R.E. Framework - VBR ECO-MATRIX", description: "The N.A.T.U.R.E. Framework - a six-pillar engineering framework for landscape infrastructure excellence." }
}

interface Pillar {
  letter: string
  title: string
  description: string
  feature1Title: string
  feature2Title: string
  feature3Title: string
  feature4Title: string
  outcomeTitle: string
  outcomeDescription: string
  order?: number
}

export default async function NatureFrameworkPage() {
  let data: Record<string, unknown> | null = null
  try {
    data = await getSection("page-eco-nature")
  } catch { /* fallback */ }

  const heroTitle = (data?.heroTitle as string) || "THE\nN.A.T.U.R.E.\u2122\nFRAMEWORK"
  const heroSubtitle = (data?.heroSubtitle as string) || ""
  const heroImage = (data?.heroImage as string) || "/images/hero-bg.jpg"
  const dimensionBadge = (data?.dimensionBadge as string) || "DIMENSION 01"
  const heading = (data?.heading as string) || "The\nN.A.T.U.R.E Frame work"
  const subheading = (data?.subheading as string) || "A Six-Pillar Engineering Framework\nfor Landscape Infrastructure Excellence"
  const sectionTitle = (data?.sectionTitle as string) || "Standardized Precision Across the Project Lifecycle"
  const description = (data?.description as string) || "At VBR Landscaping Pvt. Ltd, landscape delivery is governed by a structured, data-driven engineering framework known as the N.A.T.U.R.E.\u2122 Framework. This proprietary methodology replaces conventional planting-and-maintenance practices with a system-led, performance-oriented delivery model."
  const pillarsHeading = (data?.pillarsHeading as string) || "The Pillars of the\nN.A.T.U.R.E.\u2122 Process"

  const pillars: Pillar[] = ((data?.pillars as Pillar[]) || [
    { letter: "N", title: "Natural Intelligence", description: "Every project begins with a comprehensive site intelligence assessment to establish biological and environmental baselines before any physical intervention.", feature1Title: "Detailed soil profiling and fertility diagnostics", feature2Title: "Hydrological behavior and drainage mapping", feature3Title: "Micro-climate and exposure analysis", feature4Title: "Site constraints and risk identification", outcomeTitle: "Outcome:", outcomeDescription: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize downstream biological and structural risks.", order: 0 },
    { letter: "A", title: "Architectural Precision", description: "Every project assessment to establish biological baselines before any physical intervention.", feature1Title: "Detailed soil profiling", feature2Title: "Drainage mapping", feature3Title: "Micro-climate analysis", feature4Title: "Site risk identification", outcomeTitle: "Outcome:", outcomeDescription: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 1 },
    { letter: "T", title: "Technical Integration", description: "Every project assessment to establish biological baselines before any physical intervention.", feature1Title: "Detailed soil profiling", feature2Title: "Drainage mapping", feature3Title: "Micro-climate analysis", feature4Title: "Site risk identification", outcomeTitle: "Outcome:", outcomeDescription: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 2 },
    { letter: "U", title: "Urban Ecology", description: "Every project assessment to establish biological baselines before any physical intervention.", feature1Title: "Detailed soil profiling", feature2Title: "Drainage mapping", feature3Title: "Micro-climate analysis", feature4Title: "Site risk identification", outcomeTitle: "Outcome:", outcomeDescription: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 3 },
    { letter: "R", title: "Regenerative Systems", description: "Every project assessment to establish biological baselines before any physical intervention.", feature1Title: "Detailed soil profiling", feature2Title: "Drainage mapping", feature3Title: "Micro-climate analysis", feature4Title: "Site risk identification", outcomeTitle: "Outcome:", outcomeDescription: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 4 },
    { letter: "E", title: "Ecological Stewardship", description: "Every project assessment to establish biological baselines before any physical intervention.", feature1Title: "Detailed soil profiling", feature2Title: "Drainage mapping", feature3Title: "Micro-climate analysis", feature4Title: "Site risk identification", outcomeTitle: "Outcome:", outcomeDescription: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 5 },
  ]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image src={heroImage} alt="" fill className="object-cover" priority />
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

      {/* Dimension Content */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block rounded-full border border-[#1a1a1a]/20 bg-white px-5 py-2 text-xs font-semibold tracking-widest text-[#1a1a1a] uppercase">
            {dimensionBadge}
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight text-[#2d6a2e] md:text-4xl">
            {heading.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-[#555]">
            {subheading.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          <h3 className="mt-10 text-lg font-bold text-[#1a1a1a]">{sectionTitle}</h3>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#555]">{description}</p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold leading-tight text-[#1a1a1a] md:text-4xl">
            {pillarsHeading.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-6xl px-6">
          <NaturePillars pillars={pillars} />
        </div>
      </section>
    </>
  )
}
