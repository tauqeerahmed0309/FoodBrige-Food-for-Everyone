import { useState } from 'react'
import { Mail, MapPin, RefreshCw } from 'lucide-react'
import BrandMark from '../components/BrandMark.jsx'
import { clearDemoData } from '../hooks/useStorage.js'

const NAV_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'crisis', label: 'The Problem' },
  { id: 'approach', label: 'Our Approach' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'rescue-loop', label: 'Rescue Studio' },
  { id: 'partner-hubs', label: 'Community Hubs' },
  { id: 'impact', label: 'Audited Impact' },
  { id: 'stories', label: 'Stories' }
]

export default function Footer({ open }) {
  const [cleared, setCleared] = useState(false)

  const handleClearDemo = () => {
    if (
      window.confirm(
        'Reset only the simulated demonstration scenario data? Your personal donation, volunteer, and partnership entries will be preserved.'
      )
    ) {
      try {
        clearDemoData()
        window.dispatchEvent(new Event('foodbridge:updated'))
        setCleared(true)
        setTimeout(() => setCleared(false), 4000)
      } catch {
        setCleared(false)
      }
    }
  }

  return (
    <footer className="bg-[#0D2B1E] text-[#F5F2E9] pt-16 pb-12 border-t border-[#365B46]">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12 pb-16 border-b border-[#365B46]">
          {/* Brand & Editorial Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#overview" className="inline-flex items-center gap-3">
              <BrandMark className="h-8 w-8 text-[#B7D66B]" />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-normal tracking-tight text-[#F5F2E9] leading-none">
                  FoodBridge
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#C5D2C7] mt-1">
                  Civic Food Logistics &middot; Bangalore
                </span>
              </div>
            </a>
            <p className="font-display text-2xl text-[#F5F2E9] italic leading-snug max-w-sm pt-2 font-normal">
              &ldquo;Every meal deserves a destination.&rdquo;
            </p>
            <p className="text-xs text-[#C5D2C7] leading-relaxed max-w-sm font-body">
              An open civic framework facilitating the fast, verified recovery and transparent
              distribution of commercial kitchen surplus directly to community pantries.
            </p>
          </div>

          {/* Navigation Column */}
          <nav aria-label="Secondary navigation" className="md:col-span-3 space-y-3">
            <p className="label-tag text-[#B7D66B]">Navigation</p>
            <ul className="space-y-2 text-xs font-mono">
              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-[#C5D2C7] hover:text-[#B7D66B] transition-colors inline-block py-0.5"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => open('donate')}
                  className="text-[#B7D66B] hover:underline font-semibold"
                >
                  &rarr; Donate Surplus
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact & Local Maintenance Column */}
          <div className="md:col-span-4 space-y-4">
            <p className="label-tag text-[#B7D66B]">Contact &amp; Operations</p>
            <div className="space-y-2 text-xs font-mono text-[#C5D2C7]">
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-[#B7D66B]" />
                <span>hello@foodbridge.example</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-[#B7D66B]" />
                <span>Metropolitan Network, Bangalore, India</span>
              </p>
            </div>

            <div className="pt-4 border-t border-[#365B46] space-y-2">
              <p className="text-[11px] font-mono text-[#C5D2C7]">
                Local demonstration session &middot; Isolated client-side state
              </p>
              <button
                type="button"
                onClick={handleClearDemo}
                className="inline-flex items-center gap-2 text-xs font-mono underline hover:text-[#B7D66B] text-[#C5D2C7] transition-colors"
              >
                <RefreshCw size={12} />
                <span>Reset demonstration scenario data</span>
              </button>
              {cleared && (
                <p role="status" className="text-xs font-mono text-[#B7D66B]">
                  &check; Demonstration data successfully cleared.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#C5D2C7]/70">
          <p>
            &copy; 2026 FoodBridge Civic Initiative. Open MIT Framework.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => open('legal-privacy')}
              className="hover:text-[#F5F2E9] transition-colors underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => open('legal-terms')}
              className="hover:text-[#F5F2E9] transition-colors underline"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
