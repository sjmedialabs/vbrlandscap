import { NextResponse } from "next/server"
import {
  getProjectBySlug,
  getProjectById,
  updateProject,
  deleteProject,
  getRelatedProjects,
  defaultProject,
} from "@/lib/projects-firestore"

export const dynamic = "force-dynamic"

interface RouteParams {
  params: Promise<{ slug: string }>
}

// GET: Fetch a single project by slug or id
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const includeRelated = searchParams.get("related") === "true"

    // Try to find by slug first, then by id
    let project = await getProjectBySlug(slug)
    if (!project) {
      project = await getProjectById(slug)
    }

    if (!project) {
      // Return default project for preview/development
      return NextResponse.json({
        project: { ...defaultProject, id: "default", slug },
        related: [],
      })
    }

    // Get related projects if requested
    let related: Awaited<ReturnType<typeof getRelatedProjects>> = []
    if (includeRelated) {
      related = await getRelatedProjects(project.id, 2)
    }

    return NextResponse.json({ project, related })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/projects/[slug] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT: Update a project
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params
    const body = await request.json()

    // Find the project first
    let project = await getProjectBySlug(slug)
    if (!project) {
      project = await getProjectById(slug)
    }

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Update the project
    await updateProject(project.id, body)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/projects/[slug] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE: Delete a project
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params

    // Find the project first
    let project = await getProjectBySlug(slug)
    if (!project) {
      project = await getProjectById(slug)
    }

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    await deleteProject(project.id)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("DELETE /api/projects/[slug] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
