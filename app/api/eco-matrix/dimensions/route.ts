import { NextResponse } from "next/server"
import { getEcoMatrixDimensions, setEcoMatrixDimensions, type EcoMatrixDimension } from "@/lib/eco-matrix-firestore"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const dimensions = await getEcoMatrixDimensions()
    return NextResponse.json(dimensions)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/eco-matrix/dimensions error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const dimensions = await getEcoMatrixDimensions()
    
    // Add new dimension
    const newDimension: EcoMatrixDimension = {
      id: body.id || `dim-${Date.now()}`,
      tabTitle: body.tabTitle || "",
      label: body.label || "",
      title: body.title || "",
      subtitle: body.subtitle || "",
      description: body.description || "",
      image: body.image || "",
      personImage: body.personImage || "",
      features: body.features || [],
      outcomes: body.outcomes || [],
      order: body.order ?? dimensions.length,
    }
    
    dimensions.push(newDimension)
    await setEcoMatrixDimensions(dimensions)
    
    return NextResponse.json({ success: true, dimension: newDimension })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/eco-matrix/dimensions error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // Bulk update - replace all dimensions
    if (Array.isArray(body)) {
      await setEcoMatrixDimensions(body)
      return NextResponse.json({ success: true })
    }
    
    // Single update by ID
    const dimensions = await getEcoMatrixDimensions()
    const index = dimensions.findIndex(d => d.id === body.id)
    
    if (index === -1) {
      return NextResponse.json({ error: "Dimension not found" }, { status: 404 })
    }
    
    dimensions[index] = { ...dimensions[index], ...body }
    await setEcoMatrixDimensions(dimensions)
    
    return NextResponse.json({ success: true, dimension: dimensions[index] })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/eco-matrix/dimensions error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }
    
    const dimensions = await getEcoMatrixDimensions()
    const filtered = dimensions.filter(d => d.id !== id)
    
    if (filtered.length === dimensions.length) {
      return NextResponse.json({ error: "Dimension not found" }, { status: 404 })
    }
    
    await setEcoMatrixDimensions(filtered)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("DELETE /api/eco-matrix/dimensions error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
