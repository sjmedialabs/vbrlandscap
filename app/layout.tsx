import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

const _poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Landscope - Professional Landscaping Services',
  description:
    'Transforming outdoor spaces into natural beauty. Professional landscaping design, installation, and maintenance services.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
