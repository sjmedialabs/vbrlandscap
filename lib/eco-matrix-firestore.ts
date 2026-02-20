/**
 * ECO-MATRIX specific Firestore functions
 * Handles all ECO-MATRIX data operations
 */

// Types
export interface EcoMatrixMenuItem {
  id: string
  label: string
  href: string
  description?: string
  order: number
}

export interface EcoMatrixCapability {
  id: string
  title: string
  description: string
  icon?: string
  order: number
}

export interface EcoMatrixMenu {
  leftItems: EcoMatrixMenuItem[]
  capabilities: EcoMatrixCapability[]
}

export interface DimensionFeature {
  icon?: string
  title: string
  description: string
}

export interface EcoMatrixDimension {
  id: string
  tabTitle: string
  label: string
  title: string
  subtitle: string
  description: string
  image?: string
  personImage?: string
  features: DimensionFeature[]
  outcomes: string[]
  order: number
}

export interface NatureAccordionItem {
  id: string
  letter: string
  title: string
  subtitle: string
  description: string
  features: DimensionFeature[]
  outcome: string
  order: number
}

export interface EcoMatrixOverviewStat {
  value: string
  label: string
}

export interface EcoMatrixOverview {
  heroTitle: string
  heroSubtitle: string
  heroImage?: string
  aboutBadge: string
  aboutHeading: string
  aboutDescription: string
  aboutImage1?: string
  aboutImage2?: string
  stats: EcoMatrixOverviewStat[]
  howItWorksBadge: string
  howItWorksHeading: string
  howItWorksSubheading: string
  dimensionWheelImage?: string
}

// REST API helpers
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

// ============ ECO-MATRIX Menu ============

export async function getEcoMatrixMenu(): Promise<EcoMatrixMenu | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/ecoMatrix/menu?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        const data = docToObject(doc)
        return {
          leftItems: (data.leftItems as EcoMatrixMenuItem[]) || [],
          capabilities: (data.capabilities as EcoMatrixCapability[]) || [],
        }
      }
    } catch (e) {
      console.error("[eco-matrix] getEcoMatrixMenu failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("ecoMatrix").doc("menu").get()
    if (!d.exists) return null
    const data = d.data() as Record<string, unknown>
    return {
      leftItems: (data.leftItems as EcoMatrixMenuItem[]) || [],
      capabilities: (data.capabilities as EcoMatrixCapability[]) || [],
    }
  }

  return null
}

export async function setEcoMatrixMenu(menu: EcoMatrixMenu): Promise<void> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {
        leftItems: jsToFirestoreValue(menu.leftItems),
        capabilities: jsToFirestoreValue(menu.capabilities),
      }
      const url = `${restBase}/ecoMatrix/menu?key=${getApiKey()}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
    } catch (e) {
      console.error("[eco-matrix] setEcoMatrixMenu error:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("ecoMatrix").doc("menu").set(menu)
    return
  }

  throw new Error("No Firestore connection available")
}

// ============ ECO-MATRIX Dimensions ============

export async function getEcoMatrixDimensions(): Promise<EcoMatrixDimension[]> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/ecoMatrix/dimensions?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        const data = docToObject(doc)
        const tabs = (data.tabs as EcoMatrixDimension[]) || []
        return tabs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      }
    } catch (e) {
      console.error("[eco-matrix] getEcoMatrixDimensions failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("ecoMatrix").doc("dimensions").get()
    if (!d.exists) return []
    const data = d.data() as Record<string, unknown>
    const tabs = (data.tabs as EcoMatrixDimension[]) || []
    return tabs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }

  return []
}

export async function setEcoMatrixDimensions(tabs: EcoMatrixDimension[]): Promise<void> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {
        tabs: jsToFirestoreValue(tabs),
      }
      const url = `${restBase}/ecoMatrix/dimensions?key=${getApiKey()}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
    } catch (e) {
      console.error("[eco-matrix] setEcoMatrixDimensions error:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("ecoMatrix").doc("dimensions").set({ tabs })
    return
  }

  throw new Error("No Firestore connection available")
}

// ============ N.A.T.U.R.E Framework ============

export async function getEcoMatrixNature(): Promise<NatureAccordionItem[]> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/ecoMatrix/natureFramework?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        const data = docToObject(doc)
        const accordions = (data.accordions as NatureAccordionItem[]) || []
        return accordions.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      }
    } catch (e) {
      console.error("[eco-matrix] getEcoMatrixNature failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("ecoMatrix").doc("natureFramework").get()
    if (!d.exists) return []
    const data = d.data() as Record<string, unknown>
    const accordions = (data.accordions as NatureAccordionItem[]) || []
    return accordions.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }

  return []
}

export async function setEcoMatrixNature(accordions: NatureAccordionItem[]): Promise<void> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {
        accordions: jsToFirestoreValue(accordions),
      }
      const url = `${restBase}/ecoMatrix/natureFramework?key=${getApiKey()}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
    } catch (e) {
      console.error("[eco-matrix] setEcoMatrixNature error:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("ecoMatrix").doc("natureFramework").set({ accordions })
    return
  }

  throw new Error("No Firestore connection available")
}

// ============ ECO-MATRIX Overview ============

export async function getEcoMatrixOverview(): Promise<EcoMatrixOverview | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/ecoMatrix/overview?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        const data = docToObject(doc)
        return data as unknown as EcoMatrixOverview
      }
    } catch (e) {
      console.error("[eco-matrix] getEcoMatrixOverview failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("ecoMatrix").doc("overview").get()
    if (!d.exists) return null
    return d.data() as EcoMatrixOverview
  }

  return null
}

export async function setEcoMatrixOverview(overview: EcoMatrixOverview): Promise<void> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const fields: Record<string, FirestoreValue> = {}
      for (const [k, v] of Object.entries(overview)) {
        fields[k] = jsToFirestoreValue(v)
      }
      const url = `${restBase}/ecoMatrix/overview?key=${getApiKey()}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      })
      if (res.ok) return
    } catch (e) {
      console.error("[eco-matrix] setEcoMatrixOverview error:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("ecoMatrix").doc("overview").set(overview)
    return
  }

  throw new Error("No Firestore connection available")
}
