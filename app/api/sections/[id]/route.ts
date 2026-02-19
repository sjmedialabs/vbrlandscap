import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// GET single section (for editor load)
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const doc = await adminDb.collection("sections").doc(params.slug).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error: any) {
    console.error("GET /sections/[slug] error:", error);

    return NextResponse.json(
      { error: error?.message || "Fetch failed" },
      { status: 500 },
    );
  }
}

// UPDATE section (Save button)
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const body = await req.json();

    await adminDb
      .collection("sections")
      .doc(params.slug)
      .set(body, { merge: true });

    return NextResponse.json({
      success: true,
      message: "Section updated",
    });
  } catch (error: any) {
    console.error("PUT /sections/[slug] error:", error);

    return NextResponse.json(
      { error: error?.message || "Update failed" },
      { status: 500 },
    );
  }
}
