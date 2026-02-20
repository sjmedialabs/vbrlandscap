"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useSections } from "@/lib/use-sections";
import {
  Loader2,
  FileText,
  AlertTriangle,
  ExternalLink,
  Database,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { data, isLoading } = useSections();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f5f7f0]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a2e]" />
      </div>
    );
  }

  const sectionCount = data && !data.error ? Object.keys(data).length : 0;
  const hasSections = sectionCount > 0;

  return (
    <div className="flex h-screen bg-[#f5f7f0]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Dashboard</h1>
          <p className="text-sm text-[#666]">
            Manage all website content from here
          </p>
        </div>

        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#2d6a2e]" />
          </div>
        ) : (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a2e]/10">
                  <FileText className="h-5 w-5 text-[#2d6a2e]" />
                </div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {sectionCount}
                </p>
                <p className="text-sm text-[#666]">Content Sections</p>
              </div>
              <DatabaseCard hasSections={hasSections} />
              <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a2e]/10">
                  <ExternalLink className="h-5 w-5 text-[#2d6a2e]" />
                </div>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#2d6a2e] hover:underline"
                >
                  View Live Site
                </a>
                <p className="text-sm text-[#666]">Open website in new tab</p>
              </div>
            </div>

            {!hasSections && (
              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-yellow-800">
                      Database Not Seeded
                    </p>
                    <p className="mt-1 text-sm text-yellow-700">
                      Click the button below to populate the database with
                      default content.
                    </p>
                    <SeedButton />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function DatabaseCard({ hasSections }: { hasSections: boolean }) {
  const { mutate } = useSections();
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    if (seeding) return;
    const confirmMsg = hasSections
      ? "This will overwrite existing data. Are you sure?"
      : "Seed the database with default content?";
    if (!confirm(confirmMsg)) return;

    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const result = await res.json();
      if (result.success) {
        await mutate();
        alert("Database seeded successfully!");
      } else {
        alert("Seed failed: " + result.error);
      }
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a2e]/10">
          <Database className="h-5 w-5 text-[#2d6a2e]" />
        </div>
        {/* <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-1.5 rounded-lg bg-[#2d6a2e] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#245a25] disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${seeding ? "animate-spin" : ""}`} />
          {seeding ? "Seeding..." : "Seed Data"}
        </button> */}
      </div>
      <p className="text-2xl font-bold text-[#1a1a1a]">
        {hasSections ? "Connected" : "Not Seeded"}
      </p>
      <p className="text-sm text-[#666]">Firestore Database</p>
    </div>
  );
}

function SeedButton() {
  const { mutate } = useSections();

  const handleSeed = async () => {
    const res = await fetch("/api/seed", { method: "POST" });
    const result = await res.json();
    if (result.success) {
      await mutate();
      alert("Database seeded successfully!");
    } else {
      alert("Seed failed: " + result.error);
    }
  };

  return (
    <button
      onClick={handleSeed}
      className="mt-3 rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700"
    >
      Seed Database Now
    </button>
  );
}
