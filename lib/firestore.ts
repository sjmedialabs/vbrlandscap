/**
 * Unified Firestore access layer.
 * Tries Firebase Admin SDK first (bypasses security rules - ideal for server).
 * Falls back to client SDK (subject to Firestore security rules).
 */

import { db } from "./firebase"
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore"

// ---------- helpers to get admin SDK when available ----------
let _adminDb: FirebaseFirestore.Firestore | null = null
let _adminChecked = false

async function getAdminDb(): Promise<FirebaseFirestore.Firestore | null> {
  if (_adminChecked) return _adminDb
  _adminChecked = true
  try {
    const mod = await import("./firebase-admin")
    _adminDb = mod.adminDb
    return _adminDb
  } catch {
    return null
  }
}

// ---------- public API ----------

export async function getAllSections(): Promise<Record<string, Record<string, unknown>> | null> {
  // Try admin SDK first
  const adminDb = await getAdminDb()
  if (adminDb) {
    const snapshot = await adminDb.collection("sections").get()
    if (snapshot.empty) return null
    const sections: Record<string, Record<string, unknown>> = {}
    snapshot.forEach((d) => {
      sections[d.id] = { id: d.id, ...d.data() }
    })
    return sections
  }

  // Fallback: client SDK
  const snapshot = await getDocs(collection(db, "sections"))
  if (snapshot.empty) return null
  const sections: Record<string, Record<string, unknown>> = {}
  snapshot.forEach((d) => {
    sections[d.id] = { id: d.id, ...d.data() } as Record<string, unknown>
  })
  return sections
}

export async function getSection(id: string): Promise<Record<string, unknown> | null> {
  const adminDb = await getAdminDb()
  if (adminDb) {
    const d = await adminDb.collection("sections").doc(id).get()
    if (!d.exists) return null
    return { id: d.id, ...d.data() } as Record<string, unknown>
  }

  const d = await getDoc(doc(db, "sections", id))
  if (!d.exists()) return null
  return { id: d.id, ...d.data() }
}

export async function setSection(id: string, data: Record<string, unknown>, merge = true) {
  const adminDb = await getAdminDb()
  if (adminDb) {
    if (merge) {
      await adminDb.collection("sections").doc(id).set(data, { merge: true })
    } else {
      await adminDb.collection("sections").doc(id).set(data)
    }
    return
  }

  await setDoc(doc(db, "sections", id), data, { merge })
}

export async function setSectionFull(id: string, data: Record<string, unknown>) {
  const adminDb = await getAdminDb()
  if (adminDb) {
    await adminDb.collection("sections").doc(id).set(data)
    return
  }

  await setDoc(doc(db, "sections", id), data)
}
