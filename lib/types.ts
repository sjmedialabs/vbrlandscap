export interface HeroData {
  heading: string
  statValue: string
  statLabel: string
  backgroundImage: string
  statImage: string
  avatarsImage: string
  rating: string
  reviewCount: string
  tagline: string
}

export interface AboutData {
  badge: string
  heading: string
  description: string
  personImage: string
  leafDecoration: string
  gardenToolsDecor: string
  containerImage: string
  mission: { icon: string; title: string; description: string }
  vision: { icon: string; title: string; description: string }
  ctaButtonText: string
  phoneLabel: string
  phoneNumber: string
}

export interface ServiceItem {
  image: string
  title: string
  description: string
  order: number
}

export interface ServicesData {
  badge: string
  heading: string
  items: ServiceItem[]
  bottomTag: string
  bottomText: string
  bottomLink: string
  leafImage: string
}

export interface TrustFeature {
  icon: string
  title: string
  description: string
  order: number
}

export interface TrustData {
  badge: string
  heading: string
  description: string
  features: TrustFeature[]
  maskImage1: string
  maskImage2: string
  trowelImage: string
  badgeValue: string
  badgeLabel: string
}

export interface StatItem {
  icon: string
  value: string
  label: string
  order: number
}

export interface ProjectItem {
  tag: string
  title: string
  href: string
  order: number
}

export interface StatsData {
  stats: StatItem[]
  projects: ProjectItem[]
  backgroundImage: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  order: number
}

export interface ProcessData {
  badge: string
  heading: string
  fieldImage: string
  leafImage: string
  checklistItems: string[]
  steps: ProcessStep[]
}

export interface TeamMember {
  name: string
  role: string
  image: string
  order: number
}

export interface Partner {
  name: string
  image: string
  order: number
}

export interface TeamData {
  badge: string
  heading: string
  members: TeamMember[]
  partnersHeading: string
  partners: Partner[]
  leafImage: string
}

export interface CTAData {
  heading: string
  contactBadge: string
  submitButtonText: string
  backgroundImage: string
  testimonialImage: string
  testimonialQuote: string
  testimonialAuthor: string
}

export interface Testimonial {
  name: string
  role: string
  text: string
  rating: number
  order: number
}

export interface TestimonialsData {
  badge: string
  heading: string
  rating: string
  reviewText: string
  backgroundImage: string
  items: Testimonial[]
}

export interface FAQItem {
  question: string
  answer: string
  order: number
}

export interface FAQData {
  badge: string
  heading: string
  decorationImage: string
  items: FAQItem[]
}

export interface BlogPost {
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  order: number
}

export interface BlogData {
  badge: string
  heading: string
  posts: BlogPost[]
}

export interface NewsletterData {
  heading: string
  description: string
  buttonText: string
}

export interface NavLink {
  label: string
  href: string
  order: number
}

export interface NavbarData {
  links: NavLink[]
  ctaText: string
}

export interface SocialLink {
  image: string
  href: string
  label: string
  order: number
}

export interface FooterLink {
  label: string
  href: string
  order: number
}

export interface FooterData {
  brandName: string
  brandDescription: string
  socialLinks: SocialLink[]
  companyLinks: FooterLink[]
  serviceLinks: FooterLink[]
  address: string
  phone: string
  email: string
  copyright: string
}
