"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Loader2, Image as ImageIcon, Info } from "lucide-react"

const allImages = [
  { path: "/images/hero-bg.jpg", label: "Hero Background" },
  { path: "/images/rectangle-11.png", label: "Hero Stat Image" },
  { path: "/images/avatars.png", label: "Hero Avatars" },
  { path: "/images/about-person.jpg", label: "About Person" },
  { path: "/images/leaf-decoration.png", label: "Leaf Decoration" },
  { path: "/images/garden-tools-decor.jpg", label: "Garden Tools" },
  { path: "/images/container.png", label: "Container" },
  { path: "/images/icon-landscape.png", label: "Icon: Landscape" },
  { path: "/images/icon-eye.png", label: "Icon: Eye" },
  { path: "/images/icon-hand-plant.png", label: "Icon: Hand Plant" },
  { path: "/images/icon-aloe.png", label: "Icon: Aloe" },
  { path: "/images/icon-thumbs.png", label: "Icon: Thumbs" },
  { path: "/images/service-1.png", label: "Service: Design" },
  { path: "/images/service-2.png", label: "Service: Tree Care" },
  { path: "/images/service-3.png", label: "Service: Drainage" },
  { path: "/images/service-4.png", label: "Service: Cleanup" },
  { path: "/images/leaf-green.png", label: "Leaf Green" },
  { path: "/images/why-choose-mask.png", label: "Trust Mask 1" },
  { path: "/images/why-choose-mask-2.png", label: "Trust Mask 2" },
  { path: "/images/trowel-seedling.png", label: "Trowel Seedling" },
  { path: "/images/stats-bg.png", label: "Stats Background" },
  { path: "/images/farmer-field.png", label: "Farmer Field" },
  { path: "/images/leaf-gray.png", label: "Leaf Gray" },
  { path: "/images/team-1.jpg", label: "Team 1" },
  { path: "/images/team-2.jpg", label: "Team 2" },
  { path: "/images/team-3.jpg", label: "Team 3" },
  { path: "/images/team-4.jpg", label: "Team 4" },
  { path: "/images/leaf-lime.png", label: "Leaf Lime" },
  { path: "/images/logo-vertigo.png", label: "Partner: Vertigo" },
  { path: "/images/logo-sitemark.png", label: "Partner: Sitemark" },
  { path: "/images/logo-snowflake.png", label: "Partner: Snowflake" },
  { path: "/images/logo-cactus.png", label: "Partner: Cactus" },
  { path: "/images/logo-greenin.png", label: "Partner: Greenin" },
  { path: "/images/cta-garden-bg.png", label: "CTA Background" },
  { path: "/images/turf-installer.png", label: "Turf Installer" },
  { path: "/images/testimonial-bg.jpg", label: "Testimonial BG" },
  { path: "/images/leaf-decoration.jpg", label: "FAQ Leaf" },
  { path: "/images/blog-1.jpg", label: "Blog 1" },
  { path: "/images/blog-2.jpg", label: "Blog 2" },
  { path: "/images/blog-3.jpg", label: "Blog 3" },
  { path: "/images/social-icon-1.png", label: "Social: Facebook" },
  { path: "/images/social-icon-2.png", label: "Social: Instagram" },
  { path: "/images/social-icon-3.png", label: "Social: Twitter" },
  { path: "/images/social-icon-4.png", label: "Social: LinkedIn" },
]

export default function ImagesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login")
    }
  }, [authLoading, user, router])

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
            <p className="text-sm text-[#666]">All images used across the website</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a2e]/10">
            <ImageIcon className="h-5 w-5 text-[#2d6a2e]" />
          </div>
        </div>

        <div className="mb-4 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
          <p className="text-sm text-blue-700">
            To update an image, change the image path in the relevant section editor. Images are served from the /public/images/ folder. Upload new images to that folder and reference them by path.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allImages.map((img) => (
            <div key={img.path} className="rounded-xl border border-[#e5e5e5] bg-white p-3">
              <div className="mb-2 flex h-24 items-center justify-center overflow-hidden rounded-lg bg-[#f5f5f5]">
                <img
                  src={img.path}
                  alt={img.label}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-xs font-medium text-[#333] truncate">{img.label}</p>
              <p className="text-xs text-[#888] truncate">{img.path}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
