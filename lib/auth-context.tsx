"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface AuthUser {
  email: string
  uid: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const SESSION_KEY = "admin-auth-session"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check sessionStorage for existing session
    try {
      const stored = sessionStorage.getItem(SESSION_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.email && parsed.uid) {
          setUser(parsed)
        }
      }
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Authenticate directly via Firebase Auth REST API (client-side, public API key)
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    if (!apiKey) {
      throw new Error("Firebase API key is not configured")
    }

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
      throw new Error(msg)
    }

    const u: AuthUser = { email: data.email, uid: data.localId }
    setUser(u)
    // Persist session to sessionStorage
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ ...u, idToken: data.idToken, refreshToken: data.refreshToken })
      )
    } catch {
      // ignore
    }
  }

  const signOut = async () => {
    setUser(null)
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
