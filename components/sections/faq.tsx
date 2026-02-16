"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { Leaf } from "lucide-react"

const faqs = [
  {
    question: "How long does a full landscaping project take?",
    answer:
      "The timeline varies depending on the scope and complexity of the project. A typical residential landscape project takes 2-6 weeks from design to completion. We provide a detailed timeline during the planning phase so you know exactly what to expect.",
  },
  {
    question: "What types of services do you offer?",
    answer:
      "We offer a comprehensive range of landscaping services including design and planning, tree and plant care, drainage systems, seasonal clean-up, installation and construction, irrigation systems, and ongoing maintenance programs.",
  },
  {
    question: "Do you offer maintenance plans after installation?",
    answer:
      "Yes! We offer flexible maintenance plans tailored to your landscape needs. From weekly lawn care to seasonal deep maintenance, our team ensures your outdoor space looks pristine year-round.",
  },
  {
    question: "How often should I maintain my landscaping?",
    answer:
      "Regular maintenance is key to a healthy landscape. We recommend weekly or bi-weekly maintenance for lawns, monthly check-ups for gardens, and seasonal deep cleaning. Our experts will create a custom schedule based on your specific landscape.",
  },
  {
    question: "Is green services available for both homes and businesses?",
    answer:
      "Absolutely! We provide full-service landscaping for residential homes, commercial properties, HOA communities, and municipal spaces. Each project is customized to meet the unique requirements of the space and client.",
  },
]

export default function FAQSection() {
  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-14 lg:flex-row">
          {/* Left - Decorative */}
          <div className="hidden w-full items-center justify-center lg:flex lg:w-2/5">
            <div className="relative">
              <Leaf className="h-64 w-64 text-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/leaf-decoration.jpg"
                  alt="Decorative leaf"
                  width={200}
                  height={200}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right - FAQ */}
          <div className="w-full lg:w-3/5">
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-secondary uppercase">
              FAQ
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Your Most Important Questions Answered Here
            </h2>

            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-secondary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
