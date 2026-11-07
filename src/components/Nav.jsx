import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BrandMark from './BrandMark.jsx'

const MENU_LINKS = [
  { id: 'accueil', label: 'Accueil / Overview', index: '01' },
  { id: 'constat', label: 'Le Constat / The Problem', index: '02' },
  { id: 'mission', label: 'Notre Mission / Approach', index: '03' },
  { id: 'parcours', label: 'Le Parcours / How It Works', index: '04' },
  { id: 'rescue-loop', label: 'Rescue Studio & Loop', index: '05' },
  { id: 'boutiques', label: 'Centres & Partenaires', index: '06' },
  { id: 'impact', label: 'Chiffres Clés / Impact', index: '07' },
  { id: 'temoignages', label: 'Témoignages / Stories', index: '08' }
]

export default function Nav({ onDonate }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('accueil')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )

    MENU_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', onKey)
      observer.disconnect()
    }
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
          scrolled || open
            ? 'bg-fond/95 backdrop-blur-md border-b border-ligne'
            : 'bg-transparent'
        }`}
        style={{ height: 'var(--header-h)' }}
      >
        <div className="wrap h-full flex items-center justify-between">
          {/* Brand Logo & Editorial Title */}
          <a
            href="#accueil"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="FoodBridge, retour à l’accueil"
            onClick={() => setOpen(false)}
          >
            <BrandMark className="h-8 w-8 text-vert group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-gris leading-none">
                FoodBridge
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-grisDoux mt-0.5">
                Surplus Solidaire
              </span>
            </div>
          </a>

          {/* Header Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={onDonate}
              className="group hidden sm:inline-flex items-center justify-between gap-3 bg-jaune text-gris rounded-full py-2 pl-4 pr-1.5 text-xs font-semibold tracking-wide hover:bg-[#e4a733] transition-all"
            >
              <span>Donner du surplus</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gris text-jaune group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 16 16" className="h-3 w-3">
                  <path
                    d="M1 8h13M9 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Emmaüs Circular Menu Button */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls="main-menu"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen(!open)}
              className="relative grid h-12 w-12 place-items-center rounded-full border border-ligne bg-fond hover:border-gris transition-colors focus:outline-none"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute left-0 h-[2px] w-5 bg-gris origin-center"
                  animate={open ? { top: 6, rotate: 45 } : { top: 1, rotate: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="absolute left-0 h-[2px] w-5 bg-gris origin-center"
                  animate={open ? { top: 6, rotate: -45 } : { top: 9, rotate: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Emmaüs Fullscreen Overlay Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="main-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-fond flex flex-col pt-24 pb-8 overflow-y-auto"
          >
            <div className="wrap grid gap-10 lg:grid-cols-12 flex-1 items-start">
              {/* Numbered Navigation Links */}
              <div className="lg:col-span-8 border-t border-ligne pt-6">
                <ol className="divide-y divide-ligne/60">
                  {MENU_LINKS.map(({ id, label, index }, i) => {
                    const isActive = active === id
                    return (
                      <li key={id} className="py-2.5">
                        <a
                          href={`#${id}`}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline justify-between py-2 text-gris hover:text-vert transition-colors"
                        >
                          <div className="flex items-baseline gap-4">
                            <span className="label-tag text-jaune font-mono text-xs">
                              {index}
                            </span>
                            <span className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight font-medium group-hover:translate-x-2 transition-transform">
                              {label.split(' / ')[0]}
                              <span className="text-sm sm:text-base font-body font-normal text-grisDoux ml-3">
                                / {label.split(' / ')[1]}
                              </span>
                            </span>
                          </div>
                          <span
                            aria-hidden="true"
                            className={`text-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                              isActive ? 'opacity-100 text-jaune' : ''
                            }`}
                          >
                            →
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </div>

              {/* Menu Aside Details & Quick Actions */}
              <div className="lg:col-span-4 lg:border-l lg:border-ligne lg:pl-10 space-y-8 pt-6">
                <div>
                  <p className="label-tag text-grisDoux">Mission Collective</p>
                  <p className="mt-2 text-sm text-gris/80 leading-relaxed">
                    FoodBridge est un dispositif ouvert de coordination solidaire.
                    Chaque repas préservé est un pas vers la sécurité alimentaire et
                    la préservation de nos ressources.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="label-tag text-grisDoux">Actions Immédiates</p>
                  <button
                    onClick={() => {
                      setOpen(false)
                      onDonate()
                    }}
                    className="w-full flex items-center justify-between rounded-lg bg-jaune text-gris px-5 py-3 font-semibold text-sm hover:bg-[#e4a733] transition-colors"
                  >
                    <span>Déposer un don de nourriture</span>
                    <span>→</span>
                  </button>
                  <a
                    href="#boutiques"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-between rounded-lg border border-ligne px-5 py-3 font-semibold text-sm hover:bg-black/5 transition-colors"
                  >
                    <span>Trouver un centre partenaire</span>
                    <span>→</span>
                  </a>
                </div>

                <div className="border-t border-ligne pt-6 text-xs text-grisDoux space-y-1">
                  <p className="font-semibold text-gris">FoodBridge Bengaluru Hub</p>
                  <p>Coordination des surplus alimentaires</p>
                  <p>hello@foodbridge.example</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
