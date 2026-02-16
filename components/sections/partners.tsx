import Image from "next/image"

const partners = [
  { name: "Vertigo", image: "/images/logo-vertigo.png" },
  { name: "Sitemark", image: "/images/logo-sitemark.png" },
  { name: "Snowflake", image: "/images/logo-snowflake.png" },
  { name: "Cactus", image: "/images/logo-cactus.png" },
  { name: "Greenin", image: "/images/logo-greenin.png" },
]

export default function PartnersSection() {
  return (
    <section className="border-y border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Trusted by Leading Brands
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center rounded-2xl border border-border bg-background px-6 py-4 transition-shadow hover:shadow-md"
            >
              <Image
                src={partner.image}
                alt={partner.name}
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
