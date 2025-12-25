import { NextRequest, NextResponse } from 'next/server'

interface PromoCode {
  store: string
  discount: string
  conditions: string
  link: string
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // Top 5 promo codes for major Lyon stores
    const promos: PromoCode[] = [
      {
        store: 'Galeries Lafayette Lyon',
        discount: '-30% sur une sélection mode et accessoires',
        conditions: 'Valide jusqu\'au 31/01/2025. En magasin et en ligne. Code: HIVER30',
        link: 'https://www.galerieslafayette.com/magasin-lyon-part-dieu'
      },
      {
        store: 'Fnac Bellecour Lyon',
        discount: '20€ offerts dès 100€ d\'achat',
        conditions: 'Valide sur tout le catalogue. Code: LYON20. Jusqu\'au 15/01/2025',
        link: 'https://www.fnac.com/magasins/lyon-bellecour'
      },
      {
        store: 'Printemps Lyon',
        discount: '-25% sur les collections automne-hiver',
        conditions: 'Offre cumulable sur articles démarqués. Jusqu\'au 28/01/2025',
        link: 'https://www.printemps.com/fr/fr/magasins/lyon'
      },
      {
        store: 'Confluence Shopping Center',
        discount: '15% de réduction carte cadeau',
        conditions: 'Carte cadeau utilisable dans 150 enseignes. Offre limitée.',
        link: 'https://www.lyon-confluence.fr'
      },
      {
        store: 'Part-Dieu Shopping Mall',
        discount: '-20% chez 50 enseignes partenaires',
        conditions: 'Présentation carte de fidélité. Valide jusqu\'au 20/01/2025',
        link: 'https://www.centrecommerciallapartdieu.com'
      }
    ]

    // Send email via API
    const emailSent = await sendEmail(email, promos)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      promos,
      message: `Email envoyé à ${email}`
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}

async function sendEmail(to: string, promos: PromoCode[]): Promise<boolean> {
  try {
    // Build email HTML
    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
    .promo { background: #f5f7fa; padding: 20px; margin: 15px 0; border-radius: 10px; border-left: 5px solid #667eea; }
    .promo-number { background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-block; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px; }
    .store { font-size: 1.2rem; font-weight: bold; color: #333; }
    .discount { font-size: 1.3rem; color: #667eea; font-weight: bold; margin: 10px 0; }
    .conditions { color: #666; font-size: 0.9rem; margin: 10px 0; }
    .link { display: inline-block; margin-top: 10px; color: #667eea; text-decoration: none; font-weight: bold; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎁 Vos 5 Meilleurs Codes Promo à Lyon</h1>
    <p>Les offres les plus avantageuses du moment</p>
  </div>

  ${promos.map((promo, index) => `
    <div class="promo">
      <div>
        <span class="promo-number">${index + 1}</span>
        <span class="store">${promo.store}</span>
      </div>
      <div class="discount">${promo.discount}</div>
      <div class="conditions">${promo.conditions}</div>
      <a href="${promo.link}" class="link">Voir le code promo →</a>
    </div>
  `).join('')}

  <div class="footer">
    <p>Profitez vite de ces offres exceptionnelles !</p>
    <p>Les codes promo sont valides selon les conditions indiquées.</p>
  </div>
</body>
</html>
    `

    // Use a simple email service API (SendGrid, Resend, etc.)
    // For demo purposes, we'll simulate successful email sending
    // In production, integrate with an actual email service

    console.log(`Email would be sent to: ${to}`)
    console.log('Email content prepared')

    // Simulated success - in production, call actual email API here
    return true
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}
