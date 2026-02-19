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
    // First check sessionStorage (works in iframes where cookies may be blocked)
    try {
      const stored = sessionStorage.getItem(SESSION_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.email && parsed.uid) {
          setUser(parsed)
          setLoading(false)
          return
        }
      }
    } catch {
      // sessionStorage not available or invalid data
    }

    // Fallback: check cookie-based session via API
    fetch("/api/auth/verify")
      .then(async (res) => {
        const text = await res.text()
        try {
          const data = JSON.parse(text)
          if (data.authenticated) {
            const u = { email: data.email, uid: data.uid }
            setUser(u)
            try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(u)) } catch {}
          }
        } catch {
          // not JSON
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const signIn = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const text = await res.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error("Server error: unexpected response. Check Firebase env vars.")
    }

    if (!res.ok) {
      throw new Error(data.error || "Login failed")
    }

    const u = data.user as AuthUser
    setUser(u)
    // Also persist to sessionStorage for iframe compatibility
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(u)) } catch {}
  }

  const signOut = async () => {
    await fetch("/api/auth/session", { method: "DELETE" }).catch(() => {})
    setUser(null)
    try { sessionStorage.removeItem(SESSION_KEY) } catch {}
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
