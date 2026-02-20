import { NextResponse } from "next/server";
import { setSectionFull } from "@/lib/firestore";
import { setEcoMatrixMenu, setEcoMatrixDimensions, setEcoMatrixNature, setEcoMatrixOverview } from "@/lib/eco-matrix-firestore";

export async function POST() {
  try {
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
      "page-eco-matrix": {
        heroTitle: "VBR ECO-MATRIX",
        heroSubtitle: "Our Commitment to Sustainable Landscaping",
        heroImage: "/images/stats-bg.png",
        content: "The VBR ECO-MATRIX is our proprietary approach to sustainable landscaping that balances beauty with environmental responsibility.",
        features: [
          { icon: "/images/icon-aloe.png", title: "Water Conservation", description: "Smart irrigation and drought-resistant plantings.", order: 0 },
          { icon: "/images/icon-hand-plant.png", title: "Native Plants", description: "Local flora that thrives naturally in your environment.", order: 1 },
          { icon: "/images/icon-thumbs.png", title: "Soil Health", description: "Organic practices that nurture the ground.", order: 2 },
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
      // About Page Sections
      "about-page-hero": {
        heading: "About",
        backgroundImage: "/images/hero-bg.jpg",
        breadcrumbs: [
          { label: "Home", href: "/", order: 0 },
          { label: "About", href: "/about", order: 1 },
        ],
      },
      "about-page-intro": {
        badge: "Learn About Us",
        heading: "Landscape intelligence & Ecosystem Engineering",
        yearsValue: "25 +",
        yearsLabel: "Years of Work\nExperience",
        description: "VBR Landscaping Pvt. Ltd. is a Premier corporate-grade landscape intelligence and ecosystem engineering company delivering high-performance, long-life landscape environments across India.\n\nWe conceptualize, design and execute landscapes not as decorative elements, but as engineered living systems—where plants breathe, soil regenerates, water management and built infrastructure operate together as a single unit across biological timescales.\n\nOur approach brings science, architecture and engineering under a single point of accountability to achieve framework-grade resource ecosystem durability, ecological stability, operations efficiency, sustainable performance services, and lower risk operations for every project we undertake.\n\nEvery project is backed by our ecosystem-first Full Life™ framework, which establishes comprehensive sustainability, validation and lifecycle accountability, ensuring consistency and performance accountability across the entire landscape lifecycle—from planning and execution to restoration and long-term performance.",
        buttonText: "Learn more us",
        buttonLink: "/about#more",
        mainImage: "/images/blog-1.jpg",
      },
      "about-page-features": {
        items: [
          {
            icon: "/images/icon-landscape.png",
            title: "Expert Landscaping",
            description: "To be a global reference standard in Ecosystem Intelligence for enterprises: the science of high-performance, regenerative living systems built with precision engineering,",
            order: 0,
          },
          {
            icon: "/images/icon-hand-plant.png",
            title: "Reliable Support",
            description: "To deliver engineering-led landscape solutions that achieve sustainable life-cycle performance and long-term asset value. We balance the challenges laid out to ourselves and the MLA Ltd.",
            order: 1,
          },
          {
            icon: "/images/icon-eye.png",
            title: "STRATEGIC VALUES",
            description: "Prioritize Engineering in the design and maintenance standards to achieve durability and measurable outcomes. Integrity: transparency, accountability and compliance excellence.",
            order: 2,
          },
        ],
      },
      "about-page-accountability": {
        badge: "VBR Group Strength",
        heading: "Single-Point Accountability",
        decorImage: "/images/garden-tools-decor.jpg",
        companies: [
          {
            number: "01",
            logo: "/images/icon-landscape.png",
            name: "Kisan Plant Technologies Pvt. Ltd",
            subtitle: "Agri-Science & Botanical Systems",
            image: "/images/blog-2.jpg",
            strengthTitle: "Strength Highlights",
            strengthHighlights: [
              "20+ years operational excellence",
              "Proprietary nurseries",
              "Scientifically-validated species selection",
              "Engineering-led input protocols",
            ],
            benefitTitle: "Client Benefits",
            clientBenefits: [
              "Controlled plant quality",
              "Performance-tested plant systems",
              "Higher establishment success rates",
            ],
            order: 0,
          },
          {
            number: "02",
            logo: "/images/icon-hand-plant.png",
            name: "VBR Sports Fields Pvt. Ltd.",
            subtitle: "Civil Engineering & Surface Systems",
            image: "/images/blog-3.jpg",
            strengthTitle: "Strength Highlights",
            strengthHighlights: [
              "Stadium-grade construction standards",
              "Precision grading & drainage",
              "High-tolerance execution systems",
            ],
            benefitTitle: "Client Benefits",
            clientBenefits: [
              "Structural stability",
              "High-usage durability",
              "Weather-resilient performance",
            ],
            order: 1,
          },
          {
            number: "03",
            logo: "/images/icon-eye.png",
            name: "VBR Realty & Infrastructure Pvt. Ltd.",
            subtitle: "Land & Infrastructure Development",
            image: "/images/service-1.png",
            strengthTitle: "Strength Highlights",
            strengthHighlights: [
              "Land value optimization",
              "Development sequencing",
              "Infrastructure Integration expertise",
            ],
            benefitTitle: "Client Benefits",
            clientBenefits: [
              "Masterplan-aligned landscapes",
              "Improved ROI",
              "Value-accretive development assets",
            ],
            order: 2,
          },
        ],
      },
      "about-page-why-choose": {
        badge: "Why Choose Us",
        heading: "Why Homeowners Trust Our Landscaping Expertise",
        description: "VBR Landscaping Pvt. Ltd. operates as the landscape engineering and ecosystem delivery arm of a diversified, domain-integrated industrial group. Rather than functioning as a standalone contractor, VBR derives its execution strength from the strategic integration of three specialized entities — Agri-Science, Engineering, and Infrastructure Development — operating under unified leadership and governance.",
        personImage: "/images/about-person.jpg",
        features: [
          {
            icon: "/images/icon-hand-plant.png",
            title: "Experienced & Skilled Team",
            description: "Ex aliquam ut sit dolore nulla in incididunt nulla elit ea aute in adipiscing.",
            order: 0,
          },
          {
            icon: "/images/icon-landscape.png",
            title: "Custom Outdoor Solutions",
            description: "Ex aliquam ut sit dolore nulla in incididunt nulla elit ea aute in adipiscing.",
            order: 1,
          },
          {
            icon: "/images/icon-aloe.png",
            title: "High-Quality Materials",
            description: "Ex aliquam ut sit dolore nulla in incididunt nulla elit ea aute in adipiscing.",
            order: 2,
          },
          {
            icon: "/images/icon-thumbs.png",
            title: "Reliable & On-Time Service",
            description: "Ex aliquam ut sit dolore nulla in incididunt nulla elit ea aute in adipiscing.",
            order: 3,
          },
        ],
      },
      "about-page-newsletter": {
        heading: "Stay Updated With Expert Advice",
        description: "Join our mailing list to receive professional landscaping tips and exclusive updates.",
        buttonText: "Subscribe",
        placeholder: "Enter your email",
      },
    };

    // Write all sections using unified Firestore helper (admin SDK if available, else client SDK)
    const promises = Object.entries(sections).map(([id, data]) =>
      setSectionFull(id, data as Record<string, unknown>),
    );
    await Promise.all(promises);

    // Seed ECO-MATRIX data
    await seedEcoMatrixData();

    return NextResponse.json({
      success: true,
      message: "All sections seeded successfully (homepage + branding + seo + pages + eco-matrix)!",
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

async function seedEcoMatrixData() {
  // ECO-MATRIX Menu
  await setEcoMatrixMenu({
    leftItems: [
      { id: "10-dimensions", label: "10-Dimension Architecture", href: "/eco-matrix/10-dimensions", description: "Our comprehensive landscape intelligence framework", order: 0 },
      { id: "nature-framework", label: "N.A.T.U.R.E Framework", href: "/eco-matrix/nature-framework", description: "Six-pillar engineering methodology", order: 1 },
      { id: "overview", label: "ECO-MATRIX Overview", href: "/eco-matrix/overview", description: "Learn about our proprietary system", order: 2 },
    ],
    capabilities: [
      { id: "archiq", title: "ARCHIQ™", description: "Geo-Diagnostics & Spatial Intelligence", order: 0 },
      { id: "plantiq", title: "PLANTIQ™", description: "Bio-Asset Sourcing & Authentication", order: 1 },
      { id: "hydro-logic", title: "HYDRO-LOGIC™", description: "Integrated Water Engineering", order: 2 },
      { id: "core-build", title: "CORE-BUILD™", description: "Outdoor Infrastructure Engineering", order: 3 },
      { id: "vertic-tech", title: "VERTIC-TECH™", description: "Elevated Landscape Systems", order: 4 },
      { id: "eco-regen", title: "ECO-REGEN™", description: "Ecological Regeneration Systems", order: 5 },
    ],
  });

  // ECO-MATRIX Dimensions
  await setEcoMatrixDimensions([
    { id: "archiq", tabTitle: "ARCHIQ", label: "DIMENSION 01", title: "Geo-Diagnostics & Spatial Intelligence", subtitle: "ARCHIQ™ establishes the scientific foundation of every project.", description: "Through detailed soil diagnostics, water profiling, and micro-climate analysis, land conditions are translated into data-driven master planning and design intelligence.", features: [], outcomes: ["Design feasibility validated before execution", "Reduced failure risk and long-term performance assurance"], order: 0 },
    { id: "plantiq", tabTitle: "PLANTIQ™", label: "DIMENSION 02", title: "Bio-Asset Sourcing & Authentication", subtitle: "Climate-ready plants with traceable quality.", description: "PLANTIQ™ ensures every plant in your landscape is sourced with precision, authenticated for quality, and matched to your site's specific conditions.", features: [], outcomes: [], order: 1 },
    { id: "hydro-logic", tabTitle: "HYDRO-LOGIC™", label: "DIMENSION 03", title: "Integrated Water Engineering", subtitle: "Smart irrigation & zero-logging drainage systems.", description: "Complete water management from irrigation design to drainage solutions, ensuring optimal water use efficiency.", features: [], outcomes: [], order: 2 },
    { id: "core-build", tabTitle: "CORE-BUILD™", label: "DIMENSION 04", title: "Outdoor Infrastructure Engineering", subtitle: "Hardscapes built to civil & structural standards.", description: "All outdoor infrastructure engineered and built to the highest civil and structural standards for durability and safety.", features: [], outcomes: [], order: 3 },
    { id: "vertic-tech", tabTitle: "VERTIC-TECH™", label: "DIMENSION 05", title: "Elevated Landscape Systems", subtitle: "Vertical & rooftop ecosystems for urban spaces.", description: "Specialized systems for vertical gardens, green roofs, and elevated planting solutions in urban environments.", features: [], outcomes: [], order: 4 },
    { id: "eco-regen", tabTitle: "ECO-REGEN™", label: "DIMENSION 06", title: "Ecological Regeneration Systems", subtitle: "Biodiversity restoration & carbon-positive landscapes.", description: "Focused on restoring biodiversity and creating landscapes that contribute positively to the environment.", features: [], outcomes: [], order: 5 },
    { id: "eco-offset", tabTitle: "ECO-OFFSET™", label: "DIMENSION 07", title: "Environmental Performance & ESG Systems", subtitle: "Carbon offset, ESG compliance & reporting.", description: "Comprehensive environmental performance tracking and ESG compliance for sustainable landscape operations.", features: [], outcomes: [], order: 6 },
    { id: "human-scape", tabTitle: "HUMAN-SCAPE™", label: "DIMENSION 08", title: "Human-Centric Landscape Systems", subtitle: "Wellness, play & active-use environments.", description: "Designing landscapes that prioritize human wellness, recreation, and meaningful engagement.", features: [], outcomes: [], order: 7 },
    { id: "sense-grid", tabTitle: "SENSE-GRID™", label: "DIMENSION 09", title: "Integrated Sensory Infrastructure", subtitle: "Lighting, nightscape & sensory experience.", description: "Comprehensive sensory design including lighting, soundscapes, and experiential elements.", features: [], outcomes: [], order: 8 },
    { id: "steward-care", tabTitle: "STEWARD-CARE™", label: "DIMENSION 10", title: "Lifecycle Stewardship & Asset Management", subtitle: "Monitoring, maintenance & long-term value growth.", description: "End-to-end lifecycle management ensuring your landscape investment grows in value over time.", features: [], outcomes: [], order: 9 },
  ]);

  // N.A.T.U.R.E Framework
  await setEcoMatrixNature([
    { id: "n", letter: "N", title: "Natural Intelligence", subtitle: "Comprehensive site intelligence assessment", description: "Every project begins with a comprehensive site intelligence assessment to establish biological and environmental baselines before any physical intervention.", features: [{ title: "Detailed soil profiling and fertility diagnostics" }, { title: "Hydrological behavior and drainage mapping" }, { title: "Micro-climate and exposure analysis" }, { title: "Site constraints and risk identification" }], outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize downstream biological and structural risks.", order: 0 },
    { id: "a", letter: "A", title: "Adaptive Design", subtitle: "Site-specific adaptive design", description: "Every project assessment translates into site-specific adaptive design before any physical intervention.", features: [{ title: "Detailed fertility analysis" }, { title: "Micro-climate exposure mapping" }], outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 1 },
    { id: "t", letter: "T", title: "Technical Excellence", subtitle: "Engineering precision in execution", description: "Every project assessment ensures technical excellence before any physical intervention.", features: [{ title: "Detailed fertility analysis" }, { title: "Micro-climate exposure mapping" }], outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 2 },
    { id: "u", letter: "U", title: "Universal Standards", subtitle: "Global best practices implementation", description: "Every project assessment implements universal standards before any physical intervention.", features: [{ title: "Detailed fertility analysis" }, { title: "Micro-climate exposure mapping" }], outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 3 },
    { id: "r", letter: "R", title: "Regenerative Systems", subtitle: "Sustainable ecosystem development", description: "Every project assessment focuses on regenerative systems before any physical intervention.", features: [{ title: "Detailed fertility analysis" }, { title: "Micro-climate exposure mapping" }], outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 4 },
    { id: "e", letter: "E", title: "Environmental Stewardship", subtitle: "Long-term ecological responsibility", description: "Every project assessment emphasizes environmental stewardship before any physical intervention.", features: [{ title: "Detailed fertility analysis" }, { title: "Micro-climate exposure mapping" }], outcome: "Data-validated inputs that inform design decisions, reduce uncertainty, and minimize risks.", order: 5 },
  ]);

  // ECO-MATRIX Overview
  await setEcoMatrixOverview({
    heroTitle: "THE VBR ECO-MATRIX",
    heroSubtitle: "Our proprietary system transforms land into engineered living infrastructure through 10 integrated dimensions of landscape intelligence.",
    aboutBadge: "About The ECO-MATRIX™",
    aboutHeading: "Engineering Living Infrastructure",
    aboutDescription: "The VBR ECO-MATRIX™ is our proprietary landscape intelligence and execution system designed to transform land into engineered living infrastructure.\n\nUnlike conventional landscaping models that treat design, planting, irrigation, and maintenance as isolated activities, the ECO-MATRIX™ integrates engineering, ecology, and lifecycle control into a single, accountable framework.\n\nEach project executed by VBR Landscaping Pvt. Ltd is governed through this system, ensuring predictable performance, ecological stability, and long-term asset value.",
    stats: [
      { value: "10", label: "10-Dimension Architecture" },
      { value: "100%", label: "Single-Point Accountability" },
      { value: "360°", label: "Lifecycle Coverage" },
      { value: "∞", label: "Long-term Value" },
    ],
    howItWorksBadge: "How It Works",
    howItWorksHeading: "DIMENSION ICON LABELS",
    howItWorksSubheading: "The ECO-MATRIX™ operates through 10 integrated dimensions",
  });
}
