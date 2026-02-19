import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHero from "@/components/page-sections/page-hero"
import { getSection } from "@/lib/firestore"
import Image from "next/image"

export const dynamic = "force-dynamic"

const validSlugs = ["about", "eco-matrix", "sectors", "projects", "why-vbr", "careers", "contact"]

// Dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (!validSlugs.includes(slug)) return {}

  let seo: Record<string, unknown> | null = null
  try {
    seo = await getSection("seo")
  } catch { /* ignore */ }

  const pages = (seo?.pages as { slug: string; title: string; description: string; ogImage?: string; keywords?: string }[]) || []
  const match = pages.find((p) => p.slug === `/${slug}`)

  return {
    title: match?.title || slug.charAt(0).toUpperCase() + slug.slice(1),
    description: match?.description || "",
    keywords: match?.keywords || "",
    openGraph: match?.ogImage ? { images: [{ url: match.ogImage }] } : undefined,
  }
}

// Card component for object arrays
function ContentCard({ item }: { item: { icon?: string; image?: string; title?: string; category?: string; location?: string; type?: string; description?: string } }) {
  const img = item.image || item.icon
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {img && (
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image src={img} alt={item.title || ""} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      )}
      <div className="p-5">
        {item.category && <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-wider text-secondary">{item.category}</span>}
        {item.title && <h3 className="text-lg font-bold text-foreground">{item.title}</h3>}
        {item.location && <p className="mt-1 text-sm text-muted-foreground">{item.location} {item.type ? `- ${item.type}` : ""}</p>}
        {item.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
      </div>
    </div>
  )
}

// Render a content section with icon/title/description cards
function FeatureGrid({ items, title }: { items: Record<string, unknown>[]; title?: string }) {
  if (!items.length) return null
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        {title && <h2 className="mb-10 text-center text-3xl font-bold text-foreground">{title}</h2>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ContentCard key={i} item={item as { icon?: string; image?: string; title?: string; category?: string; location?: string; type?: string; description?: string }} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact page form
function ContactForm({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          {data.formHeading && <h2 className="text-3xl font-bold text-foreground">{data.formHeading as string}</h2>}
          {data.formDescription && <p className="mt-3 text-muted-foreground">{data.formDescription as string}</p>}
          <div className="mt-8 space-y-4">
            {data.address && (
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 text-center text-xs leading-5 font-bold text-primary">A</div>
                <p className="text-sm text-muted-foreground">{data.address as string}</p>
              </div>
            )}
            {data.phone && (
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 text-center text-xs leading-5 font-bold text-primary">P</div>
                <p className="text-sm text-muted-foreground">{data.phone as string}</p>
              </div>
            )}
            {data.email && (
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 text-center text-xs leading-5 font-bold text-primary">E</div>
                <p className="text-sm text-muted-foreground">{data.email as string}</p>
              </div>
            )}
          </div>
          {data.mapEmbedUrl && (
            <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-border">
              <iframe src={data.mapEmbedUrl as string} width="100%" height="100%" className="border-0" loading="lazy" title="Map" />
            </div>
          )}
        </div>
        <form className="space-y-4 rounded-2xl bg-card p-8 shadow-sm border border-border">
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Full Name" className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input type="email" placeholder="Email Address" className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </div>
          <input type="text" placeholder="Subject" className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <textarea placeholder="Your Message" rows={5} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <button type="submit" className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

// Map slug to the Firestore doc id and array key
const pageConfig: Record<string, { docId: string; arrayKey?: string; arrayTitle?: string }> = {
  about: { docId: "page-about", arrayKey: "values", arrayTitle: "Our Values" },
  "eco-matrix": { docId: "page-eco-matrix", arrayKey: "features", arrayTitle: "Our Approach" },
  sectors: { docId: "page-sectors", arrayKey: "sectors", arrayTitle: "Sectors We Serve" },
  projects: { docId: "page-projects", arrayKey: "projects", arrayTitle: "Featured Projects" },
  "why-vbr": { docId: "page-why-vbr", arrayKey: "reasons", arrayTitle: "Why Choose VBR" },
  careers: { docId: "page-careers", arrayKey: "openings", arrayTitle: "Current Openings" },
  contact: { docId: "page-contact" },
}

export default async function InnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = pageConfig[slug]
  if (!config) notFound()

  let data: Record<string, unknown> | null = null
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    const [pageData, navData, footerData, brandingData] = await Promise.all([
      getSection(config.docId),
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
    ])
    data = pageData
    navbar = navData
    footer = footerData
    branding = brandingData
  } catch {
    // Fallback
  }

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-sm text-muted-foreground">
          This page has not been set up yet. Go to{" "}
          <a href="/admin" className="font-semibold text-primary underline">/admin</a>{" "}
          to seed the database and configure page content.
        </p>
      </div>
    )
  }

  const heroTitle = (data.heroTitle as string) || slug.charAt(0).toUpperCase() + slug.slice(1)
  const heroSubtitle = data.heroSubtitle as string | undefined
  const heroImage = data.heroImage as string | undefined
  const content = data.content as string | undefined
  const items = config.arrayKey ? ((data[config.arrayKey] as Record<string, unknown>[]) || []).sort((a, b) => ((a.order as number) ?? 0) - ((b.order as number) ?? 0)) : []

  return (
    <main className="min-h-screen bg-background">
      <Navbar data={navbar ?? undefined} branding={branding ?? undefined} />
      <PageHero title={heroTitle} subtitle={heroSubtitle} backgroundImage={heroImage} />

      {/* Page Content */}
      {content && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-lg leading-relaxed text-muted-foreground">{content}</p>
          </div>
        </section>
      )}

      {/* Contact page specific layout */}
      {slug === "contact" ? (
        <ContactForm data={data} />
      ) : (
        items.length > 0 && <FeatureGrid items={items} title={config.arrayTitle} />
      )}

      {/* Team section for about page */}
      {slug === "about" && data.teamHeading && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground">{data.teamHeading as string}</h2>
            {data.teamDescription && (
              <p className="mt-3 text-muted-foreground">{data.teamDescription as string}</p>
            )}
          </div>
        </section>
      )}

      <Footer data={footer ?? undefined} branding={branding ?? undefined} />
    </main>
  )
}
