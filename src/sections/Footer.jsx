import { useState } from 'react'
import { Mail, MapPin, RefreshCw, ShieldAlert } from 'lucide-react'
import BrandMark from '../components/BrandMark.jsx'
import { clearDemoData } from '../hooks/useStorage.js'

const NAV_LINKS = [
  { id: 'accueil', label: 'Accueil / Home' },
  { id: 'constat', label: 'Le Constat / The Problem' },
  { id: 'mission', label: 'Notre Mission' },
  { id: 'parcours', label: 'Le Parcours' },
  { id: 'rescue-loop', label: 'Rescue Studio' },
  { id: 'boutiques', label: 'Centres Partenaires' },
  { id: 'impact', label: 'Chiffres Clés' },
  { id: 'temoignages', label: 'Témoignages' }
]

export default function Footer({ open }) {
  const [cleared, setCleared] = useState(false)

  const handleClearDemo = () => {
    if (
      window.confirm(
        'Voulez-vous réinitialiser uniquement les données du scénario de démonstration (Judge Scenario) ? Vos déclarations personnelles de don, bénévolat et partenariat seront conservées.'
      )
    ) {
      try {
        clearDemoData()
        window.dispatchEvent(new Event('foodbridge:updated'))
        setCleared(true)
        setTimeout(() => setCleared(false), 4000)
      } catch {
        setCleared(false)
      }
    }
  }

  return (
    <footer className="bg-gris text-fond/80 pt-16 pb-12 border-t border-ligneDark">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12 pb-16 border-b border-ligneDark">
          {/* Brand & Editorial Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#accueil" className="inline-flex items-center gap-3">
              <BrandMark className="h-8 w-8 text-vert" />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight text-fond leading-none">
                  FoodBridge
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-fond/60 mt-1">
                  Surplus Solidaire &middot; Bengaluru
                </span>
              </div>
            </a>
            <p className="font-display text-lg text-fond/90 italic leading-snug max-w-sm pt-2">
              &ldquo;Every meal deserves a destination.&rdquo;
            </p>
            <p className="text-xs text-fond/60 leading-relaxed max-w-sm">
              Plateforme associative ouverte facilitant la récupération et la distribution transparente
              des surplus de restauration au bénéfice des associations de quartier.
            </p>
          </div>

          {/* Navigation Links Column */}
          <nav aria-label="Navigation secondaire" className="md:col-span-3 space-y-3">
            <p className="label-tag text-jaune">Navigation</p>
            <ul className="space-y-2 text-xs font-mono">
              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="hover:text-jaune transition-colors inline-block py-0.5"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => open('donate')}
                  className="text-jaune hover:underline font-semibold"
                >
                  &rarr; Donner du surplus
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact & Actions Column */}
          <div className="md:col-span-4 space-y-4">
            <p className="label-tag text-jaune">Coordonn&eacute;es &amp; Maintenance</p>
            <div className="space-y-2 text-xs font-mono text-fond/70">
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-jaune" />
                <span>hello@foodbridge.example</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-jaune" />
                <span>Réseau Métropolitain, Bangalore, Inde</span>
              </p>
            </div>

            <div className="pt-4 border-t border-ligneDark space-y-3">
              <p className="text-[11px] text-fond/50 font-mono">
                Prototype local sans serveur distant. Vos saisies résident sur cet appareil.
              </p>
              <button
                type="button"
                onClick={handleClearDemo}
                className="inline-flex items-center gap-2 text-xs font-mono underline hover:text-jaune text-fond/75 transition-colors"
              >
                <RefreshCw size={12} />
                <span>Réinitialiser les données de démo</span>
              </button>
              {cleared && (
                <p role="status" className="text-xs font-mono text-jaune animate-fadeIn">
                  ✓ Données de démo réinitialisées avec succès.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Accreditations */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-fond/50">
          <p>
            &copy; {new Date().getFullYear()} FoodBridge. Prototype solidaire conçu pour l&apos;OSCode AI Prompt Battle.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => open('legal-privacy')}
              className="hover:text-jaune transition-colors"
            >
              Politique de Confidentialité
            </button>
            <button
              onClick={() => open('legal-terms')}
              className="hover:text-jaune transition-colors"
            >
              Conditions d&apos;Utilisation
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
