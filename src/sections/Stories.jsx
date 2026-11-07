import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SmartImg from '../components/SmartImg.jsx'
import { IMG, STORIES } from '../data/images.js'
export default function Stories() {
  const [i, setI] = useState(0), [dir, setDir] = useState(1)
  const go = (d) => { setDir(d); setI((x) => (x + d + STORIES.length) % STORIES.length) }
  const s = STORIES[i]
  return (
    <section id="stories" aria-roledescription="carousel" aria-label="Community stories" tabIndex={-1} onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }} className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div><h2 className="text-4xl text-deep sm:text-6xl">Community <span className="italic text-forest">stories</span></h2><p className="mt-3 text-sm text-ink/60">Illustrative stories. The people and quotes are fictional.</p></div>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} aria-label="Previous story" className="grid h-12 w-12 place-items-center rounded-full border border-forest text-forest hover:bg-forest hover:text-ivory"><ChevronLeft /></button>
            <button onClick={() => go(1)} aria-label="Next story" className="grid h-12 w-12 place-items-center rounded-full border border-forest text-forest hover:bg-forest hover:text-ivory"><ChevronRight /></button>
          </div>
        </div>
        <div className="relative mt-12 min-h-[34rem] lg:min-h-[26rem]" aria-live="polite">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.article key={i} custom={dir} initial={{ opacity: 0, x: 60 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 * dir }} transition={{ duration: 0.45 }} className="grid items-center gap-8 lg:grid-cols-12">
              <SmartImg img={IMG[s.img]} className="h-64 w-full rounded-tl-[6rem] lg:col-span-5 lg:h-96" />
              <div className="lg:col-span-7 lg:pl-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-harvest">{s.role} · Illustrative story</p>
                <blockquote className="mt-4 font-display text-2xl leading-snug text-deep sm:text-3xl">“{s.quote}”</blockquote>
                <p className="mt-6 text-ink/70">{s.name}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex gap-2" role="tablist" aria-label="Choose story">
          {STORIES.map((x, n) => <button key={x.role} role="tab" aria-selected={n === i} aria-label={x.role} onClick={() => { setDir(n > i ? 1 : -1); setI(n) }} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-10 bg-harvest' : 'w-5 bg-forest/25'}`} />)}
        </div>
      </div>
    </section>
  )
}
