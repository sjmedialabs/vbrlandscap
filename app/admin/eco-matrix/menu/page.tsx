"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, GripVertical } from "lucide-react"
import useSWR from "swr"

interface MenuItem {
  id: string
  label: string
  href: string
  description?: string
  order: number
}

interface Capability {
  id: string
  title: string
  description: string
  icon?: string
  order: number
}

interface MenuData {
  leftItems: MenuItem[]
  capabilities: Capability[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function EcoMatrixMenuPage() {
  const { data, error, isLoading, mutate } = useSWR<MenuData>("/api/eco-matrix/menu", fetcher)
  const [leftItems, setLeftItems] = useState<MenuItem[]>([])
  const [capabilities, setCapabilities] = useState<Capability[]>([])
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (data) {
      setLeftItems(data.leftItems || [])
      setCapabilities(data.capabilities || [])
    }
  }, [data])

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/eco-matrix/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leftItems, capabilities }),
      })
      if (!res.ok) throw new Error("Failed to save")
      await mutate()
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 2000)
    } catch {
      setSaveStatus("error")
    } finally {
      setSaving(false)
    }
  }

  const addMenuItem = () => {
    setLeftItems([
      ...leftItems,
      {
        id: `menu-${Date.now()}`,
        label: "",
        href: "",
        description: "",
        order: leftItems.length,
      },
    ])
  }

  const removeMenuItem = (index: number) => {
    setLeftItems(leftItems.filter((_, i) => i !== index))
  }

  const updateMenuItem = (index: number, field: keyof MenuItem, value: string | number) => {
    const updated = [...leftItems]
    updated[index] = { ...updated[index], [field]: value }
    setLeftItems(updated)
  }

  const addCapability = () => {
    setCapabilities([
      ...capabilities,
      {
        id: `cap-${Date.now()}`,
        title: "",
        description: "",
        icon: "",
        order: capabilities.length,
      },
    ])
  }

  const removeCapability = (index: number) => {
    setCapabilities(capabilities.filter((_, i) => i !== index))
  }

  const updateCapability = (index: number, field: keyof Capability, value: string | number) => {
    const updated = [...capabilities]
    updated[index] = { ...updated[index], [field]: value }
    setCapabilities(updated)
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2">
        <p className="text-sm text-red-600">Failed to load menu data.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a1a1a]">ECO-MATRIX Mega Menu</h1>
          <p className="text-sm text-[#666]">Manage the mega dropdown menu items</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
            saveStatus === "success"
              ? "bg-green-600"
              : saveStatus === "error"
              ? "bg-red-500"
              : "bg-[#2d6a2e] hover:bg-[#245424]"
          } ${saving ? "opacity-60" : ""}`}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saveStatus === "success" ? "Saved!" : saveStatus === "error" ? "Error" : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Menu Items */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1a1a1a]">Menu Links</h2>
            <button
              onClick={addMenuItem}
              className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-3 py-1.5 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
            >
              <Plus className="h-3.5 w-3.5" /> Add Item
            </button>
          </div>
          <div className="space-y-4">
            {leftItems.map((item, index) => (
              <div key={item.id} className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-[#999]" />
                    <span className="text-xs font-semibold uppercase text-[#888]">Item {index + 1}</span>
                  </div>
                  <button
                    onClick={() => removeMenuItem(index)}
                    className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Label"
                    value={item.label}
                    onChange={(e) => updateMenuItem(index, "label", e.target.value)}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                  <input
                    type="text"
                    placeholder="URL (e.g., /eco-matrix/overview)"
                    value={item.href}
                    onChange={(e) => updateMenuItem(index, "href", e.target.value)}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={item.description || ""}
                    onChange={(e) => updateMenuItem(index, "description", e.target.value)}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                </div>
              </div>
            ))}
            {leftItems.length === 0 && (
              <p className="py-8 text-center text-sm text-[#999]">No menu items yet. Click "Add Item" to create one.</p>
            )}
          </div>
        </div>

        {/* Capabilities */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1a1a1a]">Capabilities</h2>
            <button
              onClick={addCapability}
              className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-3 py-1.5 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
            >
              <Plus className="h-3.5 w-3.5" /> Add Capability
            </button>
          </div>
          <div className="space-y-4">
            {capabilities.map((cap, index) => (
              <div key={cap.id} className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-[#999]" />
                    <span className="text-xs font-semibold uppercase text-[#888]">Capability {index + 1}</span>
                  </div>
                  <button
                    onClick={() => removeCapability(index)}
                    className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Title (e.g., ARCHIQ™)"
                    value={cap.title}
                    onChange={(e) => updateCapability(index, "title", e.target.value)}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={cap.description}
                    onChange={(e) => updateCapability(index, "description", e.target.value)}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                  <input
                    type="text"
                    placeholder="Icon URL (optional)"
                    value={cap.icon || ""}
                    onChange={(e) => updateCapability(index, "icon", e.target.value)}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                </div>
              </div>
            ))}
            {capabilities.length === 0 && (
              <p className="py-8 text-center text-sm text-[#999]">No capabilities yet. Click "Add Capability" to create one.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
