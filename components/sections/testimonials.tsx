import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Michael Chen",
    role: "Homeowner",
    text: "Landscope transformed our backyard into a stunning retreat. Their attention to detail and creative design exceeded all our expectations. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amanda Foster",
    role: "Business Owner",
    text: "The team delivered an incredible commercial landscape for our office campus. Professional, on time, and the results speak for themselves.",
    rating: 5,
  },
  {
    name: "David Hernandez",
    role: "Property Manager",
    text: "We have been using Landscope for ongoing maintenance for 3 years. Their reliability and quality are unmatched in the industry.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-14 lg:flex-row">
          {/* Left Side - Overview */}
          <div className="w-full lg:w-2/5">
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-secondary uppercase">
              Testimonials
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Hear from Our Happy Customers.
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>
              <span className="text-3xl font-extrabold text-foreground">
                4.8
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on 500+ verified customer reviews
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image
                src="/images/testimonial-bg.jpg"
                alt="Happy customers with landscaped garden"
                width={500}
                height={300}
                className="aspect-[5/3] w-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Testimonial Cards */}
          <div className="flex w-full flex-col gap-5 lg:w-3/5">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 shrink-0 text-secondary/30" />
                  <div>
                    <p className="leading-relaxed text-card-foreground">
                      {testimonial.text}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-card-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-accent text-accent"
                          />
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
