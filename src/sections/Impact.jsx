import { motion } from 'framer-motion'
import Counter from '../components/Counter.jsx'
import Reveal from '../components/Reveal.jsx'

const METRICS = [
  {
    label: 'Meals Shared',
    val: 12480,
    suffix: '',
    pct: 82,
    sub: 'Directed to local shelters, day centres, and student kitchens.'
  },
  {
    label: 'Food Rescued (kg)',
    val: 3260,
    suffix: ' kg',
    pct: 64,
    sub: 'Wholesome surplus diverted from landfill and incinerators.'
  },
  {
    label: 'Partner Hub Connections',
    val: 148,
    suffix: '',
    pct: 45,
    sub: 'Verified charitable organisations and community pantries.'
  },
  {
    label: 'Mobilized Couriers',
    val: 530,
    suffix: '',
    pct: 60,
    sub: 'Civic volunteers and local couriers active on delivery routes.'
  }
]

export default function Impact() {
  return (
    <section id="impact" className="py-24 md:py-32 bg-[#123B2A] text-[#F5F2E9] border-t border-[#365B46]">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#365B46] pb-4 mb-12">
          <p className="label-tag text-[#B7D66B]">
            <span className="label-index font-mono">08</span>
            <span>Audited Civic Impact &middot; Demonstrated Metrics</span>
          </p>
          <span className="text-xs font-mono text-[#C5D2C7] uppercase tracking-wider">
            Projection &middot; 2026
          </span>
        </div>

        <Reveal>
          <div className="max-w-3xl">
            <h2 className="display text-[#F5F2E9] tracking-tight">
              Small actions.{' '}
              <span className="marker text-[#B7D66B]">Dignified change.</span>
            </h2>
            <p className="lead mt-6 text-[#C5D2C7]">
              Every salvaged serving honors the agricultural energy invested in its cultivation and
              guarantees a warm meal for our neighbours. Below are the modeled metrics for the metropolitan ecosystem.
            </p>
          </div>
        </Reveal>

        {/* 4 Massive Figures */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map(({ label, val, suffix, pct, sub }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="pt-6 border-t border-[#365B46] flex flex-col justify-between h-full">
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-[#B7D66B]">
                    {label}
                  </dt>
                  <dd className="display text-5xl sm:text-6xl lg:text-7xl font-normal text-[#F5F2E9] mt-3">
                    <Counter to={val} suffix={suffix} />
                  </dd>
                  <p className="mt-3 text-xs text-[#C5D2C7] leading-relaxed font-body">
                    {sub}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#365B46]/50">
                  <div className="h-1 bg-[#194B35] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#B7D66B]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#C5D2C7] block mt-2">
                    Milestone Completion &middot; {pct}%
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-14 pt-8 border-t border-[#365B46] text-xs font-mono text-[#C5D2C7]/70">
          * Modeled illustrative metrics for the Bangalore civic food-rescue framework. Real-world implementation will integrate verified shelter receipts and municipal weigh-in scales.
        </p>
      </div>
    </section>
  )
}
