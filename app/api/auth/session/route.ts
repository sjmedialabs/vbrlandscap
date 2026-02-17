import { NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json()

    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    const cookieStore = await cookies()
    cookieStore.set("auth-token", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create session"
    return NextResponse.json({ error: message }, { status: 401 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  return NextResponse.json({ success: true })
}
