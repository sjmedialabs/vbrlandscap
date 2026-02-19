import { NextResponse } from "next/server"
import { getAllSections } from "@/lib/firestore"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const sections = await getAllSections()
    if (!sections) {
      return NextResponse.json({})
    }
    return NextResponse.json(sections)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /sections error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
