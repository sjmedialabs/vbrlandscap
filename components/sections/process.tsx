import Image from "next/image"
import { CircleCheck } from "lucide-react"

interface Step {
  number: string
  title: string
  description: string
  order?: number
}

interface ProcessProps {
  data?: Record<string, unknown>
}

export default function ProcessSection({ data }: ProcessProps) {
  if (!data) return null

  const badge = data.badge as string
  const heading = data.heading as string
  const fieldImage = data.fieldImage as string
  const leafImage = data.leafImage as string
  const checklistItems = (data.checklistItems as string[]) || []
  const steps = ((data.steps as Step[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="relative overflow-hidden bg-[#f4f6ef] py-20 lg:py-28">
      <div className="absolute -left-4 -top-4 z-0 h-48 w-48 opacity-40 lg:h-64 lg:w-64">
        <Image src={leafImage} alt="" fill sizes="256px" className="object-contain" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Left Side */}
          <div className="w-full lg:w-1/2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c5c9b8] bg-white px-5 py-2 text-sm font-medium text-[#1a3a2a]">
              <span className="h-2 w-2 rounded-full bg-[#b8c44f]" />
              {badge}
            </span>
            <h2 className="mt-6 max-w-md text-balance text-3xl font-bold leading-tight text-[#1a3a2a] md:text-4xl lg:text-[42px]">{heading}</h2>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image src={fieldImage} alt="Farmer working in green fields" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {checklistItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CircleCheck className="h-5 w-5 flex-shrink-0 text-[#1a3a2a]" />
                  <span className="text-sm font-medium text-[#1a3a2a]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="relative w-full lg:w-1/2">
            <div className="absolute left-[22px] top-[40px] bottom-[40px] hidden w-px border-l-2 border-dashed border-[#c5c9b8] lg:block" />
            <div className="flex flex-col gap-6">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-6">
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#c5c9b8] bg-white">
                      <span className="text-sm font-bold text-[#1a3a2a]">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1 rounded-xl bg-[#e8ebdc] px-6 py-6">
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <span className="text-xs font-semibold tracking-widest text-[#9ca38a] uppercase" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>Step</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1a3a2a]">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5a6350]">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
