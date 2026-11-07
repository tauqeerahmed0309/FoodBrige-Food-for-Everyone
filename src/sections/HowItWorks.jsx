import Reveal from '../components/Reveal.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { IMG } from '../data/images.js'
const STEPS = [
  ['01', 'Share the Food', 'A donor lists what is left over: what it is, how much, when it was prepared and until when it stays safe. Clear details are the first act of care.', 'kitchen'],
  ['02', 'Connect with NGOs', 'Nearby organisations browse the listing and decide whether they can collect it in time, based on their capacity and service area.', 'connect'],
  ['03', 'Deliver with Care', 'A volunteer or NGO team collects the food and brings it to people who need it, following food-safety guidance at each handover.', 'deliver']
]
export default function HowItWorks() {
  return (
    <section id="how" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal><h2 className="text-4xl text-deep sm:text-6xl">How it <span className="italic text-forest">works</span></h2></Reveal>
        <div className="mt-20 space-y-24 lg:space-y-32">
          {STEPS.map(([n, t, d, img], i) => (
            <div key={n} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`}>
                <SmartImg img={IMG[img]} className={`h-72 w-full sm:h-96 ${i === 1 ? 'rounded-bl-[7rem]' : i === 2 ? 'rounded-t-[8rem]' : 'rounded-tr-[7rem]'}`} />
              </Reveal>
              <Reveal delay={0.1} className={`lg:col-span-5 ${i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                <span className="font-display text-8xl leading-none text-harvest/70">{n}</span>
                <h3 className="mt-2 text-3xl text-deep sm:text-4xl">{t}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/75">{d}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
