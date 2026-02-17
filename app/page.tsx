import { adminDb } from "@/lib/firebase-admin"
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

export const dynamic = "force-dynamic"

async function getAllSections() {
  try {
    const snapshot = await adminDb.collection("sections").get()
    const sections: Record<string, Record<string, unknown>> = {}
    snapshot.forEach((doc) => {
      sections[doc.id] = { id: doc.id, ...doc.data() }
    })
    return sections
  } catch (error) {
    console.error("Failed to fetch sections from Firestore:", error)
    return null
  }
}

export default async function HomePage() {
  const sections = await getAllSections()

  if (!sections) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f7f0]">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Database Not Connected</h1>
        <p className="text-sm text-[#666]">
          Please visit <a href="/admin" className="font-semibold text-[#2d6a2e] underline">/admin</a> to seed the database first.
        </p>
      </div>
    )
  }

  return (
    <main>
      <Navbar data={sections.navbar} />
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
      <Footer data={sections.footer} />
    </main>
  )
}
