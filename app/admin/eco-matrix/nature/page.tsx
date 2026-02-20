"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import useSWR from "swr"

interface NatureFeature {
  icon?: string
  title: string
  description?: string
}

interface NatureItem {
  id: string
  letter: string
  title: string
  subtitle: string
  description: string
  features: NatureFeature[]
  outcome: string
  order: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function EcoMatrixNaturePage() {
  const { data, error, isLoading, mutate } = useSWR<NatureItem[]>("/api/eco-matrix/nature", fetcher)
  const [items, setItems] = useState<NatureItem[]>([])
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setItems(data)
    }
  }, [data])

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/eco-matrix/nature", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
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

  const addItem = () => {
    const letters = ["N", "A", "T", "U", "R", "E"]
    const nextLetter = letters[items.length % 6]
    const newItem: NatureItem = {
      id: `nature-${Date.now()}`,
      letter: nextLetter,
      title: "",
      subtitle: "",
      description: "",
      features: [],
      outcome: "",
      order: items.length,
    }
    setItems([...items, newItem])
    setExpandedIndex(items.length)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
    if (expandedIndex === index) setExpandedIndex(null)
  }

  const updateItem = (index: number, field: keyof NatureItem, value: unknown) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  const addFeature = (itemIndex: number) => {
    const updated = [...items]
    updated[itemIndex].features = [...updated[itemIndex].features, { title: "", icon: "" }]
    setItems(updated)
  }

  const updateFeature = (itemIndex: number, featureIndex: number, field: keyof NatureFeature, value: string) => {
    const updated = [...items]
    updated[itemIndex].features[featureIndex] = { ...updated[itemIndex].features[featureIndex], [field]: value }
    setItems(updated)
  }

  const removeFeature = (itemIndex: number, featureIndex: number) => {
    const updated = [...items]
    updated[itemIndex].features = updated[itemIndex].features.filter((_, i) => i !== featureIndex)
    setItems(updated)
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
        <p className="text-sm text-red-600">Failed to load N.A.T.U.R.E data.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a1a1a]">N.A.T.U.R.E Framework</h1>
          <p className="text-sm text-[#666]">Manage the six-pillar accordion content</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 rounded-lg border border-[#2d6a2e] px-4 py-2.5 text-sm font-semibold text-[#2d6a2e] hover:bg-[#2d6a2e]/5"
          >
            <Plus className="h-4 w-4" /> Add Pillar
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
        {items.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-[#e5e5e5] bg-white overflow-hidden">
            {/* Accordion Header */}
            <div
              className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-[#fafafa]"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a2e]/10 text-lg font-bold text-[#2d6a2e]">
                  {item.letter}
                </span>
                <span className="font-semibold text-[#1a1a1a]">{item.title || `Pillar ${item.letter}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeItem(index)
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
                <div className="grid gap-5">
                  <div className="grid gap-5 lg:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#333]">Letter</label>
                      <input
                        type="text"
                        maxLength={1}
                        value={item.letter}
                        onChange={(e) => updateItem(index, "letter", e.target.value.toUpperCase())}
                        className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#333]">Title</label>
                      <input
                        type="text"
                        placeholder="e.g., Natural Intelligence"
                        value={item.title}
                        onChange={(e) => updateItem(index, "title", e.target.value)}
                        className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#333]">Subtitle</label>
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => updateItem(index, "subtitle", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#333]">Description</label>
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#333]">Features</label>
                    <div className="space-y-2">
                      {item.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Feature title"
                            value={feature.title}
                            onChange={(e) => updateFeature(index, fIndex, "title", e.target.value)}
                            className="flex-1 rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                          />
                          <button
                            onClick={() => removeFeature(index, fIndex)}
                            className="rounded-lg p-2 text-[#999] hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addFeature(index)}
                        className="flex items-center gap-1.5 rounded-lg border border-dashed border-[#ccc] px-3 py-2 text-xs text-[#666] hover:border-[#2d6a2e] hover:text-[#2d6a2e]"
                      >
                        <Plus className="h-3 w-3" /> Add Feature
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#333]">Outcome</label>
                    <textarea
                      rows={2}
                      value={item.outcome}
                      onChange={(e) => updateItem(index, "outcome", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#ccc] py-12 text-center">
            <p className="text-sm text-[#999]">No pillars yet. Click "Add Pillar" to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}
