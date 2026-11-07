import { Store, Network, UsersRound, Home } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const NODES = [
  {
    step: '01',
    icon: Store,
    title: 'Food Donors',
    desc: 'Cafés, hotels, banquets, and caterers catalog their surplus with safe-consumption windows and thermal storage data.'
  },
  {
    step: '02',
    icon: Network,
    title: 'FoodBridge Platform',
    desc: 'Validates safety parameters, performs deterministic capacity matching, and calculates proportional multi-hub splits.'
  },
  {
    step: '03',
    icon: UsersRound,
    title: 'NGOs & Couriers',
    desc: 'Local verified charity teams accept dispatch assignments and coordinate timely vehicle or scooter collection.'
  },
  {
    step: '04',
    icon: Home,
    title: 'Communities in Need',
    desc: 'Nutritious, dignified meals are delivered directly to community shelters, elder care, and student kitchens.'
  }
]

export default function Solution() {
  return (
    <section id="approach" className="py-24 md:py-32 bg-[#123B2A] text-[#F5F2E9] border-t border-[#365B46]">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#365B46] pb-4 mb-12">
          <p className="label-tag text-[#C5D2C7]">
            <span className="label-index font-mono text-[#B7D66B]">03</span>
            <span>The Logistics of Dignity &middot; Cooperative Model</span>
          </p>
          <span className="text-xs font-mono text-[#C5D2C7] uppercase tracking-wider">
            Operational Blueprint
          </span>
        </div>

        <Reveal>
          <div className="max-w-3xl">
            <h2 className="h2 text-[#F5F2E9] tracking-tight">
              From surplus kitchens{' '}
              <span className="marker text-[#B7D66B]">to shared tables.</span>
            </h2>
            <p className="lead mt-6 text-[#C5D2C7]">
              We do not treat food rescue as a waste disposal stream. It is an act of civic hospitality.
              By establishing transparent safety standards between kitchens and shelters, every meal
              preserves its integrity and human respect.
            </p>
          </div>
        </Reveal>

        {/* 4-Node Pipeline */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {NODES.map(({ step, icon: Icon, title, desc }, i) => (
            <Reveal key={step} delay={i * 0.1}>
              <div className="h-full flex flex-col justify-between p-7 rounded-2xl border border-[#365B46] bg-[#194B35] hover:border-[#B7D66B] transition-colors group">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#365B46]">
                    <span className="font-mono text-xs font-bold text-[#B7D66B] uppercase tracking-widest">
                      {step} / Step
                    </span>
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#123B2A] border border-[#365B46] text-[#B7D66B] group-hover:bg-[#B7D66B] group-hover:text-[#111411] transition-colors">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                  </div>

                  <h3 className="h3 mt-6 text-[#F5F2E9]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-[#C5D2C7] leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#365B46]/60 flex items-center justify-between text-xs font-mono text-[#C5D2C7]">
                  <span>Protocol Step {step}</span>
                  <span className="text-[#B7D66B] font-semibold">Verified &check;</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
