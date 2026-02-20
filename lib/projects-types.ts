/**
 * Projects types - can be safely imported by both client and server components
 */

export interface ProjectCategory {
  id: string
  name: string
  slug: string
}

export interface ProjectFeature {
  id: string
  title: string
  order: number
}

export interface Project {
  id: string
  title: string
  slug: string
  heroImage: string
  featuredImage: string
  shortDescription: string
  fullDescription: string
  categories: string[]
  client: string
  projectType: string
  date: string
  website: string
  features: ProjectFeature[]
  gallery: string[]
  relatedProjects: string[]
  status: "draft" | "published"
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface ProjectsPageData {
  heroBackgroundImage: string
  heroTitle: string
  newsletterHeading: string
  newsletterDescription: string
  newsletterButtonText: string
  newsletterPlaceholder: string
}

// Default categories
export const defaultCategories: ProjectCategory[] = [
  { id: "landscaping", name: "Landscaping", slug: "landscaping" },
  { id: "lawn-care", name: "Lawn Care", slug: "lawn-care" },
  { id: "garden-design", name: "Garden Design", slug: "garden-design" },
  { id: "outdoor-living", name: "Outdoor Living", slug: "outdoor-living" },
]

// Default page settings
export const defaultProjectsPageData: ProjectsPageData = {
  heroBackgroundImage: "/images/hero-bg.jpg",
  heroTitle: "Projects",
  newsletterHeading: "Stay Updated With Expert Advice",
  newsletterDescription: "Join our mailing list to receive professional landscaping tips and exclusive",
  newsletterButtonText: "Subscribe",
  newsletterPlaceholder: "Enter your email",
}

// Default project for fallback
export const defaultProject: Omit<Project, "id"> = {
  title: "Creating patios, decks, and recreational",
  slug: "creating-patios-decks-recreational",
  heroImage: "/images/hero-bg.jpg",
  featuredImage: "/images/blog-1.jpg",
  shortDescription: "Transform your outdoor space with our expert patio and deck design services.",
  fullDescription: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure.

On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour.

Must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter.`,
  categories: ["landscaping", "lawn-care"],
  client: "Design Studio In USA",
  projectType: "Digital Product Design",
  date: "9 January 2025",
  website: "yourdomain.com",
  features: [
    { id: "f1", title: "Efficient Sprint Planning", order: 0 },
    { id: "f2", title: "Standups and Demos", order: 1 },
    { id: "f3", title: "Hassle Free Payment", order: 2 },
    { id: "f4", title: "Iterative Delivery Approach", order: 3 },
    { id: "f5", title: "Problem-solving", order: 4 },
    { id: "f6", title: "Deliver Perfect Time", order: 5 },
  ],
  gallery: ["/images/blog-1.jpg", "/images/blog-2.jpg"],
  relatedProjects: [],
  status: "published",
  order: 0,
}

// Sample projects for seeding
export const sampleProjects: Omit<Project, "id">[] = [
  {
    ...defaultProject,
    title: "Creating patios, decks, and recreational",
    slug: "creating-patios-decks-recreational",
    featuredImage: "/images/blog-1.jpg",
    categories: ["landscaping"],
    order: 0,
  },
  {
    ...defaultProject,
    title: "Modern Garden Transformation",
    slug: "modern-garden-transformation",
    featuredImage: "/images/blog-2.jpg",
    categories: ["garden-design", "landscaping"],
    order: 1,
  },
  {
    ...defaultProject,
    title: "Sustainable Lawn Solutions",
    slug: "sustainable-lawn-solutions",
    featuredImage: "/images/blog-1.jpg",
    categories: ["lawn-care"],
    order: 2,
  },
  {
    ...defaultProject,
    title: "Urban Rooftop Garden",
    slug: "urban-rooftop-garden",
    featuredImage: "/images/blog-2.jpg",
    categories: ["garden-design", "outdoor-living"],
    order: 3,
  },
  {
    ...defaultProject,
    title: "Residential Landscape Design",
    slug: "residential-landscape-design",
    featuredImage: "/images/blog-1.jpg",
    categories: ["landscaping", "lawn-care"],
    order: 4,
  },
  {
    ...defaultProject,
    title: "Commercial Property Beautification",
    slug: "commercial-property-beautification",
    featuredImage: "/images/blog-2.jpg",
    categories: ["landscaping"],
    order: 5,
  },
]
