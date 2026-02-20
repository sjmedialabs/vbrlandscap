import { getEcoMatrixDimensions } from "@/lib/eco-matrix-firestore"
import { DimensionTabs } from "./dimension-tabs"
import Image from "next/image"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "10-Dimension Architecture | VBR ECO-MATRIX",
  description: "Our proprietary landscape intelligence and execution system operates through 10 integrated dimensions.",
}

// Default dimensions data for when database is not seeded
const defaultDimensions = [
  {
    id: "archiq",
    tabTitle: "ARCHIQ",
    label: "DIMENSION 01",
    title: "ARCHIQ",
    subtitle: "Geo-Diagnostics & Spatial Intelligence",
    description: "ARCHIQ™ establishes the scientific foundation of every project. Through detailed soil diagnostics, water profiling, and micro-climate analysis, land conditions are translated into data-driven master planning and design intelligence.",
    features: [],
    outcomes: ["Design feasibility validated before execution", "Reduced failure risk and long-term performance assurance"],
    images: [
      "/images/dimensions/archiq-1.jpg",
      "/images/dimensions/archiq-2.jpg",
      "/images/dimensions/archiq-3.jpg",
      "/images/dimensions/archiq-4.jpg",
    ],
    order: 0,
  },
  {
    id: "plantiq",
    tabTitle: "PLANTIQ™",
    label: "DIMENSION 02",
    title: "PLANTIQ™",
    subtitle: "Bio-Asset Sourcing & Authentication",
    description: "PLANTIQ™ ensures every plant in your landscape is sourced with precision, authenticated for quality, and matched to your site's specific conditions. Climate-ready plants with traceable quality.",
    features: [],
    outcomes: ["Climate-matched plant selection", "Traceable sourcing and quality assurance"],
    images: [],
    order: 1,
  },
  {
    id: "hydro-logic",
    tabTitle: "HYDRO-LOGIC™",
    label: "DIMENSION 03",
    title: "HYDRO-LOGIC™",
    subtitle: "Integrated Water Engineering",
    description: "Complete water management from irrigation design to drainage solutions, ensuring optimal water use efficiency. Smart irrigation & zero-logging drainage systems.",
    features: [],
    outcomes: ["Optimized water efficiency", "Zero-logging drainage performance"],
    images: [],
    order: 2,
  },
  {
    id: "core-build",
    tabTitle: "CORE-BUILD™",
    label: "DIMENSION 04",
    title: "CORE-BUILD™",
    subtitle: "Outdoor Infrastructure Engineering",
    description: "All outdoor infrastructure engineered and built to the highest civil and structural standards for durability and safety. Hardscapes built to civil & structural standards.",
    features: [],
    outcomes: ["Structural integrity assurance", "Long-term durability guarantee"],
    images: [],
    order: 3,
  },
  {
    id: "vertic-tech",
    tabTitle: "VERTIC-TECH™",
    label: "DIMENSION 05",
    title: "VERTIC-TECH™",
    subtitle: "Elevated Landscape Systems",
    description: "Specialized systems for vertical gardens, green roofs, and elevated planting solutions in urban environments. Vertical & rooftop ecosystems for urban spaces.",
    features: [],
    outcomes: ["Maximized urban green space", "Sustainable vertical ecosystems"],
    images: [],
    order: 4,
  },
  {
    id: "eco-regen",
    tabTitle: "ECO-REGEN™",
    label: "DIMENSION 06",
    title: "ECO-REGEN™",
    subtitle: "Ecological Regeneration Systems",
    description: "Focused on restoring biodiversity and creating landscapes that contribute positively to the environment. Biodiversity restoration & carbon-positive landscapes.",
    features: [],
    outcomes: ["Biodiversity restoration", "Carbon-positive landscape performance"],
    images: [],
    order: 5,
  },
  {
    id: "eco-offset",
    tabTitle: "ECO-OFFSET™",
    label: "DIMENSION 07",
    title: "ECO-OFFSET™",
    subtitle: "Environmental Performance & ESG Systems",
    description: "Comprehensive environmental performance tracking and ESG compliance for sustainable landscape operations. Carbon offset, ESG compliance & reporting.",
    features: [],
    outcomes: ["ESG compliance certification", "Carbon offset tracking"],
    images: [],
    order: 6,
  },
  {
    id: "human-scape",
    tabTitle: "HUMAN-SCAPE™",
    label: "DIMENSION 08",
    title: "HUMAN-SCAPE™",
    subtitle: "Human-Centric Landscape Systems",
    description: "Designing landscapes that prioritize human wellness, recreation, and meaningful engagement. Wellness, play & active-use environments.",
    features: [],
    outcomes: ["Enhanced wellness environments", "Active-use optimization"],
    images: [],
    order: 7,
  },
  {
    id: "sense-grid",
    tabTitle: "SENSE-GRID™",
    label: "DIMENSION 09",
    title: "SENSE-GRID™",
    subtitle: "Integrated Sensory Infrastructure",
    description: "Comprehensive sensory design including lighting, soundscapes, and experiential elements. Lighting, nightscape & sensory experience.",
    features: [],
    outcomes: ["Immersive nightscape design", "Multi-sensory experience"],
    images: [],
    order: 8,
  },
  {
    id: "steward-care",
    tabTitle: "STEWARD-CARE™",
    label: "DIMENSION 10",
    title: "STEWARD-CARE™",
    subtitle: "Lifecycle Stewardship & Asset Management",
    description: "End-to-end lifecycle management ensuring your landscape investment grows in value over time. Monitoring, maintenance & long-term value growth.",
    features: [],
    outcomes: ["Lifecycle value optimization", "Proactive maintenance systems"],
    images: [],
    order: 9,
  },
]

export default async function TenDimensionsPage() {
  let dimensions = defaultDimensions

  try {
    const dbDimensions = await getEcoMatrixDimensions()
    if (dbDimensions && dbDimensions.length > 0) {
      dimensions = dbDimensions
    }
  } catch (error) {
    console.error("[10-dimensions] Failed to fetch dimensions:", error)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden">
        <Image
          src="/images/eco-matrix-hero.jpg"
          alt="Luxury landscape with modern architecture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-primary/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            10 integrated<br />dimensions
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
            Together, these dimensions function as a unified operating system, eliminating fragmented execution and ensuring single-point accountability across the entire landscape lifecycle.
          </p>
        </div>
      </section>

      {/* Dimensions Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f5e9] px-4 py-1.5 text-sm font-medium text-[#2e7d32]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4caf50]" />
              10-Dimension Architecture
            </span>
            <h2 className="mt-4 text-2xl font-bold text-[#1a1a1a] md:text-3xl lg:text-4xl">
              Making Your Landscape<br />Dreams a Reality
            </h2>
          </div>

          {/* Tabs System */}
          <DimensionTabs dimensions={dimensions} />
        </div>
      </section>
    </>
  )
}
