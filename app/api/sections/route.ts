import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapshot = await adminDb.collection("sections").get();

    const sections: Record<string, unknown> = {};

    snapshot.forEach((doc) => {
      sections[doc.id] = {
        id: doc.id,
        ...doc.data(),
      };
    });

    return NextResponse.json(sections);
  } catch (error: any) {
    console.error("GET /sections error:", error);

    return NextResponse.json(
      { error: error?.message || "Unknown error" },
      { status: 500 },
    );
  }
}
