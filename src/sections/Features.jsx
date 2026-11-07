import { useEffect, useMemo, useState } from 'react'
import {
  Search,
  Phone,
  Mail,
  ChevronDown,
  Navigation,
  Heart,
  Truck,
  HandHeart,
  Building2,
  Users,
  MessagesSquare,
  LineChart
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { NGOS } from '../data/images.js'
import { readEntries, safeDonations, saveEntry, STORAGE_KEYS } from '../hooks/useStorage.js'

const PILLARS = [
  {
    icon: HandHeart,
    title: 'Easy Surplus Donation',
    desc: 'A straightforward cataloging workflow captures food category, exact servings, preparation timestamps, and thermal storage condition.'
  },
  {
    icon: Building2,
    title: 'Verified NGO Partnerships',
    desc: 'A transparent network of community kitchens, night shelters, and distribution pantries searchable by neighborhood and capacity.'
  },
  {
    icon: Truck,
    title: 'Pickup & Dispatch Coordination',
    desc: 'Explicit safe-consumption windows and collection addresses travel with every batch to ensure timely and safe transfer.'
  },
  {
    icon: Users,
    title: 'Volunteer Courier Mobilization',
    desc: 'Civic couriers, delivery drivers, and packing volunteers can register their availability and step in for local transport.'
  },
  {
    icon: MessagesSquare,
    title: 'Community Need Radar',
    desc: 'Real kitchen stories and open community need radars keep donors and receiving pantries closely aligned.'
  },
  {
    icon: LineChart,
    title: 'Audited Civic Impact Tracking',
    desc: 'Transparent, browser-local accounting of meals rescued, portions shared, and organic waste prevented.'
  }
]

export default function Features({ onPartner }) {
  const [q, setQ] = useState('')
  const [donations, setDonations] = useState(() => safeDonations())
  const [interest, setInterest] = useState('')
  const [expandedTransit, setExpandedTransit] = useState({})

  const refresh = () => setDonations(safeDonations())

  useEffect(() => {
    window.addEventListener('foodbridge:updated', refresh)
    return () => window.removeEventListener('foodbridge:updated', refresh)
  }, [])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return NGOS.filter(
      (n) =>
        !s ||
        n.name.toLowerCase().includes(s) ||
        n.location.toLowerCase().includes(s) ||
        n.area.toLowerCase().includes(s) ||
        n.focus.toLowerCase().includes(s)
    )
  }, [q])

  const visibleDonations = useMemo(() => {
    const s = q.trim().toLowerCase()
    return donations.filter(
      (d) =>
        !s ||
        d.category.toLowerCase().includes(s) ||
        d.location.toLowerCase().includes(s)
    )
  }, [donations, q])

  const expressInterest = (donation) => {
    const exists = readEntries(STORAGE_KEYS.interests).some(
      (x) => x.donationId === donation.id && x.ngoId === 'demo-ngo'
    )
    if (exists) {
      return setInterest('Interest has already been recorded for this listing in this browser.')
    }
    try {
      saveEntry(STORAGE_KEYS.interests, {
        donationId: donation.id,
        ngoId: 'demo-ngo',
        ngoName: 'Sample Verified NGO Profile',
        simulated: true
      })
      setInterest(
        'Simulated NGO interest recorded locally. No actual organisation was notified.'
      )
    } catch {
      setInterest('Unable to store interest record in browser storage.')
    }
  }

  const toggleTransit = (id) => {
    setExpandedTransit((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="features" className="py-20 md:py-32 bg-[#F5F2E9] border-t border-[#D8D2C2]">
      {/* Fallback anchors for backwards compatibility */}
      <span id="ngos" className="sr-only" />
      <span id="boutiques" className="sr-only" />

      {/* Part 1: Core Platform Capabilities (6 Pillars) */}
      <div className="wrap mb-20 md:mb-28">
        <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-4 mb-12">
          <p className="label-tag text-[#111411]">
            <span className="label-index font-mono text-[#123B2A] font-bold">06</span>
            <span>Platform Capabilities &middot; Six Systems</span>
          </p>
          <span className="text-xs font-mono text-[#4A534B] uppercase tracking-wider">
            Infrastructure
          </span>
        </div>

        <Reveal>
          <div className="max-w-3xl mb-14">
            <h2 className="h2 text-[#111411] tracking-tight">
              Built for the people who <span className="marker-dark text-[#123B2A]">move food.</span>
            </h2>
            <p className="lead mt-4 text-[#333A34]">
              Six deliberate operational capabilities designed to simplify surplus donation,
              verify partner capacities, and eliminate coordination delays.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="p-7 rounded-2xl border border-[#D8D2C2] bg-[#E9E4D6] hover:border-[#111411] transition-colors flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#D8D2C2]">
                    <span className="font-mono text-xs font-bold text-[#123B2A]">0{i + 1}</span>
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-[#D8D2C2] bg-[#F5F2E9] text-[#123B2A] group-hover:bg-[#123B2A] group-hover:text-[#F5F2E9] transition-colors">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-[#111411] mt-5 font-normal">
                    {title}
                  </h3>
                  <p className="text-xs text-[#333A34] leading-relaxed mt-2.5 font-body">
                    {desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#D8D2C2]/60 flex items-center justify-between text-[11px] font-mono text-[#4A534B]">
                  <span>Operational Standard</span>
                  <span className="text-[#123B2A] font-semibold">Active &check;</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Part 2: Verified Partner Hubs (Community Distribution Infrastructure) */}
      <div id="partner-hubs" className="scroll-mt-24">
        {/* Marquee Header */}
        <div className="overflow-hidden border-y border-[#D8D2C2] py-4 bg-[#E9E4D6]">
          <div className="marquee-track flex gap-8 text-xs font-mono tracking-[0.25em] uppercase text-[#4A534B] select-none">
            <span>VERIFIED RESCUE HUBS &bull; BENGALURU CIVIC NETWORK</span>
            <span>&bull;</span>
            <span>ZERO EDIBLE FOOD LEFT BEHIND &bull; REFRIGERATED TRANSIT</span>
            <span>&bull;</span>
            <span>DIRECT CHARITY DISTRIBUTION &bull; 100% NON-PROFIT</span>
            <span>&bull;</span>
            <span>VERIFIED RESCUE HUBS &bull; BENGALURU CIVIC NETWORK</span>
            <span>&bull;</span>
            <span>ZERO EDIBLE FOOD LEFT BEHIND &bull; REFRIGERATED TRANSIT</span>
            <span>&bull;</span>
            <span>DIRECT CHARITY DISTRIBUTION &bull; 100% NON-PROFIT</span>
          </div>
        </div>

        <div className="wrap pt-14">
          {/* Twin Banner Lines */}
          <div className="border-b border-[#D8D2C2] pb-8 mb-14">
            <div className="grid lg:grid-cols-12 gap-6 items-baseline">
              <div className="lg:col-span-6">
                <p className="text-2xl sm:text-3xl font-display text-[#111411] leading-snug font-normal">
                  Six operational partner kitchens to donate, coordinate, and redistribute.
                </p>
              </div>
              <div className="lg:col-span-6">
                <p className="text-sm sm:text-base text-[#333A34] leading-relaxed font-body">
                  Each verified centre maintains insulated temperature holding or trained volunteer
                  couriers equipped to safeguard both hot-held and fresh perishable batches.
                </p>
              </div>
            </div>
          </div>

          {/* Partner Hubs Section Layout */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Sticky Aside */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
              <div>
                <p className="label-tag text-[#111411]">
                  <span className="label-index font-mono text-[#123B2A] font-bold">07</span>
                  <span>Verified Partner Hubs</span>
                </p>
                <h2 className="h2 text-[#111411] mt-3 tracking-tight">
                  Our partner hubs
                </h2>
                <p className="mt-4 text-sm text-[#333A34] leading-relaxed font-body">
                  Active coordination Monday through Saturday, 08:00 to 20:00. Select an organisation
                  to inspect its location, contact lines, and delivery bay guidelines.
                </p>
              </div>

              {/* Filter Search Input */}
              <div className="space-y-2">
                <label htmlFor="hub-search" className="text-xs font-mono uppercase tracking-wider text-[#4A534B] block">
                  Filter by name or district:
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A534B]"
                  />
                  <input
                    id="hub-search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="e.g. Indiranagar, Koramangala, Hebbal..."
                    className="w-full rounded-lg border border-[#D8D2C2] bg-[#FAF8F3] py-3 pl-10 pr-4 text-sm text-[#111411] placeholder:text-[#4A534B]/60 focus:outline-none focus:border-[#123B2A] font-body"
                  />
                </div>
                <p className="text-[11px] font-mono text-[#4A534B] pt-1">
                  {list.length} hub{list.length === 1 ? '' : 's'} cataloged
                </p>
              </div>

              {/* Callout box */}
              <div className="p-6 rounded-2xl border border-[#D8D2C2] bg-[#E9E4D6] space-y-3">
                <p className="font-display text-xl font-normal text-[#111411]">
                  Do you represent a community shelter?
                </p>
                <p className="text-xs text-[#333A34] leading-relaxed font-body">
                  Join the FoodBridge network to receive automated notifications for surplus food
                  batches in your collection radius.
                </p>
                <Button
                  variant="dark"
                  onClick={() =>
                    onPartner({
                      message:
                        'Hello, we represent a community shelter and would like to register as an authorized FoodBridge partner hub.'
                    })
                  }
                  className="w-full justify-center !min-h-[40px] !text-xs !py-2"
                >
                  Propose a Partnership
                </Button>
              </div>
            </div>

            {/* Right Column: Two-Column Hairline Grid */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-8 divide-y sm:divide-y-0 sm:divide-x-0 border-t border-[#D8D2C2] pt-8">
                {list.map((ngo) => {
                  const isExpanded = !!expandedTransit[ngo.id]

                  return (
                    <article
                      key={ngo.id}
                      className="pt-6 sm:pt-0 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Shop Meta Label */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C2]">
                          <p className="label-tag text-[#4A534B]">
                            <span className="label-index font-mono text-[#123B2A] font-bold">
                              {ngo.year || '2020'}
                            </span>
                            <span>{ngo.focus}</span>
                          </p>
                          <span className="font-mono text-[11px] text-[#123B2A] font-semibold">
                            {ngo.area.split(' ')[0]}
                          </span>
                        </div>

                        {/* Shop Name */}
                        <h3 className="h3 mt-4 text-[#111411] group-hover:text-[#123B2A] transition-colors">
                          <button
                            type="button"
                            onClick={() =>
                              onPartner({
                                message: `Hello ${ngo.name}, we would like to connect about surplus food donations in your service area.`,
                                location: ngo.location
                              })
                            }
                            className="text-left font-display text-2xl font-normal tracking-tight inline-flex items-center gap-2 text-[#111411]"
                          >
                            <span>{ngo.name}</span>
                            <span className="text-base text-[#123B2A] group-hover:translate-x-1 transition-transform">
                              &rarr;
                            </span>
                          </button>
                        </h3>

                        {/* Shop Address */}
                        <address className="mt-3 not-italic text-xs text-[#4A534B] leading-relaxed font-body">
                          <span className="font-medium text-[#111411] block">{ngo.street || ngo.location}</span>
                          <span>{ngo.area} &bull; Bangalore</span>
                        </address>

                        <p className="mt-3 text-xs text-[#333A34] leading-relaxed font-body">
                          {ngo.desc}
                        </p>
                      </div>

                      {/* Shop Actions */}
                      <div className="mt-6 pt-4 border-t border-[#D8D2C2] space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {ngo.phone && (
                            <a
                              href={`tel:${ngo.phone.replace(/\s+/g, '')}`}
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4A534B] hover:text-[#111411] px-2.5 py-1.5 rounded border border-[#D8D2C2] bg-[#FAF8F3]"
                            >
                              <Phone size={12} />
                              <span>{ngo.phone}</span>
                            </a>
                          )}

                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              `${ngo.name} ${ngo.location}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#123B2A] font-semibold hover:underline px-2.5 py-1.5 rounded border border-[#D8D2C2] bg-[#FAF8F3]"
                          >
                            <Navigation size={12} />
                            <span>Directions ↗</span>
                          </a>

                          <button
                            onClick={() =>
                              onPartner({
                                message: `Hello ${ngo.name}, we have surplus available for your beneficiaries.`,
                                location: ngo.location
                              })
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111411] hover:text-[#123B2A] px-2.5 py-1.5 rounded border border-[#D8D2C2] bg-[#FAF8F3] hover:border-[#111411] transition-colors"
                          >
                            <Mail size={12} />
                            <span>Direct Contact</span>
                          </button>
                        </div>

                        {/* Transit Dropdown Trigger */}
                        <button
                          type="button"
                          onClick={() => toggleTransit(ngo.id)}
                          className="w-full flex items-center justify-between text-xs font-mono text-[#4A534B] hover:text-[#111411] py-2 border-t border-[#D8D2C2]/60"
                        >
                          <span className="flex items-center gap-1.5">
                            <Truck size={13} className="text-[#123B2A]" />
                            <span>Transit &amp; Delivery Dock Details</span>
                          </span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#123B2A]' : ''
                            }`}
                          />
                        </button>

                        {/* Expandable Panel */}
                        {isExpanded && (
                          <div className="p-3 rounded-lg bg-[#E9E4D6] border border-[#D8D2C2] text-[11px] font-mono text-[#333A34] space-y-1.5">
                            {ngo.transit?.map((route, rIdx) => (
                              <p key={rIdx} className="flex items-start gap-1.5">
                                <span className="text-[#123B2A] font-bold">&bull;</span>
                                <span>{route}</span>
                              </p>
                            )) || <p>Standard street loading bay available.</p>}
                          </div>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>

              {!list.length && (
                <div className="py-16 text-center border-t border-[#D8D2C2]">
                  <p className="text-sm text-[#4A534B] font-body">
                    No verified hubs match your search &ldquo;{q}&rdquo;.
                  </p>
                  <button
                    onClick={() => setQ('')}
                    className="mt-3 text-xs font-mono text-[#123B2A] font-semibold underline"
                  >
                    Reset filter
                  </button>
                </div>
              )}

              {/* Local Prototype Available Donations Registry */}
              <div className="mt-20 pt-12 border-t border-[#D8D2C2]">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
                  <div>
                    <p className="label-tag text-[#111411]">
                      <span className="label-index font-mono text-[#123B2A] font-bold">Feed</span>
                      <span>Active Listings &middot; Local Prototype Feed</span>
                    </p>
                    <h3 className="h3 mt-1 text-[#111411]">
                      Surplus batches logged in this browser
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#4A534B]">
                    Browser-Local Storage
                  </span>
                </div>

                {interest && (
                  <div className="p-3 mb-6 rounded-lg bg-[#123B2A]/10 border border-[#123B2A]/20 text-xs font-mono text-[#123B2A] font-semibold">
                    {interest}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  {visibleDonations.map((d) => (
                    <article
                      key={d.id}
                      className="p-5 rounded-xl border border-[#D8D2C2] bg-[#E9E4D6] flex flex-col justify-between"
                    >
                      <div>
                        <span className="label-tag text-[#4A534B]">
                          {d.demo ? 'Simulated · ' : ''}
                          {d.category}
                        </span>
                        <h4 className="font-display text-xl text-[#111411] mt-2 font-normal">
                          {d.quantity} &middot; {d.servings} portions
                        </h4>
                        <p className="text-xs text-[#4A534B] mt-1 font-body">{d.location}</p>
                        <p className="text-[11px] font-mono text-[#4A534B] mt-2">
                          Collection before: {new Date(d.deadline).toLocaleString('en-IN')}
                        </p>
                      </div>

                      <button
                        onClick={() => expressInterest(d)}
                        className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg bg-[#FAF8F3] border border-[#D8D2C2] py-2 text-xs font-semibold text-[#111411] hover:border-[#111411] transition-colors"
                      >
                        <Heart size={13} className="text-[#123B2A]" />
                        <span>Sample NGO expresses interest</span>
                      </button>
                    </article>
                  ))}
                </div>

                {!visibleDonations.length && (
                  <p className="py-8 text-center text-xs font-mono text-[#4A534B]">
                    No current local demonstration donations match your search. Submit a donation with a future deadline to see it here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
