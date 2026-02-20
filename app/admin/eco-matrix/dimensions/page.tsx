"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react"
import useSWR from "swr"

interface DimensionFeature {
  icon?: string
  title: string
  description?: string
}

interface Dimension {
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

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function EcoMatrixDimensionsPage() {
  const { data, error, isLoading, mutate } = useSWR<Dimension[]>("/api/eco-matrix/dimensions", fetcher)
  const [dimensions, setDimensions] = useState<Dimension[]>([])
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setDimensions(data)
    }
  }, [data])

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/eco-matrix/dimensions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dimensions),
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

  const addDimension = () => {
    const newDim: Dimension = {
      id: `dim-${Date.now()}`,
      tabTitle: "",
      label: `DIMENSION ${String(dimensions.length + 1).padStart(2, "0")}`,
      title: "",
      subtitle: "",
      description: "",
      image: "",
      personImage: "",
      features: [],
      outcomes: [],
      order: dimensions.length,
    }
    setDimensions([...dimensions, newDim])
    setExpandedIndex(dimensions.length)
  }

  const removeDimension = (index: number) => {
    setDimensions(dimensions.filter((_, i) => i !== index))
    if (expandedIndex === index) setExpandedIndex(null)
  }

  const updateDimension = (index: number, field: keyof Dimension, value: unknown) => {
    const updated = [...dimensions]
    updated[index] = { ...updated[index], [field]: value }
    setDimensions(updated)
  }

  const addOutcome = (dimIndex: number) => {
    const updated = [...dimensions]
    updated[dimIndex].outcomes = [...updated[dimIndex].outcomes, ""]
    setDimensions(updated)
  }

  const updateOutcome = (dimIndex: number, outcomeIndex: number, value: string) => {
    const updated = [...dimensions]
    updated[dimIndex].outcomes[outcomeIndex] = value
    setDimensions(updated)
  }

  const removeOutcome = (dimIndex: number, outcomeIndex: number) => {
    const updated = [...dimensions]
    updated[dimIndex].outcomes = updated[dimIndex].outcomes.filter((_, i) => i !== outcomeIndex)
    setDimensions(updated)
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
        <p className="text-sm text-red-600">Failed to load dimensions data.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a1a1a]">10-Dimension Architecture</h1>
          <p className="text-sm text-[#666]">Manage the dimension tabs content</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addDimension}
            className="flex items-center gap-1.5 rounded-lg border border-[#2d6a2e] px-4 py-2.5 text-sm font-semibold text-[#2d6a2e] hover:bg-[#2d6a2e]/5"
          >
            <Plus className="h-4 w-4" /> Add Dimension
          </button>
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
      </div>

      <div className="space-y-4">
        {dimensions.map((dim, index) => (
          <div key={dim.id} className="rounded-xl border border-[#e5e5e5] bg-white overflow-hidden">
            {/* Accordion Header */}
            <div
              className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-[#fafafa]"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-[#999]" />
                <span className="font-semibold text-[#1a1a1a]">{dim.tabTitle || `Dimension ${index + 1}`}</span>
                <span className="rounded bg-[#f0f4ec] px-2 py-0.5 text-xs text-[#2d6a2e]">{dim.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeDimension(index)
                  }}
                  className="rounded p-1.5 text-[#999] hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#666]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#666]" />
                )}
              </div>
            </div>

            {/* Accordion Content */}
            {expandedIndex === index && (
              <div className="border-t border-[#e5e5e5] px-6 py-6">
                <div className="grid gap-5 lg:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#333]">Tab Title</label>
                    <input
                      type="text"
                      placeholder="e.g., ARCHIQ™"
                      value={dim.tabTitle}
                      onChange={(e) => updateDimension(index, "tabTitle", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#333]">Label</label>
                    <input
                      type="text"
                      placeholder="e.g., DIMENSION 01"
                      value={dim.label}
                      onChange={(e) => updateDimension(index, "label", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-[#333]">Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Geo-Diagnostics & Spatial Intelligence"
                      value={dim.title}
                      onChange={(e) => updateDimension(index, "title", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-[#333]">Subtitle</label>
                    <input
                      type="text"
                      value={dim.subtitle}
                      onChange={(e) => updateDimension(index, "subtitle", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-[#333]">Description</label>
                    <textarea
                      rows={3}
                      value={dim.description}
                      onChange={(e) => updateDimension(index, "description", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#333]">Image URL</label>
                    <input
                      type="text"
                      value={dim.image || ""}
                      onChange={(e) => updateDimension(index, "image", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#333]">Person Image URL</label>
                    <input
                      type="text"
                      value={dim.personImage || ""}
                      onChange={(e) => updateDimension(index, "personImage", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>

                  {/* Outcomes */}
                  <div className="lg:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-[#333]">Outcomes</label>
                    <div className="space-y-2">
                      {dim.outcomes.map((outcome, oIndex) => (
                        <div key={oIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={outcome}
                            onChange={(e) => updateOutcome(index, oIndex, e.target.value)}
                            className="flex-1 rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                          />
                          <button
                            onClick={() => removeOutcome(index, oIndex)}
                            className="rounded-lg p-2 text-[#999] hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOutcome(index)}
                        className="flex items-center gap-1.5 rounded-lg border border-dashed border-[#ccc] px-3 py-2 text-xs text-[#666] hover:border-[#2d6a2e] hover:text-[#2d6a2e]"
                      >
                        <Plus className="h-3 w-3" /> Add Outcome
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {dimensions.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#ccc] py-12 text-center">
            <p className="text-sm text-[#999]">No dimensions yet. Click "Add Dimension" to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}
