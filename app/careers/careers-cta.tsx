"use client"

import { useState } from "react"

interface CareersCTAProps {
  label: string
  heading: string
  subheading: string
  placeholder: string
  buttonText: string
}

export function CareersCTA({
  label,
  heading,
  subheading,
  placeholder,
  buttonText,
}: CareersCTAProps) {
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
    <section className="py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-[#2d6a2e] px-8 py-12 md:px-16 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text */}
            <div>
              {/* Label */}
              <span className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-sm text-white/90 mb-6">
                {label}
              </span>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                {heading}
              </h2>

              {/* Subheading */}
              <p className="text-white/80 text-lg">
                {subheading}
              </p>
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full bg-white/10 border border-white/20 px-6 py-4 text-white placeholder:text-white/50 outline-none focus:border-white/40 focus:bg-white/15 transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded-full px-8 py-4 font-semibold transition-all ${
                    submitStatus === "success"
                      ? "bg-green-500 text-white"
                      : submitStatus === "error"
                      ? "bg-red-500 text-white"
                      : "bg-[#b9c44b] text-[#1a1a1a] hover:bg-[#c8d96b]"
                  } ${isSubmitting ? "opacity-60" : ""}`}
                >
                  {submitStatus === "success" ? "Subscribed!" : submitStatus === "error" ? "Try Again" : buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
