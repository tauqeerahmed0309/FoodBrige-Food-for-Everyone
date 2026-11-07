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
    <section id="how-it-works" className="py-24 md:py-32 bg-[#F5F2E9] border-t border-[#D8D2C2]">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-4 mb-12">
          <p className="label-tag text-[#111411]">
            <span className="label-index font-mono text-[#123B2A] font-bold">04</span>
            <span>Provenance &amp; Chain of Custody &middot; 3 Phases</span>
          </p>
          <span className="text-xs font-mono text-[#4A534B] uppercase tracking-wider">
            Standard Operating Protocol
          </span>
        </div>

        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="h2 text-[#111411] tracking-tight">
                The journey <span className="marker-dark text-[#123B2A]">of a rescued meal.</span>
              </h2>
              <p className="lead mt-4 text-[#333A34]">
                Every rescued meal follows a strict, time-sensitive protocol designed to preserve food safety,
                human dignity, and logistical clarity.
              </p>
            </div>
            <div className="hidden md:block font-mono text-xs text-[#4A534B] border border-[#D8D2C2] rounded-md px-3 py-2 bg-[#E9E4D6]">
              Protocol: FoodBridge QA-01
            </div>
          </div>
        </Reveal>

        {/* 3 Sequential Chapters */}
        <div className="space-y-16 lg:space-y-24">
          {CHAPTERS.map(({ index, title, desc, img, tag }, i) => (
            <div
              key={index}
              className="grid gap-10 lg:grid-cols-12 items-center pt-10 border-t border-[#D8D2C2] first:pt-0 first:border-0"
            >
              {/* Image Column */}
              <Reveal
                className={`lg:col-span-6 ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl border border-[#D8D2C2] bg-[#E9E4D6]">
                  <SmartImg
                    img={IMG[img]}
                    className="h-[280px] sm:h-[360px] lg:h-[420px] w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#F5F2E9]/95 backdrop-blur px-3 py-1.5 rounded-md border border-[#D8D2C2] text-xs font-mono text-[#111411]">
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
                  <span className="font-display text-6xl sm:text-7xl font-normal text-[#123B2A] tracking-tight">
                    {index}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#4A534B]">
                    Phase {index} of 03
                  </span>
                </div>

                <h3 className="h3 mt-4 text-[#111411]">
                  {title}
                </h3>
                <p className="mt-4 text-base text-[#333A34] leading-relaxed">
                  {desc}
                </p>

                <div className="mt-8 flex items-center gap-3 text-xs font-mono text-[#4A534B]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#123B2A] text-[#F5F2E9] text-[10px]">
                    &check;
                  </span>
                  <span>Safety Assessed &middot; Non-Profit Dispatch</span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
