import { NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Use Firebase Auth REST API to sign in (server-side, no client SDK needed)
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      const errorMessage =
        data?.error?.message === "EMAIL_NOT_FOUND" || data?.error?.message === "INVALID_PASSWORD" || data?.error?.message === "INVALID_LOGIN_CREDENTIALS"
          ? "Invalid email or password"
          : data?.error?.message || "Authentication failed"
      return NextResponse.json({ error: errorMessage }, { status: 401 })
    }

    // Create session cookie from the ID token
    const idToken = data.idToken
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

    return NextResponse.json({
      success: true,
      user: { email: data.email, uid: data.localId },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
