import Image from "next/image";

interface HeroProps {
  data?: Record<string, unknown>;
}

export default function HeroSection({ data }: HeroProps) {
  if (!data) return null;

  const heading = data.heading as string;
  const statValue = data.statValue as string;
  const statLabel = data.statLabel as string;
  const backgroundImage = data.backgroundImage as string;
  const statImage = data.statImage as string;
  const avatarsImage = data.avatarsImage as string;
  const rating = data.rating as string;
  const reviewCount = data.reviewCount as string;
  const tagline = data.tagline as string;

  return (
    <section className="relative min-h-[600px] overflow-hidden lg:min-h-[650px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Landscaper working in a beautiful garden"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1a3a1a]/30" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-6 pt-40 pb-8 lg:pt-60 lg:pb-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[64px]">
              {heading}
            </h1>
          </div>

          {/* Stat Card */}
          <div className="flex shrink-0 items-stretch overflow-hidden rounded-2xl shadow-xl">
            <div className="flex flex-col justify-center bg-[#C5E842] px-6 py-5">
              <span className="text-4xl font-extrabold text-[#1a3a1a] md:text-5xl">
                {statValue}
              </span>
              <div className="mt-1 h-px w-12 bg-[#1a3a1a]/30" />
              <p className="mt-2 whitespace-pre-line text-sm font-medium leading-tight text-[#1a3a1a]/80">
                {statLabel}
              </p>
            </div>
            <div className="relative w-28 md:w-36">
              <Image
                src={statImage}
                alt="Farmers working in the field"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/20 pt-6 lg:mt-10 lg:pt-8">
          <div className="flex items-center gap-4">
            <Image
              src={avatarsImage}
              alt="Team members"
              width={120}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="h-10"
            />
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{rating}</span>
              <span className="text-sm text-white/70">{reviewCount}</span>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-white/20 lg:block" />
          <span className="text-lg font-semibold tracking-wide text-white">
            {tagline}
          </span>
        </div>
      </div>

      {/* Bottom wave */}
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
  );
}
