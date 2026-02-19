"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useSections() {
  return useSWR("/api/sections", fetcher, {
    revalidateOnFocus: false,
  })
}

export function useSection(id: string) {
  return useSWR(`/api/sections/${id}`, fetcher, {
    revalidateOnFocus: false,
  })
}

function getIdToken(): string {
  try {
    const stored = sessionStorage.getItem("admin-auth-session")
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.idToken || ""
    }
  } catch {
    // ignore
  }
  return ""
}

export async function updateSection(id: string, data: Record<string, unknown>) {
  const idToken = getIdToken()
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (idToken) headers["Authorization"] = `Bearer ${idToken}`

  const res = await fetch(`/api/sections/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update section")
  return res.json()
}
