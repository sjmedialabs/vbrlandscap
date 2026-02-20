"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
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
  Palette,
  Search,
  Building2,
  FolderOpen,
  Shield,
  Briefcase,
  MapPin,
  TreePine,
  ChevronDown,
  Home,
  Info,
  Layers,
  Grid3X3,
  ListTree,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Page with expandable sections
interface PageConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  sections: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

// Simple menu group
interface SidebarGroup {
  label: string;
  links: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

// Pages with their sections (at top)
const pageConfigs: PageConfig[] = [
  {
    label: "Homepage",
    icon: Home,
    sections: [
      { label: "Navbar", href: "/admin/sections/navbar", icon: Navigation },
      { label: "Hero", href: "/admin/sections/hero", icon: Star },
      { label: "About", href: "/admin/sections/about", icon: FileText },
      { label: "Services", href: "/admin/sections/services", icon: Cog },
      { label: "Trust", href: "/admin/sections/trust", icon: Handshake },
      { label: "Stats", href: "/admin/sections/stats", icon: BarChart3 },
      { label: "Process", href: "/admin/sections/process", icon: Cog },
      { label: "Team", href: "/admin/sections/team", icon: Users },
      { label: "CTA", href: "/admin/sections/cta", icon: Phone },
      {
        label: "Testimonials",
        href: "/admin/sections/testimonials",
        icon: MessageSquare,
      },
      { label: "FAQ", href: "/admin/sections/faq", icon: HelpCircle },
      { label: "Blog", href: "/admin/sections/blog", icon: Newspaper },
      { label: "Newsletter", href: "/admin/sections/newsletter", icon: Mail },
      { label: "Footer", href: "/admin/sections/footer", icon: Menu },
    ],
  },
  {
    label: "About Page",
    icon: Info,
    sections: [
      { label: "Hero", href: "/admin/sections/about-page-hero", icon: Star },
      {
        label: "Introduction",
        href: "/admin/sections/about-page-intro",
        icon: FileText,
      },
      {
        label: "Features",
        href: "/admin/sections/about-page-features",
        icon: Cog,
      },
      {
        label: "VBR Group Strength",
        href: "/admin/sections/about-page-accountability",
        icon: Building2,
      },
      {
        label: "Why Choose Us",
        href: "/admin/sections/about-page-why-choose",
        icon: Handshake,
      },
      {
        label: "Newsletter",
        href: "/admin/sections/about-page-newsletter",
        icon: Mail,
      },
    ],
  },
  {
    label: "ECO-MATRIX Manager",
    icon: TreePine,
    sections: [
      { label: "Mega Menu", href: "/admin/eco-matrix/menu", icon: Menu },
      {
        label: "10-Dimensions",
        href: "/admin/eco-matrix/dimensions",
        icon: Grid3X3,
      },
      {
        label: "N.A.T.U.R.E Framework",
        href: "/admin/eco-matrix/nature",
        icon: ListTree,
      },
      { label: "Overview Page", href: "/admin/eco-matrix/overview", icon: Eye },
    ],
  },
  {
    label: "Sectors",
    icon: Building2,
    sections: [
      { label: "Sectors Manager", href: "/admin/sectors", icon: Building2 },
      {
        label: "Sectors List",
        href: "/admin/sectors?tab=list",
        icon: FileText,
      },
      {
        label: "Sector Content",
        href: "/admin/sectors?tab=content",
        icon: FileText,
      },
      {
        label: "Page Settings",
        href: "/admin/sectors?tab=settings",
        icon: Cog,
      },
    ],
  },
  {
    label: "Projects",
    icon: FolderOpen,
    sections: [
      { label: "Projects Manager", href: "/admin/projects", icon: FolderOpen },
      {
        label: "Projects List",
        href: "/admin/projects?tab=list",
        icon: FileText,
      },
      {
        label: "Categories",
        href: "/admin/projects?tab=categories",
        icon: Layers,
      },
      {
        label: "Page Settings",
        href: "/admin/projects?tab=settings",
        icon: Cog,
      },
    ],
  },
  {
    label: "Why VBR",
    icon: Shield,
    sections: [
      {
        label: "Page Content",
        href: "/admin/sections/page-why-vbr",
        icon: FileText,
      },
    ],
  },
  {
    label: "Careers",
    icon: Briefcase,
    sections: [
      { label: "Careers Manager", href: "/admin/careers", icon: Briefcase },
      { label: "Hero Section", href: "/admin/careers?tab=hero", icon: Star },
      {
        label: "Perks & Benefits",
        href: "/admin/careers?tab=perks",
        icon: FileText,
      },
      {
        label: "Culture Highlights",
        href: "/admin/careers?tab=culture",
        icon: Users,
      },
      {
        label: "Work Environment",
        href: "/admin/careers?tab=environment",
        icon: Building2,
      },
      { label: "CTA Section", href: "/admin/careers?tab=cta", icon: Phone },
    ],
  },
  {
    label: "Contact",
    icon: MapPin,
    sections: [
      {
        label: "Page Content",
        href: "/admin/sections/page-contact",
        icon: FileText,
      },
    ],
  },
];

// Other menu groups (at bottom)
const sidebarGroups: SidebarGroup[] = [
  {
    label: "Settings",
    links: [
      { label: "Branding", href: "/admin/sections/branding", icon: Palette },
      { label: "SEO", href: "/admin/sections/seo", icon: Search },
      { label: "Images", href: "/admin/images", icon: ImageIcon },
    ],
  },
];

// Expandable Page Section Component
function PageSection({
  page,
  pathname,
}: {
  page: PageConfig;
  pathname: string;
}) {
  const hasActiveSection = page.sections.some((s) => pathname === s.href);
  const [isOpen, setIsOpen] = useState(hasActiveSection);

  const PageIcon = page.icon;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
          hasActiveSection
            ? "bg-[#2d6a2e]/10 font-medium text-[#2d6a2e]"
            : "text-[#555] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]",
        )}
      >
        <span className="flex items-center gap-2.5">
          <PageIcon className="h-4 w-4 flex-shrink-0" />
          {page.label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-[#e5e5e5] pl-3">
          {page.sections.map((section) => {
            const SectionIcon = section.icon;
            const isActive = pathname === section.href;
            return (
              <Link
                key={section.href}
                href={section.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors",
                  isActive
                    ? "bg-[#2d6a2e]/10 font-medium text-[#2d6a2e]"
                    : "text-[#666] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]",
                )}
              >
                <SectionIcon className="h-3.5 w-3.5 flex-shrink-0" />
                {section.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[#e5e5e5] bg-white">
      <div className="flex items-center gap-2.5 border-b border-[#e5e5e5] px-5 py-4">
        {/* <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2d6a2e]">
          <Leaf className="h-5 w-5 text-white" />
        </div> */}
        <div>
          <p className="text-sm font-bold text-[#1a1a1a]">VBR Landscape</p>
          <p className="text-xs text-[#888]">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-4">
          {/* Dashboard */}
          <div>
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === "/admin"
                  ? "bg-[#2d6a2e]/10 font-medium text-[#2d6a2e]"
                  : "text-[#555] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]",
              )}
            >
              <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
              Dashboard
            </Link>
          </div>

          {/* Pages with Section Dropdowns */}
          <div>
            <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-wider text-[#aaa]">
              Pages
            </p>
            <div className="space-y-0.5">
              {pageConfigs.map((page) => (
                <PageSection key={page.label} page={page} pathname={pathname} />
              ))}
            </div>
          </div>

          {/* Other Menu Groups */}
          {sidebarGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-wider text-[#aaa]">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-[#2d6a2e]/10 font-medium text-[#2d6a2e]"
                          : "text-[#555] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]",
                      )}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-[#e5e5e5] px-3 py-3">
        <div className="mb-2 px-3 text-xs text-[#888] truncate">
          {user?.email ?? ""}
        </div>
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#555] transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
