"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"
import useSWR from "swr"

interface OverviewStat {
  value: string
  label: string
}

interface OverviewData {
  heroTitle: string
  heroSubtitle: string
  heroImage?: string
  aboutBadge: string
  aboutHeading: string
  aboutDescription: string
  aboutImage1?: string
  aboutImage2?: string
  stats: OverviewStat[]
  howItWorksBadge: string
  howItWorksHeading: string
  howItWorksSubheading: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const defaultData: OverviewData = {
  heroTitle: "THE VBR ECO-MATRIX",
  heroSubtitle: "Our proprietary system transforms land into engineered living infrastructure.",
  aboutBadge: "About The ECO-MATRIX™",
  aboutHeading: "Engineering Living Infrastructure",
  aboutDescription: "The VBR ECO-MATRIX™ is our proprietary landscape intelligence and execution system.",
  stats: [
    { value: "10", label: "10-Dimension Architecture" },
    { value: "100%", label: "Single-Point Accountability" },
    { value: "360°", label: "Lifecycle Coverage" },
    { value: "∞", label: "Long-term Value" },
  ],
  howItWorksBadge: "How It Works",
  howItWorksHeading: "DIMENSION ICON LABELS",
  howItWorksSubheading: "The ECO-MATRIX™ operates through 10 integrated dimensions",
}

export default function EcoMatrixOverviewPage() {
  const { data, error, isLoading, mutate } = useSWR<OverviewData>("/api/eco-matrix/overview", fetcher)
  const [formData, setFormData] = useState<OverviewData>(defaultData)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({ ...defaultData, ...data })
    }
  }, [data])

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/eco-matrix/overview", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  const updateField = (field: keyof OverviewData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { value: "", label: "" }],
    }))
  }

  const updateStat = (index: number, field: keyof OverviewStat, value: string) => {
    const updated = [...formData.stats]
    updated[index] = { ...updated[index], [field]: value }
    setFormData((prev) => ({ ...prev, stats: updated }))
  }

  const removeStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }))
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
        <p className="text-sm text-red-600">Failed to load overview data.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a1a1a]">ECO-MATRIX Overview</h1>
          <p className="text-sm text-[#666]">Manage the overview page content</p>
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

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-[#1a1a1a]">Hero Section</h2>
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">Hero Title</label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => updateField("heroTitle", e.target.value)}
                className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">Hero Subtitle</label>
              <textarea
                rows={2}
                value={formData.heroSubtitle}
                onChange={(e) => updateField("heroSubtitle", e.target.value)}
                className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">Hero Image URL</label>
              <input
                type="text"
                value={formData.heroImage || ""}
                onChange={(e) => updateField("heroImage", e.target.value)}
                className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-[#1a1a1a]">About Section</h2>
          <div className="grid gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#333]">Badge Text</label>
                <input
                  type="text"
                  value={formData.aboutBadge}
                  onChange={(e) => updateField("aboutBadge", e.target.value)}
                  className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#333]">Heading</label>
                <input
                  type="text"
                  value={formData.aboutHeading}
                  onChange={(e) => updateField("aboutHeading", e.target.value)}
                  className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">Description</label>
              <textarea
                rows={4}
                value={formData.aboutDescription}
                onChange={(e) => updateField("aboutDescription", e.target.value)}
                className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
              />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#333]">About Image 1 URL</label>
                <input
                  type="text"
                  value={formData.aboutImage1 || ""}
                  onChange={(e) => updateField("aboutImage1", e.target.value)}
                  className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#333]">About Image 2 URL</label>
                <input
                  type="text"
                  value={formData.aboutImage2 || ""}
                  onChange={(e) => updateField("aboutImage2", e.target.value)}
                  className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1a1a1a]">Statistics</h2>
            <button
              onClick={addStat}
              className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-3 py-1.5 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
            >
              <Plus className="h-3.5 w-3.5" /> Add Stat
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {formData.stats.map((stat, index) => (
              <div key={index} className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-[#888]">Stat {index + 1}</span>
                  <button
                    onClick={() => removeStat(index)}
                    className="rounded p-0.5 text-[#999] hover:text-red-500"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Value (e.g., 10)"
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                  className="mb-2 w-full rounded border border-[#ddd] bg-white px-2 py-1.5 text-sm outline-none focus:border-[#2d6a2e]"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  className="w-full rounded border border-[#ddd] bg-white px-2 py-1.5 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-[#1a1a1a]">How It Works Section</h2>
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">Badge Text</label>
              <input
                type="text"
                value={formData.howItWorksBadge}
                onChange={(e) => updateField("howItWorksBadge", e.target.value)}
                className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">Heading</label>
              <input
                type="text"
                value={formData.howItWorksHeading}
                onChange={(e) => updateField("howItWorksHeading", e.target.value)}
                className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">Subheading</label>
              <input
                type="text"
                value={formData.howItWorksSubheading}
                onChange={(e) => updateField("howItWorksSubheading", e.target.value)}
                className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#2d6a2e]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
