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

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TrustSection />
      <StatsSection />
      <ProcessSection />
      <TeamSection />
      <CTAFormSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
