"use client"

import { useState } from "react"
import { Send } from "lucide-react"

interface CareersNewsletterProps {
  heading: string
  description: string
  buttonText: string
  placeholder: string
}

export function CareersNewsletter({
  heading,
  description,
  buttonText,
  placeholder,
}: CareersNewsletterProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const res = await fetch("/api/sectors/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubmitStatus("success")
        setEmail("")
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-8 bg-gradient-to-r from-[#c8d96b] to-[#e8f0c8]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Heading */}
          <div className="flex-shrink-0">
            <h3 className="text-2xl font-bold text-[#1a1a1a]">
              {heading.split(" ").slice(0, 3).join(" ")}
              <br className="hidden sm:block" />
              {heading.split(" ").slice(3).join(" ")}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-[#555] max-w-xs text-center lg:text-left">
            {description}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
            <input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full bg-white border border-[#d4d9c4] px-5 py-3 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-[#2d6a2e]"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center w-12 h-12 rounded-full text-white transition-colors ${
                submitStatus === "success"
                  ? "bg-green-600"
                  : submitStatus === "error"
                  ? "bg-red-500"
                  : "bg-[#2d6a2e] hover:bg-[#245a25]"
              } ${isSubmitting ? "opacity-60" : ""}`}
              title={buttonText}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
