import admin from "firebase-admin"

function getAdminApp() {
  if (admin.apps.length) return admin.apps[0]!

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const rawKey = process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_ADMIN_PRIVATE_KEY

  if (!projectId || !clientEmail || !rawKey) {
    console.warn("[firebase-admin] Missing env vars - admin SDK not initialized. Using client SDK instead.")
    return null
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: rawKey.replace(/\\n/g, "\n"),
    }),
  })
}

const adminApp = getAdminApp()

export const adminDb = adminApp ? admin.firestore() : null
export const adminAuth = adminApp ? admin.auth() : null
