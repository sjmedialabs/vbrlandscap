import Image from "next/image"

interface Feature {
  icon: string
  title: string
  description: string
  order?: number
}

interface TrustProps {
  data?: Record<string, unknown>
}

export default function TrustSection({ data }: TrustProps) {
  if (!data) return null

  const badge = data.badge as string
  const heading = data.heading as string
  const description = data.description as string
  const maskImage1 = data.maskImage1 as string
  const maskImage2 = data.maskImage2 as string
  const trowelImage = data.trowelImage as string
  const badgeValue = data.badgeValue as string
  const badgeLabel = data.badgeLabel as string
  const features = ((data.features as Feature[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="relative bg-background py-20 lg:py-28 overflow-hidden">
      <div className="absolute bottom-8 left-4 z-10 w-36 lg:w-44">
        <Image src={trowelImage} alt="" width={180} height={160} className="object-contain" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 items-start">
          {/* Left Content */}
          <div className="w-full lg:w-[52%]">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-[#c5d44e]" />
              {badge}
            </span>
            <h2 className="mt-6 text-balance text-4xl font-bold leading-tight text-foreground md:text-5xl">{heading}</h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>

            <div className="relative mt-10">
              <div className="absolute left-[28px] top-[56px] bottom-[56px] w-px border-l border-dashed border-muted-foreground/30" aria-hidden="true" />
              <div className="flex flex-col gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary">
                      <Image src={feature.icon} alt="" width={56} height={56} className="rounded-full" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Masked Images */}
          <div className="w-full lg:w-[48%] flex justify-center lg:justify-end">
            <div className="relative flex items-center gap-4">
              <div className="relative w-[200px] h-[280px] md:w-[220px] md:h-[300px]">
                <Image src={maskImage1} alt="Woman holding plant leaves" fill sizes="(max-width: 1024px) 50vw, 220px" className="object-contain" />
              </div>
              <div className="relative w-[200px] h-[280px] md:w-[220px] md:h-[300px]">
                <Image src={maskImage2} alt="Gardener holding roots" fill sizes="(max-width: 1024px) 50vw, 220px" className="object-contain" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-full border-4 border-background bg-[#c5d44e] shadow-lg">
                  <div className="text-center">
                    <span className="block text-2xl md:text-3xl font-bold text-foreground">{badgeValue}</span>
                    <span className="block whitespace-pre-line text-xs font-medium text-foreground/80 leading-tight">{badgeLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
