import Image from "next/image"

const features = [
  {
    icon: "/images/icon-hand-plant.png",
    title: "Where Your Money Works Harder",
    description:
      "15+ years crafting identities for Fortune 500s to fast-growth startups Backgrounds in design psychology",
  },
  {
    icon: "/images/icon-aloe.png",
    title: "We Listen First, Invest Second",
    description:
      "Experts in responsive logo systems (SVG, animated, dark/light modes), Former start-up founders who understand business challenges",
  },
  {
    icon: "/images/icon-thumbs.png",
    title: "AI-Enhanced Portfolio Optimization",
    description:
      "15+ years crafting identities for Fortune 500s to fast-growth startups Backgrounds in design psychology",
  },
]

export default function TrustSection() {
  return (
    <section className="relative bg-background py-20 lg:py-28 overflow-hidden">
      {/* Trowel seedling decoration - bottom left */}
      <div className="absolute bottom-8 left-4 z-10 w-36 lg:w-44">
        <Image
          src="/images/trowel-seedling.png"
          alt=""
          width={180}
          height={160}
          className="object-contain"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 items-start">
          {/* Left Content */}
          <div className="w-full lg:w-[52%]">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-[#c5d44e]" />
              Why Choose Us
            </span>

            {/* Heading */}
            <h2 className="mt-6 text-balance text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Growing Trust Through Quality Work.
            </h2>

            {/* Paragraph */}
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipiscing elit commodo hendrerit, morbi non at metus nisi condimentum cubilia nulla, netus nec consequat
            </p>

            {/* Features with dashed line */}
            <div className="relative mt-10">
              {/* Vertical dashed connector line */}
              <div
                className="absolute left-[28px] top-[56px] bottom-[56px] w-px border-l border-dashed border-muted-foreground/30"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-5">
                    {/* Icon circle */}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary">
                      <Image
                        src={feature.icon}
                        alt=""
                        width={56}
                        height={56}
                        className="rounded-full"
                      />
                    </div>
                    {/* Text */}
                    <div className="pt-1">
                      <h3 className="text-lg font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Masked Images */}
          <div className="w-full lg:w-[48%] flex justify-center lg:justify-end">
            <div className="relative flex items-center gap-4">
              {/* First mask image - woman with leaves */}
              <div className="relative w-[200px] h-[280px] md:w-[220px] md:h-[300px]">
                <Image
                  src="/images/why-choose-mask.png"
                  alt="Woman holding plant leaves in a green field"
                  fill
                  sizes="(max-width: 1024px) 50vw, 220px"
                  className="object-contain"
                />
              </div>

              {/* Second mask image - hands with roots */}
              <div className="relative w-[200px] h-[280px] md:w-[220px] md:h-[300px]">
                <Image
                  src="/images/why-choose-mask-2.png"
                  alt="Gardener holding freshly harvested roots"
                  fill
                  sizes="(max-width: 1024px) 50vw, 220px"
                  className="object-contain"
                />
              </div>

              {/* 25+ Years badge overlay */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-full border-4 border-background bg-[#c5d44e] shadow-lg">
                  <div className="text-center">
                    <span className="block text-2xl md:text-3xl font-bold text-foreground">
                      {"25 +"}
                    </span>
                    <span className="block text-xs font-medium text-foreground/80 leading-tight">
                      Years of<br />Experience
                    </span>
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
