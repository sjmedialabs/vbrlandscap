import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get("auth-session")?.value

    if (!raw) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const session = JSON.parse(raw)

    // Check if token is expired
    if (session.expiresAt && Date.now() > session.expiresAt) {
      // Try to refresh the token
      const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
      if (!apiKey || !session.refreshToken) {
        return NextResponse.json({ authenticated: false }, { status: 401 })
      }

      const res = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `grant_type=refresh_token&refresh_token=${session.refreshToken}`,
        }
      )

      if (!res.ok) {
        return NextResponse.json({ authenticated: false }, { status: 401 })
      }

      const data = await res.json()

      // Update the cookie with refreshed tokens
      const newSession = JSON.stringify({
        idToken: data.id_token,
        refreshToken: data.refresh_token,
        email: session.email,
        uid: session.uid,
        expiresAt: Date.now() + Number(data.expires_in) * 1000,
      })

      cookieStore.set("auth-session", newSession, {
        maxAge: 60 * 60 * 24 * 5,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      })
    }

    return NextResponse.json({
      authenticated: true,
      uid: session.uid,
      email: session.email,
    })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
