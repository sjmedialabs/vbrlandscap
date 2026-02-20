import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getSection } from "@/lib/firestore"
import {
  getAllProjects,
  getProjectsPageData,
  getCategories,
  defaultProjectsPageData,
  defaultCategories,
  sampleProjects,
  type Project,
  type ProjectCategory,
  type ProjectsPageData,
} from "@/lib/projects-firestore"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ProjectsGrid } from "./projects-grid"
import { ProjectsNewsletter } from "./projects-newsletter"

export const dynamic = "force-dynamic"

// Dynamic SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  let seo: Record<string, unknown> | null = null
  try {
    seo = await getSection("seo")
  } catch { /* ignore */ }

  const pages = (seo?.pages as { slug: string; title: string; description: string; ogImage?: string; keywords?: string }[]) || []
  const match = pages.find((p) => p.slug === "/projects")

  return {
    title: match?.title || "Projects - VBR Landscaping",
    description: match?.description || "Explore our portfolio of beautiful landscaping projects.",
    keywords: match?.keywords || "",
    openGraph: match?.ogImage ? { images: [{ url: match.ogImage }] } : undefined,
  }
}

export default async function ProjectsPage() {
  // Fetch all required data
  let projects: Project[] = []
  let pageData: ProjectsPageData | null = null
  let categories: ProjectCategory[] = []
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    const [projectsData, pageDataResult, categoriesData, navData, footerData, brandingData] = await Promise.all([
      getAllProjects(),
      getProjectsPageData(),
      getCategories(),
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
    ])
    
    projects = projectsData.length > 0 ? projectsData : sampleProjects.map((p, i) => ({ ...p, id: `sample-${i}` }))
    pageData = pageDataResult || defaultProjectsPageData
    categories = categoriesData.length > 0 ? categoriesData : defaultCategories
    navbar = navData
    footer = footerData
    branding = brandingData
  } catch (error) {
    console.error("[ProjectsPage] Failed to fetch data:", error)
    projects = sampleProjects.map((p, i) => ({ ...p, id: `sample-${i}` }))
    pageData = defaultProjectsPageData
    categories = defaultCategories
  }

  // Fallback values
  const heroTitle = pageData?.heroTitle || "Projects"
  const heroBackground = pageData?.heroBackgroundImage || "/images/hero-bg.jpg"

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
            <span className="text-white/60">•</span>
            <span className="text-[#b9c44b]">Gallery</span>
          </nav>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <ProjectsGrid projects={projects} categories={categories} />
        </div>
      </section>

      {/* Newsletter Section */}
      <ProjectsNewsletter
        heading={pageData?.newsletterHeading || "Stay Updated With Expert Advice"}
        description={pageData?.newsletterDescription || "Join our mailing list to receive professional landscaping tips and exclusive"}
        buttonText={pageData?.newsletterButtonText || "Subscribe"}
        placeholder={pageData?.newsletterPlaceholder || "Enter your email"}
      />

      <Footer data={footer ?? undefined} branding={branding ?? undefined} />
    </main>
  )
}
