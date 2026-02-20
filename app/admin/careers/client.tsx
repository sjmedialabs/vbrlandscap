"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  RefreshCw,
} from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";
import useSWR from "swr";
import {
  type CareersPageData,
  type PerkItem,
  type CultureHighlight,
  defaultCareersPageData,
} from "@/lib/careers-types";

interface CareersData {
  pageData: CareersPageData;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Available icons for dropdowns
const perkIcons = [
  "Sprout",
  "TreeDeciduous",
  "Users",
  "Leaf",
  "Heart",
  "Star",
  "Briefcase",
  "Award",
];
const cultureIcons = [
  "Settings",
  "Brain",
  "Users",
  "BookOpen",
  "Wrench",
  "Leaf",
  "Cog",
  "Lightbulb",
  "Target",
  "Zap",
];

export default function AdminCareersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, error, isLoading, mutate } = useSWR<CareersData>(
    "/api/careers",
    fetcher,
  );

  // Get tab from URL query params
  const tabFromUrl = searchParams.get("tab") as
    | "hero"
    | "perks"
    | "culture"
    | "environment"
    | "cta"
    | null;
  const [activeTab, setActiveTab] = useState<
    "hero" | "perks" | "culture" | "environment" | "cta"
  >(tabFromUrl || "hero");

  const [pageData, setPageData] = useState<CareersPageData>(
    defaultCareersPageData,
  );
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  // Sync tab with URL changes
  useEffect(() => {
    const tab = searchParams.get("tab") as
      | "hero"
      | "perks"
      | "culture"
      | "environment"
      | "cta"
      | null;
    if (
      tab &&
      ["hero", "perks", "culture", "environment", "cta"].includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (data?.pageData) {
      setPageData(data.pageData);
    }
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/careers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageData }),
      });
      if (!res.ok) throw new Error("Failed to save");
      await mutate();
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleSeedData = async () => {
    if (!confirm("This will seed default careers data. Continue?")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seed" }),
      });
      if (res.ok) {
        await mutate();
        alert("Careers data seeded successfully!");
      }
    } finally {
      setSaving(false);
    }
  };

  // Perks management
  const addPerk = () => {
    const newPerk: PerkItem = {
      id: `perk-${Date.now()}`,
      icon: "Sprout",
      title: "",
      description: "",
      order: pageData.perks.length,
    };
    setPageData({ ...pageData, perks: [...pageData.perks, newPerk] });
  };

  const removePerk = (index: number) => {
    setPageData({
      ...pageData,
      perks: pageData.perks.filter((_, i) => i !== index),
    });
  };

  const updatePerk = (
    index: number,
    field: keyof PerkItem,
    value: string | number,
  ) => {
    const updated = [...pageData.perks];
    updated[index] = { ...updated[index], [field]: value };
    setPageData({ ...pageData, perks: updated });
  };

  // Culture highlights management
  const addHighlight = () => {
    const newHighlight: CultureHighlight = {
      id: `culture-${Date.now()}`,
      icon: "Settings",
      title: "",
      description: "",
      order: pageData.cultureHighlights.length,
    };
    setPageData({
      ...pageData,
      cultureHighlights: [...pageData.cultureHighlights, newHighlight],
    });
  };

  const removeHighlight = (index: number) => {
    setPageData({
      ...pageData,
      cultureHighlights: pageData.cultureHighlights.filter(
        (_, i) => i !== index,
      ),
    });
  };

  const updateHighlight = (
    index: number,
    field: keyof CultureHighlight,
    value: string | number,
  ) => {
    const updated = [...pageData.cultureHighlights];
    updated[index] = { ...updated[index], [field]: value };
    setPageData({ ...pageData, cultureHighlights: updated });
  };

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f5f7f0]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
      </div>
    );
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
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-[#f5f7f0]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <p className="text-sm text-red-600">Failed to load careers data.</p>
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
    );
  }

  return (
    <div className="flex h-screen bg-[#f5f7f0]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">
              Careers Manager
            </h1>
            <p className="text-sm text-[#666]">
              Manage careers page content and settings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeedData}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg border border-[#ddd] bg-white px-4 py-2.5 text-sm font-medium text-[#666] hover:bg-[#f5f5f5]"
            >
              <RefreshCw
                className={`h-4 w-4 ${saving ? "animate-spin" : ""}`}
              />
              Seed Data
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
              }`}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saveStatus === "success" ? "Saved!" : "Save All"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-[#e5e5e5]">
          {[
            { id: "hero", label: "Hero Section" },
            { id: "perks", label: "Perks & Benefits" },
            { id: "culture", label: "Culture Highlights" },
            { id: "environment", label: "Work Environment" },
            { id: "cta", label: "CTA Section" },
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

        {/* Hero Section Tab */}
        {activeTab === "hero" && (
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-6">
              Hero Section
            </h2>
            <div className="space-y-6">
              <ImageUpload
                label="Hero Background Image"
                value={pageData.heroImage}
                onChange={(url) => setPageData({ ...pageData, heroImage: url })}
              />
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
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Breadcrumb Label
                </label>
                <input
                  type="text"
                  value={pageData.heroBreadcrumb}
                  onChange={(e) =>
                    setPageData({ ...pageData, heroBreadcrumb: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Perks & Benefits Tab */}
        {activeTab === "perks" && (
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">
                Perks & Benefits
              </h2>
              <button
                onClick={addPerk}
                className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-3 py-1.5 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
              >
                <Plus className="h-3.5 w-3.5" /> Add Perk
              </button>
            </div>

            {/* Section Settings */}
            <div className="grid gap-4 sm:grid-cols-2 mb-6 pb-6 border-b border-[#e5e5e5]">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Section Label
                </label>
                <input
                  type="text"
                  value={pageData.perksLabel}
                  onChange={(e) =>
                    setPageData({ ...pageData, perksLabel: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={pageData.perksHeading}
                  onChange={(e) =>
                    setPageData({ ...pageData, perksHeading: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
            </div>

            {/* Perks List */}
            <div className="space-y-4">
              {pageData.perks.map((perk, index) => (
                <div
                  key={perk.id}
                  className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-[#999]" />
                      <span className="text-xs font-semibold uppercase text-[#888]">
                        Perk {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removePerk(index)}
                      className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <select
                      value={perk.icon}
                      onChange={(e) =>
                        updatePerk(index, "icon", e.target.value)
                      }
                      className="rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    >
                      {perkIcons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Title"
                      value={perk.title}
                      onChange={(e) =>
                        updatePerk(index, "title", e.target.value)
                      }
                      className="rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                    <input
                      type="number"
                      placeholder="Order"
                      value={perk.order}
                      onChange={(e) =>
                        updatePerk(
                          index,
                          "order",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={perk.description}
                    onChange={(e) =>
                      updatePerk(index, "description", e.target.value)
                    }
                    rows={2}
                    className="mt-3 w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Culture Highlights Tab */}
        {activeTab === "culture" && (
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">
                Culture Highlights
              </h2>
              <button
                onClick={addHighlight}
                className="flex items-center gap-1 rounded-lg bg-[#2d6a2e]/10 px-3 py-1.5 text-xs font-medium text-[#2d6a2e] hover:bg-[#2d6a2e]/20"
              >
                <Plus className="h-3.5 w-3.5" /> Add Highlight
              </button>
            </div>

            {/* Section Settings */}
            <div className="space-y-4 mb-6 pb-6 border-b border-[#e5e5e5]">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={pageData.cultureHeading}
                  onChange={(e) =>
                    setPageData({ ...pageData, cultureHeading: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Section Description
                </label>
                <textarea
                  value={pageData.cultureDescription}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      cultureDescription: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-4">
              {pageData.cultureHighlights.map((highlight, index) => (
                <div
                  key={highlight.id}
                  className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-[#999]" />
                      <span className="text-xs font-semibold uppercase text-[#888]">
                        Highlight {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeHighlight(index)}
                      className="rounded p-1 text-[#999] hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <select
                      value={highlight.icon}
                      onChange={(e) =>
                        updateHighlight(index, "icon", e.target.value)
                      }
                      className="rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    >
                      {cultureIcons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Title"
                      value={highlight.title}
                      onChange={(e) =>
                        updateHighlight(index, "title", e.target.value)
                      }
                      className="rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                    <input
                      type="number"
                      placeholder="Order"
                      value={highlight.order}
                      onChange={(e) =>
                        updateHighlight(
                          index,
                          "order",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={highlight.description}
                    onChange={(e) =>
                      updateHighlight(index, "description", e.target.value)
                    }
                    rows={2}
                    className="mt-3 w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Environment Tab */}
        {activeTab === "environment" && (
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-6">
              Work Environment Section
            </h2>
            <div className="space-y-6">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Heading
                </label>
                <input
                  type="text"
                  value={pageData.workEnvironment?.heading || ""}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      workEnvironment: {
                        ...pageData.workEnvironment,
                        heading: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Description
                </label>
                <textarea
                  value={pageData.workEnvironment?.description || ""}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      workEnvironment: {
                        ...pageData.workEnvironment,
                        description: e.target.value,
                      },
                    })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
              <ImageUpload
                label="Section Image"
                value={pageData.workEnvironment?.image || ""}
                onChange={(url) =>
                  setPageData({
                    ...pageData,
                    workEnvironment: {
                      ...pageData.workEnvironment,
                      image: url,
                    },
                  })
                }
              />
            </div>
          </div>
        )}

        {/* CTA Section Tab */}
        {activeTab === "cta" && (
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-6">
              CTA Section
            </h2>
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#666]">
                    Label
                  </label>
                  <input
                    type="text"
                    value={pageData.ctaSection?.label || ""}
                    onChange={(e) =>
                      setPageData({
                        ...pageData,
                        ctaSection: {
                          ...pageData.ctaSection,
                          label: e.target.value,
                        },
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
                    value={pageData.ctaSection?.buttonText || ""}
                    onChange={(e) =>
                      setPageData({
                        ...pageData,
                        ctaSection: {
                          ...pageData.ctaSection,
                          buttonText: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Heading
                </label>
                <input
                  type="text"
                  value={pageData.ctaSection?.heading || ""}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      ctaSection: {
                        ...pageData.ctaSection,
                        heading: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Subheading
                </label>
                <input
                  type="text"
                  value={pageData.ctaSection?.subheading || ""}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      ctaSection: {
                        ...pageData.ctaSection,
                        subheading: e.target.value,
                      },
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
                  value={pageData.ctaSection?.placeholder || ""}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      ctaSection: {
                        ...pageData.ctaSection,
                        placeholder: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d6a2e]"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
