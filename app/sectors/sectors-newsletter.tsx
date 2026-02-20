"use client"

import { useState } from "react"
import { Send } from "lucide-react"

interface SectorsNewsletterProps {
  heading: string
  description: string
  buttonText: string
  placeholder: string
}

export function SectorsNewsletter({
  heading,
  description,
  buttonText,
  placeholder,
}: SectorsNewsletterProps) {
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

        {/* Social Icons */}
        <div className="flex items-center justify-end gap-3 mt-6 lg:mt-0">
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d6a2e] text-white hover:bg-[#245a25] transition-colors"
            aria-label="Twitter"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d6a2e] text-white hover:bg-[#245a25] transition-colors"
            aria-label="Facebook"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d6a2e] text-white hover:bg-[#245a25] transition-colors"
            aria-label="YouTube"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d6a2e] text-white hover:bg-[#245a25] transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
