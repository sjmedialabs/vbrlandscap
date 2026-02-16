import Image from "next/image"
import { Globe } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      {/* Leaf decoration - top left flowing down diagonally */}
      <div className="pointer-events-none absolute -top-8 -left-8 w-48 lg:w-72">
        <Image
          src="/images/leaf-decoration.png"
          alt=""
          width={300}
          height={400}
          className="h-auto w-full opacity-50"
          aria-hidden="true"
        />
      </div>

      {/* Garden tools decoration - bottom right */}
      <div className="pointer-events-none absolute -right-10 -bottom-6 hidden w-56 lg:block lg:w-72">
        <Image
          src="/images/garden-tools-decor.jpg"
          alt=""
          width={300}
          height={300}
          className="h-auto w-full"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left - Image Side */}
          <div className="relative w-full lg:w-[45%]">
            <div className="relative ml-6 mt-8 lg:ml-12 lg:mt-12">
              <div className="relative aspect-[3/4] w-full max-w-[480px] overflow-hidden rounded-2xl">
                <Image
                  src="/images/about-person.jpg"
                  alt="Professional landscaper holding a potted plant"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right - Content Side */}
          <div className="flex w-full flex-col justify-center lg:w-[55%]">
            {/* Section Badge */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" />
                About Our Company
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.15] text-foreground md:text-4xl lg:text-[46px]">
              Building Beautiful Landscapes Since Day One.
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {"From our very first project, we've been committed to creating outdoor spaces that feel natural, functional, and visually stunning. Our passion for landscaping."}
            </p>

            {/* Mission & Vision + Container Image */}
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:gap-8">
              {/* Mission & Vision stacked */}
              <div className="flex flex-1 flex-col gap-6">
                {/* Our Mission */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Image
                      src="/images/icon-landscape.png"
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-foreground">
                      Our Mission
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      To redefine the future of work by creating a world where every organization recognizes
                    </p>
                  </div>
                </div>

                {/* Our Vision */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Image
                      src="/images/icon-eye.png"
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-foreground">
                      Our Vision
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      To redefine the future of work by creating a world where every organization recognizes
                    </p>
                  </div>
                </div>
              </div>

              {/* Container Image - right side of mission/vision */}
              <div className="relative hidden h-52 w-52 shrink-0 overflow-hidden rounded-2xl lg:block">
                <Image
                  src="/images/container.png"
                  alt="Gardening tools in soil with yellow flowers"
                  fill
                  sizes="208px"
                  className="object-cover"
                />
                {/* Yellow-green circle overlay */}
                <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5d846]/70" />
              </div>
            </div>

            {/* Bottom Row - Discover More + Call Anytime */}
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              {/* Discover More Button */}
              <button
                type="button"
                className="group inline-flex items-center gap-3 rounded-full bg-[#c5d846] px-6 py-3 text-sm font-semibold text-foreground transition-all hover:brightness-95"
              >
                Discover More
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

              {/* Divider */}
              <div className="hidden h-10 w-px bg-border sm:block" />

              {/* Call Anytime */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Call Anytime</p>
                  <p className="text-sm font-bold text-foreground">
                    +88 017 500 500
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
