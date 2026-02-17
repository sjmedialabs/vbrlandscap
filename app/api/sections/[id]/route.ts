import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

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
    const docSnap = await getDoc(doc(db, "sections", id))
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }
    return NextResponse.json({ id: docSnap.id, ...docSnap.data() })
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

    await setDoc(doc(db, "sections", id), data, { merge: true })
    const updated = await getDoc(doc(db, "sections", id))
    return NextResponse.json({ id: updated.id, ...updated.data() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
