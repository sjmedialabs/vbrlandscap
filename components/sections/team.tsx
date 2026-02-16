import Image from "next/image"

const teamMembers = [
  {
    name: "James Carter",
    role: "Senior Cleaning",
    image: "/images/team-1.jpg",
  },
  {
    name: "James David",
    role: "Senior Cleaning",
    image: "/images/team-2.jpg",
  },
  {
    name: "Martin Carlos",
    role: "Senior Cleaning",
    image: "/images/team-3.jpg",
  },
  {
    name: "James Carter",
    role: "Senior Cleaning",
    image: "/images/team-4.jpg",
  },
]

const partners = [
  { name: "Vertigo", image: "/images/logo-vertigo.png" },
  { name: "Sitemark", image: "/images/logo-sitemark.png" },
  { name: "Snowflake", image: "/images/logo-snowflake.png" },
  { name: "Cactus", image: "/images/logo-cactus.png" },
  { name: "Greenin", image: "/images/logo-greenin.png" },
]

export default function TeamSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      {/* Lime leaf decoration bottom-left */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-28 lg:w-36">
        <Image
          src="/images/leaf-lime.png"
          alt=""
          width={144}
          height={180}
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold tracking-wide text-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-[#c5d44e]" />
            Expert Team
          </span>
          <h2 className="mx-auto mt-5 max-w-xl text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            The Faces Behind Our Trusted Landscaping Services
          </h2>
        </div>

        {/* Team Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                {/* Bottom gradient overlay with name */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-16">
                  <h3 className="text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-white/80">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted By Leading Brands */}
        <div className="mt-16">
          <div className="flex items-center gap-4">
            <h3 className="shrink-0 text-sm font-bold tracking-wide text-foreground">
              Trusted By Leading Brands
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center rounded-2xl border border-border bg-background px-6 py-5 transition-shadow hover:shadow-md"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
