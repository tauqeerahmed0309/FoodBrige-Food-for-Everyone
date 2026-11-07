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
import RescueLoop from './sections/RescueLoop.jsx'
import Features from './sections/Features.jsx'
import Impact from './sections/Impact.jsx'
import Stories from './sections/Stories.jsx'
import FinalCTA from './sections/FinalCTA.jsx'
import Footer from './sections/Footer.jsx'

const FORMS = {
  donate: DONATE,
  volunteer: VOLUNTEER,
  partner: PARTNER
}

const LEGAL = {
  'legal-privacy': [
    'Privacy Policy',
    'FoodBridge is a demonstration prototype. All details you submit (food donations, volunteer registrations, and partnership inquiries) are stored exclusively in your own browser’s local storage (LocalStorage). No data is transmitted to any external server or third party. You can clear your records at any time via the footer link or by clearing site data in your browser settings.'
  ],
  'legal-terms': [
    'Terms of Service',
    'FoodBridge is a demonstration framework. Listings and organisation profiles shown are simulated for this civic prototype. Food donors remain fully responsible for the freshness, handling safety, and thermal storage integrity of all donated food batches before pickup.'
  ]
}

export default function App() {
  const [modal, setModal] = useState(null)
  const open = useCallback((kind, initial = {}) => setModal({ kind, initial }), [])
  const close = useCallback(() => setModal(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-jaune focus:text-gris focus:font-semibold focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg font-mono text-xs"
      >
        Skip to main content
      </a>

      <Nav onDonate={() => open('donate')} />

      <main id="main-content">
        <Hero onDonate={() => open('donate')} />
        <Problem />
        <Solution />
        <HowItWorks />
        <RescueLoop onDonate={() => open('donate')} />
        <Features onPartner={(initial) => open('partner', initial)} />
        <Impact />
        <Stories />
        <FinalCTA open={open} />
      </main>

      <Footer open={open} />

      <AnimatePresence>
        {modal && FORMS[modal.kind] && (
          <FormModal
            key={modal.kind}
            cfg={FORMS[modal.kind]}
            initial={modal.initial}
            onClose={close}
          />
        )}
        {modal && LEGAL[modal.kind] && (
          <Modal key={modal.kind} title={LEGAL[modal.kind][0]} onClose={close}>
            <p className="mt-4 leading-relaxed text-sm text-grisDoux font-body">
              {LEGAL[modal.kind][1]}
            </p>
            <div className="mt-8 flex justify-end">
              <Button variant="dark" onClick={close}>
                Close
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
