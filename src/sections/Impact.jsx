import { motion } from 'framer-motion'
import Counter from '../components/Counter.jsx'
import Reveal from '../components/Reveal.jsx'
const M = [['Meals Shared', 12480, '', 84], ['Food Rescued (kg)', 3260, '', 62], ['NGO Connections', 148, '', 40], ['Volunteers Participating', 530, '', 55]]
export default function Impact() {
  return (
    <section id="impact" className="bg-forest py-24 text-ivory lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal><h2 className="max-w-3xl text-4xl leading-tight sm:text-6xl">Small actions. <span className="italic text-harvest">Meaningful change.</span></h2></Reveal>
        <dl className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {M.map(([l, n, s, w]) => (
            <div key={l} className="border-t border-sage/30 pt-5">
              <dt className="text-sm uppercase tracking-widest text-sage/80">{l}</dt>
              <dd className="mt-2 font-display text-6xl text-ivory sm:text-7xl"><Counter to={n} suffix={s} /></dd>
              <div className="mt-4 h-1.5 bg-deep" aria-hidden><motion.div className="h-full bg-harvest" initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeOut' }} /></div>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm text-sage/70">Illustrative figures for this prototype. They do not represent real FoodBridge results.</p>
      </div>
    </section>
  )
}
