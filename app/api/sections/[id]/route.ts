import { NextResponse } from "next/server"
import { cookies } from "next/headers"

async function verifyAuth() {
  const cookieStore = await cookies()
  const raw = cookieStore.get("auth-session")?.value
  if (!raw) return null
  try {
    const session = JSON.parse(raw)
    if (!session.uid || !session.email) return null
    return { uid: session.uid, email: session.email }
  } catch {
    return null
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { adminDb } = await import("@/lib/firebase-admin")
    const doc = await adminDb.collection("sections").doc(id).get()
    if (!doc.exists) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }
    return NextResponse.json({ id: doc.id, ...doc.data() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAuth()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { id: _id, ...data } = body

    const { adminDb } = await import("@/lib/firebase-admin")
    await adminDb.collection("sections").doc(id).set(data, { merge: true })
    const updated = await adminDb.collection("sections").doc(id).get()
    return NextResponse.json({ id: updated.id, ...updated.data() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
