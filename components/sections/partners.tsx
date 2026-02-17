import Image from "next/image"

interface Partner {
  name: string
  image: string
  order?: number
}

interface PartnersProps {
  data?: Record<string, unknown>
}

export default function PartnersSection({ data }: PartnersProps) {
  if (!data) return null

  const partnersHeading = data.partnersHeading as string
  const partners = ((data.partners as Partner[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="border-y border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-medium text-muted-foreground">{partnersHeading}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center rounded-2xl border border-border bg-background px-6 py-4 transition-shadow hover:shadow-md">
              <Image src={partner.image} alt={partner.name} width={140} height={40} style={{ width: "auto", height: "auto" }} className="h-8 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
