"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  Leaf,
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Users,
  MessageSquare,
  HelpCircle,
  Newspaper,
  Mail,
  Menu,
  Navigation,
  Phone,
  BarChart3,
  Cog,
  LogOut,
  Handshake,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sectionLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Navbar", href: "/admin/sections/navbar", icon: Navigation },
  { label: "Hero", href: "/admin/sections/hero", icon: Star },
  { label: "About", href: "/admin/sections/about", icon: FileText },
  { label: "Services", href: "/admin/sections/services", icon: Cog },
  { label: "Trust", href: "/admin/sections/trust", icon: Handshake },
  { label: "Stats", href: "/admin/sections/stats", icon: BarChart3 },
  { label: "Process", href: "/admin/sections/process", icon: Cog },
  { label: "Team", href: "/admin/sections/team", icon: Users },
  { label: "CTA", href: "/admin/sections/cta", icon: Phone },
  { label: "Testimonials", href: "/admin/sections/testimonials", icon: MessageSquare },
  { label: "FAQ", href: "/admin/sections/faq", icon: HelpCircle },
  { label: "Blog", href: "/admin/sections/blog", icon: Newspaper },
  { label: "Newsletter", href: "/admin/sections/newsletter", icon: Mail },
  { label: "Footer", href: "/admin/sections/footer", icon: Menu },
  { label: "Images", href: "/admin/images", icon: ImageIcon },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { signOut, user } = useAuth()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[#e5e5e5] bg-white">
      <div className="flex items-center gap-2.5 border-b border-[#e5e5e5] px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2d6a2e]">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#1a1a1a]">Landscope</p>
          <p className="text-xs text-[#888]">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-0.5">
          {sectionLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-[#2d6a2e]/10 font-medium text-[#2d6a2e]"
                    : "text-[#555] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-[#e5e5e5] px-3 py-3">
        <div className="mb-2 px-3 text-xs text-[#888] truncate">{user?.email}</div>
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#555] transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
