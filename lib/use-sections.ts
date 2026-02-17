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

export async function updateSection(id: string, data: Record<string, unknown>) {
  const res = await fetch(`/api/sections/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update section")
  return res.json()
}
