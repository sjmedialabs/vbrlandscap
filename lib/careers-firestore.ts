/**
 * Careers-specific Firestore functions
 * Handles all Careers page data operations
 * 
 * NOTE: This file should ONLY be imported by server-side code (API routes, Server Components)
 * For client components, import types from '@/lib/careers-types' instead
 */

// Re-export types from the client-safe types file
export type {
  PerkItem,
  CultureHighlight,
  WorkEnvironment,
  CTASection,
  CareersPageData,
} from "./careers-types"

export {
  defaultPerks,
  defaultCultureHighlights,
  defaultWorkEnvironment,
  defaultCTASection,
  defaultCareersPageData,
} from "./careers-types"

import type { CareersPageData } from "./careers-types"
import { defaultCareersPageData } from "./careers-types"

// ============ REST API helpers ============

function getProjectId() {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || ""
}

function getApiKey() {
  return process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ""
}

function getRestBase() {
  const pid = getProjectId()
  return pid ? `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents` : ""
}

interface FirestoreDocument {
  name?: string
  fields?: Record<string, FirestoreValue>
  createTime?: string
  updateTime?: string
}

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } }

function firestoreValueToJs(val: FirestoreValue): unknown {
  if ("stringValue" in val) return val.stringValue
  if ("integerValue" in val) return Number(val.integerValue)
  if ("doubleValue" in val) return val.doubleValue
  if ("booleanValue" in val) return val.booleanValue
  if ("nullValue" in val) return null
  if ("arrayValue" in val) {
    return (val.arrayValue.values || []).map(firestoreValueToJs)
  }
  if ("mapValue" in val) {
    const obj: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
      obj[k] = firestoreValueToJs(v)
    }
    return obj
  }
  return null
}

function docToObject(doc: FirestoreDocument): Record<string, unknown> {
  const name = doc.name || ""
  const id = name.split("/").pop() || ""
  const obj: Record<string, unknown> = { id }
  if (doc.fields) {
    for (const [k, v] of Object.entries(doc.fields)) {
      obj[k] = firestoreValueToJs(v)
    }
  }
  return obj
}

// Admin SDK fallback
async function getAdminFirestore(): Promise<FirebaseFirestore.Firestore | null> {
  try {
    const { getAdminDb } = await import("./firebase-admin")
    return getAdminDb()
  } catch {
    return null
  }
}

// ============ Careers Page Data ============

export async function getCareersPageData(): Promise<CareersPageData | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/settings/careersPage?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        return docToObject(doc) as unknown as CareersPageData
      }
    } catch (e) {
      console.error("[careers] getCareersPageData failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("settings").doc("careersPage").get()
    if (!d.exists) return null
    return d.data() as CareersPageData
  }

  return null
}

export async function setCareersPageData(data: Partial<CareersPageData>): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("settings").doc("careersPage").set(data, { merge: true })
    return
  }
  throw new Error("No Firestore connection available")
}

// ============ Seed Data ============

export async function seedCareersData(): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (!adminDb) throw new Error("No Firestore connection available")

  await adminDb.collection("settings").doc("careersPage").set(defaultCareersPageData)
}
