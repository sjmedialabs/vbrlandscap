import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

function formatPrivateKey(key: string | undefined): string | undefined {
  if (!key) return undefined

  // Remove surrounding quotes if present (single or double)
  let formatted = key.replace(/^["']|["']$/g, "")

  // Replace literal \n sequences with actual newlines
  formatted = formatted.replace(/\\n/g, "\n")

  // If it looks like base64 without PEM headers, try decoding
  if (!formatted.includes("-----BEGIN") && formatted.length > 100) {
    try {
      formatted = Buffer.from(formatted, "base64").toString("utf-8")
    } catch {
      // Not base64, continue with the raw value
    }
  }

  // Ensure it has proper PEM headers
  if (!formatted.includes("-----BEGIN")) {
    formatted = `-----BEGIN RSA PRIVATE KEY-----\n${formatted}\n-----END RSA PRIVATE KEY-----\n`
  }

  return formatted
}

function getAdminApp() {
  if (getApps().length) return getApp()

  const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY)

  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey,
    }),
  })
import admin from "firebase-admin"

function initAdmin() {
  if (admin.apps.length) return

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !rawKey) {
    console.warn("[firebase-admin] Missing env vars - cannot initialize admin SDK")
    return
  }

  // Parse private key - handle all common formats from Vercel env vars
  let privateKey = rawKey

  // 1. Strip wrapping quotes if present
  if ((privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
    privateKey = privateKey.slice(1, -1)
  }

  // 2. Replace literal \n sequences with real newlines
  privateKey = privateKey.replace(/\\n/g, "\n")

  // 3. If still no PEM header, try base64 decode
  if (!privateKey.includes("-----BEGIN")) {
    try {
      const decoded = Buffer.from(privateKey, "base64").toString("utf-8")
      if (decoded.includes("-----BEGIN")) {
        privateKey = decoded
      }
    } catch {
      // Not base64
    }
  }

  // 4. Ensure proper PEM newlines (some envs collapse all whitespace)
  if (privateKey.includes("-----BEGIN") && !privateKey.includes("\n-----")) {
    privateKey = privateKey
      .replace(/-----BEGIN PRIVATE KEY-----\s*/, "-----BEGIN PRIVATE KEY-----\n")
      .replace(/\s*-----END PRIVATE KEY-----/, "\n-----END PRIVATE KEY-----\n")
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    })
    console.log("[firebase-admin] Initialized successfully")
  } catch (err) {
    console.error("[firebase-admin] Init failed:", err instanceof Error ? err.message : err)
  }
}

export function getAdminDb(): FirebaseFirestore.Firestore | null {
  initAdmin()
  return admin.apps.length ? admin.firestore() : null
}

export function getAdminAuth() {
  initAdmin()
  return admin.apps.length ? admin.auth() : null
}

// Keep backward-compatible exports (lazy getters)
export const adminDb = new Proxy({} as FirebaseFirestore.Firestore, {
  get(_, prop) {
    const db = getAdminDb()
    if (!db) throw new Error("Firebase Admin not initialized")
    return (db as Record<string | symbol, unknown>)[prop]
  },
})
