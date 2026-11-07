import Reveal from '../components/Reveal.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { IMG } from '../data/images.js'

const STATS = [
  {
    value: '1.05 billion tonnes',
    context: 'Global food wasted yearly across retail, food service, and households (UNEP 2024).'
  },
  {
    value: '19% of prepared food',
    context: 'Discarded while still safe, fresh, and fit for human consumption.'
  },
  {
    value: '783 million people',
    context: 'Experienced acute or persistent hunger in the same calendar period.'
  }
]

export default function Problem() {
  return (
    <section id="crisis" className="py-24 md:py-32 bg-[#F5F2E9] border-t border-[#D8D2C2]">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-4 mb-12">
          <p className="label-tag text-[#111411]">
            <span className="label-index font-mono text-[#123B2A] font-bold">02</span>
            <span>The Crisis of Abundance &middot; Diagnostic</span>
          </p>
          <span className="text-xs font-mono text-[#4A534B] uppercase tracking-wider">
            Diagnostic &middot; 2026
          </span>
        </div>

        <Reveal>
          <h2 className="h2 text-[#111411] max-w-4xl tracking-tight">
            Too much food wasted.{' '}
            <span className="marker-dark text-[#123B2A]">Too many plates empty.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Editorial Visual with Anchored Quote */}
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-[#D8D2C2] bg-[#E9E4D6]">
              <SmartImg
                img={IMG.problem}
                className="h-[380px] sm:h-[460px] w-full object-cover"
              />
              <div className="p-6 bg-[#111411] text-[#F5F2E9]">
                <p className="font-display text-2xl sm:text-3xl italic leading-snug font-normal text-[#F5F2E9]">
                  &ldquo;The meal is not the failure. The distance between the kitchen and the table is.&rdquo;
                </p>
                <p className="mt-3 text-xs text-[#B7D66B] font-mono uppercase tracking-wider font-semibold">
                  FoodBridge Observation &middot; 2026
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Narrative & Stats Table */}
          <div className="lg:col-span-7 lg:pl-6 space-y-10">
            <Reveal>
              <p className="lead text-[#111411]/90">
                Surplus food accumulates daily in city hotels, caterers, and bakeries, while community
                shelters just a few blocks away struggle to prepare evening meals. These are not two
                unrelated problems. They are a single logistical rupture that transparent civic coordination
                can bridge.
              </p>
            </Reveal>

            {/* Hairline-separated Stats List */}
            <div className="divide-y divide-[#D8D2C2] border-y border-[#D8D2C2]">
              {STATS.map(({ value, context }, i) => (
                <Reveal key={value} delay={i * 0.1}>
                  <div className="py-7 grid sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                    <span className="sm:col-span-5 font-display text-3xl sm:text-4xl text-[#123B2A] tracking-tight font-normal">
                      {value}
                    </span>
                    <span className="sm:col-span-7 text-sm sm:text-base text-[#333A34] leading-relaxed">
                      {context}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="text-xs text-[#4A534B] font-mono">
              Source:{' '}
              <a
                className="underline hover:text-[#111411] transition-colors font-medium"
                href="https://www.unep.org/resources/publication/food-waste-index-report-2024"
                target="_blank"
                rel="noreferrer"
              >
                UNEP Food Waste Index Report 2024
              </a>{' '}
              (calibrated to the 2022 global dataset).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
