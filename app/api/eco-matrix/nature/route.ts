import { NextResponse } from "next/server"
import { getEcoMatrixNature, setEcoMatrixNature, type NatureAccordionItem } from "@/lib/eco-matrix-firestore"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const items = await getEcoMatrixNature()
    return NextResponse.json(items)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/eco-matrix/nature error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const items = await getEcoMatrixNature()
    
    const newItem: NatureAccordionItem = {
      id: body.id || `nature-${Date.now()}`,
      letter: body.letter || "",
      title: body.title || "",
      subtitle: body.subtitle || "",
      description: body.description || "",
      features: body.features || [],
      outcome: body.outcome || "",
      order: body.order ?? items.length,
    }
    
    items.push(newItem)
    await setEcoMatrixNature(items)
    
    return NextResponse.json({ success: true, item: newItem })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/eco-matrix/nature error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // Bulk update
    if (Array.isArray(body)) {
      await setEcoMatrixNature(body)
      return NextResponse.json({ success: true })
    }
    
    // Single update
    const items = await getEcoMatrixNature()
    const index = items.findIndex(i => i.id === body.id)
    
    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }
    
    items[index] = { ...items[index], ...body }
    await setEcoMatrixNature(items)
    
    return NextResponse.json({ success: true, item: items[index] })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/eco-matrix/nature error:", message)
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
    
    const items = await getEcoMatrixNature()
    const filtered = items.filter(i => i.id !== id)
    
    if (filtered.length === items.length) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }
    
    await setEcoMatrixNature(filtered)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("DELETE /api/eco-matrix/nature error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
