import { NextResponse } from "next/server"
import { getNewsletterSettings } from "@/lib/sectors-firestore"

export const dynamic = "force-dynamic"

interface NewsletterFormData {
  email: string
}

// POST: Handle newsletter subscription
export async function POST(request: Request) {
  try {
    const body: NewsletterFormData = await request.json()

    // Validate email
    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
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

    // Get newsletter settings
    const settings = await getNewsletterSettings()

    // In a production environment, you would:
    // 1. Send the email to your newsletter provider (Mailchimp, ConvertKit, etc.)
    // 2. Store the subscription in Firestore
    // 3. Handle provider-specific API calls

    // For now, we'll just log and return success
    console.log("[Newsletter Subscription]", {
      email: body.email,
      provider: settings?.mailProvider || "Not configured",
      apiEndpoint: settings?.apiEndpoint || "Not configured",
      timestamp: new Date().toISOString(),
    })

    // If an API endpoint is configured, you could call it here:
    // if (settings?.apiEndpoint) {
    //   await fetch(settings.apiEndpoint, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: body.email }),
    //   })
    // }

    const successMessage = settings?.successMessage || "Thank you for subscribing! You'll receive updates soon."

    return NextResponse.json({
      success: true,
      message: successMessage,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/sectors/newsletter error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
