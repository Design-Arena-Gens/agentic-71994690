import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Codes Promo Lyon',
  description: 'Trouvez les meilleurs codes promo des grands magasins à Lyon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
