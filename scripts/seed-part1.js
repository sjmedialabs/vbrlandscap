const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

function toFs(v) {
  if (v === null || v === undefined) return { nullValue: null }
  if (typeof v === "boolean") return { booleanValue: v }
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }
  if (typeof v === "string") return { stringValue: v }
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toFs) } }
  if (typeof v === "object") {
    const f = {}
    for (const [k, val] of Object.entries(v)) f[k] = toFs(val)
    return { mapValue: { fields: f } }
  }
  return { stringValue: String(v) }
}

async function seed(id, data) {
  const fields = {}
  for (const [k, v] of Object.entries(data)) fields[k] = toFs(v)
  const url = `${BASE}/sections/${id}?key=${API_KEY}`
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  })
  if (!res.ok) {
    const txt = await res.text()
    console.log(`FAIL ${id}: ${res.status} ${txt.substring(0, 200)}`)
  } else {
    console.log(`OK ${id}`)
  }
}

async function main() {
  await seed("branding", {
    siteName: "VBR Landscaping",
    navbarLogo: "",
    footerLogo: "",
    favicon: "",
    primaryColor: "#2d6a2e",
    secondaryColor: "#6d8c21",
    accentColor: "#c5a72e",
  })

  await seed("seo", {
    pages: [
      { slug: "/", title: "VBR Landscaping - Professional Landscaping Services", description: "Transforming outdoor spaces into natural beauty.", ogImage: "", keywords: "landscaping, garden design, VBR", order: 0 },
      { slug: "/about", title: "About Us - VBR Landscaping", description: "Learn about our team.", ogImage: "", keywords: "about, team", order: 1 },
      { slug: "/eco-matrix", title: "VBR ECO-MATRIX", description: "Sustainable landscaping.", ogImage: "", keywords: "eco, sustainable", order: 2 },
      { slug: "/sectors", title: "Sectors - VBR Landscaping", description: "Industries we serve.", ogImage: "", keywords: "sectors", order: 3 },
      { slug: "/projects", title: "Our Projects - VBR Landscaping", description: "Our portfolio.", ogImage: "", keywords: "projects", order: 4 },
      { slug: "/why-vbr", title: "Why VBR", description: "Why choose us.", ogImage: "", keywords: "why VBR", order: 5 },
      { slug: "/careers", title: "Careers - VBR Landscaping", description: "Join our team.", ogImage: "", keywords: "careers, jobs", order: 6 },
      { slug: "/contact", title: "Contact Us", description: "Get in touch.", ogImage: "", keywords: "contact", order: 7 },
    ],
  })

  await seed("navbar", {
    links: [
      { label: "VBR ECO-MATRIX", href: "/eco-matrix", order: 0 },
      { label: "Sectors", href: "/sectors", order: 1 },
      { label: "Projects", href: "/projects", order: 2 },
      { label: "About", href: "/about", order: 3 },
      { label: "Why VBR", href: "/why-vbr", order: 4 },
      { label: "Careers", href: "/careers", order: 5 },
    ],
    ctaText: "Get in Touch",
    ctaHref: "/contact",
  })

  await seed("hero", {
    badge: "Welcome to VBR Landscaping",
    heading: "Transforming Outdoor Spaces Into Natural Beauty",
    subheading: "We create stunning landscapes that blend artistry with sustainability.",
    ctaText: "Explore Our Services",
    ctaHref: "#services",
    secondaryCtaText: "View Our Work",
    secondaryCtaHref: "#projects",
    backgroundImage: "/images/hero-bg.jpg",
  })

  console.log("Part 1 done (branding, seo, navbar, hero)")
}

main().catch(e => console.error(e))
