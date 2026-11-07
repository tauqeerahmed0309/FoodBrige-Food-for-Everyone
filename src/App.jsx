import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Modal from './components/Modal.jsx'
import Button from './components/Button.jsx'
import FormModal from './forms/FormModal.jsx'
import { DONATE, VOLUNTEER, PARTNER } from './forms/configs.js'
import Hero from './sections/Hero.jsx'
import Problem from './sections/Problem.jsx'
import Solution from './sections/Solution.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import Features from './sections/Features.jsx'
import Impact from './sections/Impact.jsx'
import RescueLoop from './sections/RescueLoop.jsx'
import Stories from './sections/Stories.jsx'
import FinalCTA from './sections/FinalCTA.jsx'
import Footer from './sections/Footer.jsx'
const FORMS = { donate: DONATE, volunteer: VOLUNTEER, partner: PARTNER }
const LEGAL = {
  'legal-privacy': ['Privacy Policy', 'FoodBridge is a prototype. Details you submit are stored only in your own browser (LocalStorage) and are never transmitted or shared. You can clear them any time by clearing site data. This placeholder should be replaced with a full policy before any real launch.'],
  'legal-terms': ['Terms of Service', 'FoodBridge is a demonstration project. Listings do not create real pickups, and organisations shown are fictional. Food donors remain responsible for food safety. This placeholder should be replaced with full terms before any real launch.']
}
export default function App() {
  const [modal, setModal] = useState(null)
  const open = useCallback((kind, initial = {}) => setModal({ kind, initial }), [])
  const close = useCallback(() => setModal(null), [])
  return (
    <MotionConfig reducedMotion="user">
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-harvest focus:p-3">Skip to content</a>
      <Nav onDonate={() => open('donate')} />
      <main>
        <Hero onDonate={() => open('donate')} /><Problem /><Solution /><HowItWorks />
        <RescueLoop onDonate={() => open('donate')} /><Features onPartner={(i) => open('partner', i)} /><Impact /><Stories /><FinalCTA open={open} />
      </main>
      <Footer open={open} />
      <AnimatePresence>
        {modal && FORMS[modal.kind] && <FormModal key={modal.kind} cfg={FORMS[modal.kind]} initial={modal.initial} onClose={close} />}
        {modal && LEGAL[modal.kind] && <Modal key={modal.kind} title={LEGAL[modal.kind][0]} onClose={close}><p className="mt-4 leading-relaxed text-ink/80">{LEGAL[modal.kind][1]}</p><Button variant="dark" className="mt-6" onClick={close}>Close</Button></Modal>}
      </AnimatePresence>
    </MotionConfig>
  )
}
