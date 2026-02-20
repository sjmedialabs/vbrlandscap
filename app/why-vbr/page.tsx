import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getSection } from "@/lib/firestore"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ChevronRight, Send, Shield, Award, Users, CheckCircle, Star, Leaf, HardHat, FileCheck } from "lucide-react"

export const dynamic = "force-dynamic"

// Dynamic SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  let seo: Record<string, unknown> | null = null
  try {
    seo = await getSection("seo")
  } catch { /* ignore */ }

  const pages = (seo?.pages as { slug: string; title: string; description: string; ogImage?: string; keywords?: string }[]) || []
  const match = pages.find((p) => p.slug === "/why-vbr")

  return {
    title: match?.title || "Why VBR - VBR Landscaping",
    description: match?.description || "Discover what makes VBR Landscaping the trusted choice — single-point accountability, unmatched quality, and decades of client trust.",
    keywords: match?.keywords || "",
    openGraph: match?.ogImage ? { images: [{ url: match.ogImage }] } : undefined,
  }
}

// Types
interface DifferentiatorItem {
  icon: string
  title: string
  description: string
  order?: number
}

interface AccountabilityCompany {
  number: string
  logo: string
  name: string
  subtitle: string
  description: string
  capabilities: string[]
  order?: number
}

interface StandardItem {
  icon: string
  title: string
  description: string
  order?: number
}

interface CredentialItem {
  logo: string
  name: string
  since?: string
  order?: number
}

interface TestimonialItem {
  quote: string
  author: string
  role: string
  company: string
  image?: string
  order?: number
}

