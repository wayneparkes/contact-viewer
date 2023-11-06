import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Contact Viewer',
  description: 'Created for Equals Money by Wayne Parkes',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
