/**
 * Careers types - can be safely imported by both client and server components
 */

export interface PerkItem {
  id: string
  icon: string
  title: string
  description: string
  order: number
}

export interface CultureHighlight {
  id: string
  icon: string
  title: string
  description: string
  order: number
}

export interface WorkEnvironment {
  heading: string
  description: string
  image: string
}

export interface CTASection {
  label: string
  heading: string
  subheading: string
  placeholder: string
  buttonText: string
}

export interface CareersPageData {
  // Hero Section
  heroImage: string
  heroTitle: string
  heroBreadcrumb: string
  // Perks Section
  perksLabel: string
  perksHeading: string
  perks: PerkItem[]
  // Culture Section
  cultureHeading: string
  cultureDescription: string
  cultureHighlights: CultureHighlight[]
  // Work Environment Section
  workEnvironment: WorkEnvironment
  // CTA Section
  ctaSection: CTASection
  // Newsletter Section
  newsletterHeading: string
  newsletterDescription: string
  newsletterButtonText: string
  newsletterPlaceholder: string
}

// Default perks items
export const defaultPerks: PerkItem[] = [
  {
    id: "perk-1",
    icon: "Sprout",
    title: "Lorem Ipsum",
    description: "Etiam non quam lacus suspendisse faucibus interdum posuer.",
    order: 0,
  },
  {
    id: "perk-2",
    icon: "TreeDeciduous",
    title: "Lorem Ipsum",
    description: "Etiam non quam lacus suspendisse faucibus interdum posuer.",
    order: 1,
  },
  {
    id: "perk-3",
    icon: "Users",
    title: "Lorem Ipsum",
    description: "Etiam non quam lacus suspendisse faucibus interdum posuer.",
    order: 2,
  },
]

// Default culture highlights
export const defaultCultureHighlights: CultureHighlight[] = [
  {
    id: "culture-1",
    icon: "Settings",
    title: "Engineering-Driven Work Culture",
    description: "Projects are executed with scientific discipline and engineering standards, not ad-hoc methods.",
    order: 0,
  },
  {
    id: "culture-2",
    icon: "Brain",
    title: "Ownership Mindset",
    description: "We promote accountability, structured execution, and decision ownership at every level.",
    order: 1,
  },
  {
    id: "culture-3",
    icon: "Users",
    title: "Cross-Domain Collaboration",
    description: "Agronomists, engineers, planners, and field teams work together within one integrated system.",
    order: 2,
  },
  {
    id: "culture-4",
    icon: "BookOpen",
    title: "Learning Through Real Projects",
    description: "Large-scale, high-impact sites provide real-world learning beyond classroom theory.",
    order: 3,
  },
  {
    id: "culture-5",
    icon: "Wrench",
    title: "Field + Technical Exposure",
    description: "Team members gain both on-ground execution experience and system-level technical knowledge.",
    order: 4,
  },
  {
    id: "culture-6",
    icon: "Leaf",
    title: "Purpose & Sustainability Focus",
    description: "Our work contributes to ecological regeneration and long-term environmental value.",
    order: 5,
  },
]

// Default work environment
export const defaultWorkEnvironment: WorkEnvironment = {
  heading: "Work Environment Section",
  description: "We foster a performance-oriented and respectful work environment where structured processes, safety, and quality standards guide every project. Teams are supported with technical leadership, defined execution frameworks, and continuous improvement practices.",
  image: "/images/blog-1.jpg",
}

// Default CTA section
export const defaultCTASection: CTASection = {
  label: "Let's join us",
  heading: "At VBR, you don't just grow your career",
  subheading: "you help build landscapes that are designed to endure.",
  placeholder: "Your email address",
  buttonText: "Subscribe",
}

// Default page data
export const defaultCareersPageData: CareersPageData = {
  heroImage: "/images/hero-bg.jpg",
  heroTitle: "Build Living Infrastructure. Grow With Purpose.",
  heroBreadcrumb: "Career",
  perksLabel: "Life at VBR",
  perksHeading: "Perks & benefits",
  perks: defaultPerks,
  cultureHeading: "Culture Highlights",
  cultureDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit commodo hendrerit, morbi non at metus nisi condimentum cubilia nulla, netus nec consequat",
  cultureHighlights: defaultCultureHighlights,
  workEnvironment: defaultWorkEnvironment,
  ctaSection: defaultCTASection,
  newsletterHeading: "Stay Updated With Expert Advice",
  newsletterDescription: "Join our mailing list to receive professional landscaping tips and exclusive",
  newsletterButtonText: "Subscribe",
  newsletterPlaceholder: "Enter your email",
}
