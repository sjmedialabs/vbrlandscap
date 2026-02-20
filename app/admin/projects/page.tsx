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
  RefreshCw,
  ExternalLink,
  Image as ImageIcon,
  X,
} from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"
import useSWR from "swr"
import {
  type Project,
  type ProjectCategory,
  type ProjectFeature,
  type ProjectsPageData,
  defaultProject,
  defaultProjectsPageData,
  defaultCategories,
} from "@/lib/projects-types"

interface ProjectsData {
  projects: Project[]
  pageData: ProjectsPageData
  categories: ProjectCategory[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AdminProjectsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data, error, isLoading, mutate } = useSWR<ProjectsData>(
    "/api/projects?admin=true",
    fetcher
  )

  // Get tab from URL query params
  const tabFromUrl = searchParams.get("tab") as "list" | "categories" | "settings" | null
  const [activeTab, setActiveTab] = useState<"list" | "categories" | "settings">(tabFromUrl || "list")

  // Sync tab with URL changes
  useEffect(() => {
    const tab = searchParams.get("tab") as "list" | "categories" | "settings" | null
    if (tab && ["list", "categories", "settings"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])
  const [projects, setProjects] = useState<Project[]>([])
  const [pageData, setPageData] = useState<ProjectsPageData>(defaultProjectsPageData)
  const [categories, setCategories] = useState<ProjectCategory[]>(defaultCategories)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login")
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (data) {
      setProjects(data.projects || [])
      setPageData(data.pageData || defaultProjectsPageData)
      setCategories(data.categories?.length > 0 ? data.categories : defaultCategories)
    }
  }, [data])

