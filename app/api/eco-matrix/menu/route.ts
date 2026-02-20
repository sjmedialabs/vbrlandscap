import { NextResponse } from "next/server"
import { getEcoMatrixMenu, setEcoMatrixMenu } from "@/lib/eco-matrix-firestore"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const menu = await getEcoMatrixMenu()
    return NextResponse.json(menu || { leftItems: [], capabilities: [] })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/eco-matrix/menu error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await setEcoMatrixMenu(body)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/eco-matrix/menu error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await setEcoMatrixMenu(body)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/eco-matrix/menu error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
