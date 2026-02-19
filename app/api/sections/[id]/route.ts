import { NextResponse } from "next/server"
import { getSection, setSection } from "@/lib/firestore"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await getSection(id)
    if (!data) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /sections/[id] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const authHeader = req.headers.get("Authorization") || ""
    const authToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : ""
    await setSection(id, body, true, authToken)
    return NextResponse.json({ success: true, message: "Section updated" })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /sections/[id] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
