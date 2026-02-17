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
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export const dynamic = "force-dynamic"

async function getAllSections(): Promise<Record<string, Record<string, unknown>> | null> {
  try {
    const snapshot = await getDocs(collection(db, "sections"))
    if (snapshot.empty) {
      console.log("[v0] Firestore 'sections' collection is empty. Please seed the database.")
      return null
    }
    const sections: Record<string, Record<string, unknown>> = {}
    snapshot.forEach((docSnap) => {
      sections[docSnap.id] = { id: docSnap.id, ...docSnap.data() }
    })
    return sections
  } catch (error) {
    console.error("[v0] Failed to fetch sections from Firestore:", error)
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
