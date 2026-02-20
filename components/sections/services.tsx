import Image from "next/image";

interface ServiceItem {
  image: string;
  title: string;
  description: string;
  order?: number;
}

interface ServicesProps {
  data?: Record<string, unknown>;
}

export default function ServicesSection({ data }: ServicesProps) {
  if (!data) return null;

  const badge = data.badge as string;
  const heading = data.heading as string;
  const bottomTag = data.bottomTag as string;
  const bottomText = data.bottomText as string;
  const bottomLink = data.bottomLink as string;
  const leafImage = data.leafImage as string;
  const items = ((data.items as ServiceItem[]) || []).sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <section className="relative overflow-hidden bg-[#f5f3eb] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d6d3c6] bg-background px-5 py-2 text-sm font-medium text-foreground">
            <span className="h-2 w-2 rounded-full bg-[#c5c43e]" />
            {badge}
          </span>
          <h2 className="mt-6 max-w-xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-[42px] md:leading-[1.15]">
            {heading}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl bg-background p-5 pb-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-center">
                <div className="relative h-[220px] w-[220px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="220px"
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <span className="rounded-full bg-[#c5c43e] px-6 py-2 text-sm font-bold text-foreground uppercase">
            {bottomTag}
          </span>
          <p className="text-sm text-muted-foreground md:text-base">
            {bottomText}
          </p>
          <a
            href="#"
            className="text-sm font-semibold text-foreground underline underline-offset-4 md:text-base"
          >
            {bottomLink}
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-4 right-0 h-[200px] w-[200px] lg:h-[280px] lg:w-[280px] z-[9999]">
        <Image
          src={leafImage}
          alt=""
          fill
          sizes="280px"
          className="object-contain"
        />
      </div>
    </section>
  );
}
