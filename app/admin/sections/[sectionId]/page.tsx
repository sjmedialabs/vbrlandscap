"use client"

import { useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SectionEditor } from "@/components/admin/section-editor"
import { Loader2 } from "lucide-react"

type FieldType = "text" | "textarea" | "image" | "color" | "array" | "object-array"
interface FieldDef { key: string; label: string; type: FieldType; fields?: FieldDef[] }

const sectionConfigs: Record<string, { title: string; fields: FieldDef[] }> = {
  branding: {
    title: "Brand Customization",
    fields: [
      { key: "siteName", label: "Site Name", type: "text" },
      { key: "navbarLogo", label: "Navbar Logo", type: "image" },
      { key: "footerLogo", label: "Footer Logo", type: "image" },
      { key: "favicon", label: "Favicon (ICO/PNG)", type: "image" },
      { key: "primaryColor", label: "Primary Color", type: "color" },
      { key: "secondaryColor", label: "Secondary Color", type: "color" },
      { key: "accentColor", label: "Accent Color", type: "color" },
    ],
  },
  seo: {
    title: "SEO Settings",
    fields: [
      {
        key: "pages",
        label: "Page SEO",
        type: "object-array",
        fields: [
          { key: "slug", label: "Page Slug (e.g. / or /about)", type: "text" },
          { key: "title", label: "Meta Title", type: "text" },
          { key: "description", label: "Meta Description", type: "textarea" },
          { key: "ogImage", label: "OG Image", type: "image" },
          { key: "keywords", label: "Keywords (comma-separated)", type: "text" },
        ],
      },
    ],
  },
  "about-page-hero": {
    title: "About Page - Hero Section",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      {
        key: "breadcrumbs",
        label: "Breadcrumbs",
        type: "object-array",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
    ],
  },
  "about-page-intro": {
    title: "About Page - Introduction Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "yearsValue", label: "Years Value (e.g. 25+)", type: "text" },
      { key: "yearsLabel", label: "Years Label", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "buttonText", label: "Button Text", type: "text" },
      { key: "buttonLink", label: "Button Link", type: "text" },
      { key: "mainImage", label: "Main Image", type: "image" },
    ],
  },
  "about-page-features": {
    title: "About Page - Features Section",
    fields: [
      {
        key: "items",
        label: "Feature Items",
        type: "object-array",
        fields: [
          { key: "icon", label: "Icon", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  "about-page-accountability": {
    title: "About Page - VBR Group Strength Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "decorImage", label: "Decoration Image", type: "image" },
      {
        key: "companies",
        label: "Companies",
        type: "object-array",
        fields: [
          { key: "number", label: "Number (01, 02, 03)", type: "text" },
          { key: "logo", label: "Logo Icon", type: "image" },
          { key: "name", label: "Company Name", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "text" },
          { key: "image", label: "Company Image", type: "image" },
          { key: "strengthTitle", label: "Strength Highlights Title", type: "text" },
          { key: "strengthHighlights", label: "Strength Highlights", type: "array" },
          { key: "benefitTitle", label: "Client Benefits Title", type: "text" },
          { key: "clientBenefits", label: "Client Benefits", type: "array" },
        ],
      },
    ],
  },
  "about-page-why-choose": {
    title: "About Page - Why Choose Us Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "personImage", label: "Person Image", type: "image" },
      {
        key: "features",
        label: "Features",
        type: "object-array",
        fields: [
          { key: "icon", label: "Icon", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  "about-page-newsletter": {
    title: "About Page - Newsletter Section",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "buttonText", label: "Button Text", type: "text" },
      { key: "placeholder", label: "Input Placeholder", type: "text" },
    ],
  },
  "page-about": {
    title: "About Page (Legacy)",
    fields: [
      { key: "heroTitle", label: "Hero Title", type: "text" },
      { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      { key: "content", label: "Page Content", type: "textarea" },
      { key: "teamHeading", label: "Team Heading", type: "text" },
      { key: "teamDescription", label: "Team Description", type: "textarea" },
      {
        key: "values",
        label: "Company Values",
        type: "object-array",
        fields: [
          { key: "icon", label: "Icon", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  "page-eco-matrix": {
    title: "Eco Matrix Page",
    fields: [
      { key: "heroTitle", label: "Hero Title", type: "text" },
      { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      { key: "content", label: "Page Content", type: "textarea" },
      {
        key: "features",
        label: "Eco Features",
        type: "object-array",
        fields: [
          { key: "icon", label: "Icon", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  "page-sectors": {
    title: "Sectors Page",
    fields: [
      { key: "heroTitle", label: "Hero Title", type: "text" },
      { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      {
        key: "sectors",
        label: "Sectors",
        type: "object-array",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  "page-projects": {
    title: "Projects Page",
    fields: [
      { key: "heroTitle", label: "Hero Title", type: "text" },
      { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      {
        key: "projects",
        label: "Projects",
        type: "object-array",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "category", label: "Category", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  "page-why-vbr": {
    title: "Why VBR Page",
    fields: [
      { key: "heroTitle", label: "Hero Title", type: "text" },
      { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      { key: "content", label: "Page Content", type: "textarea" },
      {
        key: "reasons",
        label: "Reasons to Choose VBR",
        type: "object-array",
        fields: [
          { key: "icon", label: "Icon", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  "page-careers": {
    title: "Careers Page",
    fields: [
      { key: "heroTitle", label: "Hero Title", type: "text" },
      { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      { key: "content", label: "Page Content", type: "textarea" },
      {
        key: "openings",
        label: "Job Openings",
        type: "object-array",
        fields: [
          { key: "title", label: "Job Title", type: "text" },
          { key: "location", label: "Location", type: "text" },
          { key: "type", label: "Type (Full-time, Part-time)", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  "page-contact": {
    title: "Contact Page",
    fields: [
      // Hero Section
      { key: "heroTitle", label: "Hero Title", type: "text" },
      { key: "heroBreadcrumb", label: "Breadcrumb Text", type: "text" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      // Contact Info - Address
      { key: "addressTitle", label: "Address Card Title", type: "text" },
      { key: "addressLines", label: "Address Lines", type: "array" },
      // Contact Info - Phone
      { key: "phoneTitle", label: "Phone Card Title", type: "text" },
      { key: "phones", label: "Phone Numbers", type: "array" },
      // Contact Info - Email
      { key: "emailTitle", label: "Email Card Title", type: "text" },
      { key: "emails", label: "Email Addresses", type: "array" },
      // Map Settings
      { key: "mapEmbedUrl", label: "Google Maps Embed URL", type: "text" },
      // Form Settings
      { key: "formBadge", label: "Form Badge Text", type: "text" },
      { key: "formHeading", label: "Form Heading", type: "text" },
      { key: "formSuccessMessage", label: "Form Success Message", type: "textarea" },
      { key: "recipientEmail", label: "Recipient Email (for submissions)", type: "text" },
      { key: "autoReplyTemplate", label: "Auto-Reply Message Template", type: "textarea" },
      // Newsletter
      { key: "newsletterHeading", label: "Newsletter Heading", type: "text" },
      { key: "newsletterDescription", label: "Newsletter Description", type: "textarea" },
      { key: "newsletterPlaceholder", label: "Newsletter Placeholder", type: "text" },
    ],
  },
  hero: {
    title: "Hero Section",
    fields: [
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "statValue", label: "Stat Value", type: "text" },
      { key: "statLabel", label: "Stat Label", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      { key: "statImage", label: "Stat Image", type: "image" },
      { key: "avatarsImage", label: "Avatars Image", type: "image" },
      { key: "rating", label: "Rating", type: "text" },
      { key: "reviewCount", label: "Review Count Text", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
    ],
  },
  about: {
    title: "About Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "personImage", label: "Person Image", type: "image" },
      { key: "leafDecoration", label: "Leaf Decoration", type: "image" },
      { key: "gardenToolsDecor", label: "Garden Tools Decor", type: "image" },
      { key: "containerImage", label: "Container Image", type: "image" },
      { key: "missionIcon", label: "Mission Icon", type: "image" },
      { key: "missionTitle", label: "Mission Title", type: "text" },
      { key: "missionDescription", label: "Mission Description", type: "textarea" },
      { key: "visionIcon", label: "Vision Icon", type: "image" },
      { key: "visionTitle", label: "Vision Title", type: "text" },
      { key: "visionDescription", label: "Vision Description", type: "textarea" },
      { key: "ctaButtonText", label: "CTA Button Text", type: "text" },
      { key: "phoneLabel", label: "Phone Label", type: "text" },
      { key: "phoneNumber", label: "Phone Number", type: "text" },
    ],
  },
  services: {
    title: "Services Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "bottomTag", label: "Bottom Tag", type: "text" },
      { key: "bottomText", label: "Bottom Text", type: "text" },
      { key: "bottomLink", label: "Bottom Link Text", type: "text" },
      { key: "leafImage", label: "Leaf Image", type: "image" },
      {
        key: "items",
        label: "Service Items",
        type: "object-array",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  trust: {
    title: "Trust / Why Choose Us Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "maskImage1", label: "Mask Image 1", type: "image" },
      { key: "maskImage2", label: "Mask Image 2", type: "image" },
      { key: "trowelImage", label: "Trowel Image", type: "image" },
      { key: "badgeValue", label: "Badge Value (25+)", type: "text" },
      { key: "badgeLabel", label: "Badge Label", type: "text" },
      {
        key: "features",
        label: "Features",
        type: "object-array",
        fields: [
          { key: "icon", label: "Icon", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  stats: {
    title: "Stats Section",
    fields: [
      { key: "backgroundImage", label: "Background Image", type: "image" },
      {
        key: "stats",
        label: "Statistics",
        type: "object-array",
        fields: [
          { key: "icon", label: "Icon", type: "image" },
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      {
        key: "projects",
        label: "Projects",
        type: "object-array",
        fields: [
          { key: "tag", label: "Tag", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "href", label: "Link", type: "text" },
        ],
      },
    ],
  },
  process: {
    title: "Process / How It Works Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "fieldImage", label: "Field Image", type: "image" },
      { key: "leafImage", label: "Leaf Image", type: "image" },
      { key: "checklistItems", label: "Checklist Items", type: "array" },
      {
        key: "steps",
        label: "Steps",
        type: "object-array",
        fields: [
          { key: "number", label: "Step Number", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  team: {
    title: "Team Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "partnersHeading", label: "Partners Heading", type: "text" },
      { key: "leafImage", label: "Leaf Image", type: "image" },
      {
        key: "members",
        label: "Team Members",
        type: "object-array",
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "image", label: "Photo", type: "image" },
        ],
      },
      {
        key: "partners",
        label: "Partner Logos",
        type: "object-array",
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "image", label: "Logo", type: "image" },
        ],
      },
    ],
  },
  cta: {
    title: "CTA / Contact Section",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "contactBadge", label: "Contact Badge", type: "text" },
      { key: "submitButtonText", label: "Submit Button Text", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      { key: "testimonialImage", label: "Testimonial Image", type: "image" },
      { key: "testimonialQuote", label: "Testimonial Quote", type: "textarea" },
      { key: "testimonialAuthor", label: "Testimonial Author", type: "text" },
    ],
  },
  testimonials: {
    title: "Testimonials Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "rating", label: "Rating", type: "text" },
      { key: "reviewText", label: "Review Text", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      {
        key: "items",
        label: "Testimonials",
        type: "object-array",
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "text", label: "Testimonial Text", type: "textarea" },
          { key: "rating", label: "Rating (1-5)", type: "text" },
        ],
      },
    ],
  },
  faq: {
    title: "FAQ Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "decorationImage", label: "Decoration Image", type: "image" },
      {
        key: "items",
        label: "FAQ Items",
        type: "object-array",
        fields: [
          { key: "question", label: "Question", type: "text" },
          { key: "answer", label: "Answer", type: "textarea" },
        ],
      },
    ],
  },
  blog: {
    title: "Blog Section",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "posts",
        label: "Blog Posts",
        type: "object-array",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "excerpt", label: "Excerpt", type: "textarea" },
          { key: "image", label: "Image", type: "image" },
          { key: "date", label: "Date", type: "text" },
          { key: "category", label: "Category", type: "text" },
        ],
      },
    ],
  },
  newsletter: {
    title: "Newsletter Section",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "buttonText", label: "Button Text", type: "text" },
    ],
  },
  navbar: {
    title: "Navbar",
    fields: [
      { key: "ctaText", label: "CTA Button Text", type: "text" },
      {
        key: "links",
        label: "Navigation Links",
        type: "object-array",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
    ],
  },
  footer: {
    title: "Footer",
    fields: [
      // Branding
      { key: "brandName", label: "Brand Name", type: "text" },
      { key: "brandDescription", label: "Brand Description", type: "textarea" },
      { key: "ctaButtonText", label: "CTA Button Text", type: "text" },
      { key: "ctaButtonLink", label: "CTA Button Link", type: "text" },
      // Company Links
      {
        key: "companyLinks",
        label: "Company Links",
        type: "object-array",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
      // Sector Links
      {
        key: "sectorLinks",
        label: "Sector Links",
        type: "object-array",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
      // Address & Contact
      { key: "companyName", label: "Company Name", type: "text" },
      { key: "addressText", label: "Full Address", type: "textarea" },
      { key: "phone", label: "Phone Number", type: "text" },
      { key: "email", label: "Email Address", type: "text" },
      // Business Hours
      { key: "hoursWeekday", label: "Weekday Hours (e.g. 9.00 am - 8.00pm)", type: "text" },
      { key: "hoursWeekend", label: "Weekend Hours (e.g. 10.00 am - 8.00pm)", type: "text" },
      // Social Media
      {
        key: "socialLinks",
        label: "Social Media Links",
        type: "object-array",
        fields: [
          { key: "label", label: "Platform Name", type: "text" },
          { key: "image", label: "Icon Image", type: "image" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
      // Legal / Copyright
      { key: "copyright", label: "Copyright Text", type: "text" },
      {
        key: "policyLinks",
        label: "Policy Links (bottom bar)",
        type: "object-array",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
    ],
  },
}

export default function SectionEditorPage({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = use(params)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login")
    }
  }, [authLoading, user, router])

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f5f7f0]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
      </div>
    )
  }

  const config = sectionConfigs[sectionId]

  if (!config) {
    return (
      <div className="flex h-screen bg-[#f5f7f0]">
        <AdminSidebar />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-[#666]">Section not found: {sectionId}</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f5f7f0]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <SectionEditor
          sectionId={sectionId}
          title={config.title}
          fields={config.fields}
        />
      </main>
    </div>
  )
}
