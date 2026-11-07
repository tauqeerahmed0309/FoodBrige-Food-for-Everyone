import Button from '../components/Button.jsx'
import SmartImg from '../components/SmartImg.jsx'
import Reveal from '../components/Reveal.jsx'
import { IMG } from '../data/images.js'
export default function FinalCTA({ open }) {
  return (
    <section className="relative isolate overflow-hidden bg-deep">
      <SmartImg img={IMG.cta} className="absolute inset-0 -z-10 h-full w-full opacity-30" />
      <div className="mx-auto max-w-7xl px-5 py-28 lg:px-10 lg:py-40">
        <Reveal>
          <h2 className="max-w-4xl text-5xl leading-[1.02] text-ivory sm:text-7xl lg:text-8xl">Be part of <span className="italic text-harvest">something good.</span></h2>
          <p className="mt-6 max-w-xl text-lg text-sage">Share a meal, give an evening or start a partnership. Every route begins with a small step.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => open('donate')}>Donate Food</Button>
            <Button variant="ghost" className="text-ivory" onClick={() => open('volunteer')}>Become a Volunteer</Button>
            <Button variant="ghost" className="text-ivory" onClick={() => open('partner')}>Partner With Us</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
