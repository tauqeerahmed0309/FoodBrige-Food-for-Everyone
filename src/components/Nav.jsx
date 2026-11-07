import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BrandMark from './BrandMark.jsx'

const MENU_LINKS = [
  { id: 'overview', label: 'Overview', index: '01', desc: 'Introduction & mission' },
  { id: 'crisis', label: 'The Problem', index: '02', desc: 'The reality of food waste' },
  { id: 'approach', label: 'Our Approach', index: '03', desc: 'The cooperative model' },
  { id: 'how-it-works', label: 'How It Works', index: '04', desc: 'Chain of custody & steps' },
  { id: 'rescue-loop', label: 'Rescue Studio', index: '05', desc: 'Interactive allocation engine' },
  { id: 'features', label: 'Platform Systems', index: '06', desc: 'Core operational capabilities' },
  { id: 'partner-hubs', label: 'Partner Hubs', index: '07', desc: 'Verified local pantries' },
  { id: 'impact', label: 'Audited Impact', index: '08', desc: 'Demonstrated civic metrics' },
  { id: 'stories', label: 'Stories', index: '09', desc: 'Voices from the kitchen' }
]

export default function Nav({ onDonate }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('overview')
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
            href="#overview"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="FoodBridge, return to top"
            onClick={() => setOpen(false)}
          >
            <BrandMark className="h-8 w-8 text-vert group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-normal tracking-tight text-gris leading-none">
                FoodBridge
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono font-medium text-grisDoux mt-1">
                Civic Food Logistics &middot; BLR
              </span>
            </div>
          </a>

          {/* Header Actions */}
          <div className="flex items-center gap-3.5 sm:gap-5">
            <button
              onClick={onDonate}
              className="group hidden sm:inline-flex items-center justify-between gap-3 bg-jaune text-gris rounded-full py-2 pl-4 pr-1.5 text-xs font-semibold tracking-wide hover:bg-[#b57534] transition-all"
            >
              <span>Donate Surplus</span>
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

            {/* Circular Menu Button */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls="main-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
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

      {/* Fullscreen Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="main-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-fond flex flex-col pt-24 pb-8 overflow-y-auto"
          >
            <div className="wrap grid gap-10 lg:grid-cols-12 flex-1 items-start">
              {/* Numbered Navigation Links */}
              <nav aria-label="Site directory" className="lg:col-span-8 border-t border-ligne pt-6">
                <ol className="divide-y divide-ligne/60">
                  {MENU_LINKS.map(({ id, label, index, desc }) => {
                    const isActive = active === id
                    return (
                      <li key={id} className="py-2">
                        <a
                          href={`#${id}`}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline justify-between py-2 text-gris hover:text-vert transition-colors"
                        >
                          <div className="flex items-baseline gap-5">
                            <span className="label-tag text-jaune font-mono text-xs">
                              {index}
                            </span>
                            <span className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight group-hover:translate-x-2 transition-transform">
                              {label}
                            </span>
                            <span className="hidden sm:inline text-xs font-mono text-grisDoux">
                              &mdash; {desc}
                            </span>
                          </div>
                          <span
                            aria-hidden="true"
                            className={`text-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                              isActive ? 'opacity-100 text-jaune' : ''
                            }`}
                          >
                            &rarr;
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </nav>

              {/* Menu Aside Details & Quick Actions */}
              <div className="lg:col-span-4 lg:border-l lg:border-ligne lg:pl-10 space-y-8 pt-6">
                <div>
                  <p className="label-tag text-grisDoux">Civic Mission</p>
                  <p className="mt-2.5 text-sm text-gris/85 leading-relaxed font-body">
                    FoodBridge is an open civic framework redirecting wholesome surplus from
                    commercial kitchens to community pantries with speed, safety, and human dignity.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="label-tag text-grisDoux">Immediate Actions</p>
                  <button
                    onClick={() => {
                      setOpen(false)
                      onDonate()
                    }}
                    className="w-full flex items-center justify-between rounded-lg bg-jaune text-gris px-5 py-3 font-semibold text-sm hover:bg-[#b57534] transition-colors"
                  >
                    <span>Register a food donation</span>
                    <span>&rarr;</span>
                  </button>
                  <a
                    href="#partner-hubs"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-between rounded-lg border border-ligne px-5 py-3 font-semibold text-sm hover:bg-black/5 transition-colors"
                  >
                    <span>Explore partner hubs</span>
                    <span>&rarr;</span>
                  </a>
                </div>

                <div className="border-t border-ligne pt-6 text-xs font-mono text-grisDoux space-y-1">
                  <p className="font-semibold text-gris">FoodBridge Bangalore Hub</p>
                  <p>Municipal surplus coordination network</p>
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
