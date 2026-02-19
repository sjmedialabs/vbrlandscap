import admin from "firebase-admin"

function parsePrivateKey(raw: string): string {
  // Nuclear option: extract ONLY the base64 content from the PEM key,
  // strip ALL non-base64 characters (backslashes, stray whitespace, etc.),
  // then reconstruct a clean PEM envelope.
  // This handles every possible mangling scenario from env vars.

  let input = raw

  // Try JSON.parse first in case the whole thing is a JSON string
  try {
    const parsed = JSON.parse(input)
    if (typeof parsed === "string") input = parsed
  } catch {
    // not JSON, continue
  }

  // Replace all common newline representations
  input = input.replace(/\\n/g, "\n")

  // Extract base64 content between PEM headers
  const pemMatch = input.match(/-----BEGIN[^-]*-----([^-]+)-----END[^-]*-----/)
  if (pemMatch) {
    // Strip everything that's not a valid base64 character
    const base64Content = pemMatch[1].replace(/[^A-Za-z0-9+/=]/g, "")

    // Reconstruct clean PEM with proper 64-char line wrapping
    const lines: string[] = []
    for (let i = 0; i < base64Content.length; i += 64) {
      lines.push(base64Content.substring(i, i + 64))
    }

    return `-----BEGIN PRIVATE KEY-----\n${lines.join("\n")}\n-----END PRIVATE KEY-----\n`
  }

  // If no PEM header found, try base64 decode
  try {
    const decoded = Buffer.from(input, "base64").toString("utf-8")
    if (decoded.includes("-----BEGIN")) return parsePrivateKey(decoded)
  } catch {
    // not base64
  }

  return input
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
