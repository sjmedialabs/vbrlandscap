"use client"

import { useState } from "react"
import { Send } from "lucide-react"

interface NewsletterProps {
  data?: Record<string, unknown>
}

export default function NewsletterSection({ data }: NewsletterProps) {
  const [email, setEmail] = useState("")

  if (!data) return null

  const heading = data.heading as string
  const description = data.description as string
  const buttonText = data.buttonText as string

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">{heading}</h2>
            <p className="mt-2 text-sm text-primary-foreground/60">{description}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border-0 bg-primary-foreground/10 px-5 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            />
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:brightness-110">
              {buttonText}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
