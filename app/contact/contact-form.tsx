"use client"

import { useState, type FormEvent } from "react"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface ContactFormProps {
  enabled: boolean
  successMessage: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  phone?: string
  message?: string
}

export function ContactForm({ enabled, successMessage }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [serverMessage, setServerMessage] = useState("")

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = "Name is required"
    if (!form.email.trim()) {
      errs.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email format"
    }
    if (!form.message.trim()) errs.message = "Message is required"
    return errs
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus("loading")
    setServerMessage("")

    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setServerMessage(data.error || "Something went wrong. Please try again.")
        return
      }

      setStatus("success")
      setServerMessage(data.message || successMessage)
      setForm({ name: "", email: "", subject: "", phone: "", message: "" })
    } catch {
      setStatus("error")
      setServerMessage("Network error. Please try again later.")
    }
  }

  if (!enabled) {
    return (
      <div className="rounded-xl bg-[#f5f7f0] p-6 text-center">
        <p className="text-sm text-muted-foreground">
          The contact form is currently unavailable. Please reach out via phone or email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Row 1: Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: undefined })
            }}
            className={`w-full rounded-lg border bg-[#f9faf5] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors ${
              errors.name ? "border-red-400 focus:border-red-500" : "border-[#e8ebe0] focus:border-primary"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value })
              if (errors.email) setErrors({ ...errors, email: undefined })
            }}
            className={`w-full rounded-lg border bg-[#f9faf5] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors ${
              errors.email ? "border-red-400 focus:border-red-500" : "border-[#e8ebe0] focus:border-primary"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Row 2: Subject + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Enter Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-lg border border-[#e8ebe0] bg-[#f9faf5] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary"
        />
        <input
          type="tel"
          placeholder="Enter Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border border-[#e8ebe0] bg-[#f9faf5] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      {/* Row 3: Message */}
      <div>
        <textarea
          placeholder="Write a Message"
          rows={4}
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value })
            if (errors.message) setErrors({ ...errors, message: undefined })
          }}
          className={`w-full resize-none rounded-lg border bg-[#f9faf5] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors ${
            errors.message ? "border-red-400 focus:border-red-500" : "border-[#e8ebe0] focus:border-primary"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-primary py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "loading" ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </span>
        ) : (
          "Send A Message"
        )}
      </button>

      {/* Success / Error Message */}
      {status === "success" && (
        <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 p-4">
          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
          <p className="text-sm text-green-700">{serverMessage}</p>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{serverMessage}</p>
        </div>
      )}
    </form>
  )
}
