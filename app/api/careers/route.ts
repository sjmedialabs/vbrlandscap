import { NextResponse } from "next/server"
import {
  getCareersPageData,
  setCareersPageData,
  seedCareersData,
  defaultCareersPageData,
  type CareersPageData,
} from "@/lib/careers-firestore"

export const dynamic = "force-dynamic"

// GET: Fetch careers page data
export async function GET() {
  try {
    const pageData = await getCareersPageData()
    
    return NextResponse.json({
      pageData: pageData || defaultCareersPageData,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/careers error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST: Seed default data or create new data
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, pageData } = body

    // Seed action
    if (action === "seed") {
      await seedCareersData()
      return NextResponse.json({ success: true, message: "Careers data seeded" })
    }

    // Save page data
    if (pageData) {
      await setCareersPageData(pageData as CareersPageData)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/careers error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT: Update careers page data
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { pageData } = body

    if (pageData) {
      await setCareersPageData(pageData as CareersPageData)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/careers error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
