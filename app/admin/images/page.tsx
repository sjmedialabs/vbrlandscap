"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import {
  Loader2,
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Trash2,
  X,
  Search,
} from "lucide-react"

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: string
  filename: string
}

export default function ImagesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [files, setFiles] = useState<BlobFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login")
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (user) fetchFiles()
  }, [user])

  const fetchFiles = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/upload")
      if (res.ok) {
        const data = await res.json()
        setFiles(data.files || [])
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (fileList: FileList) => {
    setUploading(true)
    try {
      for (const file of Array.from(fileList)) {
        if (!file.type.startsWith("image/")) continue
        const formData = new FormData()
        formData.append("file", file)
        await fetch("/api/upload", { method: "POST", body: formData })
      }
      await fetchFiles()
    } catch {
      // silently fail
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (url: string) => {
    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      setFiles((prev) => prev.filter((f) => f.url !== url))
    } catch {
      // silently fail
    }
  }

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(""), 2000)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files)
  }

  const filteredFiles = files.filter(
    (f) =>
      !searchQuery ||
      f.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.pathname.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f5f7f0]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f5f7f0]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a1a1a]">Images Library</h1>
            <p className="text-sm text-[#666]">
              Upload and manage images for the website. Click copy to use a URL in section editors.
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a2e]/10">
            <ImageIcon className="h-5 w-5 text-[#2d6a2e]" />
          </div>
        </div>

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
            "mb-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 transition-colors",
            dragOver
              ? "border-[#2d6a2e] bg-[#2d6a2e]/5"
              : "border-[#d4d4d4] bg-white hover:border-[#2d6a2e]/50 hover:bg-[#f0f4ec]",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files?.length) handleUpload(e.target.files)
              if (inputRef.current) inputRef.current.value = ""
            }}
            className="hidden"
          />
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
              <span className="text-sm text-[#666]">Uploading...</span>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2d6a2e]/10">
                <Upload className="h-7 w-7 text-[#2d6a2e]" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#333]">
                  Drag and drop images here, or click to browse
                </p>
                <p className="mt-1 text-xs text-[#888]">
                  Supports JPG, PNG, SVG, WebP. Multiple files allowed. Max 10MB each.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#e5e5e5] bg-white px-3 py-2.5">
          <Search className="h-4 w-4 text-[#999]" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#1a1a1a] outline-none placeholder:text-[#aaa]"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <X className="h-4 w-4 text-[#999]" />
            </button>
          )}
        </div>

        {/* Images grid */}
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#2d6a2e]" />
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d4d4d4] bg-white">
            <ImageIcon className="h-8 w-8 text-[#ccc]" />
            <p className="text-sm text-[#888]">
              {searchQuery ? "No images match your search" : "No images uploaded yet"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredFiles.map((file) => (
              <div
                key={file.url}
                className="group rounded-xl border border-[#e5e5e5] bg-white p-3 transition-shadow hover:shadow-md"
              >
                <div className="relative mb-2 flex h-32 items-center justify-center overflow-hidden rounded-lg bg-[#f5f5f5]">
                  <img
                    src={file.url}
                    alt={file.filename}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleCopy(file.url)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#333] hover:bg-[#f0f0f0]"
                      title="Copy URL"
                    >
                      {copiedUrl === file.url ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(file.url)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="truncate text-xs font-medium text-[#333]">{file.filename}</p>
                <p className="truncate text-xs text-[#888]">
                  {file.size ? `${(file.size / 1024).toFixed(1)} KB` : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
