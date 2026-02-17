import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

function getAdminApp() {
  if (getApps().length) return getApp()

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY

  console.log("[v0] Firebase Admin env check:", JSON.stringify({
    projectId: projectId ? projectId.substring(0, 8) + "..." : "MISSING",
    clientEmail: clientEmail ? clientEmail.substring(0, 10) + "..." : "MISSING",
    privateKey: rawKey ? `present (${rawKey.length} chars)` : "MISSING",
  }))

  if (!projectId || !clientEmail || !rawKey) {
    throw new Error(
      `Missing Firebase Admin env vars: ${!projectId ? "NEXT_PUBLIC_FIREBASE_PROJECT_ID " : ""}${!clientEmail ? "FIREBASE_ADMIN_CLIENT_EMAIL " : ""}${!rawKey ? "FIREBASE_ADMIN_PRIVATE_KEY" : ""}`
    )
  }

  const privateKey = rawKey.replace(/\\n/g, "\n")

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  })
}

const adminApp = getAdminApp()

export const adminDb = getFirestore(adminApp)
export const adminAuth = getAuth(adminApp)
export default adminApp
