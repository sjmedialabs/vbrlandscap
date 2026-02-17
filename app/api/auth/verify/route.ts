import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const { adminAuth } = await import("@/lib/firebase-admin")
    const decoded = await adminAuth.verifySessionCookie(token, true)
    return NextResponse.json({
      authenticated: true,
      uid: decoded.uid,
      email: decoded.email,
    })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
