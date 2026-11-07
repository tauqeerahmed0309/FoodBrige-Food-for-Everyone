import Button from '../components/Button.jsx'
import SmartImg from '../components/SmartImg.jsx'
import BrandMark from '../components/BrandMark.jsx'
import { IMG } from '../data/images.js'

export default function Hero({ onDonate }) {
  return (
    <section id="overview" className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-[#123B2A] text-[#F5F2E9]">
      <div className="wrap">
        {/* Top Editorial Label */}
        <div className="flex items-center justify-between border-b border-[#365B46] pb-4 mb-10">
          <p className="label-tag text-[#C5D2C7]">
            <span className="label-index text-[#B7D66B] font-mono">01</span>
            <span>Civic Food Logistics &middot; Direct Surplus Dispatch</span>
          </p>
          <span className="hidden sm:inline text-xs text-[#C5D2C7] font-mono tracking-widest uppercase">
            Bangalore Metropolitan Area &middot; 2026
          </span>
        </div>

        {/* Hero Title & Rotating Seal Grid */}
        <div className="grid gap-10 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="display text-[#F5F2E9] tracking-tight">
              <span className="block">Every meal,</span>
              <span className="block mt-1 sm:mt-2">
                <span className="inline-flex items-center align-middle mr-3 sm:mr-5">
                  <span className="inline-grid h-12 w-16 sm:h-16 sm:w-24 place-items-center rounded-full border border-[#365B46] bg-[#194B35] text-[#B7D66B]">
                    <BrandMark className="h-6 w-6 sm:h-8 sm:w-8 text-[#B7D66B]" />
                  </span>
                </span>
                every <span className="marker text-[#B7D66B]">destination.</span>
              </span>
            </h1>

            <p className="lead mt-8 text-[#C5D2C7]">
              FoodBridge connects edible surplus from Bangalore&apos;s commercial kitchens, banquets,
              and food businesses with verified neighbourhood shelters. Turning food rescue into an
              open, dignified civic reality.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" onClick={onDonate}>
                Donate Surplus Food
              </Button>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-lg border border-[#365B46] px-5 py-3 text-sm font-semibold text-[#F5F2E9] hover:bg-[#194B35] transition-colors"
              >
                <span>Discover How It Works</span>
                <span className="transition-transform group-hover:translate-y-0.5 text-[#B7D66B]">&darr;</span>
              </a>
            </div>
          </div>

          {/* Rotating Circular Seal Badge */}
          <div className="lg:col-span-4 flex lg:justify-end items-center">
            <a
              href="#crisis"
              className="relative inline-grid place-items-center group focus:outline-none"
              aria-label="Scroll down to explore"
            >
              <svg
                viewBox="0 0 160 160"
                className="h-32 w-32 sm:h-36 sm:w-36 animate-spin-slow text-[#B7D66B]"
              >
                <defs>
                  <path
                    id="hero-badge-circle"
                    d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  />
                </defs>
                <text className="text-[10px] uppercase tracking-[0.24em] fill-current font-mono font-medium">
                  <textPath href="#hero-badge-circle" startOffset="0%">
                    Scroll Down &middot; FoodBridge Civic Network &middot;
                  </textPath>
                </text>
              </svg>
              <div className="absolute grid h-12 w-12 place-items-center rounded-full bg-[#F5F2E9] text-[#123B2A] group-hover:scale-110 transition-transform shadow-md">
                <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-90">
                  <path
                    d="M1 8h13M9 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Asymmetrical Editorial Imagery */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-8 relative overflow-hidden rounded-2xl border border-[#365B46] bg-[#194B35] h-[320px] sm:h-[420px] lg:h-[480px]">
            <SmartImg
              img={IMG.hero}
              priority
              className="h-full w-full object-cover filter contrast-[1.03]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#123B2A]/90 via-[#123B2A]/40 to-transparent p-6 text-[#F5F2E9] flex items-baseline justify-between">
              <div>
                <p className="label-tag text-[#B7D66B]">Surplus Intake</p>
                <p className="font-display text-2xl sm:text-3xl font-normal mt-1 text-[#F5F2E9]">
                  Wholesome produce &amp; hot batches catalogued daily.
                </p>
              </div>
              <span className="hidden sm:inline font-mono text-xs text-[#C5D2C7]">Batch: BLR-01</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#365B46] bg-[#194B35] h-[220px] sm:h-[260px]">
              <SmartImg
                img={IMG.heroSmall}
                priority
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#123B2A]/95 backdrop-blur px-3 py-1 rounded-md text-xs font-mono font-semibold text-[#B7D66B] border border-[#365B46]">
                Thermal Handover
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[#365B46] bg-[#194B35] flex flex-col justify-between">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C5D2C7]">
                Civic Horizon &middot; Bangalore
              </p>
              <p className="font-display text-2xl sm:text-3xl font-normal text-[#F5F2E9] mt-3 leading-tight">
                Surplus, not waste, when it is handled with care and dignity.
              </p>
              <div className="mt-5 pt-4 border-t border-[#365B46] flex items-center justify-between text-xs font-mono text-[#C5D2C7]">
                <span>Direct Shelter Delivery</span>
                <span className="text-[#B7D66B] font-semibold">100% Non-Profit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Metrics Banner */}
        <div className="mt-14 pt-8 border-t border-[#365B46] grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-[#C5D2C7] font-mono">01 / Donors</dt>
            <dd className="font-display text-2xl sm:text-3xl text-[#F5F2E9] mt-1">Caterers &amp; Cafés</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-[#C5D2C7] font-mono">02 / Verified Hubs</dt>
            <dd className="font-display text-2xl sm:text-3xl text-[#F5F2E9] mt-1">6 Active Pantries</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-[#C5D2C7] font-mono">03 / Target Speed</dt>
            <dd className="font-display text-2xl sm:text-3xl text-[#F5F2E9] mt-1">&lt; 90 min Dispatch</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-[#C5D2C7] font-mono">04 / Traceability</dt>
            <dd className="font-display text-2xl sm:text-3xl text-[#F5F2E9] mt-1">Zero Food Left</dd>
          </div>
        </div>
      </div>
    </section>
  )
}
