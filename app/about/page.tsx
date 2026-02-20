import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getSection } from "@/lib/firestore"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ChevronRight, Send } from "lucide-react"

export const dynamic = "force-dynamic"

// Dynamic SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  let seo: Record<string, unknown> | null = null
  try {
    seo = await getSection("seo")
  } catch { /* ignore */ }

  const pages = (seo?.pages as { slug: string; title: string; description: string; ogImage?: string; keywords?: string }[]) || []
  const match = pages.find((p) => p.slug === "/about")

  return {
    title: match?.title || "About Us - VBR Landscaping",
    description: match?.description || "Learn about VBR Landscaping and our commitment to beautiful landscapes.",
    keywords: match?.keywords || "",
    openGraph: match?.ogImage ? { images: [{ url: match.ogImage }] } : undefined,
  }
}

// Types for section data
interface BreadcrumbItem {
  label: string
  href: string
  order?: number
}

interface FeatureItem {
  icon: string
  title: string
  description: string
  order?: number
}

interface CompanyItem {
  number: string
  logo: string
  name: string
  subtitle: string
  image: string
  strengthTitle: string
  strengthHighlights: string[]
  benefitTitle: string
  clientBenefits: string[]
  order?: number
}

export default async function AboutPage() {
  // Fetch all required data
  let hero: Record<string, unknown> | null = null
  let intro: Record<string, unknown> | null = null
  let features: Record<string, unknown> | null = null
  let accountability: Record<string, unknown> | null = null
  let whyChoose: Record<string, unknown> | null = null
  let newsletter: Record<string, unknown> | null = null
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    const [heroData, introData, featuresData, accountabilityData, whyChooseData, newsletterData, navData, footerData, brandingData] = await Promise.all([
      getSection("about-page-hero"),
      getSection("about-page-intro"),
      getSection("about-page-features"),
      getSection("about-page-accountability"),
      getSection("about-page-why-choose"),
      getSection("about-page-newsletter"),
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
    ])
    hero = heroData
    intro = introData
    features = featuresData
    accountability = accountabilityData
    whyChoose = whyChooseData
    newsletter = newsletterData
    navbar = navData
    footer = footerData
    branding = brandingData
  } catch (error) {
    console.error("[AboutPage] Failed to fetch sections:", error)
  }

  // Fallback data
  const heroHeading = (hero?.heading as string) || "About"
  const heroBreadcrumbs = ((hero?.breadcrumbs as BreadcrumbItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const heroBackground = (hero?.backgroundImage as string) || "/images/hero-bg.jpg"

  const introBadge = (intro?.badge as string) || "Learn About Us"
  const introHeading = (intro?.heading as string) || "Landscape intelligence & Ecosystem Engineering"
  const introYearsValue = (intro?.yearsValue as string) || "25 +"
  const introYearsLabel = (intro?.yearsLabel as string) || "Years of Work\nExperience"
  const introDescription = (intro?.description as string) || ""
  const introButtonText = (intro?.buttonText as string) || "Learn more us"
  const introMainImage = (intro?.mainImage as string) || "/images/blog-1.jpg"

  const featureItems = ((features?.items as FeatureItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const accountBadge = (accountability?.badge as string) || "VBR Group Strength"
  const accountHeading = (accountability?.heading as string) || "Single-Point Accountability"
  const accountDecorImage = (accountability?.decorImage as string) || "/images/garden-tools-decor.jpg"
  const accountCompanies = ((accountability?.companies as CompanyItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const whyBadge = (whyChoose?.badge as string) || "Why Choose Us"
  const whyHeading = (whyChoose?.heading as string) || "Why Homeowners Trust Our Landscaping Expertise"
  const whyDescription = (whyChoose?.description as string) || ""
  const whyPersonImage = (whyChoose?.personImage as string) || "/images/about-person.jpg"
  const whyFeatures = ((whyChoose?.features as FeatureItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const newsHeading = (newsletter?.heading as string) || "Stay Updated With Expert Advice"
  const newsDescription = (newsletter?.description as string) || "Join our mailing list to receive professional landscaping tips and exclusive updates."
  const newsButtonText = (newsletter?.buttonText as string) || "Subscribe"
  const newsPlaceholder = (newsletter?.placeholder as string) || "Enter your email"

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
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center">
          <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl mb-6">
            {heroHeading}
          </h1>
          {heroBreadcrumbs.length > 0 && (
            <nav className="flex items-center justify-center gap-8 text-base text-white/80">
              {heroBreadcrumbs.map((crumb, idx) => (
                <Link 
                  key={crumb.label} 
                  href={crumb.href} 
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr_1.3fr] items-start">
            {/* Left Column - Badge, Heading, Years, Button */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4d9c4] px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-sm font-medium text-foreground">{introBadge}</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-bold text-foreground md:text-4xl leading-tight mb-8">
                {introHeading}
              </h2>

              {/* Years Badge - Large Text Style */}
              <div className="flex items-end gap-0 mb-1">
                <span className="text-[72px] md:text-[90px] font-bold leading-none text-primary">
                  {introYearsValue.replace('+', '').trim()}
                </span>
                <span className="text-[36px] md:text-[45px] font-bold leading-none text-secondary mb-3">+</span>
              </div>
              <div className="text-sm text-muted-foreground mb-8">
                {introYearsLabel.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </div>

              {/* Button */}
              <Link
                href="#"
                className="inline-flex items-center gap-3 rounded-full bg-primary pl-6 pr-2 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {introButtonText}
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                  <ChevronRight className="h-5 w-5 text-primary" />
                </span>
              </Link>
            </div>

            {/* Middle Column - Description */}
            <div className="pt-16">
              <div className="text-muted-foreground space-y-4">
                {introDescription.split("\n\n").map((para, idx) => (
                  <p key={idx} className="leading-relaxed text-[14px]">{para}</p>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={introMainImage}
                  alt="Landscaping"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-[#f5f7f0]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-[#f9faf5] rounded-2xl border border-[#e8ebe0] p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-3 md:divide-x md:divide-[#e8ebe0]">
              {featureItems.map((feature, idx) => (
                <div key={idx} className="flex gap-4 px-4 first:pl-0 last:pr-0">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {feature.icon ? (
                      <div className="h-12 w-12 flex items-center justify-center">
                        <Image src={feature.icon} alt="" width={40} height={40} className="object-contain" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-secondary/10" />
                    )}
                  </div>
                  {/* Content */}
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Garden Tools */}
      <section className="py-8 bg-[#f5f7f0]">
        <div className="mx-auto max-w-7xl px-6">
          {accountDecorImage && (
            <div className="relative w-36 h-44">
              <Image src={accountDecorImage} alt="" fill className="object-contain" />
            </div>
          )}
        </div>
      </section>

      {/* VBR Group Strength / Accountability Section */}
      <section className="py-16 lg:py-20 bg-[#f0f2e8] relative overflow-hidden">
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
          {/* Header - Centered */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 mb-4">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm font-medium text-foreground tracking-wide">{accountBadge}</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{accountHeading}</h2>
          </div>

          {/* Companies Grid */}
          <div className="space-y-8">
            {accountCompanies.map((company, idx) => (
              <div 
                key={idx} 
                className="grid gap-6 lg:grid-cols-[280px_1fr_1fr] items-start py-6 border-b border-[#dde0d0] last:border-b-0"
              >
                {/* Left - Company Info */}
                <div className="flex flex-col items-start">
                  {/* Logo Icon */}
                  {company.logo && (
                    <div className="mb-4">
                      <Image src={company.logo} alt="" width={80} height={80} className="object-contain" />
                    </div>
                  )}
                  {/* Company Name & Subtitle */}
                  <h4 className="text-lg font-bold text-foreground leading-tight">{company.name}</h4>
                  <p className="text-sm font-medium text-primary mt-1">{company.subtitle}</p>
                </div>

                {/* Middle - Image with Number */}
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl max-w-[320px]">
                    {company.image && (
                      <Image src={company.image} alt={company.name} fill className="object-cover" />
                    )}
                    {/* Number Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-5xl font-bold text-white/90 drop-shadow-lg">
                        {company.number}.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right - Highlights & Benefits */}
                <div className="space-y-6">
                  {/* Strength Highlights */}
                  <div>
                    <h5 className="font-bold text-foreground mb-3 text-sm">{company.strengthTitle}</h5>
                    <ul className="space-y-1.5">
                      {company.strengthHighlights?.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Client Benefits */}
                  <div>
                    <h5 className="font-bold text-foreground mb-3 text-sm">{company.benefitTitle}</h5>
                    <ul className="space-y-1.5">
                      {company.clientBenefits?.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Top Row - Badge/Heading + Description */}
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            {/* Left - Badge & Heading */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 mb-4">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-sm font-medium text-foreground">{whyBadge}</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl leading-tight">
                {whyHeading}
              </h2>
            </div>
            {/* Right - Description */}
            <div className="flex items-end">
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {whyDescription}
              </p>
            </div>
          </div>

          {/* Bottom Row - Image + Features */}
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left - Image with decorations */}
            <div className="relative">
              {/* Background circle decoration */}
              <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-[#dde8c4] rounded-full -z-10" />
              
              {/* Main Image - Circular crop */}
              <div className="relative z-10 w-[380px] h-[450px] mx-auto lg:mx-0">
                <div className="absolute inset-0 rounded-[40%_40%_45%_45%] overflow-hidden">
                  {whyPersonImage && (
                    <Image
                      src={whyPersonImage}
                      alt="Expert Team"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              
              {/* Decorative leaf patterns - right side */}
              <div className="absolute top-1/4 -right-4 lg:right-8 w-20 h-32 opacity-30">
                <svg viewBox="0 0 80 120" className="w-full h-full text-[#c4d6a0]">
                  <ellipse cx="40" cy="30" rx="30" ry="25" fill="currentColor" />
                  <ellipse cx="50" cy="70" rx="25" ry="20" fill="currentColor" />
                  <ellipse cx="35" cy="105" rx="28" ry="22" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute bottom-12 -right-2 lg:right-4 w-16 h-24 opacity-20">
                <svg viewBox="0 0 60 90" className="w-full h-full text-[#c4d6a0]">
                  <ellipse cx="30" cy="25" rx="25" ry="20" fill="currentColor" />
                  <ellipse cx="35" cy="60" rx="22" ry="18" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Right - Features List */}
            <div className="space-y-0 divide-y divide-[#e8ebe0]">
              {whyFeatures.map((feature, idx) => (
                <div key={idx} className="flex gap-5 py-6 first:pt-0">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 flex items-center justify-center">
                      <svg viewBox="0 0 40 40" className="w-10 h-10 text-primary">
                        <circle cx="20" cy="20" r="3" fill="currentColor" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                          <line
                            key={i}
                            x1="20"
                            y1="20"
                            x2={20 + 15 * Math.cos((angle * Math.PI) / 180)}
                            y2={20 + 15 * Math.sin((angle * Math.PI) / 180)}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        ))}
                      </svg>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground text-lg mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 bg-[#e8f0c8]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Heading */}
            <h3 className="text-2xl font-bold text-foreground whitespace-nowrap">
              {newsHeading.split(' ').slice(0, 3).join(' ')}<br className="hidden sm:block" />
              {newsHeading.split(' ').slice(3).join(' ')}
            </h3>
            {/* Description */}
            <p className="text-sm text-muted-foreground max-w-xs text-center lg:text-left">
              {newsDescription}
            </p>
            {/* Form */}
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
