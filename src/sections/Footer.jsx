import { Mail } from 'lucide-react'
import { clearDemoData } from '../hooks/useStorage.js'
import { useState } from 'react'
import BrandMark from '../components/BrandMark.jsx'
export default function Footer({ open }) {
  const [cleared, setCleared] = useState(false)
  const clear = () => { if (window.confirm('Clear only FoodBridge judge-demo donations and their related demo interests from this browser? Your donation, volunteer and partnership records will be preserved.')) { try { clearDemoData(); window.dispatchEvent(new Event('foodbridge:updated')); setCleared(true) } catch { setCleared(false) } } }
  const nav = [['home', 'Home'], ['mission', 'Our Mission'], ['how', 'How It Works'], ['impact', 'Our Impact'], ['stories', 'Stories']]
  return (
    <footer className="bg-ink py-16 text-ivory/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5"><p className="flex items-center gap-2 font-display text-2xl text-ivory"><BrandMark className="h-7 w-7 text-harvest" />FoodBridge</p><p className="mt-3 italic">Every meal deserves a destination.</p></div>
        <nav aria-label="Footer" className="md:col-span-3"><ul className="space-y-2 text-sm">{nav.map(([id, l]) => <li key={id}><a className="hover:text-harvest" href={`#${id}`}>{l}</a></li>)}<li><button className="hover:text-harvest" onClick={() => open('donate')}>Donate Food</button></li></ul></nav>
        <div className="text-sm md:col-span-4"><p className="flex items-center gap-2"><Mail size={14} />hello@foodbridge.example</p><p className="mt-1">Bengaluru, India (placeholder)</p>
          <p className="mt-4 text-xs text-ivory/55">Social profiles are not available for this prototype.</p><button type="button" onClick={clear} className="mt-3 text-xs underline underline-offset-4 hover:text-harvest">Clear FoodBridge demo data</button>{cleared && <p role="status" className="mt-2 text-xs text-harvest">Demo data cleared from this browser.</p>}</div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-3 border-t border-ivory/15 px-5 pt-6 text-xs sm:flex-row lg:px-10">
        <p>© {new Date().getFullYear()} FoodBridge. Prototype built for the OSCode AI Prompt Battle.</p>
        <p className="flex gap-5"><button onClick={() => open('legal-privacy')} className="hover:text-harvest">Privacy Policy</button><button onClick={() => open('legal-terms')} className="hover:text-harvest">Terms of Service</button></p>
      </div>
    </footer>
  )
}
