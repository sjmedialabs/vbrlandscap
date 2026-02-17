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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check existing session on mount
    fetch("/api/auth/verify")
      .then(async (res) => {
        const text = await res.text()
        try {
          const data = JSON.parse(text)
          if (data.authenticated) {
            setUser({ email: data.email, uid: data.uid })
          }
        } catch {
          // Response was not JSON (e.g. HTML error page) - treat as not authenticated
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
      throw new Error("Server error: unexpected response. Check Firebase Admin env vars.")
    }

    if (!res.ok) {
      throw new Error(data.error || "Login failed")
    }

    setUser(data.user)
  }

  const signOut = async () => {
    await fetch("/api/auth/session", { method: "DELETE" })
    setUser(null)
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
