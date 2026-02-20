import { NextResponse } from "next/server"
import { getContactFormSettings } from "@/lib/sectors-firestore"

export const dynamic = "force-dynamic"

interface ContactFormData {
  name: string
  email: string
  subject: string
  phone: string
  message: string
}

// POST: Handle contact form submission
export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Get contact form settings
    const settings = await getContactFormSettings()

    // Check if form is enabled
    if (settings && !settings.formEnabled) {
      return NextResponse.json(
        { error: "Contact form is currently disabled" },
        { status: 503 }
      )
    }

    // In a production environment, you would:
    // 1. Send email to recipientEmail using a service like SendGrid, Resend, etc.
    // 2. Store the submission in Firestore
    // 3. Send auto-reply if enabled

    // For now, we'll just log and return success
    console.log("[Contact Form Submission]", {
      name: body.name,
      email: body.email,
      subject: body.subject,
      phone: body.phone,
      message: body.message,
      recipientEmail: settings?.recipientEmail || "Not configured",
      timestamp: new Date().toISOString(),
    })

    // Store submission in Firestore (optional - for tracking purposes)
    // You can implement this if needed

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. We will get back to you soon.",
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/sectors/contact error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
