import { Suspense } from "react";
import AdminCareersClient from "./client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <AdminCareersClient />
    </Suspense>
  );
}
