import Reveal from '../components/Reveal.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { IMG } from '../data/images.js'

const STATS = [
  {
    value: '1.05 billion tonnes',
    context: 'Global food wasted yearly across retail, food service and households (UNEP 2024).'
  },
  {
    value: '19% of prepared food',
    context: 'Discarded while still completely safe, fresh, and fit for human consumption.'
  },
  {
    value: '783 million people',
    context: 'Experienced acute or persistent hunger worldwide in the same period.'
  }
]

export default function Problem() {
  return (
    <section id="constat" className="py-24 md:py-32 bg-fond2 border-t border-ligne">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-ligne pb-4 mb-12">
          <p className="label-tag text-grisDoux">
            <span className="label-index font-mono text-jaune">02</span>
            <span>Le Constat · The Coordination Gap</span>
          </p>
          <span className="text-xs font-mono text-grisDoux uppercase tracking-wider">
            Diagnostic &middot; 2026
          </span>
        </div>

        <Reveal>
          <h2 className="h2 text-gris max-w-4xl tracking-tight">
            Too much food wasted.{' '}
            <span className="marker">Too many people hungry.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Editorial Visual with Quote */}
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-ligne bg-fond">
              <SmartImg
                img={IMG.problem}
                className="h-[380px] sm:h-[460px] w-full object-cover"
              />
              <div className="p-6 bg-gris text-fond">
                <p className="font-display text-xl sm:text-2xl italic leading-snug">
                  “The meal is not the failure. The distance between the kitchen and the table is.”
                </p>
                <p className="mt-3 text-xs text-jaune font-mono uppercase tracking-wider">
                  FoodBridge Observation &middot; 2026
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Narrative & Stats Table */}
          <div className="lg:col-span-7 lg:pl-6 space-y-10">
            <Reveal>
              <p className="lead text-gris/90">
                Surplus food accumulates daily in city hotels, caterers and bakeries, while community
                shelters just a few blocks away struggle to prepare evening meals. These are not two
                unrelated problems. They are a single logistical rupture that transparent community action
                can solve.
              </p>
            </Reveal>

            {/* Hairline-separated Stats List */}
            <div className="divide-y divide-ligne border-y border-ligne">
              {STATS.map(({ value, context }, i) => (
                <Reveal key={value} delay={i * 0.1}>
                  <div className="py-7 grid sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                    <span className="sm:col-span-5 font-display text-3xl sm:text-4xl font-semibold text-vert tracking-tight">
                      {value}
                    </span>
                    <span className="sm:col-span-7 text-sm sm:text-base text-grisDoux leading-relaxed">
                      {context}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="text-xs text-grisDoux/80 font-mono">
              Source:{' '}
              <a
                className="underline hover:text-gris transition-colors"
                href="https://www.unep.org/resources/publication/food-waste-index-report-2024"
                target="_blank"
                rel="noreferrer"
              >
                UNEP Food Waste Index Report 2024
              </a>{' '}
              (global metrics calibrated to 2022 dataset).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
