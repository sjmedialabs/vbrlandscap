import { NextResponse } from "next/server"
import {
  getAllProjects,
  getAllProjectsAdmin,
  getProjectsPageData,
  setProjectsPageData,
  createProject,
  seedProjects,
  getCategories,
  setCategories,
  defaultProjectsPageData,
  defaultCategories,
  sampleProjects,
  type Project,
  type ProjectCategory,
} from "@/lib/projects-firestore"

export const dynamic = "force-dynamic"

// GET: Fetch all projects (public) or all projects including drafts (admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const admin = searchParams.get("admin") === "true"
    const includePageData = searchParams.get("pageData") === "true"

    const projects = admin ? await getAllProjectsAdmin() : await getAllProjects()

    // If no projects found, return sample data for display
    const projectsData = projects.length > 0 ? projects : sampleProjects.map((p, i) => ({ ...p, id: `sample-${i}` }))

    // Admin always gets page data and categories
    if (admin || includePageData) {
      const [pageData, categories] = await Promise.all([
        getProjectsPageData(),
        getCategories(),
      ])

      return NextResponse.json({
        projects: projectsData,
        pageData: pageData || defaultProjectsPageData,
        categories: categories.length > 0 ? categories : defaultCategories,
      })
    }

    return NextResponse.json({ projects: projectsData })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/projects error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST: Create a new project or perform actions (seed, update settings)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, project, pageData, categories } = body

    // Seed action
    if (action === "seed") {
      await seedProjects()
      // Also seed page data and categories
      await setProjectsPageData(defaultProjectsPageData)
      await setCategories(defaultCategories)
      return NextResponse.json({ success: true, message: "Projects data seeded" })
    }

    // Update page settings
    if (action === "updateSettings" && pageData) {
      await setProjectsPageData(pageData)
      return NextResponse.json({ success: true })
    }

    // Update categories
    if (action === "updateCategories" && categories) {
      await setCategories(categories as ProjectCategory[])
      return NextResponse.json({ success: true })
    }

    // Create new project
    if (project) {
      // Generate slug from title if not provided
      const slug = project.slug || project.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

      const newProject: Omit<Project, "id"> = {
        title: project.title || "",
        slug,
        heroImage: project.heroImage || "/images/hero-bg.jpg",
        featuredImage: project.featuredImage || "/images/blog-1.jpg",
        shortDescription: project.shortDescription || "",
        fullDescription: project.fullDescription || "",
        categories: project.categories || [],
        client: project.client || "",
        projectType: project.projectType || "",
        date: project.date || new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
        website: project.website || "",
        features: project.features || [],
        gallery: project.gallery || [],
        relatedProjects: project.relatedProjects || [],
        status: project.status || "draft",
        order: project.order ?? 0,
      }

      const id = await createProject(newProject)
      return NextResponse.json({ success: true, id })
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/projects error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT: Update page settings or categories
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { pageData, categories } = body

    if (pageData) {
      await setProjectsPageData(pageData)
    }

    if (categories) {
      await setCategories(categories as ProjectCategory[])
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/projects error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
