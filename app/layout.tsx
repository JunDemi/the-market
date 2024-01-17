import { Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "The Market | 홈",
    template: "The Market | %s"
  }
}
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
