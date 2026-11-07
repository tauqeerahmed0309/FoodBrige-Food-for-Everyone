import Reveal from '../components/Reveal.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { IMG } from '../data/images.js'

const CHAPTERS = [
  {
    index: '01',
    title: 'Precision Logging & Provenance',
    desc: 'The donor specifies the meal category, prepared timestamp, exact serving count, and thermal handling condition (hot-held, chilled, or ambient). Meticulous documentation is the first act of civic care.',
    img: 'kitchen',
    tag: 'Kitchen Preparation'
  },
  {
    index: '02',
    title: 'Deterministic Matching & Dispatch',
    desc: 'Nearby verified organisations review the listing against their real-time evening capacity. Because deadlines and travel radii are strictly evaluated, no food is promised that cannot be safely collected.',
    img: 'connect',
    tag: 'Pantry Matching'
  },
  {
    index: '03',
    title: 'Temperature-Safe Handover',
    desc: 'Volunteers and transport partners arrive with food-grade insulated containers. Handover timestamps are recorded on the prototype passport, ensuring accountability through to final plate service.',
    img: 'deliver',
    tag: 'Community Delivery'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-fond2 border-t border-ligne">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-ligne pb-4 mb-12">
          <p className="label-tag text-grisDoux">
            <span className="label-index font-mono text-jaune">04</span>
            <span>Provenance &amp; Chain of Custody &middot; 3 Phases</span>
          </p>
          <span className="text-xs font-mono text-grisDoux uppercase tracking-wider">
            Standard Operating Protocol
          </span>
        </div>

        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="h2 text-gris tracking-tight">
                The journey <span className="marker">of a rescued meal.</span>
              </h2>
              <p className="lead mt-4 text-grisDoux">
                Every rescued meal follows a strict, time-sensitive protocol designed to preserve food safety,
                human dignity, and logistical clarity.
              </p>
            </div>
            <div className="hidden md:block font-mono text-xs text-grisDoux border border-ligne rounded-md px-3 py-2 bg-fond">
              Protocol: FoodBridge QA-01
            </div>
          </div>
        </Reveal>

        {/* 3 Sequential Chapters */}
        <div className="space-y-16 lg:space-y-24">
          {CHAPTERS.map(({ index, title, desc, img, tag }, i) => (
            <div
              key={index}
              className="grid gap-10 lg:grid-cols-12 items-center pt-10 border-t border-ligne first:pt-0 first:border-0"
            >
              {/* Image Column */}
              <Reveal
                className={`lg:col-span-6 ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl border border-ligne bg-fond">
                  <SmartImg
                    img={IMG[img]}
                    className="h-[280px] sm:h-[360px] lg:h-[420px] w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-fond/95 backdrop-blur px-3 py-1.5 rounded-md border border-ligne text-xs font-mono text-gris">
                    {tag}
                  </div>
                </div>
              </Reveal>

              {/* Text Column */}
              <Reveal
                delay={0.1}
                className={`lg:col-span-6 ${
                  i % 2 === 1 ? 'lg:order-1 lg:pr-10' : 'lg:pl-10'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-6xl sm:text-7xl font-normal text-jaune/90 tracking-tight">
                    {index}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-grisDoux">
                    Phase {index} of 03
                  </span>
                </div>

                <h3 className="h3 mt-4 text-gris">
                  {title}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-grisDoux leading-relaxed">
                  {desc}
                </p>

                <div className="mt-8 pt-6 border-t border-ligne flex items-center gap-6 text-xs font-mono text-grisDoux">
                  <span>Target Elapsed: &lt; 45 min</span>
                  <span>&bull;</span>
                  <span className="text-vert font-semibold">Verified Safe Handover</span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
