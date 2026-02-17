import Image from "next/image"

interface TeamMember {
  name: string
  role: string
  image: string
  order?: number
}

interface Partner {
  name: string
  image: string
  order?: number
}

interface TeamProps {
  data?: Record<string, unknown>
}

export default function TeamSection({ data }: TeamProps) {
  if (!data) return null

  const badge = data.badge as string
  const heading = data.heading as string
  const partnersHeading = data.partnersHeading as string
  const leafImage = data.leafImage as string
  const members = ((data.members as TeamMember[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const partners = ((data.partners as Partner[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-28 lg:w-36">
        <Image src={leafImage} alt="" width={144} height={180} className="h-auto w-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold tracking-wide text-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-[#c5d44e]" />
            {badge}
          </span>
          <h2 className="mx-auto mt-5 max-w-xl text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">{heading}</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <div key={`${member.name}-${index}`} className="group relative overflow-hidden rounded-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-16">
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-white/80">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-4">
            <h3 className="shrink-0 text-sm font-bold tracking-wide text-foreground">{partnersHeading}</h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center rounded-2xl border border-border bg-background px-6 py-5 transition-shadow hover:shadow-md">
                <Image src={partner.image} alt={partner.name} width={140} height={40} className="h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
