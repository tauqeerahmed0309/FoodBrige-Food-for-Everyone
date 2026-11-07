import { useEffect, useMemo, useState } from 'react'
import { HandHeart, Building2, Truck, Users, MessagesSquare, LineChart, Search, MapPin, Mail, Heart } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { NGOS } from '../data/images.js'
import { readEntries, safeDonations, saveEntry, STORAGE_KEYS } from '../hooks/useStorage.js'
const F = [
  [HandHeart, 'Easy Food Donation', 'A short form captures what you have, how much and until when.'],
  [Building2, 'NGO Partnerships', 'Find organisations by name or area and reach out directly.'],
  [Truck, 'Pickup Coordination', 'Pickup address and safe-consumption deadline travel with every listing.'],
  [Users, 'Volunteer Participation', 'Offer a few hours and choose how you would like to help.'],
  [MessagesSquare, 'Community Engagement', 'Stories and local events keep people connected to the cause.'],
  [LineChart, 'Impact Tracking', 'See meals shared and food rescued over time.']
]
export default function Features({ onPartner }) {
  const [q, setQ] = useState('')
  const [donations, setDonations] = useState(() => safeDonations())
  const [interest, setInterest] = useState('')
  const refresh = () => setDonations(safeDonations())
  useEffect(() => { window.addEventListener('foodbridge:updated', refresh); return () => window.removeEventListener('foodbridge:updated', refresh) }, [])
  const list = useMemo(() => { const s = q.trim().toLowerCase(); return NGOS.filter((n) => !s || n.name.toLowerCase().includes(s) || n.location.toLowerCase().includes(s) || n.area.toLowerCase().includes(s)) }, [q])
  const visibleDonations = useMemo(() => { const s = q.trim().toLowerCase(); return donations.filter((d) => !s || d.category.toLowerCase().includes(s) || d.location.toLowerCase().includes(s)) }, [donations, q])
  const expressInterest = (donation) => {
    const exists = readEntries(STORAGE_KEYS.interests).some((x) => x.donationId === donation.id && x.ngoId === 'demo-ngo')
    if (exists) return setInterest('Interest has already been recorded for this listing in this browser.')
    try { saveEntry(STORAGE_KEYS.interests, { donationId: donation.id, ngoId: 'demo-ngo', ngoName: 'Sample NGO profile' }); setInterest('Interest recorded locally. No NGO has been contacted and no pickup is arranged.') } catch { setInterest('Interest could not be stored on this device. Please check browser storage.') }
  }
  return (
    <section className="bg-sage/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><h2 className="text-4xl text-deep sm:text-5xl">Built for the people who <span className="italic text-forest">move food.</span></h2><p className="mt-5 text-ink/75">Six things FoodBridge is designed to make simpler.</p></Reveal>
          <div className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {F.map(([Icon, t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 0.08} className={`flex gap-4 border-t border-forest/25 py-6 ${i === 0 ? 'sm:col-span-2 sm:py-10' : ''}`}>
                <Icon className="mt-1 shrink-0 text-forest" size={i === 0 ? 34 : 26} strokeWidth={1.3} />
                <div><h3 className={i === 0 ? 'text-3xl text-deep' : 'text-xl text-deep'}>{t}</h3><p className="mt-1 max-w-md text-ink/70">{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
        <div id="ngos" className="mt-24 rounded-lg bg-ivory p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><h3 className="text-3xl text-deep sm:text-4xl">Discover NGOs near you</h3><p className="mt-2 text-sm text-ink/60">Demonstration organisations only. They are fictional examples for this prototype.</p></div>
            <label className="relative block md:w-80"><span className="sr-only">Search by organisation name or location</span><Search className="absolute left-3 top-3.5 text-forest/60" size={18} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or location" className="w-full rounded-md border border-forest/30 bg-white py-3 pl-10 pr-3 text-sm" /></label>
          </div>
          <p className="mt-4 text-sm text-ink/60" aria-live="polite">{list.length} organisation{list.length === 1 ? '' : 's'} shown</p>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-md bg-forest/15 md:grid-cols-2">
            {list.map((n) => (
              <li key={n.id} className="flex flex-col justify-between gap-4 bg-ivory p-6">
                <div><p className="text-xs font-semibold uppercase tracking-widest text-harvest">{n.focus} · Demo</p><h4 className="mt-1 font-display text-xl text-deep">{n.name}</h4><p className="mt-1 flex items-center gap-1 text-sm text-forest"><MapPin size={14} />{n.location}</p><p className="mt-3 text-sm text-ink/75">{n.desc}</p><p className="mt-2 text-xs text-ink/55">Service area: {n.area}</p></div>
                <Button variant="dark" icon={Mail} className="self-start !py-2.5" onClick={() => onPartner({ message: `Hello ${n.name}, we would like to connect about surplus food donations in ${n.area}.`, location: n.location })}>Contact</Button>
              </li>
            ))}
          </ul>
          {!list.length && <p className="py-10 text-center text-ink/60">No demonstration organisations match “{q}”. Try a locality such as Koramangala or Hebbal.</p>}
          <div className="mt-12 border-t border-forest/20 pt-10">
            <h3 className="text-2xl text-deep">Available donations <span className="text-base italic text-forest">— demonstration workflow</span></h3>
            <p className="mt-2 rounded-md bg-harvest/10 p-3 text-sm text-ink/75">Demonstration mode: Donations and interest records are stored only in this browser. No real NGO notification, food collection or pickup is arranged.</p>
            {interest && <p role="status" className="mt-3 rounded-md bg-sage p-3 text-sm text-deep">{interest}</p>}
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {visibleDonations.map((d) => <article key={d.id} className="rounded-md border border-forest/20 bg-white p-5"><p className="text-xs font-semibold uppercase tracking-widest text-harvest">Local donor demonstration record</p><h4 className="mt-2 font-display text-xl text-deep">{d.category} · {d.quantity}</h4><p className="mt-2 text-sm text-ink/75">{d.servings} estimated servings · {d.location}</p><p className="mt-1 text-sm text-ink/75">Collection by: {new Date(d.deadline).toLocaleString()}</p><Button variant="dark" icon={Heart} className="mt-4 !py-2.5" onClick={() => expressInterest(d)}>Sample NGO expresses interest</Button></article>)}
            </div>
            {!visibleDonations.length && <p className="py-8 text-center text-sm text-ink/60">No current local demonstration donations match your search. Submit a donation with a future deadline to see it here.</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
