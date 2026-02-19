import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

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

    // Write all sections using client SDK
    const promises = Object.entries(sections).map(([id, data]) =>
      setDoc(doc(db, "sections", id), data),
    );
    await Promise.all(promises);

    return NextResponse.json({
      success: true,
      message: "All 14 sections seeded successfully!",
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
