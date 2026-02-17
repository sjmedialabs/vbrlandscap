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
}

const adminApp = getAdminApp()

export const adminDb = getFirestore(adminApp)
export const adminAuth = getAuth(adminApp)
export default adminApp
