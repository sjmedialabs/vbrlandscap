import { NextResponse } from "next/server";
import { setSectionFull } from "@/lib/firestore";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization") || ""
    const authToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : ""
    const sections: Record<string, Record<string, unknown>> = {
      hero: {
        heading: "Transforming Outdoor Spaces Into Natural Beauty.",
        statValue: "98 %",
        statLabel: "Reduction in\nemployee turnover",
        backgroundImage: "/images/hero-bg.jpg",
        statImage: "/images/rectangle-11.png",
        avatarsImage: "/images/avatars.png",
        rating: "4.8",
        reviewCount: "Based on 204 Reviews",
        tagline: "Effective Talent",
      },
      about: {
        badge: "About Our Company",
        heading: "Building Beautiful Landscapes Since Day One.",
        description:
          "From our very first project, we've been committed to creating outdoor spaces that feel natural, functional, and visually stunning. Our passion for landscaping.",
        personImage: "/images/about-person.jpg",
        leafDecoration: "/images/leaf-decoration.png",
        gardenToolsDecor: "/images/garden-tools-decor.jpg",
        containerImage: "/images/container.png",
        missionIcon: "/images/icon-landscape.png",
        missionTitle: "Our Mission",
        missionDescription:
          "To redefine the future of work by creating a world where every organization recognizes",
        visionIcon: "/images/icon-eye.png",
        visionTitle: "Our Vision",
        visionDescription:
          "To redefine the future of work by creating a world where every organization recognizes",
        ctaButtonText: "Discover More",
        phoneLabel: "Call Anytime",
        phoneNumber: "+88 017 500 500",
      },
      services: {
        badge: "Our Services",
        heading: "Empowering your workforce with expert services",
        bottomTag: "HURRY",
        bottomText: "Choose from our selection of the best places.",
        bottomLink: "Get a project in mind?",
        leafImage: "/images/leaf-green.png",
        items: [
          {
            image: "/images/service-1.png",
            title: "Design & Planning",
            description:
              "Expert planting, pruning, and maintenance for healthy.",
            order: 0,
          },
          {
            image: "/images/service-2.png",
            title: "Tree & Plant Care",
            description:
              "Expert planting, pruning, and maintenance for healthy.",
            order: 1,
          },
          {
            image: "/images/service-3.png",
            title: "Drainage Systems",
            description:
              "Expert planting, pruning, and maintenance for healthy.",
            order: 2,
          },
          {
            image: "/images/service-4.png",
            title: "Seasonal Clean-up",
            description:
              "Expert planting, pruning, and maintenance for healthy.",
            order: 3,
          },
        ],
      },
      trust: {
        badge: "Why Choose Us",
        heading: "Growing Trust Through Quality Work.",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit commodo hendrerit, morbi non at metus nisi condimentum cubilia nulla, netus nec consequat",
        maskImage1: "/images/why-choose-mask.png",
        maskImage2: "/images/why-choose-mask-2.png",
        trowelImage: "/images/trowel-seedling.png",
        badgeValue: "25 +",
        badgeLabel: "Years of\nExperience",
        features: [
          {
            icon: "/images/icon-hand-plant.png",
            title: "Where Your Money Works Harder",
            description:
              "15+ years crafting identities for Fortune 500s to fast-growth startups Backgrounds in design psychology",
            order: 0,
          },
          {
            icon: "/images/icon-aloe.png",
            title: "We Listen First, Invest Second",
            description:
              "Experts in responsive logo systems (SVG, animated, dark/light modes), Former start-up founders who understand business challenges",
            order: 1,
          },
          {
            icon: "/images/icon-thumbs.png",
            title: "AI-Enhanced Portfolio Optimization",
            description:
              "15+ years crafting identities for Fortune 500s to fast-growth startups Backgrounds in design psychology",
            order: 2,
          },
        ],
      },
      stats: {
        backgroundImage: "/images/stats-bg.png",
        stats: [
          {
            icon: "/images/icon-aloe.png",
            value: "10k +",
            label: "Hearts We've\nTouched",
            order: 0,
          },
          {
            icon: "/images/icon-eye.png",
            value: "25 +",
            label: "Years of\nexperienced",
            order: 1,
          },
          {
            icon: "/images/icon-hand-plant.png",
            value: "250",
            label: "Personal expert\nnursing",
            order: 2,
          },
          {
            icon: "/images/icon-landscape.png",
            value: "15 +",
            label: "Senior care\nconsulting Award",
            order: 3,
          },
        ],
        projects: [
          {
            tag: "Landscaping",
            title: "Creating patios, decks, and recreational",
            href: "/services/patios",
            order: 0,
          },
          {
            tag: "Landscaping",
            title:
              "Tailored landscaping designs that reflect each client\u2019s",
            href: "/services/landscaping-design",
            order: 1,
          },
          {
            tag: "Landscaping",
            title: "Designed by Nature, Built by Experts",
            href: "/services/nature-design",
            order: 2,
          },
          {
            tag: "Landscaping",
            title: "Modern Backyard Makeover in California",
            href: "/services/backyard-makeover",
            order: 3,
          },
        ],
      },
      process: {
        badge: "How It Works",
        heading: "Designing Nature, One Step at a Time.",
        fieldImage: "/images/farmer-field.png",
        leafImage: "/images/leaf-gray.png",
        checklistItems: [
          "Personalized Consultation",
          "Expert Installation & Craftsmanship",
          "Comprehensive Site Evaluation",
        ],
        steps: [
          {
            number: "01",
            title: "Ongoing Maintenance",
            description:
              "We offer maintenance services to keep your landscape healthy, beautiful, and thriving.",
            order: 0,
          },
          {
            number: "02",
            title: "Installation & Construction",
            description:
              "We offer maintenance services to keep your landscape healthy, beautiful, and thriving.",
            order: 1,
          },
          {
            number: "03",
            title: "Custom Design",
            description:
              "We offer maintenance services to keep your landscape healthy, beautiful, and thriving.",
            order: 2,
          },
          {
            number: "04",
            title: "Site Analysis",
            description:
              "We offer maintenance services to keep your landscape healthy, beautiful, and thriving.",
            order: 3,
          },
        ],
      },
      team: {
        badge: "Expert Team",
        heading: "The Faces Behind Our Trusted Landscaping Services",
        partnersHeading: "Trusted By Leading Brands",
        leafImage: "/images/leaf-lime.png",
        members: [
          {
            name: "James Carter",
            role: "Senior Cleaning",
            image: "/images/team-1.jpg",
            order: 0,
          },
          {
            name: "James David",
            role: "Senior Cleaning",
            image: "/images/team-2.jpg",
            order: 1,
          },
          {
            name: "Martin Carlos",
            role: "Senior Cleaning",
            image: "/images/team-3.jpg",
            order: 2,
          },
          {
            name: "James Carter",
            role: "Senior Cleaning",
            image: "/images/team-4.jpg",
            order: 3,
          },
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
        heading: "We're Here to Help!",
        contactBadge: "Contact Us",
        submitButtonText: "Submit Request",
        backgroundImage: "/images/cta-garden-bg.png",
        testimonialImage: "/images/turf-installer.png",
        testimonialQuote:
          "They made my home sparkle! Highly professional and fast service",
        testimonialAuthor: "Stiven Dowson",
      },
      testimonials: {
        badge: "Testimonials",
        heading: "Hear from Our Happy Customers.",
        rating: "4.8",
        reviewText: "Based on 500+ verified customer reviews",
        backgroundImage: "/images/testimonial-bg.jpg",
        items: [
          {
            name: "Michael Chen",
            role: "Homeowner",
            text: "Landscope transformed our backyard into a stunning retreat. Their attention to detail and creative design exceeded all our expectations. Highly recommended!",
            rating: 5,
            order: 0,
          },
          {
            name: "Amanda Foster",
            role: "Business Owner",
            text: "The team delivered an incredible commercial landscape for our office campus. Professional, on time, and the results speak for themselves.",
            rating: 5,
            order: 1,
          },
          {
            name: "David Hernandez",
            role: "Property Manager",
            text: "We have been using Landscope for ongoing maintenance for 3 years. Their reliability and quality are unmatched in the industry.",
            rating: 5,
            order: 2,
          },
        ],
      },
      faq: {
        badge: "FAQ",
        heading: "Your Most Important Questions Answered Here",
        decorationImage: "/images/leaf-decoration.jpg",
        items: [
          {
            question: "How long does a full landscaping project take?",
            answer:
              "The timeline varies depending on the scope and complexity of the project. A typical residential landscape project takes 2-6 weeks from design to completion. We provide a detailed timeline during the planning phase so you know exactly what to expect.",
            order: 0,
          },
          {
            question: "What types of services do you offer?",
            answer:
              "We offer a comprehensive range of landscaping services including design and planning, tree and plant care, drainage systems, seasonal clean-up, installation and construction, irrigation systems, and ongoing maintenance programs.",
            order: 1,
          },
          {
            question: "Do you offer maintenance plans after installation?",
            answer:
              "Yes! We offer flexible maintenance plans tailored to your landscape needs. From weekly lawn care to seasonal deep maintenance, our team ensures your outdoor space looks pristine year-round.",
            order: 2,
          },
          {
            question: "How often should I maintain my landscaping?",
            answer:
              "Regular maintenance is key to a healthy landscape. We recommend weekly or bi-weekly maintenance for lawns, monthly check-ups for gardens, and seasonal deep cleaning. Our experts will create a custom schedule based on your specific landscape.",
            order: 3,
          },
          {
            question:
              "Is green services available for both homes and businesses?",
            answer:
              "Absolutely! We provide full-service landscaping for residential homes, commercial properties, HOA communities, and municipal spaces. Each project is customized to meet the unique requirements of the space and client.",
            order: 4,
          },
        ],
      },
      blog: {
        badge: "Blog",
        heading: "Check Out Latest News Update & Articles",
        posts: [
          {
            title: "Eco-Friendly Landscaping Ideas You Need To Start Today",
            excerpt:
              "Discover sustainable landscaping practices that benefit both your property and the environment.",
            image: "/images/blog-1.jpg",
            date: "Jan 15, 2026",
            category: "Sustainability",
            order: 0,
          },
          {
            title: "The Best Plants for Shady Areas in Your Backyard",
            excerpt:
              "Transform those dark corners into lush garden spaces with these shade-loving plants.",
            image: "/images/blog-2.jpg",
            date: "Jan 10, 2026",
            category: "Plant Guide",
            order: 1,
          },
          {
            title: "Top 5 Turf Maintenance Tips for a Lush Green Lawn",
            excerpt:
              "Professional tips to keep your lawn looking its best throughout every season of the year.",
            image: "/images/blog-3.jpg",
            date: "Jan 5, 2026",
            category: "Lawn Care",
            order: 2,
          },
        ],
      },
      branding: {
        siteName: "VBR Landscaping",
        navbarLogo: "",
        footerLogo: "",
        favicon: "",
        primaryColor: "#2d6a2e",
        secondaryColor: "#6d8c21",
        accentColor: "#c5a72e",
      },
      seo: {
        pages: [
          { slug: "/", title: "VBR Landscaping - Professional Landscaping Services", description: "Transforming outdoor spaces into natural beauty with professional landscaping services.", ogImage: "", keywords: "landscaping, garden design, outdoor spaces, VBR", order: 0 },
          { slug: "/about", title: "About Us - VBR Landscaping", description: "Learn about our team and our commitment to beautiful landscapes.", ogImage: "", keywords: "about, team, landscaping company", order: 1 },
          { slug: "/eco-matrix", title: "VBR ECO-MATRIX - Sustainable Landscaping", description: "Discover our eco-friendly approach to landscaping.", ogImage: "", keywords: "eco-matrix, sustainable, green landscaping", order: 2 },
          { slug: "/sectors", title: "Sectors - VBR Landscaping", description: "Industries and sectors we serve.", ogImage: "", keywords: "sectors, industries, commercial, residential", order: 3 },
          { slug: "/projects", title: "Our Projects - VBR Landscaping", description: "Explore our portfolio of completed landscaping projects.", ogImage: "", keywords: "projects, portfolio, landscaping work", order: 4 },
          { slug: "/why-vbr", title: "Why VBR - VBR Landscaping", description: "Discover why VBR Landscaping is the right choice for you.", ogImage: "", keywords: "why VBR, advantages, quality", order: 5 },
          { slug: "/careers", title: "Careers - VBR Landscaping", description: "Join our team and build a career in landscaping.", ogImage: "", keywords: "careers, jobs, landscaping jobs", order: 6 },
          { slug: "/contact", title: "Contact Us - VBR Landscaping", description: "Get in touch with our team for landscaping inquiries.", ogImage: "", keywords: "contact, inquiries, phone, email", order: 7 },
        ],
      },
      "page-about": {
        heroTitle: "About VBR Landscaping",
        heroSubtitle: "Building Beautiful Landscapes Since Day One",
        heroImage: "/images/about-person.jpg",
        content: "From our very first project, we've been committed to creating outdoor spaces that feel natural, functional, and visually stunning. Our passion for landscaping drives everything we do.",
        teamHeading: "Meet Our Team",
        teamDescription: "Our team of experienced professionals brings creativity and expertise to every project.",
        values: [
          { icon: "/images/icon-landscape.png", title: "Quality Craftsmanship", description: "Every project reflects our commitment to excellence.", order: 0 },
          { icon: "/images/icon-hand-plant.png", title: "Sustainable Practices", description: "We prioritize eco-friendly solutions in all our work.", order: 1 },
          { icon: "/images/icon-eye.png", title: "Client-Focused", description: "Your vision is our priority from start to finish.", order: 2 },
        ],
      },
      "page-eco-overview": {
        heroTitle: "THE VBR\nECO-MATRIX",
        heroSubtitle: "Our proprietary system transforms land into engineered living infrastructure through 10 integrated dimensions of landscape intelligence.",
        heroImage: "/images/hero-bg.jpg",
        aboutBadge: "About The ECO-MATRIX\u2122",
        aboutHeading: "Engineering Living Infrastructure",
        aboutDescription: "The VBR ECO-MATRIX\u2122 is our proprietary landscape intelligence and execution system designed to transform land into engineered living infrastructure.",
        aboutDescription2: "Unlike conventional landscaping models that treat design, planting, irrigation, and maintenance as isolated activities, the ECO-MATRIX\u2122 integrates engineering, ecology, and lifecycle control into a single, accountable framework.",
        aboutDescription3: "Each project executed by VBR Landscaping Pvt. Ltd. is governed through this system, ensuring predictable performance, ecological stability, and long-term asset value.",
        aboutImage1: "/images/about-person.jpg",
        aboutImage2: "/images/service-1.png",
        stats: [
          { value: "10", label: "10-Dimension Architecture", order: 0 },
          { value: "100%", label: "Single-Point Accountability", order: 1 },
          { value: "360\u00b0", label: "Lifecycle Coverage", order: 2 },
          { value: "\u221e", label: "Long-term Value", order: 3 },
        ],
        dimensions: [
          { title: "ARCHIQ\u2122", subtitle: "Spatial Intelligence & Geo-Diagnostics", description: "Land, soil, water & climate intelligence for precise design", order: 0 },
          { title: "PLANTIQ\u2122", subtitle: "Bio-Asset Sourcing & Authentication", description: "Climate-ready plants with traceable quality", order: 1 },
          { title: "HYDRO-LOGIC\u2122", subtitle: "Integrated Water Engineering", description: "Smart irrigation & zero-logging drainage systems", order: 2 },
          { title: "CORE-BUILD\u2122", subtitle: "Outdoor Infrastructure Engineering", description: "Hardscapes built to civil & structural standards", order: 3 },
          { title: "VERTIC-TECH\u2122", subtitle: "Elevated Landscape Systems", description: "Vertical & rooftop ecosystems for urban spaces", order: 4 },
          { title: "ECO-REGEN\u2122", subtitle: "Ecological Regeneration Systems", description: "Biodiversity, restoration & carbon-positive landscapes", order: 5 },
          { title: "ECO-OFFSET\u2122", subtitle: "Environmental Performance & ESG Systems", description: "Carbon offset, ESG compliance & reporting", order: 6 },
          { title: "HUMAN-SCAPE\u2122", subtitle: "Human-Centric Landscape Systems", description: "Wellness, play, & active-use environments", order: 7 },
          { title: "SENSE-GRID\u2122", subtitle: "Integrated Sensory Infrastructure", description: "Lighting, nightscape & sensory experience", order: 8 },
          { title: "STEWARD-CARE\u2122", subtitle: "Lifecycle Stewardship & Asset Management", description: "Monitoring, maintenance & long-term value growth", order: 9 },
        ],
        bottomText: "The ECO-MATRIX\u2122 operates through 10 integrated dimensions",
      },
      "page-eco-dimensions": {
        heroTitle: "10 integrated dimensions",
        heroSubtitle: "Together, these dimensions function as a unified operating system, eliminating fragmented execution and ensuring single-point accountability across the entire landscape lifecycle.",
        heroImage: "/images/hero-bg.jpg",
        sectionBadge: "10-Dimension Architecture",
        sectionHeading: "Making Your Landscape\nDreams a Reality",
        dimensions: [
          { name: "ARCHIQ\u2122", subtitle: "Geo-Diagnostics & Spatial Intelligence", description: "ARCHIQ\u2122 establishes the scientific foundation of every project. Through detailed soil diagnostics, water profiling, and micro-climate analysis, land conditions are translated into data-driven master planning and design intelligence.", outcome1: "Design feasibility validated before execution", outcome2: "Reduced failure risk and long-term performance assurance", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 0 },
          { name: "PLANTIQ\u2122", subtitle: "Bio-Asset Sourcing & Authentication", description: "PLANTIQ\u2122 ensures every plant is climate-ready, disease-screened, and traceable from nursery to site.", outcome1: "Traceable plant quality assurance", outcome2: "Reduced plant mortality and replacement costs", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 1 },
          { name: "HYDRO-LOGIC\u2122", subtitle: "Integrated Water Engineering", description: "HYDRO-LOGIC\u2122 provides smart irrigation design, rainwater harvesting, and zero-logging drainage systems.", outcome1: "Water-efficient landscapes", outcome2: "Zero waterlogging and drainage compliance", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 2 },
          { name: "CORE-BUILD\u2122", subtitle: "Outdoor Infrastructure Engineering", description: "CORE-BUILD\u2122 delivers hardscapes and structural elements built to civil engineering standards.", outcome1: "Structural durability assurance", outcome2: "Code-compliant outdoor infrastructure", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 3 },
          { name: "VERTIC-TECH\u2122", subtitle: "Elevated Landscape Systems", description: "VERTIC-TECH\u2122 designs and installs vertical gardens, green walls, and rooftop ecosystems.", outcome1: "Maximized green space in urban settings", outcome2: "Improved building thermal performance", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 4 },
          { name: "ECO-REGEN\u2122", subtitle: "Ecological Regeneration Systems", description: "ECO-REGEN\u2122 focuses on biodiversity restoration, native species reintroduction, and carbon-positive landscapes.", outcome1: "Measurable biodiversity improvement", outcome2: "Carbon sequestration reporting", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 5 },
          { name: "ECO-OFFSET\u2122", subtitle: "Environmental Performance & ESG", description: "ECO-OFFSET\u2122 integrates ESG compliance, carbon offset tracking, and environmental performance reporting.", outcome1: "ESG-compliant project delivery", outcome2: "Verified carbon offset documentation", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 6 },
          { name: "HUMAN-SCAPE\u2122", subtitle: "Human-Centric Landscape Systems", description: "HUMAN-SCAPE\u2122 designs wellness-oriented spaces including play areas and sensory gardens.", outcome1: "Enhanced user wellness and engagement", outcome2: "Inclusive design for all age groups", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 7 },
          { name: "SENSE-GRID\u2122", subtitle: "Integrated Sensory Infrastructure", description: "SENSE-GRID\u2122 creates immersive nightscapes and sensory experiences through lighting and ambient design.", outcome1: "24/7 landscape experience design", outcome2: "Energy-efficient sensory systems", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 8 },
          { name: "STEWARD-CARE\u2122", subtitle: "Lifecycle Stewardship & Asset Management", description: "STEWARD-CARE\u2122 provides ongoing monitoring, maintenance protocols, and asset value growth.", outcome1: "Predictable maintenance scheduling", outcome2: "Long-term asset value appreciation", image1: "/images/service-1.png", image2: "/images/service-2.png", image3: "/images/service-3.png", image4: "/images/service-4.png", order: 9 },
        ],
      },
      "page-eco-nature": {
        heroTitle: "THE\nN.A.T.U.R.E.\u2122\nFRAMEWORK",
        heroSubtitle: "",
        heroImage: "/images/hero-bg.jpg",
        dimensionBadge: "DIMENSION 01",
        heading: "The\nN.A.T.U.R.E Frame work",
        subheading: "A Six-Pillar Engineering Framework\nfor Landscape Infrastructure Excellence",
        sectionTitle: "Standardized Precision Across the Project Lifecycle",
        description: "At VBR Landscaping Pvt. Ltd, landscape delivery is governed by a structured, data-driven engineering framework known as the N.A.T.U.R.E.\u2122 Framework. This proprietary methodology replaces conventional planting-and-maintenance practices with a system-led, performance-oriented delivery model.",
        pillarsHeading: "The Pillars of the\nN.A.T.U.R.E.\u2122 Process",
        pillars: [
          { letter: "N", title: "Natural Intelligence", description: "Every project begins with a comprehensive site intelligence assessment to establish biological and environmental baselines before any physical intervention.", feature1Title: "Detailed soil profiling and fertility diagnostics", feature2Title: "Hydrological behavior and drainage mapping", feature3Title: "Micro-climate and exposure analysis", feature4Title: "Site constraints and risk identification", outcomeTitle: "Outcome:", outcomeDescription: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize downstream biological and structural risks.", order: 0 },
          { letter: "A", title: "Architectural Precision", description: "Translating site intelligence into engineered landscape designs that balance aesthetics, function, and ecological performance.", feature1Title: "Spatial design optimization", feature2Title: "Material specification engineering", feature3Title: "Visual harmony analysis", feature4Title: "Functional zone planning", outcomeTitle: "Outcome:", outcomeDescription: "Architecturally precise designs that optimize spatial use and visual coherence.", order: 1 },
          { letter: "T", title: "Technical Integration", description: "Integrating all engineering systems into a unified execution framework for seamless delivery.", feature1Title: "Irrigation system engineering", feature2Title: "Electrical infrastructure planning", feature3Title: "Structural load analysis", feature4Title: "Material compatibility testing", outcomeTitle: "Outcome:", outcomeDescription: "Seamless integration of all technical systems eliminating execution conflicts.", order: 2 },
          { letter: "U", title: "Urban Ecology", description: "Designing landscapes that restore and enhance urban ecological systems.", feature1Title: "Biodiversity corridor design", feature2Title: "Pollinator habitat creation", feature3Title: "Urban heat island mitigation", feature4Title: "Stormwater management integration", outcomeTitle: "Outcome:", outcomeDescription: "Urban landscapes that actively contribute to ecological health and resilience.", order: 3 },
          { letter: "R", title: "Regenerative Systems", description: "Implementing self-sustaining landscape systems that improve over time.", feature1Title: "Soil regeneration protocols", feature2Title: "Water cycling optimization", feature3Title: "Carbon sequestration design", feature4Title: "Waste-to-resource conversion", outcomeTitle: "Outcome:", outcomeDescription: "Self-improving landscapes that generate increasing ecological and economic value.", order: 4 },
          { letter: "E", title: "Ecological Stewardship", description: "Lifecycle management ensuring long-term health and value of landscape assets.", feature1Title: "Predictive maintenance scheduling", feature2Title: "Performance monitoring systems", feature3Title: "Asset value tracking", feature4Title: "Seasonal adaptation protocols", outcomeTitle: "Outcome:", outcomeDescription: "Long-term landscape performance assurance with measurable value growth.", order: 5 },
        ],
      },
      "page-sectors": {
        heroTitle: "Sectors We Serve",
        heroSubtitle: "Professional Landscaping Across Industries",
        heroImage: "/images/hero-bg.jpg",
        sectors: [
          { image: "/images/service-1.png", title: "Residential", description: "Beautiful gardens and outdoor living spaces for homeowners.", order: 0 },
          { image: "/images/service-2.png", title: "Commercial", description: "Professional landscapes for offices, retail, and more.", order: 1 },
          { image: "/images/service-3.png", title: "Municipal", description: "Public parks, streetscapes, and community spaces.", order: 2 },
          { image: "/images/service-4.png", title: "Hospitality", description: "Stunning grounds for hotels, resorts, and restaurants.", order: 3 },
        ],
      },
      "page-projects": {
        heroTitle: "Our Projects",
        heroSubtitle: "A Showcase of Our Finest Work",
        heroImage: "/images/cta-garden-bg.png",
        projects: [
          { image: "/images/blog-1.jpg", title: "Modern Garden Retreat", category: "Residential", description: "A complete backyard transformation.", order: 0 },
          { image: "/images/blog-2.jpg", title: "Corporate Campus Green", category: "Commercial", description: "Sustainable landscape for a tech campus.", order: 1 },
          { image: "/images/blog-3.jpg", title: "Community Park Revamp", category: "Municipal", description: "Revitalizing a neighborhood gathering space.", order: 2 },
        ],
      },
      "page-why-vbr": {
        heroTitle: "Why Choose VBR",
        heroSubtitle: "The VBR Difference in Every Detail",
        heroImage: "/images/why-choose-mask.png",
        content: "With over 25 years of experience, VBR Landscaping delivers unmatched quality, innovation, and customer satisfaction.",
        reasons: [
          { icon: "/images/icon-hand-plant.png", title: "25+ Years Experience", description: "Decades of expertise in creating stunning landscapes.", order: 0 },
          { icon: "/images/icon-aloe.png", title: "Eco-Friendly Approach", description: "Sustainable practices built into every project.", order: 1 },
          { icon: "/images/icon-thumbs.png", title: "100% Satisfaction", description: "We don't stop until you love it.", order: 2 },
        ],
      },
      "page-careers": {
        heroTitle: "Join Our Team",
        heroSubtitle: "Build a Career in Landscaping",
        heroImage: "/images/farmer-field.png",
        content: "We are always looking for passionate individuals to join our growing team. If you love the outdoors and have a passion for creating beautiful spaces, we want to hear from you.",
        openings: [
          { title: "Landscape Designer", location: "Garden District, CA", type: "Full-time", description: "Create innovative landscape designs for residential and commercial clients.", order: 0 },
          { title: "Crew Leader", location: "Garden District, CA", type: "Full-time", description: "Lead installation teams and ensure quality on every project.", order: 1 },
          { title: "Maintenance Technician", location: "Garden District, CA", type: "Part-time", description: "Maintain client landscapes to the highest standards.", order: 2 },
        ],
      },
      "page-contact": {
        heroTitle: "Contact Us",
        heroSubtitle: "We Would Love to Hear From You",
        heroImage: "/images/cta-garden-bg.png",
        address: "123 Green Valley Road, Garden District, CA 90210",
        phone: "+1 (555) 123-4567",
        email: "info@vbrlandscaping.com",
        mapEmbedUrl: "",
        formHeading: "Send Us a Message",
        formDescription: "Fill out the form below and our team will get back to you within 24 hours.",
      },
      newsletter: {
        heading: "Stay Updated With Expert Advice",
        description:
          "Subscribe to our newsletter for landscaping tips, seasonal guides, and exclusive offers.",
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
        brandName: "Landscope",
        brandDescription:
          "We are a full-service landscaping company dedicated to transforming outdoor spaces with sustainable and innovative design solutions.",
        address: "123 Green Valley Road, Garden District, CA 90210",
        phone: "+1 (555) 123-4567",
        email: "info@landscope.com",
        copyright: "Copyright 2026 Landscope. All rights reserved.",
        socialLinks: [
          {
            image: "/images/social-icon-1.png",
            href: "#",
            label: "Facebook",
            order: 0,
          },
          {
            image: "/images/social-icon-2.png",
            href: "#",
            label: "Instagram",
            order: 1,
          },
          {
            image: "/images/social-icon-3.png",
            href: "#",
            label: "Twitter",
            order: 2,
          },
          {
            image: "/images/social-icon-4.png",
            href: "#",
            label: "LinkedIn",
            order: 3,
          },
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
    };

    // Write all sections using unified Firestore helper (admin SDK if available, else client SDK)
    const promises = Object.entries(sections).map(([id, data]) =>
      setSectionFull(id, data as Record<string, unknown>, authToken),
    );
    await Promise.all(promises);

    return NextResponse.json({
      success: true,
      message: "All sections seeded successfully (homepage + branding + seo + pages)!",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[v0] Seed error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
