import Navbar from "@/components/navbar"
import HeroSection from "@/components/sections/hero"
import AboutSection from "@/components/sections/about"
import ServicesSection from "@/components/sections/services"
import TrustSection from "@/components/sections/trust"
import StatsSection from "@/components/sections/stats"
import ProcessSection from "@/components/sections/process"
import TeamSection from "@/components/sections/team"
import CTAFormSection from "@/components/sections/cta-form"
import TestimonialsSection from "@/components/sections/testimonials"
import FAQSection from "@/components/sections/faq"
import BlogSection from "@/components/sections/blog"
import NewsletterSection from "@/components/sections/newsletter"
import Footer from "@/components/footer"
import { getAllSections } from "@/lib/firestore"
import { getEcoMatrixMenu } from "@/lib/eco-matrix-firestore"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  let sections: Record<string, Record<string, unknown>> | null = null
  let ecoMatrixMenu = null
  
  try {
    const [sectionsData, menuData] = await Promise.all([
      getAllSections(),
      getEcoMatrixMenu(),
    ])
    sections = sectionsData
    ecoMatrixMenu = menuData
  } catch (error) {
    console.error("[v0] Failed to fetch sections:", error)
  }

  if (!sections) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f7f0]">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Database Not Connected</h1>
        <p className="text-sm text-[#666]">
          Firestore has no data yet or the connection failed. Please visit{" "}
          <a href="/admin" className="font-semibold text-[#2d6a2e] underline">/admin</a>{" "}
          to seed the database first.
        </p>
        <p className="mt-2 text-xs text-[#999]">Check the server console for detailed error info.</p>
      </div>
    )
  }

  return (
    <main>
      <Navbar data={sections.navbar} branding={sections.branding} ecoMatrixMenu={ecoMatrixMenu} />
      <HeroSection data={sections.hero} />
      <AboutSection data={sections.about} />
      <ServicesSection data={sections.services} />
      <TrustSection data={sections.trust} />
      <StatsSection data={sections.stats} />
      <ProcessSection data={sections.process} />
      <TeamSection data={sections.team} />
      <CTAFormSection data={sections.cta} />
      <TestimonialsSection data={sections.testimonials} />
      <FAQSection data={sections.faq} />
      <BlogSection data={sections.blog} />
      <NewsletterSection data={sections.newsletter} />
      <Footer data={sections.footer} branding={sections.branding} />
    </main>
  )
}
