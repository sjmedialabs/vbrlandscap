import admin from "firebase-admin"

function parsePrivateKey(raw: string): string {
  let key = raw

  // Fix: Vercel env vars store the key with literal backslash + real newline (\<LF>)
  // Strip stray backslashes that appear right before a real newline
  key = key.replace(/\\\n/g, "\n")

  // Also handle escaped \\n sequences (two-char literal \n)
  key = key.replace(/\\n/g, "\n")

  // Strip wrapping quotes
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).replace(/\\n/g, "\n")
  }

  // Try JSON.parse for double-escaped strings
  if (!key.includes("-----BEGIN")) {
    try {
      const parsed = JSON.parse(raw)
      if (typeof parsed === "string") key = parsed
    } catch {
      // Not JSON
    }
  }

  // base64 decode fallback
  if (!key.includes("-----BEGIN")) {
    try {
      const decoded = Buffer.from(key, "base64").toString("utf-8")
      if (decoded.includes("-----BEGIN")) key = decoded
    } catch {
      // Not base64
    }
  }

  // Ensure trailing newline
  if (!key.endsWith("\n")) key += "\n"

  return key
}

function initAdmin() {
  if (admin.apps.length) return

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !rawKey) {
    console.warn("[firebase-admin] Missing env vars - cannot initialize admin SDK")
    return
  }

  try {
    const privateKey = parsePrivateKey(rawKey)
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    })
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
