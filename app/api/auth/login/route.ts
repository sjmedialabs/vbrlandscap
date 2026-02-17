import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Firebase API key not configured" }, { status: 500 })
    }

    // Authenticate via Firebase Auth REST API
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      const fbError = data?.error?.message || "Authentication failed"
      const msg =
        fbError === "EMAIL_NOT_FOUND" ||
        fbError === "INVALID_PASSWORD" ||
        fbError === "INVALID_LOGIN_CREDENTIALS"
          ? "Invalid email or password"
          : fbError
      return NextResponse.json({ error: msg }, { status: 401 })
    }

    // Store the idToken + refresh token in an httpOnly cookie as a simple JSON payload
    const session = JSON.stringify({
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      email: data.email,
      uid: data.localId,
      expiresAt: Date.now() + Number(data.expiresIn) * 1000,
    })

    const cookieStore = await cookies()
    cookieStore.set("auth-session", session, {
      maxAge: 60 * 60 * 24 * 5, // 5 days
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
