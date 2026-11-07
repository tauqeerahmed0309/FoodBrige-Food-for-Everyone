import { motion } from 'framer-motion'
import Counter from '../components/Counter.jsx'
import Reveal from '../components/Reveal.jsx'

const METRICS = [
  {
    label: 'Repas Partagés / Meals Shared',
    val: 12480,
    suffix: '',
    pct: 82,
    sub: 'Distribués aux foyers et cantines solidaires.'
  },
  {
    label: 'Denrées Préservées / Rescued (kg)',
    val: 3260,
    suffix: ' kg',
    pct: 64,
    sub: 'Surplus évité de l’enfouissement ou incinération.'
  },
  {
    label: 'Connexions Associations / Hubs',
    val: 148,
    suffix: '',
    pct: 45,
    sub: 'Structures caritatives et cuisines d’insertion.'
  },
  {
    label: 'Bénévoles Mobilisés / Volunteers',
    val: 530,
    suffix: '',
    pct: 60,
    sub: 'Citoyens engagés dans la logistique de proximité.'
  }
]

export default function Impact() {
  return (
    <section id="impact" className="py-24 md:py-32 bg-gris text-fond border-t border-ligne">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-ligneDark pb-4 mb-12">
          <p className="label-tag text-jaune">
            <span className="label-index font-mono">07</span>
            <span>Chiffres Cl&eacute;s &middot; Demonstrative Metrics</span>
          </p>
          <span className="text-xs font-mono text-fond/60 uppercase tracking-wider">
            Projection &middot; 2026
          </span>
        </div>

        <Reveal>
          <div className="max-w-3xl">
            <h2 className="display text-fond tracking-tight">
              Small actions.{' '}
              <span className="marker text-gris">Dignified change.</span>
            </h2>
            <p className="lead mt-6 text-fond/75">
              Chaque portion sauvée représente de l’énergie agricole respectée et un repas chaud
              garanti. Voici les indicateurs modélisés pour l’écosystème métropolitain.
            </p>
          </div>
        </Reveal>

        {/* 4 Massive Figures */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map(({ label, val, suffix, pct, sub }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="pt-6 border-t border-ligneDark flex flex-col justify-between h-full">
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-jaune">
                    {label.split(' / ')[0]}
                  </dt>
                  <dd className="display text-5xl sm:text-6xl lg:text-7xl font-bold text-fond mt-3">
                    <Counter to={val} suffix={suffix} />
                  </dd>
                  <p className="mt-3 text-xs text-fond/70 leading-relaxed">
                    {sub}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-ligneDark/50">
                  <div className="h-1 bg-fond/15 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-jaune"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-fond/50 block mt-2">
                    Indice d’accomplissement &middot; {pct}%
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-14 pt-8 border-t border-ligneDark text-xs font-mono text-fond/50">
          * Données illustratives calibrées pour la démonstration FoodBridge (OSCode AI Prompt Battle).
        </p>
      </div>
    </section>
  )
}
