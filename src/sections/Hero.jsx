import { motion } from 'framer-motion'
import Button from '../components/Button.jsx'
import SmartImg from '../components/SmartImg.jsx'
import BrandMark from '../components/BrandMark.jsx'
import { IMG } from '../data/images.js'

export default function Hero({ onDonate }) {
  return (
    <section id="accueil" className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-fond">
      <div className="wrap">
        {/* Top editorial label */}
        <div className="flex items-center justify-between border-b border-ligne pb-4 mb-8">
          <p className="label-tag text-grisDoux">
            <span className="label-index font-mono text-jaune">01</span>
            <span>Dispositif Solidaire · Food Rescue Network</span>
          </p>
          <span className="hidden sm:inline text-xs text-grisDoux uppercase tracking-widest font-mono">
            Bangalore &middot; 2026
          </span>
        </div>

        {/* Hero Title Grid */}
        <div className="grid gap-10 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="display text-gris tracking-tight">
              <span className="block">Every meal,</span>
              <span className="block mt-1 sm:mt-2">
                <span className="inline-flex items-center align-middle mr-3 sm:mr-5">
                  <span className="inline-grid h-12 w-16 sm:h-16 sm:w-24 place-items-center rounded-full border border-ligne bg-fond2 text-vert">
                    <BrandMark className="h-6 w-6 sm:h-8 sm:w-8 text-vert" />
                  </span>
                </span>
                every <span className="marker">destination.</span>
              </span>
            </h1>

            <p className="lead mt-8 text-grisDoux">
              FoodBridge connects edible surplus from restaurants, kitchens and banquets
              with local shelters and community pantries. We turn avoidable food waste into
              transparent, dignified nourishment.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button onClick={onDonate}>
                Donate Surplus Food
              </Button>
              <a
                href="#parcours"
                className="group inline-flex items-center gap-2 rounded-lg border border-ligne px-5 py-3 text-sm font-semibold text-gris hover:border-gris transition-colors"
              >
                <span>Discover How It Works</span>
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </div>

          {/* Rotating Emmaüs Circular Seal Badge */}
          <div className="lg:col-span-4 flex lg:justify-end items-center">
            <a
              href="#constat"
              className="relative inline-grid place-items-center group focus:outline-none"
              aria-label="Faites défiler pour explorer"
            >
              <svg
                viewBox="0 0 160 160"
                className="h-32 w-32 sm:h-36 sm:w-36 animate-spin-slow text-gris"
              >
                <defs>
                  <path
                    id="hero-badge-circle"
                    d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  />
                </defs>
                <text className="text-[10.5px] uppercase tracking-[0.22em] fill-current font-medium">
                  <textPath href="#hero-badge-circle" startOffset="0%">
                    Scroll Down &middot; FoodBridge Solidarit&eacute; &middot; Rescue &middot;
                  </textPath>
                </text>
              </svg>
              <div className="absolute grid h-12 w-12 place-items-center rounded-full bg-gris text-jaune group-hover:scale-110 transition-transform">
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

        {/* Asymmetrical Editorial Image Composition */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-8 relative overflow-hidden rounded-2xl border border-ligne bg-fond2 h-[320px] sm:h-[420px] lg:h-[480px]">
            <SmartImg
              img={IMG.hero}
              priority
              className="h-full w-full object-cover filter contrast-[1.03]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gris/80 via-gris/40 to-transparent p-6 text-fond flex items-baseline justify-between">
              <div>
                <p className="label-tag text-jaune">Surplus Collecté</p>
                <p className="font-display text-lg sm:text-xl font-medium mt-1">
                  Wholesome produce & cooked batches preserved daily.
                </p>
              </div>
              <span className="hidden sm:inline font-mono text-xs text-fond/70">Ref: KA-01</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="relative overflow-hidden rounded-2xl border border-ligne bg-fond2 h-[220px] sm:h-[260px]">
              <SmartImg
                img={IMG.heroSmall}
                priority
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-fond/90 backdrop-blur px-3 py-1 rounded-md text-xs font-semibold text-vert border border-ligne">
                Warm Handover
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-ligne bg-fond2 flex flex-col justify-between">
              <p className="text-xs font-mono uppercase tracking-widest text-grisDoux">
                Local Impact Horizon
              </p>
              <p className="font-display text-2xl sm:text-3xl font-semibold text-gris mt-3 leading-tight">
                Surplus, not waste, when it is shared with care.
              </p>
              <div className="mt-5 pt-4 border-t border-ligne flex items-center justify-between text-xs text-grisDoux">
                <span>Bengaluru Urban Grid</span>
                <span className="text-vert font-semibold">100% Non-Profit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Metrics Banner */}
        <div className="mt-14 pt-8 border-t border-ligne grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-grisDoux font-mono">01 / Donors</dt>
            <dd className="font-display text-xl sm:text-2xl text-gris mt-1">Caterers & Cafés</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-grisDoux font-mono">02 / Verified Hubs</dt>
            <dd className="font-display text-xl sm:text-2xl text-gris mt-1">6 Local Centres</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-grisDoux font-mono">03 / Target Speed</dt>
            <dd className="font-display text-xl sm:text-2xl text-gris mt-1">&lt; 90 min Collection</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-grisDoux font-mono">04 / Transparency</dt>
            <dd className="font-display text-xl sm:text-2xl text-gris mt-1">Zero Food Left</dd>
          </div>
        </div>
      </div>
    </section>
  )
}
