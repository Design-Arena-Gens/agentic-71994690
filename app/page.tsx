'use client'

import { useState } from 'react'

interface PromoCode {
  store: string
  discount: string
  conditions: string
  link: string
}

export default function Home() {
  const [email, setEmail] = useState('maevapativa@gmail.com')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [promos, setPromos] = useState<PromoCode[]>([])

  const handleSearch = async () => {
    setLoading(true)
    setError('')
    setSuccess(false)
    setPromos([])

    try {
      const response = await fetch('/api/search-promos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }

      setPromos(data.promos)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Impossible de rechercher les codes promo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>🎁 Codes Promo Lyon</h1>
      <p className="subtitle">
        Découvrez les 5 meilleures réductions des grands magasins lyonnais
      </p>

      <input
        type="email"
        className="email-input"
        placeholder="Votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <button
        className="search-btn"
        onClick={handleSearch}
        disabled={loading || !email}
      >
        {loading ? 'Recherche en cours...' : 'Rechercher et Envoyer par Email'}
      </button>

      {loading && (
        <div className="loading">
          🔍 Recherche des meilleures offres à Lyon...
        </div>
      )}

      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="success">
          ✅ Email envoyé avec succès à {email} !
        </div>
      )}

      {promos.length > 0 && (
        <ul className="promo-list">
          {promos.map((promo, index) => (
            <li key={index} className="promo-item">
              <div>
                <span className="promo-number">{index + 1}</span>
                <span className="promo-store">{promo.store}</span>
              </div>
              <div className="promo-discount">{promo.discount}</div>
              <div className="promo-conditions">{promo.conditions}</div>
              <a
                href={promo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="promo-link"
              >
                Voir le code promo →
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
