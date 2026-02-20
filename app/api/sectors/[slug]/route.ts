import { NextResponse } from "next/server"
import {
  getSectorContent,
  setSectorContent,
  getSectorsList,
  defaultSectorContent,
  type SectorContent,
} from "@/lib/sectors-firestore"

export const dynamic = "force-dynamic"

interface RouteParams {
  params: Promise<{ slug: string }>
}

// GET: Fetch content for a specific sector
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params

    // First verify the sector exists in the list
    const sectorsList = await getSectorsList()
    const sector = sectorsList.find((s) => s.slug === slug || s.id === slug)

    if (!sector) {
      return NextResponse.json({ error: "Sector not found" }, { status: 404 })
    }

    // Get the sector content
    let content = await getSectorContent(sector.id)

    // If no content exists, return default content
    if (!content) {
      content = {
        id: `content_${sector.id}`,
        sectorId: sector.id,
        ...defaultSectorContent,
      }
    }

    return NextResponse.json(content)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/sectors/[slug] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT: Update content for a specific sector
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params
    const body = await request.json()

    // Verify the sector exists
    const sectorsList = await getSectorsList()
    const sector = sectorsList.find((s) => s.slug === slug || s.id === slug)

    if (!sector) {
      return NextResponse.json({ error: "Sector not found" }, { status: 404 })
    }

    // Update the sector content
    const contentUpdate: Partial<SectorContent> = {
      sectorId: sector.id,
      ...body,
    }

    await setSectorContent(sector.id, contentUpdate)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/sectors/[slug] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE: Delete a specific sector's content
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params

    // Verify the sector exists
    const sectorsList = await getSectorsList()
    const sector = sectorsList.find((s) => s.slug === slug || s.id === slug)

    if (!sector) {
      return NextResponse.json({ error: "Sector not found" }, { status: 404 })
    }

    // Reset to default content
    await setSectorContent(sector.id, {
      sectorId: sector.id,
      ...defaultSectorContent,
    })

    return NextResponse.json({ success: true, message: "Content reset to default" })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("DELETE /api/sectors/[slug] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
