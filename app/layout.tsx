import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { getSection } from '@/lib/firestore'

import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
})

export async function generateMetadata(): Promise<Metadata> {
  let seo: Record<string, unknown> | null = null
  let branding: Record<string, unknown> | null = null

  try {
    ;[seo, branding] = await Promise.all([
      getSection('seo'),
      getSection('branding'),
    ])
  } catch {
    // Fallback to defaults
  }

  const pages = (seo?.pages as { slug: string; title: string; description: string; ogImage?: string; keywords?: string }[]) || []
  const homepage = pages.find((p) => p.slug === '/')
  const siteName = (branding?.siteName as string) || 'VBR Landscaping'
  const favicon = (branding?.favicon as string) || undefined

  return {
    title: homepage?.title || `${siteName} - Professional Landscaping Services`,
    description: homepage?.description || 'Transforming outdoor spaces into natural beauty.',
    keywords: homepage?.keywords || '',
    icons: favicon ? { icon: favicon } : undefined,
    openGraph: homepage?.ogImage ? { images: [{ url: homepage.ogImage }] } : undefined,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
