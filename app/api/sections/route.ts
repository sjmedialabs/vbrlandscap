import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const snapshot = await adminDb.collection("sections").get()
    const sections: Record<string, unknown> = {}

    snapshot.forEach((doc) => {
      sections[doc.id] = { id: doc.id, ...doc.data() }
    })

    return NextResponse.json(sections)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
