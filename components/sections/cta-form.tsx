"use client"

import Image from "next/image"
import { useState } from "react"

interface CTAFormProps {
  data?: Record<string, unknown>
}

export default function CTAFormSection({ data }: CTAFormProps) {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    message: "",
  })

  if (!data) return null

  const heading = data.heading as string
  const contactBadge = data.contactBadge as string
  const submitButtonText = data.submitButtonText as string
  const backgroundImage = data.backgroundImage as string
  const testimonialImage = data.testimonialImage as string
  const testimonialQuote = data.testimonialQuote as string
  const testimonialAuthor = data.testimonialAuthor as string

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="Garden background" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d5a27]/90 via-[#3a7233]/85 to-[#2d5a27]/80" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#f9fbe7] via-[#f5f8e8] to-[#eef5d0] shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-[45%]">
              <div className="relative h-80 overflow-hidden lg:h-full">
                <div className="absolute inset-3 z-0 rounded-2xl border-2 border-[#c5d44e]/50" />
                <div className="absolute inset-4 z-10 overflow-hidden rounded-2xl">
                  <Image src={testimonialImage} alt="Professional landscaper installing turf" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-6 pt-20">
                    <p className="text-lg font-bold leading-snug text-white italic">
                      {`"${testimonialQuote}"`}
                    </p>
                    <p className="mt-3 text-sm font-medium text-white/80">{testimonialAuthor}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-8 py-10 lg:w-[55%] lg:px-12 lg:py-12">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">{heading}</h2>
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#c5d44e]" />
                    {contactBadge}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input type="text" placeholder="First" value={formData.first} onChange={(e) => setFormData({ ...formData, first: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none" required />
                    <input type="text" placeholder="Last" value={formData.last} onChange={(e) => setFormData({ ...formData, last: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none" required />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none" required />
                    <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none" />
                    <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none" />
                  </div>
                  <textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none" />
                  <button type="submit" className="mt-2 w-fit rounded-full bg-[#c5d44e] px-8 py-3.5 text-sm font-bold tracking-wider text-foreground uppercase transition-all hover:brightness-110">{submitButtonText}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
