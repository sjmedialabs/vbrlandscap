import { NextResponse } from "next/server"
import { getSection } from "@/lib/firestore"

export const dynamic = "force-dynamic"

// Simple in-memory rate limiter (per IP, 5 submissions per 15 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  phone: string
  message: string
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() || "unknown"

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      )
    }

    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      )
    }

    // Sanitize inputs (strip HTML)
    const sanitize = (str: string) => str.replace(/<[^>]*>/g, "").trim()
    const sanitizedData = {
      name: sanitize(body.name),
      email: sanitize(body.email),
      subject: sanitize(body.subject || ""),
      phone: sanitize(body.phone || ""),
      message: sanitize(body.message),
    }

    // Get contact page settings to check if form is enabled
    let contactData: Record<string, unknown> | null = null
    try {
      contactData = await getSection("page-contact")
    } catch {
      // Continue with defaults
    }

    if (contactData?.formEnabled === false) {
      return NextResponse.json(
        { error: "Contact form is currently disabled." },
        { status: 503 }
      )
    }

    // Log the submission (in production, integrate email service here)
    console.log("[Contact Form Submission]", {
      ...sanitizedData,
      recipientEmail: (contactData?.recipientEmail as string) || "Not configured",
      timestamp: new Date().toISOString(),
    })

    // In production, you would:
    // 1. Send email via Nodemailer / SendGrid / Resend
    // 2. Optionally store submission in Firestore
    // 3. Send auto-reply if configured

    const successMsg =
      (contactData?.formSuccessMessage as string) ||
      "Your message has been sent successfully. We will get back to you soon."

    return NextResponse.json({
      success: true,
      message: successMsg,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/contact/submit error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
