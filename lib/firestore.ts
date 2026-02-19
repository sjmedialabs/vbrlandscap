/**
 * Unified Firestore access layer using REST API only.
 * No Firebase Admin SDK or Client SDK is used anywhere in this module.
 * All data access goes through fetch() to firestore.googleapis.com.
 */

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

// ---------- REST API helpers ----------

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

// ---------- REST-only mode ----------
// All Firestore operations use the REST API exclusively.
// No admin SDK is imported or used anywhere in this module.

// ---------- public API ----------

export async function getAllSections(): Promise<Record<string, Record<string, unknown>> | null> {
  // Try REST API first
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/sections?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        if (!data.documents || data.documents.length === 0) return null
        const sections: Record<string, Record<string, unknown>> = {}
        for (const doc of data.documents as FirestoreDocument[]) {
          const obj = docToObject(doc)
          sections[obj.id as string] = obj
        }
        return sections
      }
    } catch (e) {
      console.error("[firestore-rest] getAllSections failed:", e)
    }
  }

  return null
}

export async function getSection(id: string): Promise<Record<string, unknown> | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/sections/${id}?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        return docToObject(doc)
      }
    } catch (e) {
      console.error("[firestore-rest] getSection failed:", e)
    }
  }

  return null
}

export async function setSection(id: string, data: Record<string, unknown>, merge = true, authToken?: string) {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {}
      for (const [k, v] of Object.entries(data)) {
        if (k === "id") continue
        fields[k] = jsToFirestoreValue(v)
      }

      const params = new URLSearchParams()
      if (getApiKey()) params.set("key", getApiKey())
      if (merge) {
        for (const fk of Object.keys(fields)) {
          params.append("updateMask.fieldPaths", fk)
        }
      }
      const url = `${restBase}/sections/${id}?${params.toString()}`
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`
      const res = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
      const err = await res.text()
      console.error("[firestore-rest] setSection failed:", res.status, err)
    } catch (e) {
      console.error("[firestore-rest] setSection error:", e)
    }
  }

  throw new Error("No Firestore connection available - check NEXT_PUBLIC_FIREBASE_PROJECT_ID")
}

export async function setSectionFull(id: string, data: Record<string, unknown>, authToken?: string) {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {}
      for (const [k, v] of Object.entries(data)) {
        if (k === "id") continue
        fields[k] = jsToFirestoreValue(v)
      }

      const url = `${restBase}/sections/${id}?key=${getApiKey()}`
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`
      const res = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
      const err = await res.text()
      console.error("[firestore-rest] setSectionFull failed:", res.status, err)
    } catch (e) {
      console.error("[firestore-rest] setSectionFull error:", e)
    }
  }

  throw new Error("No Firestore connection available - check NEXT_PUBLIC_FIREBASE_PROJECT_ID")
}
