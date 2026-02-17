import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-[650px] overflow-hidden lg:min-h-[750px]">
      {/* Background Image - dark green tinted garden */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Landscaper working in a beautiful garden"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Dark green overlay for depth */}
        <div className="absolute inset-0 bg-[#1a3a1a]/30" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-6 pt-40 pb-8 lg:pt-48 lg:pb-12">
        {/* Main heading */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[64px]">
              Transforming Outdoor Spaces Into Natural Beauty.
            </h1>
          </div>

          {/* 98% Card - positioned to the right */}
          <div className="flex shrink-0 items-stretch overflow-hidden rounded-2xl shadow-xl">
            {/* Left - lime green stat */}
            <div className="flex flex-col justify-center bg-[#C5E842] px-6 py-5">
              <span className="text-4xl font-extrabold text-[#1a3a1a] md:text-5xl">
                98 %
              </span>
              <div className="mt-1 h-px w-12 bg-[#1a3a1a]/30" />
              <p className="mt-2 text-sm font-medium leading-tight text-[#1a3a1a]/80">
                Reduction in
                <br />
                employee turnover
              </p>
            </div>
            {/* Right - farmer image */}
            <div className="relative w-28 md:w-36">
              <Image
                src="/images/rectangle-11.png"
                alt="Farmers working in the field"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom row - avatars + rating + Effective Talent */}
        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/20 pt-6 lg:mt-10 lg:pt-8">
          {/* Avatar group + Rating */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/avatars.png"
              alt="Team members"
              width={120}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="h-10"
            />
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">4.8</span>
              <span className="text-sm text-white/70">
                Based on 204 Reviews
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden h-8 w-px bg-white/20 lg:block" />

          {/* Effective Talent */}
          <span className="text-lg font-semibold tracking-wide text-white">
            Effective Talent
          </span>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V20C360 45 720 0 1080 20C1260 30 1380 25 1440 20V60H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  )
}
