const https = require("https")

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ""
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ""

if (!PROJECT_ID) {
  console.error("ERROR: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set")
  process.exit(1)
}

console.log("Project ID:", PROJECT_ID)
console.log("API Key:", API_KEY ? API_KEY.substring(0, 10) + "..." : "MISSING")

function httpsRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = ""
      res.on("data", (chunk) => { data += chunk })
      res.on("end", () => {
        resolve({ status: res.statusCode, body: data })
      })
    })
    req.on("error", reject)
    if (body) req.write(body)
    req.end()
  })
}

function jsToFirestore(val) {
  if (val === null || val === undefined) return { nullValue: null }
  if (typeof val === "string") return { stringValue: val }
  if (typeof val === "number") {
    if (Number.isInteger(val)) return { integerValue: String(val) }
    return { doubleValue: val }
  }
  if (typeof val === "boolean") return { booleanValue: val }
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(jsToFirestore) } }
  }
  if (typeof val === "object") {
    const fields = {}
    for (const [k, v] of Object.entries(val)) {
      fields[k] = jsToFirestore(v)
    }
    return { mapValue: { fields } }
  }
  return { stringValue: String(val) }
}

async function writeDoc(docId, data) {
  const fields = {}
  for (const [k, v] of Object.entries(data)) {
    fields[k] = jsToFirestore(v)
  }
  const path = `/v1/projects/${PROJECT_ID}/databases/(default)/documents/sections/${docId}?key=${API_KEY}`
  const body = JSON.stringify({ fields })
  const res = await httpsRequest(`https://firestore.googleapis.com${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
  }, body)
  if (res.status >= 200 && res.status < 300) {
    console.log("  Seeded:", docId)
  } else {
    console.error("  FAILED:", docId, res.status, res.body.substring(0, 200))
  }
}

const sections = {
  hero: {
    heading: "Transforming Outdoor Spaces Into Natural Beauty.",
    statValue: "98 %", statLabel: "Reduction in\nemployee turnover",
    backgroundImage: "/images/hero-bg.jpg", statImage: "/images/rectangle-11.png",
    avatarsImage: "/images/avatars.png", rating: "4.8",
    reviewCount: "Based on 204 Reviews", tagline: "Effective Talent",
  },
  about: {
    badge: "About Our Company", heading: "Building Beautiful Landscapes Since Day One.",
    description: "From our very first project, we've been committed to creating outdoor spaces that feel natural, functional, and visually stunning.",
    personImage: "/images/about-person.jpg", leafDecoration: "/images/leaf-decoration.png",
    gardenToolsDecor: "/images/garden-tools-decor.jpg", containerImage: "/images/container.png",
    missionIcon: "/images/icon-landscape.png", missionTitle: "Our Mission",
    missionDescription: "To redefine the future of work by creating a world where every organization recognizes",
    visionIcon: "/images/icon-eye.png", visionTitle: "Our Vision",
    visionDescription: "To redefine the future of work by creating a world where every organization recognizes",
    ctaButtonText: "Discover More", phoneLabel: "Call Anytime", phoneNumber: "+88 017 500 500",
  },
  services: {
    badge: "Our Services", heading: "Empowering your workforce with expert services",
    bottomTag: "HURRY", bottomText: "Choose from our selection of the best places.",
    bottomLink: "Get a project in mind?", leafImage: "/images/leaf-green.png",
    items: [
      { image: "/images/service-1.png", title: "Design & Planning", description: "Expert planting, pruning, and maintenance for healthy.", order: 0 },
      { image: "/images/service-2.png", title: "Tree & Plant Care", description: "Expert planting, pruning, and maintenance for healthy.", order: 1 },
      { image: "/images/service-3.png", title: "Drainage Systems", description: "Expert planting, pruning, and maintenance for healthy.", order: 2 },
      { image: "/images/service-4.png", title: "Seasonal Clean-up", description: "Expert planting, pruning, and maintenance for healthy.", order: 3 },
    ],
  },
  trust: {
    badge: "Why Choose Us", heading: "Growing Trust Through Quality Work.",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    maskImage1: "/images/why-choose-mask.png", maskImage2: "/images/why-choose-mask-2.png",
    trowelImage: "/images/trowel-seedling.png", badgeValue: "25 +", badgeLabel: "Years of\nExperience",
    features: [
      { icon: "/images/icon-hand-plant.png", title: "Where Your Money Works Harder", description: "15+ years crafting identities for Fortune 500s to fast-growth startups", order: 0 },
      { icon: "/images/icon-aloe.png", title: "We Listen First, Invest Second", description: "Experts in responsive logo systems", order: 1 },
      { icon: "/images/icon-thumbs.png", title: "AI-Enhanced Portfolio Optimization", description: "15+ years crafting identities", order: 2 },
    ],
  },
  stats: {
    backgroundImage: "/images/stats-bg.png",
    stats: [
      { icon: "/images/icon-aloe.png", value: "10k +", label: "Hearts We've\nTouched", order: 0 },
      { icon: "/images/icon-eye.png", value: "25 +", label: "Years of\nexperienced", order: 1 },
      { icon: "/images/icon-hand-plant.png", value: "250", label: "Personal expert\nnursing", order: 2 },
      { icon: "/images/icon-landscape.png", value: "15 +", label: "Senior care\nconsulting Award", order: 3 },
    ],
    projects: [
      { tag: "Landscaping", title: "Creating patios, decks, and recreational", href: "/services/patios", order: 0 },
      { tag: "Landscaping", title: "Tailored landscaping designs", href: "/services/landscaping-design", order: 1 },
      { tag: "Landscaping", title: "Designed by Nature, Built by Experts", href: "/services/nature-design", order: 2 },
      { tag: "Landscaping", title: "Modern Backyard Makeover", href: "/services/backyard-makeover", order: 3 },
    ],
  },
  process: {
    badge: "How It Works", heading: "Designing Nature, One Step at a Time.",
    fieldImage: "/images/farmer-field.png", leafImage: "/images/leaf-gray.png",
    checklistItems: ["Personalized Consultation", "Expert Installation & Craftsmanship", "Comprehensive Site Evaluation"],
    steps: [
      { number: "01", title: "Ongoing Maintenance", description: "We offer maintenance services to keep your landscape healthy.", order: 0 },
      { number: "02", title: "Installation & Construction", description: "We offer maintenance services.", order: 1 },
      { number: "03", title: "Custom Design", description: "We offer maintenance services.", order: 2 },
      { number: "04", title: "Site Analysis", description: "We offer maintenance services.", order: 3 },
    ],
  },
  team: {
    badge: "Expert Team", heading: "The Faces Behind Our Trusted Landscaping Services",
    partnersHeading: "Trusted By Leading Brands", leafImage: "/images/leaf-lime.png",
    members: [
      { name: "James Carter", role: "Senior Cleaning", image: "/images/team-1.jpg", order: 0 },
      { name: "James David", role: "Senior Cleaning", image: "/images/team-2.jpg", order: 1 },
      { name: "Martin Carlos", role: "Senior Cleaning", image: "/images/team-3.jpg", order: 2 },
      { name: "James Carter", role: "Senior Cleaning", image: "/images/team-4.jpg", order: 3 },
    ],
    partners: [
      { name: "Vertigo", image: "/images/logo-vertigo.png", order: 0 },
      { name: "Sitemark", image: "/images/logo-sitemark.png", order: 1 },
      { name: "Snowflake", image: "/images/logo-snowflake.png", order: 2 },
      { name: "Cactus", image: "/images/logo-cactus.png", order: 3 },
      { name: "Greenin", image: "/images/logo-greenin.png", order: 4 },
    ],
  },
  cta: {
    heading: "We're Here to Help!", contactBadge: "Contact Us", submitButtonText: "Submit Request",
    backgroundImage: "/images/cta-garden-bg.png", testimonialImage: "/images/turf-installer.png",
    testimonialQuote: "They made my home sparkle! Highly professional and fast service",
    testimonialAuthor: "Stiven Dowson",
  },
  testimonials: {
    badge: "Testimonials", heading: "Hear from Our Happy Customers.",
    rating: "4.8", reviewText: "Based on 500+ verified customer reviews",
    backgroundImage: "/images/testimonial-bg.jpg",
    items: [
      { name: "Michael Chen", role: "Homeowner", text: "Landscope transformed our backyard into a stunning retreat.", rating: 5, order: 0 },
      { name: "Amanda Foster", role: "Business Owner", text: "The team delivered an incredible commercial landscape.", rating: 5, order: 1 },
      { name: "David Hernandez", role: "Property Manager", text: "We have been using Landscope for ongoing maintenance for 3 years.", rating: 5, order: 2 },
    ],
  },
  faq: {
    badge: "FAQ", heading: "Your Most Important Questions Answered Here",
    decorationImage: "/images/leaf-decoration.jpg",
    items: [
      { question: "How long does a full landscaping project take?", answer: "The timeline varies depending on the scope. Typically 2-6 weeks.", order: 0 },
      { question: "What types of services do you offer?", answer: "We offer design, tree care, drainage, seasonal clean-up, irrigation, and maintenance.", order: 1 },
      { question: "Do you offer maintenance plans after installation?", answer: "Yes! We offer flexible maintenance plans tailored to your needs.", order: 2 },
      { question: "How often should I maintain my landscaping?", answer: "Regular maintenance is key. We recommend weekly or bi-weekly.", order: 3 },
      { question: "Is green services available for both homes and businesses?", answer: "Absolutely! We serve residential, commercial, HOA, and municipal.", order: 4 },
    ],
  },
  blog: {
    badge: "Blog", heading: "Check Out Latest News Update & Articles",
    posts: [
      { title: "Eco-Friendly Landscaping Ideas", excerpt: "Discover sustainable landscaping practices.", image: "/images/blog-1.jpg", date: "Jan 15, 2026", category: "Sustainability", order: 0 },
      { title: "The Best Plants for Shady Areas", excerpt: "Transform dark corners with shade-loving plants.", image: "/images/blog-2.jpg", date: "Jan 10, 2026", category: "Plant Guide", order: 1 },
      { title: "Top 5 Turf Maintenance Tips", excerpt: "Professional tips to keep your lawn looking its best.", image: "/images/blog-3.jpg", date: "Jan 5, 2026", category: "Lawn Care", order: 2 },
    ],
  },
  newsletter: {
    heading: "Stay Updated With Expert Advice",
    description: "Subscribe to our newsletter for landscaping tips, seasonal guides, and exclusive offers.",
    buttonText: "Subscribe",
  },
  navbar: {
    ctaText: "Get Appointment",
    links: [
      { label: "Home", href: "/", order: 0 },
      { label: "About us", href: "/about", order: 1 },
      { label: "VBR ECO-MATRIX", href: "/eco-matrix", order: 2 },
      { label: "Sectors", href: "/sectors", order: 3 },
      { label: "Projects", href: "/projects", order: 4 },
      { label: "Why VBR", href: "/why-vbr", order: 5 },
      { label: "Careers", href: "/careers", order: 6 },
      { label: "Contact", href: "/contact", order: 7 },
    ],
  },
  footer: {
    brandName: "VBR Landscaping",
    brandDescription: "We are a full-service landscaping company dedicated to transforming outdoor spaces.",
    address: "123 Green Valley Road, Garden District, CA 90210",
    phone: "+1 (555) 123-4567", email: "info@vbrlandscaping.com",
    copyright: "Copyright 2026 VBR Landscaping. All rights reserved.",
    socialLinks: [
      { image: "/images/social-icon-1.png", href: "#", label: "Facebook", order: 0 },
      { image: "/images/social-icon-2.png", href: "#", label: "Instagram", order: 1 },
      { image: "/images/social-icon-3.png", href: "#", label: "Twitter", order: 2 },
      { image: "/images/social-icon-4.png", href: "#", label: "LinkedIn", order: 3 },
    ],
    companyLinks: [
      { label: "About Us", href: "/about", order: 0 },
      { label: "Our Team", href: "/about#team", order: 1 },
      { label: "Careers", href: "/careers", order: 2 },
      { label: "Contact", href: "/contact", order: 3 },
    ],
    serviceLinks: [
      { label: "Design & Planning", href: "/services/design", order: 0 },
      { label: "Tree & Plant Care", href: "/services/tree-care", order: 1 },
      { label: "Drainage Systems", href: "/services/drainage", order: 2 },
      { label: "Seasonal Clean-up", href: "/services/cleanup", order: 3 },
      { label: "Maintenance", href: "/services/maintenance", order: 4 },
    ],
  },
  branding: {
    siteName: "VBR Landscaping", navbarLogo: "", footerLogo: "", favicon: "",
    primaryColor: "#2d6a2e", secondaryColor: "#6d8c21", accentColor: "#c5a72e",
  },
  seo: {
    pages: [
      { slug: "/", title: "VBR Landscaping - Professional Landscaping Services", description: "Transforming outdoor spaces into natural beauty.", ogImage: "", keywords: "landscaping, garden design, outdoor spaces, VBR", order: 0 },
      { slug: "/about", title: "About Us - VBR Landscaping", description: "Learn about our team.", ogImage: "", keywords: "about, team, landscaping company", order: 1 },
      { slug: "/eco-matrix", title: "VBR ECO-MATRIX", description: "Our eco-friendly approach.", ogImage: "", keywords: "eco-matrix, sustainable", order: 2 },
      { slug: "/sectors", title: "Sectors - VBR Landscaping", description: "Industries we serve.", ogImage: "", keywords: "sectors, commercial, residential", order: 3 },
      { slug: "/projects", title: "Our Projects", description: "Our portfolio.", ogImage: "", keywords: "projects, portfolio", order: 4 },
      { slug: "/why-vbr", title: "Why VBR", description: "Why choose us.", ogImage: "", keywords: "why VBR, quality", order: 5 },
      { slug: "/careers", title: "Careers", description: "Join our team.", ogImage: "", keywords: "careers, jobs", order: 6 },
      { slug: "/contact", title: "Contact Us", description: "Get in touch.", ogImage: "", keywords: "contact, phone, email", order: 7 },
    ],
  },
  "page-about": {
    heroTitle: "About VBR Landscaping", heroSubtitle: "Building Beautiful Landscapes Since Day One",
    heroImage: "/images/about-person.jpg",
    content: "From our very first project, we've been committed to creating outdoor spaces that feel natural, functional, and visually stunning.",
    teamHeading: "Meet Our Team", teamDescription: "Our team of experienced professionals brings creativity and expertise to every project.",
    values: [
      { icon: "/images/icon-landscape.png", title: "Quality Craftsmanship", description: "Every project reflects our commitment to excellence.", order: 0 },
      { icon: "/images/icon-hand-plant.png", title: "Sustainable Practices", description: "We prioritize eco-friendly solutions.", order: 1 },
      { icon: "/images/icon-eye.png", title: "Client-Focused", description: "Your vision is our priority.", order: 2 },
    ],
  },
  "page-eco-matrix": {
    heroTitle: "VBR ECO-MATRIX", heroSubtitle: "Our Commitment to Sustainable Landscaping",
    heroImage: "/images/stats-bg.png",
    content: "The VBR ECO-MATRIX is our proprietary approach to sustainable landscaping.",
    features: [
      { icon: "/images/icon-aloe.png", title: "Water Conservation", description: "Smart irrigation and drought-resistant plantings.", order: 0 },
      { icon: "/images/icon-hand-plant.png", title: "Native Plants", description: "Local flora that thrives naturally.", order: 1 },
      { icon: "/images/icon-thumbs.png", title: "Soil Health", description: "Organic practices that nurture the ground.", order: 2 },
    ],
  },
  "page-sectors": {
    heroTitle: "Sectors We Serve", heroSubtitle: "Professional Landscaping Across Industries",
    heroImage: "/images/hero-bg.jpg",
    sectors: [
      { image: "/images/service-1.png", title: "Residential", description: "Beautiful gardens for homeowners.", order: 0 },
      { image: "/images/service-2.png", title: "Commercial", description: "Professional landscapes for offices.", order: 1 },
      { image: "/images/service-3.png", title: "Municipal", description: "Public parks and community spaces.", order: 2 },
      { image: "/images/service-4.png", title: "Hospitality", description: "Stunning grounds for hotels.", order: 3 },
    ],
  },
  "page-projects": {
    heroTitle: "Our Projects", heroSubtitle: "A Showcase of Our Finest Work",
    heroImage: "/images/cta-garden-bg.png",
    projects: [
      { image: "/images/blog-1.jpg", title: "Modern Garden Retreat", category: "Residential", description: "A complete backyard transformation.", order: 0 },
      { image: "/images/blog-2.jpg", title: "Corporate Campus Green", category: "Commercial", description: "Sustainable landscape for a tech campus.", order: 1 },
      { image: "/images/blog-3.jpg", title: "Community Park Revamp", category: "Municipal", description: "Revitalizing a neighborhood gathering space.", order: 2 },
    ],
  },
  "page-why-vbr": {
    heroTitle: "Why Choose VBR", heroSubtitle: "The VBR Difference in Every Detail",
    heroImage: "/images/why-choose-mask.png",
    content: "With over 25 years of experience, VBR Landscaping delivers unmatched quality.",
    reasons: [
      { icon: "/images/icon-hand-plant.png", title: "25+ Years Experience", description: "Decades of expertise.", order: 0 },
      { icon: "/images/icon-aloe.png", title: "Eco-Friendly Approach", description: "Sustainable practices.", order: 1 },
      { icon: "/images/icon-thumbs.png", title: "100% Satisfaction", description: "We don't stop until you love it.", order: 2 },
    ],
  },
  "page-careers": {
    heroTitle: "Join Our Team", heroSubtitle: "Build a Career in Landscaping",
    heroImage: "/images/farmer-field.png",
    content: "We are always looking for passionate individuals to join our growing team.",
    openings: [
      { title: "Landscape Designer", location: "Garden District, CA", type: "Full-time", description: "Create innovative landscape designs.", order: 0 },
      { title: "Crew Leader", location: "Garden District, CA", type: "Full-time", description: "Lead installation teams.", order: 1 },
      { title: "Maintenance Technician", location: "Garden District, CA", type: "Part-time", description: "Maintain client landscapes.", order: 2 },
    ],
  },
  "page-contact": {
    heroTitle: "Contact Us", heroSubtitle: "We Would Love to Hear From You",
    heroImage: "/images/cta-garden-bg.png",
    address: "123 Green Valley Road, Garden District, CA 90210",
    phone: "+1 (555) 123-4567", email: "info@vbrlandscaping.com",
    mapEmbedUrl: "", formHeading: "Send Us a Message",
    formDescription: "Fill out the form below and our team will get back to you within 24 hours.",
  },
}

async function main() {
  console.log("Seeding Firestore project: " + PROJECT_ID)
  console.log("Total sections: " + Object.keys(sections).length)

  const keys = Object.keys(sections)
  for (let i = 0; i < keys.length; i++) {
    await writeDoc(keys[i], sections[keys[i]])
  }

  console.log("Done! All " + keys.length + " sections seeded.")
}

main().catch(function(err) {
  console.error("Fatal error:", err)
  process.exit(1)
})
