/**
 * Projects-specific Firestore functions
 * Handles all Projects page data operations
 * 
 * NOTE: This file should ONLY be imported by server-side code (API routes, Server Components)
 * For client components, import types from '@/lib/projects-types' instead
 */

// Re-export types from the client-safe types file
export type {
  Project,
  ProjectCategory,
  ProjectFeature,
  ProjectsPageData,
} from "./projects-types"

export {
  defaultProject,
  defaultProjectsPageData,
  defaultCategories,
  sampleProjects,
} from "./projects-types"

import type {
  Project,
  ProjectCategory,
  ProjectsPageData,
} from "./projects-types"

import { sampleProjects } from "./projects-types"

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

// ============ Projects CRUD ============

export async function getAllProjects(): Promise<Project[]> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/projects?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        if (!data.documents) return []
        const projects = (data.documents as FirestoreDocument[]).map((doc) => docToObject(doc) as unknown as Project)
        return projects
          .filter((p) => p.status === "published")
          .sort((a, b) => a.order - b.order)
      }
    } catch (e) {
      console.error("[projects] getAllProjects failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const snapshot = await adminDb.collection("projects").where("status", "==", "published").orderBy("order").get()
    if (snapshot.empty) return []
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Project))
  }

  return []
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/projects?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        if (!data.documents) return []
        const projects = (data.documents as FirestoreDocument[]).map((doc) => docToObject(doc) as unknown as Project)
        return projects.sort((a, b) => a.order - b.order)
      }
    } catch (e) {
      console.error("[projects] getAllProjectsAdmin failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const snapshot = await adminDb.collection("projects").orderBy("order").get()
    if (snapshot.empty) return []
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Project))
  }

  return []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      // Query by slug using structured query
      const url = `${restBase}:runQuery?key=${getApiKey()}`
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "projects" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "slug" },
                op: "EQUAL",
                value: { stringValue: slug },
              },
            },
            limit: 1,
          },
        }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data[0]?.document) {
          return docToObject(data[0].document) as unknown as Project
        }
      }
    } catch (e) {
      console.error("[projects] getProjectBySlug REST failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const snapshot = await adminDb.collection("projects").where("slug", "==", slug).limit(1).get()
    if (snapshot.empty) return null
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Project
  }

  return null
}

export async function getProjectById(id: string): Promise<Project | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/projects/${id}?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        return docToObject(doc) as unknown as Project
      }
    } catch (e) {
      console.error("[projects] getProjectById failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("projects").doc(id).get()
    if (!d.exists) return null
    return { id: d.id, ...d.data() } as Project
  }

  return null
}

export async function createProject(project: Omit<Project, "id">): Promise<string> {
  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const docRef = await adminDb.collection("projects").add({
      ...project,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    return docRef.id
  }
  throw new Error("No Firestore connection available")
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("projects").doc(id).update({
      ...project,
      updatedAt: new Date().toISOString(),
    })
    return
  }
  throw new Error("No Firestore connection available")
}

export async function deleteProject(id: string): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("projects").doc(id).delete()
    return
  }
  throw new Error("No Firestore connection available")
}

// ============ Page Settings ============

export async function getProjectsPageData(): Promise<ProjectsPageData | null> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/settings/projectsPage?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        return docToObject(doc) as unknown as ProjectsPageData
      }
    } catch (e) {
      console.error("[projects] getProjectsPageData failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("settings").doc("projectsPage").get()
    if (!d.exists) return null
    return d.data() as ProjectsPageData
  }

  return null
}

export async function setProjectsPageData(data: Partial<ProjectsPageData>): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("settings").doc("projectsPage").set(data, { merge: true })
    return
  }
  throw new Error("No Firestore connection available")
}

// ============ Categories ============

export async function getCategories(): Promise<ProjectCategory[]> {
  const restBase = getRestBase()
  if (restBase) {
    try {
      const url = `${restBase}/settings/projectCategories?key=${getApiKey()}`
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) {
        const doc = (await res.json()) as FirestoreDocument
        const data = docToObject(doc)
        return (data.items as ProjectCategory[]) || []
      }
    } catch (e) {
      console.error("[projects] getCategories failed:", e)
    }
  }

  const adminDb = await getAdminFirestore()
  if (adminDb) {
    const d = await adminDb.collection("settings").doc("projectCategories").get()
    if (!d.exists) return []
    const data = d.data()
    return (data?.items as ProjectCategory[]) || []
  }

  return []
}

export async function setCategories(items: ProjectCategory[]): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (adminDb) {
    await adminDb.collection("settings").doc("projectCategories").set({ items }, { merge: true })
    return
  }
  throw new Error("No Firestore connection available")
}

// ============ Seed Data ============

export async function seedProjects(): Promise<void> {
  const adminDb = await getAdminFirestore()
  if (!adminDb) throw new Error("No Firestore connection available")

  // Create sample projects
  const batch = adminDb.batch()

  for (const project of sampleProjects) {
    const docRef = adminDb.collection("projects").doc()
    batch.set(docRef, {
      ...project,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  await batch.commit()
}

// ============ Related Projects ============

export async function getRelatedProjects(currentProjectId: string, limit = 2): Promise<Project[]> {
  const allProjects = await getAllProjects()
  return allProjects
    .filter((p) => p.id !== currentProjectId)
    .slice(0, limit)
}
