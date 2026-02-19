"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSection, updateSection } from "@/lib/use-sections"
import { Save, Loader2, AlertCircle, Plus, Trash2, Upload, X, ImageIcon } from "lucide-react"

interface FieldConfig {
  key: string
  label: string
  type: "text" | "textarea" | "image" | "array" | "object-array"
  fields?: FieldConfig[]
}

interface SectionEditorProps {
  sectionId: string
  title: string
  fields: FieldConfig[]
}

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("image/svg")) {
      setError("Please upload an image file")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be less than 10MB")
      return
    }

    setError("")
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      onChange(data.url)
    } catch {
      setError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#333]">{label}</label>

      {/* Current image preview */}
      {value && (
        <div className="mb-2.5 flex items-start gap-3 rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-2.5">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#eee] bg-white">
            <img
              src={value}
              alt=""
              className="h-full w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 truncate text-xs text-[#888]" title={value}>
              {value}
            </p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50"
            >
              <X className="h-3 w-3" /> Remove
            </button>
          </div>
        </div>
      )}

      {/* Upload dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 transition-colors",
          dragOver
            ? "border-[#2d6a2e] bg-[#2d6a2e]/5"
            : "border-[#d4d4d4] bg-[#fafafa] hover:border-[#2d6a2e]/50 hover:bg-[#f0f4ec]",
          uploading && "pointer-events-none opacity-60"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        {uploading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin text-[#2d6a2e]" />
            <span className="text-xs text-[#666]">Uploading...</span>
          </>
        ) : (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d6a2e]/10">
              <Upload className="h-5 w-5 text-[#2d6a2e]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[#333]">
                {value ? "Replace image" : "Upload image"}
              </p>
              <p className="mt-0.5 text-xs text-[#888]">
                Drag and drop or click to browse. Max 10MB.
              </p>
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig
  value: unknown
  onChange: (value: unknown) => void
}) {
  if (field.type === "text") {
    return (
      <div>
        <label className="mb-1 block text-sm font-medium text-[#333]">{field.label}</label>
        <input
          type="text"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none focus:border-[#2d6a2e] focus:ring-2 focus:ring-[#2d6a2e]/20"
        />
      </div>
    )
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className="mb-1 block text-sm font-medium text-[#333]">{field.label}</label>
        <textarea
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none focus:border-[#2d6a2e] focus:ring-2 focus:ring-[#2d6a2e]/20"
        />
      </div>
    )
  }

  if (field.type === "image") {
    return (
      <ImageUploadField
        label={field.label}
        value={(value as string) || ""}
        onChange={(v) => onChange(v)}
      />
    )
  }

  if (field.type === "array") {
    const items = Array.isArray(value) ? value : []
    return (
      <div>
        <label className="mb-1 block text-sm font-medium text-[#333]">{field.label}</label>
        <div className="space-y-2">
          {items.map((item: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...items]
                  newItems[index] = e.target.value
                  onChange(newItems)
                }}
                className="flex-1 rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2 text-sm text-[#1a1a1a] outline-none focus:border-[#2d6a2e] focus:ring-2 focus:ring-[#2d6a2e]/20"
              />
              <button
                type="button"
                onClick={() => {
                  const newItems = items.filter((_: string, i: number) => i !== index)
                  onChange(newItems)
                }}
                className="rounded-lg p-2 text-[#999] hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...items, ""])}
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-[#ccc] px-3 py-2 text-xs text-[#666] hover:border-[#2d6a2e] hover:text-[#2d6a2e]"
          >
            <Plus className="h-3 w-3" />
            Add Item
          </button>
        </div>
      </div>
    )
  }

  if (field.type === "object-array" && field.fields) {
    const items = Array.isArray(value) ? value : []
    return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#333]">{field.label}</label>
        <div className="space-y-3">
          {items.map((item: Record<string, unknown>, index: number) => (
            <div key={index} className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-[#888]">
                  Item {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newItems = items.filter(
                      (_: Record<string, unknown>, i: number) => i !== index
                    )
                    onChange(newItems)
                  }}
                  className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid gap-3">
                {field.fields!.map((subField) => (
                  <FieldInput
                    key={subField.key}
                    field={subField}
                    value={item[subField.key]}
                    onChange={(newVal) => {
                      const newItems = [...items]
                      newItems[index] = { ...newItems[index], [subField.key]: newVal }
                      onChange(newItems)
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const emptyItem: Record<string, unknown> = { order: items.length }
              field.fields!.forEach((f) => {
                if (f.key !== "order") emptyItem[f.key] = ""
              })
              onChange([...items, emptyItem])
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#ccc] py-3 text-sm text-[#666] hover:border-[#2d6a2e] hover:text-[#2d6a2e]"
          >
            <Plus className="h-4 w-4" />
            Add {field.label.replace(/s$/, "")}
          </button>
        </div>
      </div>
    )
  }

  return null
}

export function SectionEditor({ sectionId, title, fields }: SectionEditorProps) {
  const { data, error, isLoading, mutate } = useSection(sectionId)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (data && !data.error) {
      setFormData(data)
    }
  }, [data])

  const handleFieldChange = useCallback((key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus("idle")
    try {
      await updateSection(sectionId, formData)
      await mutate()
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 2000)
    } catch {
      setSaveStatus("error")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
      </div>
    )
  }

  if (error || data?.error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="text-sm text-red-600">
          Failed to load section data. Run the seed first.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">{title}</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors",
            saveStatus === "success"
              ? "bg-green-600"
              : saveStatus === "error"
                ? "bg-red-500"
                : "bg-[#2d6a2e] hover:bg-[#245424]",
            saving && "opacity-60"
          )}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saveStatus === "success"
            ? "Saved!"
            : saveStatus === "error"
              ? "Error"
              : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-5">
        {fields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={formData[field.key]}
            onChange={(value) => handleFieldChange(field.key, value)}
          />
        ))}
      </div>
    </div>
  )
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
