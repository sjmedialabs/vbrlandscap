import Image from "next/image";
import { Globe } from "lucide-react";

interface AboutProps {
  data?: Record<string, unknown>;
}

export default function AboutSection({ data }: AboutProps) {
  if (!data) return null;

  const badge = data.badge as string;
  const heading = data.heading as string;
  const description = data.description as string;
  const personImage = data.personImage as string;
  const leafDecoration = data.leafDecoration as string;
  const gardenToolsDecor = data.gardenToolsDecor as string;
  const containerImage = data.containerImage as string;
  const missionIcon = data.missionIcon as string;
  const missionTitle = data.missionTitle as string;
  const missionDescription = data.missionDescription as string;
  const visionIcon = data.visionIcon as string;
  const visionTitle = data.visionTitle as string;
  const visionDescription = data.visionDescription as string;
  const ctaButtonText = data.ctaButtonText as string;
  const phoneLabel = data.phoneLabel as string;
  const phoneNumber = data.phoneNumber as string;

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      {/* Leaf decoration */}
      <div className="pointer-events-none absolute -top-8 -left-8">
        <Image
          src={leafDecoration}
          alt=""
          width={800}
          height={600}
          className="h-auto w-full opacity-50"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute -right-10 -bottom-6 hidden w-56 lg:block lg:w-72">
        <Image
          src={gardenToolsDecor}
          alt=""
          width={300}
          height={300}
          className="h-auto w-full"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto flex flex-col justify-end px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left - Image */}
          <div className="relative w-full lg:w-[45%]">
            <div className="relative ml-6 mt-8 lg:ml-12 lg:mt-12">
              <div className="relative aspect-[3/4] w-full max-w-[480px] overflow-hidden rounded-2xl">
                <Image
                  src={personImage}
                  alt="Professional landscaper"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex w-full flex-col justify-center lg:w-[55%]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {badge}
              </span>
            </div>
            <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.15] text-foreground md:text-4xl lg:text-[46px]">
              {heading}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {description}
            </p>

            {/* Mission & Vision */}
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:gap-8">
              <div className="flex flex-1 flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Image
                      src={missionIcon}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-foreground">
                      {missionTitle}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {missionDescription}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Image
                      src={visionIcon}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-foreground">
                      {visionTitle}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {visionDescription}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative hidden h-52 w-52 shrink-0 overflow-hidden rounded-2xl lg:block">
                <Image
                  src={containerImage}
                  alt="Gardening tools"
                  fill
                  sizes="208px"
                  className="object-cover"
                />
                <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5d846]/70" />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                className="group inline-flex items-center gap-3 rounded-full bg-[#c5d846] px-6 py-3 text-sm font-semibold text-foreground transition-all hover:brightness-95"
              >
                {ctaButtonText}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/50">
                  <svg
                    className="h-3.5 w-3.5 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
              <div className="hidden h-10 w-px bg-border sm:block" />
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{phoneLabel}</p>
                  <p className="text-sm font-bold text-foreground">
                    {phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
