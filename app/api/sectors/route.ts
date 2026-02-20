import { NextResponse } from "next/server"
import {
  getSectorsList,
  setSectorsList,
  getSectorsPageData,
  setSectorsPageData,
  defaultSectorsList,
  defaultPageSettings,
  type SectorListItem,
} from "@/lib/sectors-firestore"

export const dynamic = "force-dynamic"

// GET: Fetch sectors list and page settings
export async function GET() {
  try {
    const [sectorsList, pageData] = await Promise.all([
      getSectorsList(),
      getSectorsPageData(),
    ])

    return NextResponse.json({
      sectorsList: sectorsList.length > 0 ? sectorsList : defaultSectorsList,
      pageData: pageData || defaultPageSettings,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/sectors error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST: Create/seed initial sectors data
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === "seed") {
      await Promise.all([
        setSectorsList(defaultSectorsList),
        setSectorsPageData(defaultPageSettings),
      ])
      return NextResponse.json({ success: true, message: "Sectors data seeded" })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/sectors error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT: Update sectors list or page settings
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { sectorsList, pageData } = body

    const promises: Promise<void>[] = []

    if (sectorsList) {
      promises.push(setSectorsList(sectorsList as SectorListItem[]))
    }

    if (pageData) {
      promises.push(setSectorsPageData(pageData))
    }

    await Promise.all(promises)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/sectors error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