export default async function WhyVBRPage() {
  // Fetch all required data
  let hero: Record<string, unknown> | null = null
  let differentiators: Record<string, unknown> | null = null
  let accountability: Record<string, unknown> | null = null
  let standards: Record<string, unknown> | null = null
  let trust: Record<string, unknown> | null = null
  let newsletter: Record<string, unknown> | null = null
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    const [heroData, diffData, acctData, stdData, trustData, newsData, navData, footerData, brandingData] = await Promise.all([
      getSection("why-vbr-hero"),
      getSection("why-vbr-differentiators"),
      getSection("why-vbr-accountability"),
      getSection("why-vbr-standards"),
      getSection("why-vbr-trust"),
      getSection("why-vbr-newsletter"),
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
    ])
    hero = heroData
    differentiators = diffData
    accountability = acctData
    standards = stdData
    trust = trustData
    newsletter = newsData
    navbar = navData
    footer = footerData
    branding = brandingData
  } catch (error) {
    console.error("[WhyVBRPage] Failed to fetch sections:", error)
  }

  // ─── Hero Fallbacks ───
  const heroHeading = (hero?.heading as string) || "Why VBR"
  const heroSubheading = (hero?.subheading as string) || "Trusted expertise, single-point accountability, and a legacy of landscape excellence."
  const heroBackground = (hero?.backgroundImage as string) || "/images/hero-bg.jpg"

  // ─── Differentiators Fallbacks ───
  const diffBadge = (differentiators?.badge as string) || "Our Edge"
  const diffHeading = (differentiators?.heading as string) || "Our Differentiators"
  const diffDescription = (differentiators?.description as string) || "What sets VBR apart is not just what we do — it's how we do it. With over 25 years of integrated landscape expertise, we bring together design intelligence, ecological engineering, and execution precision under one roof."
  const diffItems = ((differentiators?.items as DifferentiatorItem[]) || [
    {
      icon: "",
      title: "Integrated Landscape Ecosystem",
      description: "Unlike fragmented service providers, VBR operates as a fully integrated group — from nursery operations and hardscape manufacturing to design, installation, and long-term maintenance. This ensures seamless quality at every stage.",
      order: 1,
    },
    {
      icon: "",
      title: "25+ Years of Domain Mastery",
      description: "Our team brings over two decades of hands-on experience across residential, commercial, institutional, and industrial landscapes. This depth of knowledge translates into better decisions, faster execution, and lasting results.",
      order: 2,
    },
    {
      icon: "",
      title: "Design-Led, Science-Backed",
      description: "Every VBR project starts with landscape intelligence — a deep understanding of soil, climate, ecology, and human use. We combine creative design with environmental science to create spaces that thrive naturally.",
      order: 3,
    },
    {
      icon: "",
      title: "Scalable Across Sectors",
      description: "From luxury villas and gated communities to SEZs, highways, and smart cities — VBR has the capability and track record to deliver at any scale without compromising on quality or timelines.",
      order: 4,
    },
    {
      icon: "",
      title: "Sustainability at the Core",
      description: "We don't treat sustainability as an add-on. Our ECO-MATRIX framework embeds ecological responsibility into every project — water conservation, native planting, soil health, and biodiversity are part of our DNA.",
      order: 5,
    },
    {
      icon: "",
      title: "End-to-End Project Ownership",
      description: "VBR takes full ownership from concept to completion and beyond. Our clients never have to coordinate between multiple vendors — we manage every detail, ensuring accountability and peace of mind.",
      order: 6,
    },
  ]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // ─── Accountability Fallbacks ───
  const acctBadge = (accountability?.badge as string) || "VBR Group Strength"
  const acctHeading = (accountability?.heading as string) || "Single-Point Accountability"
  const acctDescription = (accountability?.description as string) || "VBR operates as a unified group of specialized companies, each contributing deep expertise to deliver comprehensive landscape solutions. This single-point accountability model means one team, one vision, and one point of contact for our clients — eliminating coordination gaps and ensuring consistent quality across every project phase."
  const acctCompanies = ((accountability?.companies as AccountabilityCompany[]) || [
    {
      number: "01",
      logo: "",
      name: "VBR Landscape Design Studio",
      subtitle: "Design & Master Planning",
      description: "Responsible for landscape architecture, master planning, and design development — transforming client visions into detailed, implementable designs.",
      capabilities: ["Landscape Architecture", "Master Planning", "3D Visualization", "Design Development"],
      order: 1,
    },
    {
      number: "02",
      logo: "",
      name: "VBR Green Infrastructure",
      subtitle: "Hardscape & Civil Works",
      description: "Handles all civil and hardscape construction — pathways, water features, retaining walls, outdoor structures, and site preparation with precision engineering.",
      capabilities: ["Hardscape Construction", "Water Features", "Retaining Walls", "Site Engineering"],
      order: 2,
    },
    {
      number: "03",
      logo: "",
      name: "VBR Nursery & Plant Supply",
      subtitle: "Plant Sourcing & Cultivation",
      description: "Our nursery division sources, cultivates, and supplies the right plant species for every project — ensuring quality, acclimatization, and ecological fit.",
      capabilities: ["Plant Cultivation", "Species Selection", "Acclimatization", "Bulk Supply"],
      order: 3,
    },
    {
      number: "04",
      logo: "",
      name: "VBR Maintenance & Care",
      subtitle: "Ongoing Landscape Management",
      description: "Post-installation, our maintenance division ensures landscapes continue to thrive through scheduled care, seasonal treatments, and proactive monitoring.",
      capabilities: ["Scheduled Maintenance", "Seasonal Care", "Irrigation Management", "Health Monitoring"],
      order: 4,
    },
  ]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // ─── Standards Fallbacks ───
  const stdBadge = (standards?.badge as string) || "Our Commitment"
  const stdHeading = (standards?.heading as string) || "Quality, Safety & Standards"
  const stdDescription = (standards?.description as string) || "At VBR, we believe that excellence is non-negotiable. Every project adheres to the highest standards of quality, safety, and environmental responsibility — backed by industry certifications and a culture of continuous improvement."
  const stdItems = ((standards?.items as StandardItem[]) || [
    {
      icon: "",
      title: "ISO 9001:2015 Quality Management",
      description: "Our processes are ISO-certified, ensuring systematic quality control from design through execution and maintenance. Every deliverable meets documented standards and undergoes rigorous quality checks.",
      order: 1,
    },
    {
      icon: "",
      title: "HSE Compliance & Safety Culture",
      description: "Health, Safety, and Environment protocols are embedded in every operation. Our teams undergo regular safety training, and every site follows strict HSE guidelines — protecting our people and the environment.",
      order: 2,
    },
    {
      icon: "",
      title: "Sustainable Material Sourcing",
      description: "We prioritize locally sourced, eco-friendly materials — from recycled hardscape aggregates to sustainably grown plant stock. Every material choice is evaluated for environmental impact and longevity.",
      order: 3,
    },
    {
      icon: "",
      title: "Industry Best Practices",
      description: "Our team follows international landscape industry standards, including LEED, GRIHA, and IGBC guidelines for green building landscapes. We stay current with evolving best practices through ongoing training and partnerships.",
      order: 4,
    },
    {
      icon: "",
      title: "Rigorous Project Audits",
      description: "Every VBR project undergoes periodic internal audits to ensure adherence to design specifications, material standards, timeline commitments, and budget controls — delivering transparency and accountability.",
      order: 5,
    },
    {
      icon: "",
      title: "Warranty & Post-Handover Support",
      description: "We stand behind our work with comprehensive warranties and a dedicated post-handover support team. Our commitment doesn't end at project delivery — it extends to ensuring long-term landscape success.",
      order: 6,
    },
  ]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // ─── Client Trust Fallbacks ───
  const trustBadge = (trust?.badge as string) || "Our Track Record"
  const trustHeading = (trust?.heading as string) || "Client Trust & Credentials"
  const trustDescription = (trust?.description as string) || "Our reputation is built on decades of delivering landscape excellence. From Fortune 500 companies and government bodies to premier real estate developers — VBR is the trusted landscape partner for organizations that demand the best."
  const trustStats = ((trust?.stats as { value: string; label: string }[]) || [
    { value: "25+", label: "Years of Experience" },
    { value: "500+", label: "Projects Delivered" },
    { value: "150+", label: "Active Clients" },
    { value: "98%", label: "Client Retention" },
  ])
  const trustCredentials = ((trust?.credentials as CredentialItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const trustTestimonials = ((trust?.testimonials as TestimonialItem[]) || [
    {
      quote: "VBR transformed our corporate campus into a green oasis. Their single-point accountability made the entire process seamless — from design to ongoing maintenance.",
      author: "Rajesh Menon",
      role: "Head of Facilities",
      company: "Leading IT Park, Bangalore",
      order: 1,
    },
    {
      quote: "What impressed us most was VBR's attention to ecological detail. They didn't just beautify our space — they engineered a landscape that reduces water usage by 40%.",
      author: "Priya Sharma",
      role: "Project Director",
      company: "Premium Residential Developer",
      order: 2,
    },
    {
      quote: "We've worked with many landscape contractors, but VBR's integrated approach and quality standards are unmatched. They deliver on time, every time.",
      author: "Anil Kumar",
      role: "VP Infrastructure",
      company: "SEZ Development Authority",
      order: 3,
    },
  ]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // ─── Newsletter Fallbacks ───
  const newsHeading = (newsletter?.heading as string) || "Stay Updated With Expert Advice"
  const newsDescription = (newsletter?.description as string) || "Join our mailing list to receive professional landscaping tips and exclusive updates."
  const newsButtonText = (newsletter?.buttonText as string) || "Subscribe"
  const newsPlaceholder = (newsletter?.placeholder as string) || "Enter your email"

  // Icon components for differentiators
  const diffIcons = [
    <Leaf key="leaf" className="h-6 w-6" />,
    <Award key="award" className="h-6 w-6" />,
    <Star key="star" className="h-6 w-6" />,
    <Users key="users" className="h-6 w-6" />,
    <Leaf key="leaf2" className="h-6 w-6" />,
    <Shield key="shield" className="h-6 w-6" />,
  ]

  // Icon components for standards
  const stdIcons = [
    <FileCheck key="filecheck" className="h-6 w-6" />,
    <HardHat key="hardhat" className="h-6 w-6" />,
    <Leaf key="leaf" className="h-6 w-6" />,
    <Award key="award" className="h-6 w-6" />,
    <CheckCircle key="check" className="h-6 w-6" />,
    <Shield key="shield" className="h-6 w-6" />,
  ]

  return (
    <main className="min-h-screen bg-[#f5f7f0]">
      <Navbar data={navbar ?? undefined} branding={branding ?? undefined} />

      {/* ════════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════════ */}
      <section className="relative min-h-[340px] flex items-center justify-center overflow-hidden pt-20">
        {heroBackground && (
          <Image
            src={heroBackground}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl mb-4">
            {heroHeading}
          </h1>
          {heroSubheading && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
              {heroSubheading}
            </p>
          )}
          <nav className="flex items-center justify-center gap-4 text-base text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-[#b9c44b]">Why VBR</span>
          </nav>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          OUR DIFFERENTIATORS
         ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="grid gap-8 lg:grid-cols-2 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4d9c4] px-4 py-1.5 mb-4">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-sm font-medium text-foreground">{diffBadge}</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl leading-tight">
                {diffHeading}
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {diffDescription}
              </p>
            </div>
          </div>

          {/* Differentiator Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {diffItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-[#e8ebe0] bg-[#f9faf5] p-6 transition-all hover:shadow-md hover:border-primary/20"
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {item.icon ? (
                    <Image src={item.icon} alt="" width={24} height={24} className="object-contain" />
                  ) : (
                    diffIcons[idx % diffIcons.length]
                  )}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SINGLE-POINT ACCOUNTABILITY
         ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-[#f0f2e8] relative overflow-hidden">
        {/* Decorative leaf on right */}
        <div className="absolute top-0 right-0 w-32 h-48 opacity-60">
          <svg viewBox="0 0 100 150" className="w-full h-full text-[#c4d4a0]">
            <ellipse cx="80" cy="30" rx="25" ry="40" fill="currentColor" transform="rotate(30 80 30)" />
            <ellipse cx="90" cy="70" rx="20" ry="35" fill="currentColor" transform="rotate(20 90 70)" />
            <ellipse cx="75" cy="110" rx="22" ry="38" fill="currentColor" transform="rotate(35 75 110)" />
            <line x1="60" y1="0" x2="60" y2="150" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 mb-4">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm font-medium text-foreground tracking-wide">{acctBadge}</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{acctHeading}</h2>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-muted-foreground leading-relaxed text-[15px]">{acctDescription}</p>
          </div>

          {/* Companies / Verticals */}
          <div className="space-y-6">
            {acctCompanies.map((company, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#e8ebe0] p-6 md:p-8 transition-all hover:shadow-md"
              >
                <div className="grid gap-6 lg:grid-cols-[auto_1fr_1fr] items-start">
                  {/* Left - Number & Identity */}
                  <div className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-primary/20">{company.number}</span>
                    <div>
                      {company.logo && (
                        <div className="mb-2">
                          <Image src={company.logo} alt="" width={60} height={60} className="object-contain" />
                        </div>
                      )}
                      <h4 className="text-lg font-bold text-foreground leading-tight">{company.name}</h4>
                      <p className="text-sm font-medium text-primary mt-0.5">{company.subtitle}</p>
                    </div>
                  </div>

                  {/* Middle - Description */}
                  <div className="lg:border-l lg:border-[#e8ebe0] lg:pl-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
                  </div>

                  {/* Right - Capabilities */}
                  <div className="lg:border-l lg:border-[#e8ebe0] lg:pl-6">
                    <h5 className="font-bold text-foreground mb-3 text-sm">Key Capabilities</h5>
                    <div className="flex flex-wrap gap-2">
                      {company.capabilities?.map((cap, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f2e8] px-3 py-1 text-xs font-medium text-foreground"
                        >
                          <span className="h-1 w-1 rounded-full bg-secondary" />
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Accountability Flow Visual */}
          <div className="mt-12 rounded-2xl bg-primary p-8 md:p-10 text-center">
            <h3 className="text-xl font-bold text-primary-foreground mb-3">One Group. One Vision. One Contact.</h3>
            <p className="text-sm text-primary-foreground/80 max-w-2xl mx-auto mb-6">
              Our integrated model eliminates coordination gaps between design, execution, and maintenance — giving you a single point of accountability for your entire landscape project lifecycle.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {["Design", "Engineering", "Supply", "Installation", "Maintenance"].map((step, idx) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-primary-foreground">
                    {step}
                  </span>
                  {idx < 4 && (
                    <ChevronRight className="h-4 w-4 text-secondary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          QUALITY, SAFETY & STANDARDS
         ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4d9c4] px-4 py-1.5 mb-4">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm font-medium text-foreground">{stdBadge}</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">{stdHeading}</h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] max-w-3xl mx-auto">
              {stdDescription}
            </p>
          </div>

          {/* Standards Grid */}
          <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {stdItems.map((item, idx) => (
              <div
                key={idx}
                className="relative p-6 md:p-8 border border-[#e8ebe0] -mt-px -ml-px"
              >
                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/15 text-primary">
                  {item.icon ? (
                    <Image src={item.icon} alt="" width={22} height={22} className="object-contain" />
                  ) : (
                    stdIcons[idx % stdIcons.length]
                  )}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications Bar */}
          <div className="mt-12 rounded-2xl bg-[#f9faf5] border border-[#e8ebe0] p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg font-bold text-foreground mb-1">Certified & Compliant</h4>
                <p className="text-sm text-muted-foreground">
                  VBR maintains ISO 9001:2015, ISO 14001:2015, and OHSAS 18001 certifications. Our projects align with LEED, GRIHA, and IGBC green building standards, ensuring every landscape we create meets international benchmarks for quality and sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CLIENT TRUST & CREDENTIALS
         ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-[#f5f7f0]">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="grid gap-8 lg:grid-cols-2 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 mb-4">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-sm font-medium text-foreground">{trustBadge}</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl leading-tight">
                {trustHeading}
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {trustDescription}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {trustStats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#e8ebe0] p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Client Logos (if available from CMS) */}
          {trustCredentials.length > 0 && (
            <div className="mb-14">
              <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">Trusted by Leading Organizations</h3>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {trustCredentials.map((cred, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    {cred.logo && (
                      <Image src={cred.logo} alt={cred.name} width={80} height={40} className="object-contain grayscale hover:grayscale-0 transition-all" />
                    )}
                    <span className="text-xs text-muted-foreground">{cred.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials */}
          <div className="grid gap-6 md:grid-cols-3">
            {trustTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#e8ebe0] p-6 md:p-8 flex flex-col"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" className="text-secondary">
                    <path
                      d="M12 4C6.5 4 2 8.5 2 14v14h12V14H6c0-3.3 2.7-6 6-6V4zm18 0c-5.5 0-10 4.5-10 10v14h12V14h-8c0-3.3 2.7-6 6-6V4z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#e8ebe0]">
                  {testimonial.image ? (
                    <Image src={testimonial.image} alt={testimonial.author} width={40} height={40} className="rounded-full object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{testimonial.author.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h5 className="text-sm font-bold text-foreground">{testimonial.author}</h5>
                    <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          NEWSLETTER SECTION
         ════════════════════════════════════════════ */}
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
