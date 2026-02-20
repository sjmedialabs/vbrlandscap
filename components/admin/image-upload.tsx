"use client"

import { useState, useRef } from "react"
import { Loader2, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  label?: string
  value: string
  onChange: (value: string) => void
  className?: string
  compact?: boolean
}

export function ImageUpload({
  label,
  value,
  onChange,
  className,
  compact = false,
}: ImageUploadProps) {
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
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-[#666]">
          {label}
        </label>
      )}

      {/* Current image preview */}
      {value && (
        <div className="mb-2.5 flex items-start gap-3 rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-2">
          <div
            className={cn(
              "flex flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#eee] bg-white",
              compact ? "h-14 w-14" : "h-20 w-20"
            )}
          >
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
            <p
              className="mb-1 truncate text-xs text-[#888]"
              title={value}
            >
              {value.split("/").pop()}
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
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors",
          compact ? "px-3 py-4" : "px-4 py-6",
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
            <Loader2 className="h-5 w-5 animate-spin text-[#2d6a2e]" />
            <span className="text-xs text-[#666]">Uploading...</span>
          </>
        ) : (
          <>
            <div
              className={cn(
                "flex items-center justify-center rounded-full bg-[#2d6a2e]/10",
                compact ? "h-8 w-8" : "h-10 w-10"
              )}
            >
              <Upload className={cn("text-[#2d6a2e]", compact ? "h-4 w-4" : "h-5 w-5")} />
            </div>
            <div className="text-center">
              <p className={cn("font-medium text-[#333]", compact ? "text-xs" : "text-sm")}>
                {value ? "Replace image" : "Upload image"}
              </p>
              {!compact && (
                <p className="mt-0.5 text-xs text-[#888]">
                  Drag and drop or click to browse. Max 10MB.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
