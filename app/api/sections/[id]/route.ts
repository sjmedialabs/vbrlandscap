import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
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
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const docRef = doc(db, "sections", id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }
    return NextResponse.json({ id: docSnap.id, ...docSnap.data() })
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
    const docRef = doc(db, "sections", id)
    await setDoc(docRef, body, { merge: true })
    return NextResponse.json({ success: true, message: "Section updated" })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /sections/[id] error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
