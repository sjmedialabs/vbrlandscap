import Image from "next/image"

interface WorkEnvironmentSectionProps {
  heading: string
  description: string
  image: string
}

export function WorkEnvironmentSection({
  heading,
  description,
  image,
}: WorkEnvironmentSectionProps) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Leaf - Top Right */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M80 20C60 30 40 50 30 80C50 70 70 50 80 20Z"
            stroke="#b9c44b"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M90 10C70 25 50 55 40 90"
            stroke="#b9c44b"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
              {heading}
            </h2>
            <p className="text-[#666] text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={image}
                alt={heading}
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Leaf - Bottom Right of Image */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-40 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 80C40 70 60 50 70 20C50 30 30 50 20 80Z"
                  stroke="#b9c44b"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Leaf - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-40 h-40 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 80C40 60 60 40 80 30C70 50 50 70 20 80Z"
            stroke="#b9c44b"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M10 90C35 70 60 45 85 25"
            stroke="#b9c44b"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </section>
  )
}
