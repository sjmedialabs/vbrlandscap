import Image from "next/image"
import { Star, Quote } from "lucide-react"

interface TestimonialItem {
  name: string
  role: string
  text: string
  rating: number
  order?: number
}

interface TestimonialsProps {
  data?: Record<string, unknown>
}

export default function TestimonialsSection({ data }: TestimonialsProps) {
  if (!data) return null

  const badge = data.badge as string
  const heading = data.heading as string
  const rating = data.rating as string
  const reviewText = data.reviewText as string
  const backgroundImage = data.backgroundImage as string
  const items = ((data.items as TestimonialItem[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-14 lg:flex-row">
          <div className="w-full lg:w-2/5">
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-secondary uppercase">{badge}</span>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">{heading}</h2>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-3xl font-extrabold text-foreground">{rating}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{reviewText}</p>
            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image src={backgroundImage} alt="Happy customers with landscaped garden" width={500} height={300} className="aspect-[5/3] w-full object-cover" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-5 lg:w-3/5">
            {items.map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 shrink-0 text-secondary/30" />
                  <div>
                    <p className="leading-relaxed text-card-foreground">{testimonial.text}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-card-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
