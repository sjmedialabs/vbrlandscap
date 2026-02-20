/**
 * Sectors types - can be safely imported by both client and server components
 */

export interface SectorListItem {
  id: string
  name: string
  slug: string
  order: number
  isActive: boolean
}

export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
  icon?: string
  order: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  order: number
}

export interface ExpertCard {
  image: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

export interface SectorContent {
  id: string
  sectorId: string
  heroImage: string
  heroTitle: string
  breadcrumbLabel: string
  mainImage: string
  description: string
  expertCard: ExpertCard
  galleryImages: string[]
  processSteps: ProcessStep[]
  faqs: FAQItem[]
}

export interface SectorsPageData {
  heroBackgroundImage: string
  heroTitle: string
  sidebarTitle: string
  processTitle: string
  faqTitle: string
  newsletterHeading: string
  newsletterDescription: string
  newsletterButtonText: string
  newsletterPlaceholder: string
}

export interface ContactFormSettings {
  recipientEmail: string
  autoReplyEnabled: boolean
  autoReplyTemplate: string
  formEnabled: boolean
}

export interface NewsletterSettings {
  apiEndpoint: string
  mailProvider: string
  successMessage: string
}

// Default data for fallback
export const defaultSectorsList: SectorListItem[] = [
  { id: "residential", name: "Residential Developments", slug: "residential", order: 0, isActive: true },
  { id: "commercial", name: "Commercial & IT", slug: "commercial", order: 1, isActive: true },
  { id: "industrial", name: "Industrial & Manufacturing", slug: "industrial", order: 2, isActive: true },
  { id: "hospitality", name: "Hospitality & Leisure", slug: "hospitality", order: 3, isActive: true },
  { id: "institutions", name: "Institutions & Campuses", slug: "institutions", order: 4, isActive: true },
  { id: "public", name: "Public & Government Projects", slug: "public", order: 5, isActive: true },
]

export const defaultPageSettings: SectorsPageData = {
  heroBackgroundImage: "/images/hero-bg.jpg",
  heroTitle: "Our Sectors",
  sidebarTitle: "Sectors List",
  processTitle: "Service Process",
  faqTitle: "Frequently Asked Questions",
  newsletterHeading: "Stay Updated With Expert Advice",
  newsletterDescription: "Join our mailing list to receive professional landscaping tips and exclusive updates.",
  newsletterButtonText: "Subscribe",
  newsletterPlaceholder: "Enter your email",
}

export const defaultSectorContent: Omit<SectorContent, "id" | "sectorId"> = {
  heroImage: "/images/hero-bg.jpg",
  heroTitle: "Our Sectors",
  breadcrumbLabel: "Sectors",
  mainImage: "/images/blog-1.jpg",
  description: `Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsum volup tatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia.

But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure To trial example, which of us ever undertakes.`,
  expertCard: {
    image: "/images/about-person.jpg",
    title: "Need help? Talk to expert.",
    subtitle: "Contact With us for any advice",
    buttonText: "Contact Us",
    buttonLink: "/contact",
  },
  galleryImages: ["/images/blog-1.jpg", "/images/blog-2.jpg"],
  processSteps: [
    { id: "step-1", number: "01", title: "Request For Service", description: "The process begins when a customer or client requests a service. This could be an inquiry, a complaint or a need for assistance. It's important to capture detailed information about.", order: 0 },
    { id: "step-2", number: "02", title: "Service Planning", description: "The process begins when a customer or client requests a service. This could be an inquiry, a complaint or a need for assistance. It's important to capture detailed information about.", order: 1 },
    { id: "step-3", number: "03", title: "Quality Control", description: "The process begins when a customer or client requests a service. This could be an inquiry, a complaint or a need for assistance. It's important to capture detailed information about.", order: 2 },
    { id: "step-4", number: "04", title: "Follow-up & Support", description: "The process begins when a customer or client requests a service. This could be an inquiry, a complaint or a need for assistance. It's important to capture detailed information about.", order: 3 },
  ],
  faqs: [
    { id: "faq-1", question: "1. How long does turf installation take?", answer: "Proin efficitur, mauris vel condimentum pulvinar, velit eros pretium ligula, eget sodales magna mi ut arcu. Praesent nec odio erat. Nunc id massa ante. Suspendisse sit amet neque euismod, convallis quam eget, dignissim massa. Aliquam blandit risus purus, in congue nunc venenatis sit eget egestas magna mi ut arcu.", order: 0 },
    { id: "faq-2", question: "2. Do you offer maintenance after installation?", answer: "Yes, we offer comprehensive maintenance packages tailored to your needs.", order: 1 },
    { id: "faq-3", question: "3. How often should I maintain my lawn?", answer: "We recommend regular maintenance every 2-4 weeks depending on the season.", order: 2 },
    { id: "faq-4", question: "4. Is your service suitable for both homes and businesses?", answer: "Absolutely! We serve both residential and commercial clients with the same quality service.", order: 3 },
  ],
}
