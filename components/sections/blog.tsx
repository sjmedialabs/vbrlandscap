import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

interface BlogPost {
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  order?: number
}

interface BlogProps {
  data?: Record<string, unknown>
}

export default function BlogSection({ data }: BlogProps) {
  if (!data) return null

  const badge = data.badge as string
  const heading = data.heading as string
  const posts = ((data.posts as BlogPost[]) || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-secondary uppercase">{badge}</span>
          <h2 className="mx-auto mt-4 max-w-lg text-balance text-3xl font-bold text-foreground md:text-4xl">{heading}</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-card-foreground group-hover:text-secondary">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <Link href="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-primary">
                  Read More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
