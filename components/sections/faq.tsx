"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { Leaf } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  order?: number
}

interface FAQProps {
  data?: Record<string, unknown>
}

export default function FAQSection({ data }: FAQProps) {
  if (!data) return null

  const badge = data.badge as string
  const heading = data.heading as string
  const decorationImage = data.decorationImage as string
  const items = ((data.items as FAQItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-14 lg:flex-row">
          <div className="hidden w-full items-center justify-center lg:flex lg:w-2/5">
            <div className="relative">
              <Leaf className="h-64 w-64 text-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={decorationImage} alt="" width={200} height={200} className="rounded-full object-cover" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-secondary uppercase">{badge}</span>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">{heading}</h2>

            <Accordion type="single" collapsible className="mt-8">
              {items.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-secondary hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
