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
    'Politique de Confidentialité / Privacy Policy',
    'FoodBridge est un prototype de recherche et démonstration citoyenne. Les informations que vous saisissez (dons, coordonnées de contact, réservations) sont enregistrées exclusivement au sein du stockage local (LocalStorage) de votre propre navigateur internet. Aucune donnée n’est transmise vers un serveur externe, ni commercialisée. Vous pouvez réinitialiser l’ensemble des données à tout moment via le pied de page ou les paramètres de votre navigateur.'
  ],
  'legal-terms': [
    'Conditions Générales d’Utilisation / Terms of Service',
    'FoodBridge constitue un modèle fonctionnel et démonstratif. Les annonces et coordonnées d’associations présentées sont fournies à titre indicatif et scénarisé. Les donateurs professionnels et particuliers conservent l’entière responsabilité de la fraîcheur, de la traçabilité et de l’hygiène alimentaire des denrées déclarées.'
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-jaune focus:text-gris focus:font-semibold focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
      >
        Aller au contenu principal
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
            <p className="mt-4 leading-relaxed text-sm text-grisDoux">
              {LEGAL[modal.kind][1]}
            </p>
            <div className="mt-8 flex justify-end">
              <Button variant="dark" onClick={close}>
                Fermer
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
