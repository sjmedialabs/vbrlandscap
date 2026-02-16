"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter subscription logic
  }

  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              Stay Updated With Expert Advice
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/60">
              Subscribe to our newsletter for landscaping tips, seasonal guides,
              and exclusive offers.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md items-center gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border-0 bg-primary-foreground/10 px-5 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:brightness-110"
            >
              Subscribe
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
