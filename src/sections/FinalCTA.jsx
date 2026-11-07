import Button from '../components/Button.jsx'
import BrandMark from '../components/BrandMark.jsx'
import Reveal from '../components/Reveal.jsx'

export default function FinalCTA({ open }) {
  return (
    <section className="relative overflow-hidden bg-[#123B2A] text-[#F5F2E9] py-28 md:py-36 border-t border-[#365B46]">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#194B35]/20 to-transparent pointer-events-none" />

      <div className="wrap relative z-10 flex flex-col items-center text-center">
        {/* Rotating Circular Seal Badge */}
        <Reveal>
          <div className="relative mb-10 inline-grid place-items-center" aria-hidden="true">
            <svg
              viewBox="0 0 200 200"
              className="h-40 w-40 sm:h-48 sm:w-48 animate-spin-slow text-[#B7D66B]"
            >
              <defs>
                <path
                  id="cta-seal-circle"
                  d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                />
              </defs>
              <text className="text-[10px] uppercase tracking-[0.24em] fill-current font-mono font-medium">
                <textPath href="#cta-seal-circle" startOffset="0%">
                  Every Meal Deserves a Destination &middot; FoodBridge &middot; Bangalore &middot;
                </textPath>
              </text>
            </svg>
            <div className="absolute grid h-16 w-16 place-items-center rounded-full bg-[#F5F2E9] text-[#123B2A] shadow-md">
              <BrandMark className="h-8 w-8 text-[#123B2A]" />
            </div>
          </div>
        </Reveal>

        {/* Display Title */}
        <Reveal delay={0.1}>
          <h2 className="display text-[#F5F2E9] max-w-4xl tracking-tight">
            Act with <span className="marker text-[#B7D66B]">urgency and care.</span>
          </h2>
          <p className="lead mt-6 text-[#C5D2C7] max-w-xl mx-auto font-body">
            A single meal donated preserves precious agricultural resources and affirms human dignity.
            Whether you run a kitchen, drive a collection route, or lead a charity pantry, every step matters.
          </p>
        </Reveal>

        {/* Action Button Group */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              onClick={() => open('donate')}
              className="!text-base !py-3.5 !px-6"
            >
              Donate Surplus Food
            </Button>
            <Button
              variant="ghost"
              onClick={() => open('volunteer')}
              className="border-[#365B46] text-[#F5F2E9] hover:bg-[#194B35] !text-base !py-3.5 !px-6"
            >
              Become a Volunteer
            </Button>
            <Button
              variant="ghost"
              onClick={() => open('partner')}
              className="border-[#365B46] text-[#F5F2E9] hover:bg-[#194B35] !text-base !py-3.5 !px-6"
            >
              Partner with Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
