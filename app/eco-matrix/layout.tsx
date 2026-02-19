import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NewsletterSection from "@/components/sections/newsletter"
import { getSection } from "@/lib/firestore"

export const dynamic = "force-dynamic"

export default async function EcoMatrixLayout({ children }: { children: React.ReactNode }) {
  let navbar: Record<string, unknown> | null = null
  let footer: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null
  let newsletter: Record<string, unknown> | null = null

  try {
    const [navData, footerData, brandingData, newsletterData] = await Promise.all([
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
      getSection("newsletter"),
    ])
    navbar = navData
    footer = footerData
    branding = brandingData
    newsletter = newsletterData
  } catch (error) {
    console.error("[eco-matrix] Failed to fetch layout data:", error)
  }

  return (
    <main>
      <Navbar data={navbar ?? undefined} branding={branding ?? undefined} />
      {children}
      <NewsletterSection data={newsletter ?? undefined} />
      <Footer data={footer ?? undefined} branding={branding ?? undefined} />
    </main>
  )
}
