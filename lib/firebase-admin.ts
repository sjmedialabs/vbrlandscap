import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

function getAdminApp() {
  if (getApps().length) return getApp()

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  )

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
