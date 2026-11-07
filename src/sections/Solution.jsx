import { Store, Network, UsersRound, Home } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const NODES = [
  {
    step: '01',
    icon: Store,
    title: 'Food Donors',
    desc: 'Cafés, hotels, banquets and private events catalog their surplus with safe-consumption windows and storage data.'
  },
  {
    step: '02',
    icon: Network,
    title: 'FoodBridge Platform',
    desc: 'Validates safety parameters, performs deterministic capacity matching, and plans proportional multi-NGO splits.'
  },
  {
    step: '03',
    icon: UsersRound,
    title: 'NGOs & Couriers',
    desc: 'Local verified charity teams accept dispatch assignments and coordinate timely vehicle or scooter pickup.'
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
    <section id="mission" className="py-24 md:py-32 bg-fond border-t border-ligne">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-ligne pb-4 mb-12">
          <p className="label-tag text-grisDoux">
            <span className="label-index font-mono text-jaune">03</span>
            <span>Notre Mission · The Cooperative Model</span>
          </p>
          <span className="text-xs font-mono text-grisDoux uppercase tracking-wider">
            Architecture Solidaire
          </span>
        </div>

        <Reveal>
          <div className="max-w-3xl">
            <h2 className="h2 text-gris tracking-tight">
              From surplus kitchens{' '}
              <span className="marker">to shared tables.</span>
            </h2>
            <p className="lead mt-6 text-grisDoux">
              We do not treat food rescue as a waste dump. It is an act of civic hospitality.
              By establishing transparent data standards between kitchens and shelters, every meal
              preserves its integrity and human respect.
            </p>
          </div>
        </Reveal>

        {/* 4-Node Solidarity Pipeline */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {NODES.map(({ step, icon: Icon, title, desc }, i) => (
            <Reveal key={step} delay={i * 0.1}>
              <div className="h-full flex flex-col justify-between p-7 rounded-2xl border border-ligne bg-fond2 hover:border-gris transition-colors group">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-ligne">
                    <span className="font-mono text-xs font-bold text-jaune uppercase tracking-widest">
                      {step} / Step
                    </span>
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-fond border border-ligne text-vert group-hover:bg-vert group-hover:text-fond transition-colors">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                  </div>

                  <h3 className="h3 mt-6 text-gris">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-grisDoux leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-ligne/60 flex items-center justify-between text-xs font-mono text-grisDoux">
                  <span>Protocole Étape {step}</span>
                  <span className="text-vert font-semibold">Vérifié ✓</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
