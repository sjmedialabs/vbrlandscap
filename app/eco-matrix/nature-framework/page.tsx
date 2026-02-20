import { getEcoMatrixNature } from "@/lib/eco-matrix-firestore"
import { NatureAccordion } from "./nature-accordion"
import Image from "next/image"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "N.A.T.U.R.E Framework | VBR ECO-MATRIX",
  description: "A Six-Pillar Engineering Framework for Landscape Infrastructure Excellence.",
}

// Default N.A.T.U.R.E items for when database is not seeded
// Icons should be uploaded to /public/images/icons/ folder
const defaultNatureItems = [
  {
    id: "n",
    letter: "N",
    title: "Natural Intelligence",
    subtitle: "Comprehensive site intelligence assessment",
    description: "Every project begins with a comprehensive site intelligence assessment to establish biological and environmental baselines before any physical intervention.",
    features: [
      { title: "Detailed soil profiling and fertility diagnostics", icon: "/images/icons/nature-icon-1.png" },
      { title: "Hydrological behavior and drainage mapping", icon: "/images/icons/nature-icon-2.png" },
      { title: "Micro-climate and exposure analysis", icon: "/images/icons/nature-icon-3.png" },
      { title: "Site constraints and risk identification", icon: "/images/icons/nature-icon-4.png" },
    ],
    outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize downstream biological and structural risks.",
    order: 0,
  },
  {
    id: "a",
    letter: "A",
    title: "Adaptive Design",
    subtitle: "Site-specific adaptive design",
    description: "Every project assessment translates into site-specific adaptive design before any physical intervention.",
    features: [
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-1.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-2.png" },
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-3.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-4.png" },
    ],
    outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.",
    order: 1,
  },
  {
    id: "t",
    letter: "T",
    title: "Technical Excellence",
    subtitle: "Engineering precision in execution",
    description: "Every project assessment ensures technical excellence before any physical intervention.",
    features: [
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-1.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-2.png" },
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-3.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-4.png" },
    ],
    outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.",
    order: 2,
  },
  {
    id: "u",
    letter: "U",
    title: "Universal Standards",
    subtitle: "Global best practices implementation",
    description: "Every project assessment implements universal standards before any physical intervention.",
    features: [
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-1.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-2.png" },
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-3.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-4.png" },
    ],
    outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.",
    order: 3,
  },
  {
    id: "r",
    letter: "R",
    title: "Regenerative Systems",
    subtitle: "Sustainable ecosystem development",
    description: "Every project assessment focuses on regenerative systems before any physical intervention.",
    features: [
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-1.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-2.png" },
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-3.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-4.png" },
    ],
    outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.",
    order: 4,
  },
  {
    id: "e",
    letter: "E",
    title: "Environmental Stewardship",
    subtitle: "Long-term ecological responsibility",
    description: "Every project assessment emphasizes environmental stewardship before any physical intervention.",
    features: [
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-1.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-2.png" },
      { title: "Detailed fertility", icon: "/images/icons/nature-icon-3.png" },
      { title: "Micro-cli exposure", icon: "/images/icons/nature-icon-4.png" },
    ],
    outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.",
    order: 5,
  },
]

export default async function NatureFrameworkPage() {
  let natureItems = defaultNatureItems

  try {
    const dbItems = await getEcoMatrixNature()
    if (dbItems && dbItems.length > 0) {
      natureItems = dbItems
    }
  } catch (error) {
    console.error("[nature-framework] Failed to fetch data:", error)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[280px] items-center justify-center overflow-hidden">
        <Image
          src="/images/nature-framework-hero.jpg"
          alt="Nature landscape pathway"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            THE<br />
            N.A.T.U.R.E.™<br />
            FRAMEWORK
          </h1>
        </div>
      </section>

      {/* Framework Introduction */}
      <section className="bg-[#f5f5f0] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#fef7e0] px-4 py-1.5 text-sm font-medium text-[#8b7355]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
            DIMENSION 01
          </span>
          <h2 className="mt-6 text-2xl font-bold md:text-3xl lg:text-4xl">
            <span className="text-[#1a1a1a]">The</span><br />
            <span className="text-[#2e7d32]">N.A.T.U.R.E</span> <span className="text-[#1a1a1a]">Frame work</span>
          </h2>
          <h3 className="mt-4 text-lg text-[#1a1a1a] md:text-xl">
            A Six-Pillar Engineering Framework<br />
            for Landscape Infrastructure Excellence
          </h3>
          <p className="mx-auto mt-6 text-base font-semibold text-[#1a1a1a] md:text-lg">
            Standardized Precision Across the Project Lifecycle
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-sm text-gray-600 leading-relaxed">
            At VBR Landscaping Pvt. Ltd, landscape delivery is governed by a structured, data-driven engineering framework known as the N.A.T.U.R.E.™ Framework. This proprietary methodology replaces conventional planting-and-maintenance practices with a system-led, performance-oriented delivery model.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-gray-600 leading-relaxed">
            The N.A.T.U.R.E.™ Framework ensures that every project—ranging from corporate campuses and urban infrastructure to hospitality and premium developments—is executed with institutional-grade precision, scientific validation, and lifecycle accountability.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-[#f0f4e8] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-[#1a1a1a] md:text-3xl lg:text-4xl">
              The Pillars of the<br />
              N.A.T.U.R.E.™ Process
            </h2>
          </div>

          {/* Hover Accordion */}
          <NatureAccordion items={natureItems} />
        </div>
      </section>
    </>
  )
}
