import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-primary">
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-balance text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/70">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
