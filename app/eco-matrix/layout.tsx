import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NewsletterSection from "@/components/sections/newsletter"
import { getSection } from "@/lib/firestore"
import { getEcoMatrixMenu } from "@/lib/eco-matrix-firestore"

export const dynamic = "force-dynamic"

export default async function EcoMatrixLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navbar = null
  let footer = null
  let branding = null
  let newsletter = null
  let ecoMatrixMenu = null

  try {
    const [navData, footerData, brandingData, newsletterData, menuData] = await Promise.all([
      getSection("navbar"),
      getSection("footer"),
      getSection("branding"),
      getSection("newsletter"),
      getEcoMatrixMenu(),
    ])
    navbar = navData
    footer = footerData
    branding = brandingData
    newsletter = newsletterData
    ecoMatrixMenu = menuData
  } catch (error) {
    console.error("[eco-matrix] Failed to fetch layout data:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar data={navbar ?? undefined} branding={branding ?? undefined} ecoMatrixMenu={ecoMatrixMenu} />
      {children}
      <NewsletterSection data={newsletter ?? undefined} />
      <Footer data={footer ?? undefined} branding={branding ?? undefined} />
    </main>
  )
}
