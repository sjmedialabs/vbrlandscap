import { getEcoMatrixOverview } from "@/lib/eco-matrix-firestore"
import Image from "next/image"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "VBR ECO-MATRIX Overview | Engineering Living Infrastructure",
  description: "Our proprietary landscape intelligence and execution system designed to transform land into engineered living infrastructure.",
}

// Default overview data
const defaultOverview = {
  heroTitle: "THE VBR ECO-MATRIX",
  heroSubtitle: "Our proprietary system transforms land into engineered living infrastructure through 10 integrated dimensions of landscape intelligence.",
  aboutBadge: "About The ECO-MATRIX™",
  aboutHeading: "Engineering Living Infrastructure",
  aboutDescription: `The VBR ECO-MATRIX™ is our proprietary landscape intelligence and execution system designed to transform land into engineered living infrastructure.

Unlike conventional landscaping models that treat design, planting, irrigation, and maintenance as isolated activities, the ECO-MATRIX™ integrates engineering, ecology, and lifecycle control into a single, accountable framework.

Each project executed by VBR Landscaping Pvt. Ltd is governed through this system, ensuring predictable performance, ecological stability, and long-term asset value.`,
  stats: [
    { value: "10", label: "10-Dimension Architecture" },
    { value: "100%", label: "Single-Point Accountability" },
    { value: "360°", label: "Lifecycle Coverage" },
    { value: "∞", label: "Long-term Value" },
  ],
  howItWorksBadge: "How It Works",
  howItWorksHeading: "DIMENSION ICON LABELS",
  howItWorksSubheading: "The ECO-MATRIX™ operates through 10 integrated dimensions",
  dimensions: [
    { title: "STEWARD-CARE™", description: "Lifecycle Stewardship & Asset Management: Monitoring, maintenance & long-term value growth" },
    { title: "SENSE-GRID™", description: "Integrated Sensory Infrastructure: Lighting, nightscape & sensory experience" },
    { title: "HUMAN-SCAPE™", description: "Human-Centric Landscape Systems: Wellness, play & active-use environments" },
    { title: "ECO-OFFSET™", description: "Environmental Performance & ESG Systems: Carbon offset, ESG compliance & reporting" },
    { title: "ECO-REGEN™", description: "Ecological Regeneration Systems: Biodiversity restoration & carbon-positive landscapes" },
    { title: "ARCHIQ™", description: "Spatial Intelligence & Geo-Diagnostics: Land, soil, water & climate intelligence for precise design" },
    { title: "PLANTIQ™", description: "Bio-Asset Sourcing & Authentication: Climate-ready plants with traceable quality" },
    { title: "HYDRO-LOGIC™", description: "Integrated Water Engineering: Smart irrigation & zero-logging drainage systems" },
    { title: "CORE-BUILD™", description: "Outdoor Infrastructure Engineering: Hardscapes built to civil & structural standards" },
    { title: "VERTIC-TECH™", description: "Elevated Landscape Systems: Vertical & rooftop ecosystems for urban spaces" },
  ],
}

export default async function OverviewPage() {
  let overview = defaultOverview

  try {
    const dbOverview = await getEcoMatrixOverview()
    if (dbOverview) {
      overview = { ...defaultOverview, ...dbOverview }
    }
  } catch (error) {
    console.error("[overview] Failed to fetch data:", error)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-primary">
        <Image
          src="/images/eco-matrix-overview-hero.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <h1 className="text-balance text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            {overview.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            {overview.heroSubtitle}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/eco-about-1.jpg"
                    alt="VBR ECO-MATRIX Team"
                    fill
                    className="object-cover"
                  />
                  {/* Decorative border */}
                  <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-3xl border-l-4 border-t-4 border-secondary" />
                </div>
                <div className="relative mt-12 aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/images/eco-about-2.jpg"
                    alt="VBR ECO-MATRIX Work"
                    fill
                    className="object-cover"
                  />
                  {/* Decorative border */}
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-br-3xl border-b-4 border-r-4 border-secondary" />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                {overview.aboutBadge}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                {overview.aboutHeading}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                {overview.aboutDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-4 gap-4">
                {overview.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {overview.howItWorksBadge}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground uppercase tracking-wide md:text-4xl">
              {overview.howItWorksHeading}
            </h2>
          </div>

          {/* Dimension Wheel */}
          <div className="relative mx-auto max-w-4xl">
            {/* Center Circle */}
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary md:h-80 md:w-80">
              <div className="text-center">
                <p className="text-lg font-bold text-primary-foreground">THE VBR</p>
                <p className="text-xl font-bold text-primary-foreground">ECO-MATRIX™</p>
              </div>
            </div>

            {/* Dimension Labels - positioned around the wheel */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {defaultOverview.dimensions.slice(0, 5).map((dim, idx) => (
                <div key={idx} className="rounded-xl bg-card p-4 shadow-sm border border-border">
                  <p className="text-sm font-bold text-foreground">{dim.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{dim.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {defaultOverview.dimensions.slice(5).map((dim, idx) => (
                <div key={idx} className="rounded-xl bg-card p-4 shadow-sm border border-border">
                  <p className="text-sm font-bold text-foreground">{dim.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{dim.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-16 text-center">
            <p className="text-xl font-bold text-secondary md:text-2xl">
              {overview.howItWorksSubheading}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
