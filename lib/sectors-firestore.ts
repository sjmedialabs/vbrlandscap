/**
 * Sectors-specific Firestore functions
 * Handles all Sectors page data operations
 * 
 * NOTE: This file should ONLY be imported by server-side code (API routes, Server Components)
 * For client components, import types from '@/lib/sectors-types' instead
 */

// Re-export types from the client-safe types file
export type {
  SectorListItem,
  ProcessStep,
  FAQItem,
  ExpertCard,
  SectorContent,
  SectorsPageData,
  ContactFormSettings,
  NewsletterSettings,
} from "./sectors-types"

export { defaultSectorContent, defaultSectorsList, defaultPageSettings } from "./sectors-types"

import type {
  SectorListItem,
  SectorContent,
  SectorsPageData,
  ContactFormSettings,
  NewsletterSettings,
} from "./sectors-types"

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

function jsToFirestoreValue(val: unknown): FirestoreValue {
  if (val === null || val === undefined) return { nullValue: null }
  if (typeof val === "string") return { stringValue: val }
  if (typeof val === "number") {
    if (Number.isInteger(val)) return { integerValue: String(val) }
    return { doubleValue: val }
  }
  if (typeof val === "boolean") return { booleanValue: val }
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(jsToFirestoreValue) } }
  }
  if (typeof val === "object") {
    const fields: Record<string, FirestoreValue> = {}
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      fields[k] = jsToFirestoreValue(v)
    }
    return { mapValue: { fields } }
  }
  return { stringValue: String(val) }
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

// ============ Sectors List ============

export async function getSectorsList(): Promise<SectorListItem[]> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/sectors/list?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        const data = docToObject(doc)
        const items = (data.items as SectorListItem[]) || []
        return items.sort((a, b) => a.order - b.order)
      }
    } catch (e) {
      console.error("[sectors] getSectorsList failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("sectors").doc("list").get()
    if (!d.exists) return []
    const data = d.data() as Record<string, unknown>
    const items = (data.items as SectorListItem[]) || []
    return items.sort((a, b) => a.order - b.order)
  }

  return []
}

export async function setSectorsList(items: SectorListItem[]): Promise<void> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {
        items: jsToFirestoreValue(items),
      }
      const url = `${restBase}/sectors/list?key=${getApiKey()}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
      console.error("[sectors] setSectorsList REST failed:", res.status)
    } catch (e) {
      console.error("[sectors] setSectorsList error:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("sectors").doc("list").set({ items }, { merge: true })
    return
  }

  throw new Error("No Firestore connection available")
}

// ============ Sector Content ============

export async function getSectorContent(sectorId: string): Promise<SectorContent | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/sectors/content_${sectorId}?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        const data = docToObject(doc)
        return data as unknown as SectorContent
      }
    } catch (e) {
      console.error("[sectors] getSectorContent failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("sectors").doc(`content_${sectorId}`).get()
    if (!d.exists) return null
    return { id: d.id, ...d.data() } as SectorContent
  }

  return null
}

export async function setSectorContent(sectorId: string, content: Partial<SectorContent>): Promise<void> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {}
      for (const [k, v] of Object.entries(content)) {
        if (k === "id") continue
        fields[k] = jsToFirestoreValue(v)
      }

      const params = new URLSearchParams()
      if (getApiKey()) params.set("key", getApiKey())
      for (const fk of Object.keys(fields)) {
        params.append("updateMask.fieldPaths", fk)
      }

      const url = `${restBase}/sectors/content_${sectorId}?${params.toString()}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
      console.error("[sectors] setSectorContent REST failed:", res.status)
    } catch (e) {
      console.error("[sectors] setSectorContent error:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("sectors").doc(`content_${sectorId}`).set(content, { merge: true })
    return
  }

  throw new Error("No Firestore connection available")
}

// ============ Page Settings ============

export async function getSectorsPageData(): Promise<SectorsPageData | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/sectors/pageSettings?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        return docToObject(doc) as unknown as SectorsPageData
      }
    } catch (e) {
      console.error("[sectors] getSectorsPageData failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("sectors").doc("pageSettings").get()
    if (!d.exists) return null
    return d.data() as SectorsPageData
  }

  return null
}

export async function setSectorsPageData(data: Partial<SectorsPageData>): Promise<void> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {}
      for (const [k, v] of Object.entries(data)) {
        fields[k] = jsToFirestoreValue(v)
      }

      const params = new URLSearchParams()
      if (getApiKey()) params.set("key", getApiKey())
      for (const fk of Object.keys(fields)) {
        params.append("updateMask.fieldPaths", fk)
      }

      const url = `${restBase}/sectors/pageSettings?${params.toString()}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
    } catch (e) {
      console.error("[sectors] setSectorsPageData error:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("sectors").doc("pageSettings").set(data, { merge: true })
    return
  }

  throw new Error("No Firestore connection available")
}

// ============ Form Settings ============

export async function getContactFormSettings(): Promise<ContactFormSettings | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/sectors/contactSettings?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        return docToObject(doc) as unknown as ContactFormSettings
      }
    } catch (e) {
      console.error("[sectors] getContactFormSettings failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("sectors").doc("contactSettings").get()
    if (!d.exists) return null
    return d.data() as ContactFormSettings
  }

  return null
}

export async function setContactFormSettings(data: Partial<ContactFormSettings>): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("sectors").doc("contactSettings").set(data, { merge: true })
    return
  }
  throw new Error("No Firestore connection available")
}

export async function getNewsletterSettings(): Promise<NewsletterSettings | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/sectors/newsletterSettings?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        return docToObject(doc) as unknown as NewsletterSettings
      }
    } catch (e) {
      console.error("[sectors] getNewsletterSettings failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("sectors").doc("newsletterSettings").get()
    if (!d.exists) return null
    return d.data() as NewsletterSettings
  }

  return null
}

export async function setNewsletterSettings(data: Partial<NewsletterSettings>): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("sectors").doc("newsletterSettings").set(data, { merge: true })
    return
  }
  throw new Error("No Firestore connection available")
}

// ============ Get All Sectors Data (for page rendering) ============

export async function getAllSectorsData() {
  const [sectorsList, pageData] = await Promise.all([
    getSectorsList(),
    getSectorsPageData(),
  ])

  return {
    sectorsList: sectorsList.filter(s => s.isActive),
    pageData,
  }
}

