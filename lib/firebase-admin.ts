import admin from "firebase-admin"

function getAdminApp() {
  if (admin.apps.length) return admin.apps[0]!

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY

  console.log("[v0] firebase-admin env check:", JSON.stringify({
    projectId: projectId ? projectId.substring(0, 10) + "..." : "MISSING",
    clientEmail: clientEmail ? clientEmail.substring(0, 15) + "..." : "MISSING",
    rawKey: rawKey ? `present (${rawKey.length} chars, starts: ${rawKey.substring(0, 20)}...)` : "MISSING",
  }))

  if (!projectId || !clientEmail || !rawKey) {
    console.warn("[firebase-admin] Missing env vars - admin SDK not initialized. Using client SDK instead.")
    return null
  }

  // Handle private key - may be JSON-escaped, base64 encoded, or raw
  let privateKey = rawKey
  if (rawKey.startsWith('"') && rawKey.endsWith('"')) {
    // JSON-escaped string
    privateKey = JSON.parse(rawKey) as string
  } else if (!rawKey.includes("-----BEGIN")) {
    // Possibly base64 encoded
    try {
      const decoded = Buffer.from(rawKey, "base64").toString("utf-8")
      if (decoded.includes("-----BEGIN")) {
        privateKey = decoded
      }
    } catch {
      // Not base64, use as-is
    }
  }
  // Always replace literal \n with actual newlines
  privateKey = privateKey.replace(/\\n/g, "\n")

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

const adminApp = getAdminApp()

export const adminDb = adminApp ? admin.firestore() : null
export const adminAuth = adminApp ? admin.auth() : null
