import { NextResponse } from "next/server"
import { getEcoMatrixOverview, setEcoMatrixOverview } from "@/lib/eco-matrix-firestore"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const overview = await getEcoMatrixOverview()
    return NextResponse.json(overview || {})
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/eco-matrix/overview error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await setEcoMatrixOverview(body)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/eco-matrix/overview error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await setEcoMatrixOverview(body)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/eco-matrix/overview error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
