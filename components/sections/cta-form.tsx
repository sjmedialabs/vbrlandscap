"use client"

import Image from "next/image"
import { useState } from "react"

export default function CTAFormSection() {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Full-width green gradient background with garden image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-garden-bg.png"
          alt="Garden background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d5a27]/90 via-[#3a7233]/85 to-[#2d5a27]/80" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* White/cream card */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#f9fbe7] via-[#f5f8e8] to-[#eef5d0] shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Image with testimonial */}
            <div className="relative w-full lg:w-[45%]">
              <div className="relative h-80 overflow-hidden lg:h-full">
                {/* Lime/yellow-green border accent */}
                <div className="absolute inset-3 z-0 rounded-2xl border-2 border-[#c5d44e]/50" />
                <div className="absolute inset-4 z-10 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/turf-installer.png"
                    alt="Professional landscaper installing turf"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  {/* Dark gradient for testimonial text */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-6 pt-20">
                    <p className="text-lg font-bold leading-snug text-white italic">
                      {'"They made my home sparkle! Highly professional and fast service"'}
                    </p>
                    <p className="mt-3 text-sm font-medium text-white/80">
                      Stiven Dowson
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full px-8 py-10 lg:w-[55%] lg:px-12 lg:py-12">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                {"We're Here to Help!"}
              </h2>

              <form onSubmit={handleSubmit} className="mt-8">
                {/* Contact Us badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#c5d44e]" />
                    Contact Us
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Row 1: First / Last */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="First"
                      value={formData.first}
                      onChange={(e) =>
                        setFormData({ ...formData, first: e.target.value })
                      }
                      className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last"
                      value={formData.last}
                      onChange={(e) =>
                        setFormData({ ...formData, last: e.target.value })
                      }
                      className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                      required
                    />
                  </div>

                  {/* Row 2: Email / Phone */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                    />
                  </div>

                  {/* Row 3: Company / Address */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                    />
                  </div>

                  {/* Row 4: Message */}
                  <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    className="mt-2 w-fit rounded-full bg-[#c5d44e] px-8 py-3.5 text-sm font-bold tracking-wider text-foreground uppercase transition-all hover:brightness-110"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
