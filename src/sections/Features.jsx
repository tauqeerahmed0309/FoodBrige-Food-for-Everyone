import { useEffect, useMemo, useState } from 'react'
import {
  Search,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Navigation,
  Heart,
  Truck
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { NGOS } from '../data/images.js'
import { readEntries, safeDonations, saveEntry, STORAGE_KEYS } from '../hooks/useStorage.js'

export default function Features({ onPartner }) {
  const [q, setQ] = useState('')
  const [donations, setDonations] = useState(() => safeDonations())
  const [interest, setInterest] = useState('')
  const [expandedTransit, setExpandedTransit] = useState({})

  const refresh = () => setDonations(safeDonations())

  useEffect(() => {
    window.addEventListener('foodbridge:updated', refresh)
    return () => window.removeEventListener('foodbridge:updated', refresh)
  }, [])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return NGOS.filter(
      (n) =>
        !s ||
        n.name.toLowerCase().includes(s) ||
        n.location.toLowerCase().includes(s) ||
        n.area.toLowerCase().includes(s) ||
        n.focus.toLowerCase().includes(s)
    )
  }, [q])

  const visibleDonations = useMemo(() => {
    const s = q.trim().toLowerCase()
    return donations.filter(
      (d) =>
        !s ||
        d.category.toLowerCase().includes(s) ||
        d.location.toLowerCase().includes(s)
    )
  }, [donations, q])

  const expressInterest = (donation) => {
    const exists = readEntries(STORAGE_KEYS.interests).some(
      (x) => x.donationId === donation.id && x.ngoId === 'demo-ngo'
    )
    if (exists) {
      return setInterest('Un intérêt a déjà été enregistré pour ce don dans ce navigateur.')
    }
    try {
      saveEntry(STORAGE_KEYS.interests, {
        donationId: donation.id,
        ngoId: 'demo-ngo',
        ngoName: 'Centre Partenaire Démo',
        simulated: true
      })
      setInterest(
        'Intérêt simulé enregistré en local. Aucune organisation réelle n’a été sollicitée.'
      )
    } catch {
      setInterest('Impossible d’enregistrer l’intérêt dans le stockage local.')
    }
  }

  const toggleTransit = (id) => {
    setExpandedTransit((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="boutiques" className="py-20 md:py-32 bg-fond border-t border-ligne">
      {/* 1. Emmaüs Marquee Header */}
      <div className="overflow-hidden border-b border-ligne py-4 bg-fond2">
        <div className="marquee-track flex gap-8 text-xs font-mono tracking-[0.25em] uppercase text-grisDoux select-none">
          <span>CENTRES PARTENAIRES &bull; LOCAL RESCUE HUBS</span>
          <span>&bull;</span>
          <span>SOLIDARIT&Eacute; ALIMENTAIRE &bull; BENGALURU</span>
          <span>&bull;</span>
          <span>DISTRIBUTION DIRECTE &bull; NON-PROFIT NETWORK</span>
          <span>&bull;</span>
          <span>CENTRES PARTENAIRES &bull; LOCAL RESCUE HUBS</span>
          <span>&bull;</span>
          <span>SOLIDARIT&Eacute; ALIMENTAIRE &bull; BENGALURU</span>
          <span>&bull;</span>
          <span>DISTRIBUTION DIRECTE &bull; NON-PROFIT NETWORK</span>
        </div>
      </div>

      <div className="wrap pt-14">
        {/* 2. Emmaüs Twin Banner Lines */}
        <div className="border-b border-ligne pb-8 mb-14">
          <div className="grid lg:grid-cols-12 gap-6 items-baseline">
            <div className="lg:col-span-6">
              <p className="text-xl sm:text-2xl font-display text-gris leading-snug">
                Six centres de quartier pour donner, coordonner et redistribuer.
              </p>
            </div>
            <div className="lg:col-span-6">
              <p className="text-sm sm:text-base text-grisDoux leading-relaxed">
                Chaque lieu dispose d’équipements thermiques ou d’équipes bénévoles formées
                pour assurer la chaîne du froid et du chaud.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Boutiques Section Layout (Aside + Shops Two-Column Grid) */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sticky Aside */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            <div>
              <p className="label-tag text-jaune">
                <span className="label-index font-mono">06</span>
                <span>Adresses &amp; Centres</span>
              </p>
              <h2 className="h2 text-gris mt-3 tracking-tight">
                Nos centres partenaires
              </h2>
              <p className="mt-4 text-sm text-grisDoux leading-relaxed">
                Coordination active du lundi au samedi, de 8h à 20h. Sélectionnez une structure
                pour consulter son plan d’accès et ses modalités d’accueil.
              </p>
            </div>

            {/* Filter Search Input */}
            <div className="space-y-2">
              <label htmlFor="ngo-search" className="text-xs font-mono uppercase tracking-wider text-grisDoux block">
                Filtrer par nom ou secteur:
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-grisDoux"
                />
                <input
                  id="ngo-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="ex. Indiranagar, Koramangala..."
                  className="w-full rounded-lg border border-ligne bg-fond2 py-3 pl-10 pr-4 text-sm text-gris placeholder:text-grisDoux/60 focus:outline-none focus:border-jaune"
                />
              </div>
              <p className="text-[11px] font-mono text-grisDoux pt-1">
                {list.length} centre{list.length === 1 ? '' : 's'} référencé{list.length === 1 ? '' : 's'}
              </p>
            </div>

            {/* Callout box */}
            <div className="p-6 rounded-2xl border border-ligne bg-fond2 space-y-3">
              <p className="font-display text-base font-semibold text-gris">
                Vous représentez une association ?
              </p>
              <p className="text-xs text-grisDoux leading-relaxed">
                Rejoignez le réseau FoodBridge pour recevoir les alertes surplus dans votre rayon d’action.
              </p>
              <Button
                variant="dark"
                onClick={() =>
                  onPartner({
                    message:
                      'Bonjour, nous souhaitons devenir un centre partenaire pour la distribution de surplus alimentaire.'
                  })
                }
                className="w-full justify-center !min-h-[40px] !text-xs !py-2"
              >
                Proposer un partenariat
              </Button>
            </div>
          </div>

          {/* Right Column: Two-Column Hairline Shops Grid */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-8 divide-y sm:divide-y-0 sm:divide-x-0 border-t border-ligne pt-8">
              {list.map((ngo, idx) => {
                const isExpanded = !!expandedTransit[ngo.id]

                return (
                  <article
                    key={ngo.id}
                    className="pt-6 sm:pt-0 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Shop Meta Label */}
                      <div className="flex items-center justify-between pb-3 border-b border-ligne">
                        <p className="label-tag text-grisDoux">
                          <span className="label-index font-mono text-jaune">
                            {ngo.year || '2020'}
                          </span>
                          <span>{ngo.focus}</span>
                        </p>
                        <span className="font-mono text-[11px] text-vert font-semibold">
                          {ngo.area.split(' ')[0]}
                        </span>
                      </div>

                      {/* Shop Name with Emmaüs Arrow */}
                      <h3 className="h3 mt-4 text-gris group-hover:text-vert transition-colors">
                        <button
                          type="button"
                          onClick={() =>
                            onPartner({
                              message: `Bonjour ${ngo.name}, nous souhaitons vous contacter au sujet de dons de surplus alimentaire.`,
                              location: ngo.location
                            })
                          }
                          className="text-left font-display text-2xl font-semibold tracking-tight inline-flex items-center gap-2"
                        >
                          <span>{ngo.name}</span>
                          <span className="text-base text-jaune group-hover:translate-x-1 transition-transform">
                            &rarr;
                          </span>
                        </button>
                      </h3>

                      {/* Shop Address */}
                      <address className="mt-3 not-italic text-xs text-grisDoux leading-relaxed">
                        <span className="font-medium text-gris block">{ngo.street || ngo.location}</span>
                        <span>{ngo.area} &bull; Bangalore</span>
                      </address>

                      <p className="mt-3 text-xs text-gris/80 leading-relaxed">
                        {ngo.desc}
                      </p>
                    </div>

                    {/* Shop Actions */}
                    <div className="mt-6 pt-4 border-t border-ligne space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {ngo.phone && (
                          <a
                            href={`tel:${ngo.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-grisDoux hover:text-gris px-2.5 py-1.5 rounded border border-ligne bg-fond2"
                          >
                            <Phone size={12} />
                            <span>{ngo.phone}</span>
                          </a>
                        )}

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${ngo.name} ${ngo.location}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-vert hover:underline px-2.5 py-1.5 rounded border border-ligne bg-fond2"
                        >
                          <Navigation size={12} />
                          <span>Itinéraire ↗</span>
                        </a>

                        <button
                          onClick={() =>
                            onPartner({
                              message: `Bonjour ${ngo.name}, nous avons du surplus disponible pour vos bénéficiaires.`,
                              location: ngo.location
                            })
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gris hover:text-vert px-2.5 py-1.5 rounded border border-ligne bg-fond hover:border-gris transition-colors"
                        >
                          <Mail size={12} />
                          <span>Contacter</span>
                        </button>
                      </div>

                      {/* Transit Dropdown Trigger */}
                      <button
                        type="button"
                        onClick={() => toggleTransit(ngo.id)}
                        className="w-full flex items-center justify-between text-xs font-mono text-grisDoux hover:text-gris py-2 border-t border-ligne/60"
                      >
                        <span className="flex items-center gap-1.5">
                          <Truck size={13} className="text-jaune" />
                          <span>Accès transports &amp; déchargement</span>
                        </span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-jaune' : ''
                          }`}
                        />
                      </button>

                      {/* Transit Details Expandable Panel */}
                      {isExpanded && (
                        <div className="p-3 rounded-lg bg-fond2 border border-ligne text-[11px] font-mono text-grisDoux space-y-1.5 animate-fadeIn">
                          {ngo.transit?.map((route, rIdx) => (
                            <p key={rIdx} className="flex items-start gap-1.5">
                              <span className="text-jaune font-bold">&bull;</span>
                              <span>{route}</span>
                            </p>
                          )) || <p>Accès standard en voirie urbaine.</p>}
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>

            {!list.length && (
              <div className="py-16 text-center border-t border-ligne">
                <p className="text-sm text-grisDoux">
                  Aucun centre ne correspond à votre recherche « {q} ».
                </p>
                <button
                  onClick={() => setQ('')}
                  className="mt-3 text-xs font-mono text-vert underline"
                >
                  Réinitialiser le filtre
                </button>
              </div>
            )}

            {/* Local Prototype Available Donations Registry */}
            <div className="mt-20 pt-12 border-t border-ligne">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
                <div>
                  <p className="label-tag text-jaune">Dons Disponibles · Démonstration Locale</p>
                  <h3 className="h3 mt-1 text-gris">
                    Surplus actuellement déclarés
                  </h3>
                </div>
                <span className="text-xs font-mono text-grisDoux">
                  Stockage local navigateur
                </span>
              </div>

              {interest && (
                <div className="p-3 mb-6 rounded-lg bg-vert/10 border border-vert/20 text-xs font-mono text-vert">
                  {interest}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {visibleDonations.map((d) => (
                  <article
                    key={d.id}
                    className="p-5 rounded-xl border border-ligne bg-fond2 flex flex-col justify-between"
                  >
                    <div>
                      <span className="label-tag text-grisDoux">
                        {d.demo ? 'Fictif · ' : ''}
                        {d.category}
                      </span>
                      <h4 className="font-display text-lg font-bold text-gris mt-2">
                        {d.quantity} &middot; {d.servings} portions
                      </h4>
                      <p className="text-xs text-grisDoux mt-1">{d.location}</p>
                      <p className="text-[11px] font-mono text-grisDoux mt-2">
                        Collecte avant: {new Date(d.deadline).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => expressInterest(d)}
                      className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg bg-fond border border-ligne py-2 text-xs font-semibold text-gris hover:border-gris transition-colors"
                    >
                      <Heart size={13} className="text-jaune" />
                      <span>Exprimer un intérêt de centre</span>
                    </button>
                  </article>
                ))}
              </div>

              {!visibleDonations.length && (
                <p className="py-8 text-center text-xs font-mono text-grisDoux">
                  Aucun don actif enregistré dans votre navigateur. Déposez un don avec une date future pour le voir apparaître ici.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
