import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "sections"))
    const sections: Record<string, unknown> = {}
    snapshot.forEach((docSnap) => {
      sections[docSnap.id] = { id: docSnap.id, ...docSnap.data() }
    })
    return NextResponse.json(sections)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /sections error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
