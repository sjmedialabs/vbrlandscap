"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"
import useSWR from "swr"
import {
  type SectorListItem,
  type SectorsPageData,
  type SectorContent,
  type ProcessStep,
  type FAQItem,
  defaultSectorContent,
} from "@/lib/sectors-types"

interface SectorsData {
  sectorsList: SectorListItem[]
  pageData: SectorsPageData
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AdminSectorsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data, error, isLoading, mutate } = useSWR<SectorsData>("/api/sectors", fetcher)

  // Get tab from URL query params
  const tabFromUrl = searchParams.get("tab") as "list" | "content" | "settings" | null
  const [activeTab, setActiveTab] = useState<"list" | "content" | "settings">(tabFromUrl || "list")

  // Sync tab with URL changes
  useEffect(() => {
    const tab = searchParams.get("tab") as "list" | "content" | "settings" | null
    if (tab && ["list", "content", "settings"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])
  const [sectorsList, setSectorsList] = useState<SectorListItem[]>([])
  const [pageData, setPageData] = useState<SectorsPageData | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [sectorContent, setSectorContent] = useState<SectorContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [contentLoading, setContentLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login")
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (data) {
      setSectorsList(data.sectorsList || [])
      setPageData(data.pageData || null)
      if (data.sectorsList?.length > 0 && !selectedSector) {
        setSelectedSector(data.sectorsList[0].id)
      }
    }
  }, [data])

  useEffect(() => {
    if (selectedSector) {
      loadSectorContent(selectedSector)
    }
  }, [selectedSector])

  const loadSectorContent = async (sectorId: string) => {
    setContentLoading(true)
    try {
      const res = await fetch(`/api/sectors/${sectorId}`)
      if (res.ok) {
        const content = await res.json()
        setSectorContent(content)
      } else {
        setSectorContent({
          id: `content_${sectorId}`,
          sectorId,
          ...defaultSectorContent,
        })
      }
    } catch {
      setSectorContent({
        id: `content_${sectorId}`,
        sectorId,
        ...defaultSectorContent,
      })
    } finally {
      setContentLoading(false)
    }
  }

  const handleSaveList = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/sectors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectorsList }),
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

  const handleSavePageSettings = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/sectors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageData }),
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

  const handleSaveContent = async () => {
    if (!selectedSector || !sectorContent) return
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch(`/api/sectors/${selectedSector}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectorContent),
      })
      if (!res.ok) throw new Error("Failed to save")
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 2000)
    } catch {
      setSaveStatus("error")
    } finally {
      setSaving(false)
    }
  }

  const handleSeedData = async () => {
    if (!confirm("This will seed default sectors data. Continue?")) return
    setSaving(true)
    try {
      const res = await fetch("/api/sectors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seed" }),
      })
      if (res.ok) {
        await mutate()
        alert("Sectors data seeded successfully!")
      }
    } finally {
      setSaving(false)
    }
  }

  const addSector = () => {
    const newSector: SectorListItem = {
      id: `sector-${Date.now()}`,
      name: "",
      slug: "",
      order: sectorsList.length,
      isActive: true,
    }
    setSectorsList([...sectorsList, newSector])
  }

  const removeSector = (index: number) => {
    setSectorsList(sectorsList.filter((_, i) => i !== index))
  }

  const updateSector = (index: number, field: keyof SectorListItem, value: string | number | boolean) => {
    const updated = [...sectorsList]
    updated[index] = { ...updated[index], [field]: value }
    // Auto-generate slug from name if slug is empty
    if (field === "name" && !updated[index].slug) {
      updated[index].slug = (value as string).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }
    setSectorsList(updated)
  }

  const addProcessStep = () => {
    if (!sectorContent) return
    const newStep: ProcessStep = {
      id: `step-${Date.now()}`,
      number: String(sectorContent.processSteps.length + 1).padStart(2, "0"),
      title: "",
      description: "",
      order: sectorContent.processSteps.length,
    }
    setSectorContent({
      ...sectorContent,
      processSteps: [...sectorContent.processSteps, newStep],
    })
  }

  const removeProcessStep = (index: number) => {
    if (!sectorContent) return
    setSectorContent({
      ...sectorContent,
      processSteps: sectorContent.processSteps.filter((_, i) => i !== index),
    })
  }

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string | number) => {
    if (!sectorContent) return
    const updated = [...sectorContent.processSteps]
    updated[index] = { ...updated[index], [field]: value }
    setSectorContent({ ...sectorContent, processSteps: updated })
  }

  const addFAQ = () => {
    if (!sectorContent) return
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      question: "",
      answer: "",
      order: sectorContent.faqs.length,
    }
    setSectorContent({
      ...sectorContent,
      faqs: [...sectorContent.faqs, newFaq],
    })
  }

  const removeFAQ = (index: number) => {
    if (!sectorContent) return
    setSectorContent({
      ...sectorContent,
      faqs: sectorContent.faqs.filter((_, i) => i !== index),
    })
  }

  const updateFAQ = (index: number, field: keyof FAQItem, value: string | number) => {
    if (!sectorContent) return
    const updated = [...sectorContent.faqs]
    updated[index] = { ...updated[index], [field]: value }
    setSectorContent({ ...sectorContent, faqs: updated })
  }

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f5f7f0]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#f5f7f0]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-[#f5f7f0]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <p className="text-sm text-red-600">Failed to load sectors data.</p>
            <button
              onClick={handleSeedData}
              className="flex items-center gap-2 rounded-lg bg-[#2d6a2e] px-4 py-2 text-sm font-medium text-white hover:bg-[#245424]"
            >
              <RefreshCw className="h-4 w-4" />
              Seed Default Data
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f5f7f0]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Sectors Manager</h1>
            <p className="text-sm text-[#666]">Manage sectors list, content, and page settings</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeedData}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg border border-[#ddd] bg-white px-4 py-2.5 text-sm font-medium text-[#666] hover:bg-[#f5f5f5]"
            >
              <RefreshCw className={`h-4 w-4 ${saving ? "animate-spin" : ""}`} />
              Seed Data
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-[#e5e5e5]">
          {[
            { id: "list", label: "Sectors List" },
            { id: "content", label: "Sector Content" },
            { id: "settings", label: "Page Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-[#2d6a2e] text-[#2d6a2e]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "list" && (
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Sectors List</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={addSector}
                  className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-3 py-1.5 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Sector
                </button>
                <button
                  onClick={handleSaveList}
                  disabled={saving}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                    saveStatus === "success"
                      ? "bg-green-600"
                      : saveStatus === "error"
                      ? "bg-red-500"
                      : "bg-[#2d6a2e] hover:bg-[#245424]"
                  }`}
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saveStatus === "success" ? "Saved!" : "Save"}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {sectorsList.map((sector, index) => (
                <div key={sector.id} className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-[#999]" />
                      <span className="text-xs font-semibold uppercase text-[#888]">
                        Sector {index + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-xs text-[#666]">
                        <input
                          type="checkbox"
                          checked={sector.isActive}
                          onChange={(e) => updateSector(index, "isActive", e.target.checked)}
                          className="rounded border-[#ddd]"
                        />
                        Active
                      </label>
                      <button
                        onClick={() => removeSector(index)}
                        className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <input
                      type="text"
                      placeholder="Sector Name"
                      value={sector.name}
                      onChange={(e) => updateSector(index, "name", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                    <input
                      type="text"
                      placeholder="Slug (URL)"
                      value={sector.slug}
                      onChange={(e) => updateSector(index, "slug", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                    <input
                      type="number"
                      placeholder="Order"
                      value={sector.order}
                      onChange={(e) => updateSector(index, "order", parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                </div>
              ))}
              {sectorsList.length === 0 && (
                <p className="py-8 text-center text-sm text-[#999]">
                  No sectors yet. Click "Add Sector" to create one.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
            {/* Sector Selector */}
            <div className="rounded-xl border border-[#e5e5e5] bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a]">Select Sector</h3>
              <div className="space-y-1">
                {sectorsList.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedSector(sector.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedSector === sector.id
                        ? "bg-[#2d6a2e] text-white"
                        : "text-[#666] hover:bg-[#f5f5f5]"
                    }`}
                  >
                    {sector.name || "Unnamed Sector"}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Editor */}
            <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
              {contentLoading ? (
                <div className="flex h-48 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-[#2d6a2e]" />
                </div>
              ) : sectorContent ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[#1a1a1a]">Content Editor</h2>
                    <button
                      onClick={handleSaveContent}
                      disabled={saving}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                        saveStatus === "success"
                          ? "bg-green-600"
                          : saveStatus === "error"
                          ? "bg-red-500"
                          : "bg-[#2d6a2e] hover:bg-[#245424]"
                      }`}
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      {saveStatus === "success" ? "Saved!" : "Save Content"}
                    </button>
                  </div>

                  {/* Basic Info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ImageUpload
                      label="Main Image"
                      value={sectorContent.mainImage}
                      onChange={(url) => setSectorContent({ ...sectorContent, mainImage: url })}
                      compact
                    />
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#666]">Gallery Images (comma-separated URLs)</label>
                      <input
                        type="text"
                        value={sectorContent.galleryImages?.join(", ") || ""}
                        onChange={(e) =>
                          setSectorContent({
                            ...sectorContent,
                            galleryImages: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Description</label>
                    <textarea
                      value={sectorContent.description}
                      onChange={(e) => setSectorContent({ ...sectorContent, description: e.target.value })}
                      rows={6}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>

                  {/* Expert Card */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a]">Expert Card</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ImageUpload
                        label="Expert Image"
                        value={sectorContent.expertCard?.image || ""}
                        onChange={(url) =>
                          setSectorContent({
                            ...sectorContent,
                            expertCard: { ...sectorContent.expertCard, image: url },
                          })
                        }
                        compact
                      />
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Title"
                          value={sectorContent.expertCard?.title || ""}
                          onChange={(e) =>
                            setSectorContent({
                              ...sectorContent,
                              expertCard: { ...sectorContent.expertCard, title: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                        />
                        <input
                          type="text"
                          placeholder="Subtitle"
                          value={sectorContent.expertCard?.subtitle || ""}
                          onChange={(e) =>
                            setSectorContent({
                              ...sectorContent,
                              expertCard: { ...sectorContent.expertCard, subtitle: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                        />
                        <input
                          type="text"
                          placeholder="Button Text"
                          value={sectorContent.expertCard?.buttonText || ""}
                          onChange={(e) =>
                            setSectorContent({
                              ...sectorContent,
                              expertCard: { ...sectorContent.expertCard, buttonText: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[#1a1a1a]">Process Steps</h3>
                      <button
                        onClick={addProcessStep}
                        className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-2 py-1 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
                      >
                        <Plus className="h-3 w-3" /> Add Step
                      </button>
                    </div>
                    <div className="space-y-3">
                      {sectorContent.processSteps?.map((step, idx) => (
                        <div key={step.id} className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-medium text-[#888]">Step {idx + 1}</span>
                            <button
                              onClick={() => removeProcessStep(idx)}
                              className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-3">
                            <input
                              type="text"
                              placeholder="Number (e.g., 01)"
                              value={step.number}
                              onChange={(e) => updateProcessStep(idx, "number", e.target.value)}
                              className="rounded border border-[#ddd] bg-white px-2 py-1.5 text-xs outline-none focus:border-[#2d6a2e]"
                            />
                            <input
                              type="text"
                              placeholder="Title"
                              value={step.title}
                              onChange={(e) => updateProcessStep(idx, "title", e.target.value)}
                              className="rounded border border-[#ddd] bg-white px-2 py-1.5 text-xs outline-none focus:border-[#2d6a2e] sm:col-span-2"
                            />
                          </div>
                          <textarea
                            placeholder="Description"
                            value={step.description}
                            onChange={(e) => updateProcessStep(idx, "description", e.target.value)}
                            rows={2}
                            className="mt-2 w-full rounded border border-[#ddd] bg-white px-2 py-1.5 text-xs outline-none focus:border-[#2d6a2e]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQs */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[#1a1a1a]">FAQs</h3>
                      <button
                        onClick={addFAQ}
                        className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-2 py-1 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
                      >
                        <Plus className="h-3 w-3" /> Add FAQ
                      </button>
                    </div>
                    <div className="space-y-3">
                      {sectorContent.faqs?.map((faq, idx) => (
                        <div key={faq.id} className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-medium text-[#888]">FAQ {idx + 1}</span>
                            <button
                              onClick={() => removeFAQ(idx)}
                              className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Question"
                            value={faq.question}
                            onChange={(e) => updateFAQ(idx, "question", e.target.value)}
                            className="mb-2 w-full rounded border border-[#ddd] bg-white px-2 py-1.5 text-xs outline-none focus:border-[#2d6a2e]"
                          />
                          <textarea
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(e) => updateFAQ(idx, "answer", e.target.value)}
                            rows={2}
                            className="w-full rounded border border-[#ddd] bg-white px-2 py-1.5 text-xs outline-none focus:border-[#2d6a2e]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-[#999]">Select a sector to edit its content.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && pageData && (
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Page Settings</h2>
              <button
                onClick={handleSavePageSettings}
                disabled={saving}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                  saveStatus === "success"
                    ? "bg-green-600"
                    : saveStatus === "error"
                    ? "bg-red-500"
                    : "bg-[#2d6a2e] hover:bg-[#245424]"
                }`}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saveStatus === "success" ? "Saved!" : "Save Settings"}
              </button>
            </div>

            <div className="space-y-6">
              {/* Hero Section */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a]">Hero Section</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Hero Title</label>
                    <input
                      type="text"
                      value={pageData.heroTitle || ""}
                      onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Hero Background Image URL</label>
                    <input
                      type="text"
                      value={pageData.heroBackgroundImage || ""}
                      onChange={(e) => setPageData({ ...pageData, heroBackgroundImage: e.target.value })}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                </div>
              </div>

              {/* Section Titles */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a]">Section Titles</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Sidebar Title</label>
                    <input
                      type="text"
                      value={pageData.sidebarTitle || ""}
                      onChange={(e) => setPageData({ ...pageData, sidebarTitle: e.target.value })}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Process Section Title</label>
                    <input
                      type="text"
                      value={pageData.processTitle || ""}
                      onChange={(e) => setPageData({ ...pageData, processTitle: e.target.value })}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">FAQ Section Title</label>
                    <input
                      type="text"
                      value={pageData.faqTitle || ""}
                      onChange={(e) => setPageData({ ...pageData, faqTitle: e.target.value })}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a]">Newsletter Section</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Heading</label>
                    <input
                      type="text"
                      value={pageData.newsletterHeading || ""}
                      onChange={(e) => setPageData({ ...pageData, newsletterHeading: e.target.value })}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Button Text</label>
                    <input
                      type="text"
                      value={pageData.newsletterButtonText || ""}
                      onChange={(e) => setPageData({ ...pageData, newsletterButtonText: e.target.value })}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Description</label>
                    <textarea
                      value={pageData.newsletterDescription || ""}
                      onChange={(e) => setPageData({ ...pageData, newsletterDescription: e.target.value })}
                      rows={2}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">Input Placeholder</label>
                    <input
                      type="text"
                      value={pageData.newsletterPlaceholder || ""}
                      onChange={(e) => setPageData({ ...pageData, newsletterPlaceholder: e.target.value })}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
