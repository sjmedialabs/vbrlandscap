const partners = [
  "Vertige",
  "Element",
  "Snowflake",
  "Clarkus",
  "Greenin",
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
            <span
              key={partner}
              className="text-xl font-bold tracking-tight text-foreground/30 transition-colors hover:text-foreground/60"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
