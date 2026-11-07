import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SmartImg from '../components/SmartImg.jsx'
import { IMG, STORIES } from '../data/images.js'

export default function Stories() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (step) => {
    setDir(step)
    setIndex((prev) => (prev + step + STORIES.length) % STORIES.length)
  }

  const story = STORIES[index]

  return (
    <section
      id="temoignages"
      aria-label="Community stories"
      className="py-24 md:py-32 bg-fond border-t border-ligne"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-ligne pb-4 mb-12">
          <p className="label-tag text-grisDoux">
            <span className="label-index font-mono text-jaune">08</span>
            <span>T&eacute;moignages &middot; Voices of Solidarity</span>
          </p>
          <span className="text-xs font-mono text-grisDoux uppercase tracking-wider">
            R&eacute;cits Locaux
          </span>
        </div>

        {/* Section Title & Nav Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="h2 text-gris tracking-tight">
              Community <span className="marker">stories.</span>
            </h2>
            <p className="lead mt-4 text-grisDoux">
              Récits authentiques de restaurateurs, coordinateurs associatifs et bénévoles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Précédent"
              className="grid h-12 w-12 place-items-center rounded-full border border-ligne bg-fond2 text-gris hover:border-gris hover:bg-fond transition-colors focus:outline-none"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Suivant"
              className="grid h-12 w-12 place-items-center rounded-full border border-ligne bg-fond2 text-gris hover:border-gris hover:bg-fond transition-colors focus:outline-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[420px] lg:min-h-[360px]" aria-live="polite">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.article
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: 40 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * dir }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-10 lg:grid-cols-12 items-center"
            >
              <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-ligne bg-fond2">
                <SmartImg
                  img={IMG[story.img]}
                  className="h-[300px] sm:h-[380px] w-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-fond/95 backdrop-blur px-3 py-1.5 rounded-md border border-ligne text-xs font-mono text-gris">
                  {story.role}
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-6 space-y-6">
                <p className="label-tag text-jaune">
                  T&eacute;moignage &middot; {story.role}
                </p>
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-gris leading-snug italic font-normal">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div className="pt-6 border-t border-ligne flex items-center justify-between text-xs font-mono text-grisDoux">
                  <span className="font-semibold text-gris text-sm">{story.name}</span>
                  <span>Partenaire FoodBridge</span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="mt-12 pt-6 border-t border-ligne flex items-center gap-3">
          {STORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Story ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-10 bg-jaune' : 'w-4 bg-ligne hover:bg-grisDoux'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
