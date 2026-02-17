import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { adminAuth } from "@/lib/firebase-admin"
import { cookies } from "next/headers"

async function verifyAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value
  if (!token) return null
  try {
    const decoded = await adminAuth.verifySessionCookie(token, true)
    return decoded
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

    await adminDb.collection("sections").doc(id).set(data, { merge: true })
    const updated = await adminDb.collection("sections").doc(id).get()
    return NextResponse.json({ id: updated.id, ...updated.data() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
