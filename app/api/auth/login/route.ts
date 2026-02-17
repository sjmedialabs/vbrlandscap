import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Use Firebase Auth REST API to sign in (server-side, no client SDK needed)
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    if (!apiKey) {
      console.error("[v0] NEXT_PUBLIC_FIREBASE_API_KEY is not set")
      return NextResponse.json({ error: "Server misconfiguration: Firebase API key missing" }, { status: 500 })
    }

    const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
    console.log("[v0] Attempting Firebase REST sign-in for:", email)

    const res = await fetch(signInUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    })

    const data = await res.json()
    console.log("[v0] Firebase REST response status:", res.status, "error:", data?.error?.message)

    if (!res.ok) {
      const fbError = data?.error?.message || "Authentication failed"
      const errorMessage =
        fbError === "EMAIL_NOT_FOUND" || fbError === "INVALID_PASSWORD" || fbError === "INVALID_LOGIN_CREDENTIALS"
          ? "Invalid email or password"
          : fbError
      return NextResponse.json({ error: errorMessage }, { status: 401 })
    }

    // Create session cookie from the ID token
    const idToken = data.idToken
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

    let sessionCookie: string
    try {
      const { adminAuth } = await import("@/lib/firebase-admin")
      sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
    } catch (cookieErr: unknown) {
      const msg = cookieErr instanceof Error ? cookieErr.message : "Unknown error"
      console.error("[v0] Failed to create session cookie:", msg)
      return NextResponse.json({ error: "Session creation failed: " + msg }, { status: 500 })
    }

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
