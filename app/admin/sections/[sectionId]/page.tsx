"use client"

import { useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SectionEditor } from "@/components/admin/section-editor"
import { Loader2 } from "lucide-react"

const sectionConfigs: Record<
  string,
  { title: string; fields: { key: string; label: string; type: "text" | "textarea" | "image" | "array" | "object-array"; fields?: { key: string; label: string; type: "text" | "textarea" | "image" | "array" | "object-array" }[] }[] }
> = {
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
      { key: "brandName", label: "Brand Name", type: "text" },
      { key: "brandDescription", label: "Brand Description", type: "textarea" },
      { key: "address", label: "Address", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "copyright", label: "Copyright Text", type: "text" },
      {
        key: "socialLinks",
        label: "Social Links",
        type: "object-array",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "image", label: "Icon Image", type: "image" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
      {
        key: "companyLinks",
        label: "Company Links",
        type: "object-array",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
      {
        key: "serviceLinks",
        label: "Service Links",
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
