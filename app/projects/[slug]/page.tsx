import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSection } from "@/lib/firestore"
import {
  getProjectBySlug,
  getRelatedProjects,
  getProjectsPageData,
  defaultProjectsPageData,
  defaultProject,
  type Project,
  type ProjectsPageData,
} from "@/lib/projects-firestore"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ProjectInfoCard } from "./project-info-card"
import { ProjectFeatures } from "./project-features"
import { RelatedProjects } from "./related-projects"
import { ProjectsNewsletter } from "../projects-newsletter"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let project: Project | null = null

  try {
    project = await getProjectBySlug(slug)
  } catch {
    /* ignore */
  }

  if (!project) {
    return {
      title: "Project Not Found - VBR Landscaping",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.title} - VBR Landscaping`,
    description: project.shortDescription,
    openGraph: project.featuredImage
      ? { images: [{ url: project.featuredImage }] }
      : undefined,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch all required data
  let project: Project | null = null
  let relatedProjects: Project[] = []
  let pageData: ProjectsPageData | null = null
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    const [projectData, pageDataResult, navData, footerData, brandingData] =
      await Promise.all([
        getProjectBySlug(slug),
        getProjectsPageData(),
        getSection("navbar"),
        getSection("footer"),
        getSection("branding"),
      ])

    project = projectData
    pageData = pageDataResult || defaultProjectsPageData
    navbar = navData
    footer = footerData
    branding = brandingData

    // Fetch related projects if project exists
    if (project) {
      relatedProjects = await getRelatedProjects(project.id, 2)
    }
  } catch (error) {
    console.error("[ProjectDetailPage] Failed to fetch data:", error)
    pageData = defaultProjectsPageData
  }

  // If no project found from DB, use default for preview/demo
  if (!project) {
    // Check if this is a sample slug
    if (slug === "creating-patios-decks-recreational") {
      project = { ...defaultProject, id: "sample-1" }
    } else {
      notFound()
    }
  }

  const heroBackground = project.heroImage || "/images/hero-bg.jpg"

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
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto leading-tight">
            {project.title}
          </h1>
          <nav className="flex items-center justify-center gap-4 text-base text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/60">•</span>
            <Link
              href="/projects"
              className="hover:text-white transition-colors"
            >
              Projects
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-[#b9c44b]">Details</span>
          </nav>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={project.featuredImage || "/images/blog-1.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
                {project.title}
              </h2>

              {/* Full Description */}
              <div className="prose prose-lg max-w-none text-[#555] leading-relaxed">
                {project.fullDescription.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Column - Info Card */}
            <div className="lg:col-span-1">
              <ProjectInfoCard
                client={project.client}
                projectType={project.projectType}
                date={project.date}
                website={project.website}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      {project.features && project.features.length > 0 && (
        <ProjectFeatures features={project.features} />
      )}

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <RelatedProjects projects={relatedProjects} />
      )}

      {/* Newsletter Section */}
      <ProjectsNewsletter
        heading={
          pageData?.newsletterHeading || "Stay Updated With Expert Advice"
        }
        description={
          pageData?.newsletterDescription ||
          "Join our mailing list to receive professional landscaping tips and exclusive"
        }
        buttonText={pageData?.newsletterButtonText || "Subscribe"}
        placeholder={pageData?.newsletterPlaceholder || "Enter your email"}
      />

      <Footer data={footer ?? undefined} branding={branding ?? undefined} />
    </main>
  )
}