  const handleSaveProject = async () => {
    if (!editingProject) return
    setSaving(true)
    setSaveStatus("idle")
    try {
      const isNew = !editingProject.id || editingProject.id.startsWith("new-")
      const url = isNew ? "/api/projects" : `/api/projects/${editingProject.slug}`
      const method = isNew ? "POST" : "PUT"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      })
      if (!res.ok) throw new Error("Failed to save")
      await mutate()
      setSaveStatus("success")
      setTimeout(() => {
        setSaveStatus("idle")
        setShowEditor(false)
        setEditingProject(null)
      }, 1000)
    } catch {
      setSaveStatus("error")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProject = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return
    setSaving(true)
    try {
      const res = await fetch(`/api/projects/${project.slug}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete")
      await mutate()
    } catch {
      alert("Failed to delete project")
    } finally {
      setSaving(false)
    }
  }

  const handleSavePageSettings = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/projects", {
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

  const handleSaveCategories = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories }),
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

  const addCategory = () => {
    const newCategory: ProjectCategory = {
      id: `cat-${Date.now()}`,
      name: "",
      slug: "",
    }
    setCategories([...categories, newCategory])
  }

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const updateCategory = (index: number, field: keyof ProjectCategory, value: string) => {
    const updated = [...categories]
    updated[index] = { ...updated[index], [field]: value }
    // Auto-generate slug from name if slug is empty
    if (field === "name" && !updated[index].slug) {
      updated[index].slug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }
    setCategories(updated)
  }

  const handleSeedData = async () => {
    if (!confirm("This will seed default projects data. Continue?")) return
    setSaving(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seed" }),
      })
      if (res.ok) {
        await mutate()
        alert("Projects data seeded successfully!")
      }
    } finally {
      setSaving(false)
    }
  }

  const openNewProject = () => {
    const newProject: Project = {
      ...defaultProject,
      id: `new-${Date.now()}`,
      slug: "",
      title: "",
      order: projects.length,
    }
    setEditingProject(newProject)
    setShowEditor(true)
  }

  const openEditProject = (project: Project) => {
    setEditingProject({ ...project })
    setShowEditor(true)
  }

  const updateEditingProject = (field: keyof Project, value: unknown) => {
    if (!editingProject) return
    const updated = { ...editingProject, [field]: value }
    // Auto-generate slug from title if slug is empty
    if (field === "title" && !updated.slug) {
      updated.slug = (value as string)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    }
    setEditingProject(updated)
  }

  const addFeature = () => {
    if (!editingProject) return
    const newFeature: ProjectFeature = {
      id: `feature-${Date.now()}`,
      title: "",
      order: editingProject.features.length,
    }
    setEditingProject({
      ...editingProject,
      features: [...editingProject.features, newFeature],
    })
  }

  const removeFeature = (index: number) => {
    if (!editingProject) return
    setEditingProject({
      ...editingProject,
      features: editingProject.features.filter((_, i) => i !== index),
    })
  }

  const updateFeature = (index: number, value: string) => {
    if (!editingProject) return
    const updated = [...editingProject.features]
    updated[index] = { ...updated[index], title: value }
    setEditingProject({ ...editingProject, features: updated })
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
            <p className="text-sm text-red-600">Failed to load projects data.</p>
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
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Projects Manager</h1>
            <p className="text-sm text-[#666]">
              Manage projects portfolio and page settings
            </p>
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
            { id: "list", label: "Projects List" },
            { id: "categories", label: "Categories" },
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
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Projects List</h2>
              <button
                onClick={openNewProject}
                className="flex items-center gap-1 rounded-lg bg-[#2d6a2e] px-4 py-2 text-sm font-medium text-white hover:bg-[#245424]"
              >
                <Plus className="h-4 w-4" /> Add Project
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex items-center gap-4 rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-4"
                >
                  <GripVertical className="h-5 w-5 flex-shrink-0 cursor-grab text-[#999]" />

                  {/* Thumbnail */}
                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[#e5e5e5]">
                    {project.featuredImage ? (
                      <img
                        src={project.featuredImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-[#999]" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-[#1a1a1a]">
                      {project.title || "Untitled Project"}
                    </h3>
                    <p className="text-xs text-[#666]">/{project.slug}</p>
                  </div>

                  {/* Status */}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      project.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#1a1a1a]"
                      title="View project"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => openEditProject(project)}
                      className="rounded-lg bg-[#2d6a2e]/10 px-3 py-1.5 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project)}
                      className="rounded p-1.5 text-[#999] hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="py-8 text-center text-sm text-[#999]">
                  No projects yet. Click &quot;Add Project&quot; to create one or
                  &quot;Seed Data&quot; to add sample projects.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Project Categories</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={addCategory}
                  className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-3 py-1.5 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Category
                </button>
                <button
                  onClick={handleSaveCategories}
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
              {categories.map((category, index) => (
                <div key={category.id} className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-[#999]" />
                      <span className="text-xs font-semibold uppercase text-[#888]">
                        Category {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeCategory(index)}
                      className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Category Name"
                      value={category.name}
                      onChange={(e) => updateCategory(index, "name", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                    <input
                      type="text"
                      placeholder="Slug (URL)"
                      value={category.slug}
                      onChange={(e) => updateCategory(index, "slug", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                </div>
              ))}
              {categories.length === 0 && (
                <p className="py-8 text-center text-sm text-[#999]">
                  No categories yet. Click &quot;Add Category&quot; to create one.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
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
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saveStatus === "success" ? "Saved!" : "Save Settings"}
              </button>
            </div>

            <div className="space-y-6">
              {/* Hero Section */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-[#1a1a1a]">Hero Section</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={pageData.heroTitle}
                      onChange={(e) =>
                        setPageData({ ...pageData, heroTitle: e.target.value })
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <ImageUpload
                    label="Hero Background Image"
                    value={pageData.heroBackgroundImage}
                    onChange={(url) =>
                      setPageData({ ...pageData, heroBackgroundImage: url })
                    }
                    compact
                  />
                </div>
              </div>

              {/* Newsletter Section */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-[#1a1a1a]">
                  Newsletter Section
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={pageData.newsletterHeading}
                      onChange={(e) =>
                        setPageData({
                          ...pageData,
                          newsletterHeading: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={pageData.newsletterButtonText}
                      onChange={(e) =>
                        setPageData({
                          ...pageData,
                          newsletterButtonText: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Description
                    </label>
                    <input
                      type="text"
                      value={pageData.newsletterDescription}
                      onChange={(e) =>
                        setPageData({
                          ...pageData,
                          newsletterDescription: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Email Placeholder
                    </label>
                    <input
                      type="text"
                      value={pageData.newsletterPlaceholder}
                      onChange={(e) =>
                        setPageData({
                          ...pageData,
                          newsletterPlaceholder: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Editor Modal */}
        {showEditor && editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#1a1a1a]">
                  {editingProject.id.startsWith("new-")
                    ? "New Project"
                    : "Edit Project"}
                </h2>
                <button
                  onClick={() => {
                    setShowEditor(false)
                    setEditingProject(null)
                  }}
                  className="rounded-full p-2 hover:bg-[#f5f5f5]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => updateEditingProject("title", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Slug (URL) *
                    </label>
                    <input
                      type="text"
                      value={editingProject.slug}
                      onChange={(e) => updateEditingProject("slug", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                      placeholder="project-url-slug"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Status
                    </label>
                    <select
                      value={editingProject.status}
                      onChange={(e) =>
                        updateEditingProject(
                          "status",
                          e.target.value as "draft" | "published"
                        )
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                {/* Images */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <ImageUpload
                    label="Hero Image"
                    value={editingProject.heroImage}
                    onChange={(url) => updateEditingProject("heroImage", url)}
                    compact
                  />
                  <ImageUpload
                    label="Featured Image"
                    value={editingProject.featuredImage}
                    onChange={(url) => updateEditingProject("featuredImage", url)}
                    compact
                  />
                </div>

                {/* Descriptions */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#666]">
                    Short Description
                  </label>
                  <textarea
                    value={editingProject.shortDescription}
                    onChange={(e) =>
                      updateEditingProject("shortDescription", e.target.value)
                    }
                    rows={2}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    placeholder="Brief description for listing cards..."
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#666]">
                    Full Description
                  </label>
                  <textarea
                    value={editingProject.fullDescription}
                    onChange={(e) =>
                      updateEditingProject("fullDescription", e.target.value)
                    }
                    rows={6}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    placeholder="Detailed project description..."
                  />
                </div>

                {/* Project Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Client
                    </label>
                    <input
                      type="text"
                      value={editingProject.client}
                      onChange={(e) =>
                        updateEditingProject("client", e.target.value)
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Project Type
                    </label>
                    <input
                      type="text"
                      value={editingProject.projectType}
                      onChange={(e) =>
                        updateEditingProject("projectType", e.target.value)
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                      placeholder="e.g. Residential Landscaping"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Date
                    </label>
                    <input
                      type="text"
                      value={editingProject.date}
                      onChange={(e) => updateEditingProject("date", e.target.value)}
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                      placeholder="e.g. 9 January 2025"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#666]">
                      Website
                    </label>
                    <input
                      type="text"
                      value={editingProject.website}
                      onChange={(e) =>
                        updateEditingProject("website", e.target.value)
                      }
                      className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                      placeholder="yourdomain.com"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#666]">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                          editingProject.categories.includes(cat.id)
                            ? "border-[#2d6a2e] bg-[#2d6a2e]/10 text-[#2d6a2e]"
                            : "border-[#ddd] text-[#666] hover:border-[#999]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={editingProject.categories.includes(cat.id)}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...editingProject.categories, cat.id]
                              : editingProject.categories.filter(
                                  (c) => c !== cat.id
                                )
                            updateEditingProject("categories", updated)
                          }}
                          className="sr-only"
                        />
                        {cat.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-xs font-medium text-[#666]">
                      Key Features
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="flex items-center gap-1 rounded bg-[#2d6a2e]/10 px-2 py-1 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
                    >
                      <Plus className="h-3 w-3" /> Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingProject.features.map((feature, index) => (
                      <div key={feature.id} className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 flex-shrink-0 text-[#999]" />
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                          placeholder="Feature title"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order */}
                <div className="w-32">
                  <label className="mb-1.5 block text-xs font-medium text-[#666]">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingProject.order}
                    onChange={(e) =>
                      updateEditingProject("order", parseInt(e.target.value) || 0)
                    }
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#e5e5e5] pt-6">
                <button
                  onClick={() => {
                    setShowEditor(false)
                    setEditingProject(null)
                  }}
                  className="rounded-lg border border-[#ddd] px-4 py-2 text-sm font-medium text-[#666] hover:bg-[#f5f5f5]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  disabled={saving || !editingProject.title || !editingProject.slug}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                    saveStatus === "success"
                      ? "bg-green-600"
                      : saveStatus === "error"
                      ? "bg-red-500"
                      : "bg-[#2d6a2e] hover:bg-[#245424]"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saveStatus === "success" ? "Saved!" : "Save Project"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
