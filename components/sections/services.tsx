import Image from "next/image"

const services = [
  {
    image: "/images/service-1.png",
    title: "Design & Planning",
    description: "Expert planting, pruning, and maintenance for healthy.",
  },
  {
    image: "/images/service-2.png",
    title: "Tree & Plant Care",
    description: "Expert planting, pruning, and maintenance for healthy.",
  },
  {
    image: "/images/service-3.png",
    title: "Drainage Systems",
    description: "Expert planting, pruning, and maintenance for healthy.",
  },
  {
    image: "/images/service-4.png",
    title: "Seasonal Clean-up",
    description: "Expert planting, pruning, and maintenance for healthy.",
  },
]

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f3eb] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d6d3c6] bg-background px-5 py-2 text-sm font-medium text-foreground">
            <span className="h-2 w-2 rounded-full bg-[#c5c43e]" />
            Our Services
          </span>
          <h2 className="mt-6 max-w-xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-[42px] md:leading-[1.15]">
            Empowering your workforce with expert services
          </h2>
        </div>

        {/* Service Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl bg-background p-5 pb-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Blob-masked image */}
              <div className="flex items-center justify-center">
                <div className="relative h-[220px] w-[220px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="220px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <span className="rounded-full bg-[#c5c43e] px-6 py-2 text-sm font-bold text-foreground uppercase">
            HURRY
          </span>
          <p className="text-sm text-muted-foreground md:text-base">
            Choose from our selection of the best places.
          </p>
          <a
            href="#"
            className="text-sm font-semibold text-foreground underline underline-offset-4 md:text-base"
          >
            Get a project in mind?
          </a>
        </div>
      </div>

      {/* Bottom-right leaf decoration */}
      <div className="pointer-events-none absolute -bottom-4 right-0 h-[200px] w-[200px] lg:h-[280px] lg:w-[280px]">
        <Image
          src="/images/leaf-green.png"
          alt=""
          fill
          sizes="280px"
          className="object-contain"
        />
      </div>
    </section>
  )
}
