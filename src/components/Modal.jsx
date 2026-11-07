import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ title, onClose, children, closeDisabled = false }) {
  const box = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const prev = document.activeElement
    document.body.style.overflow = 'hidden'
    const sel = 'a[href],button:not([disabled]),input,select,textarea'
    box.current?.querySelector('input,select,textarea,button')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape' && !closeDisabled) return closeRef.current()
      if (e.key !== 'Tab') return
      const f = [...box.current.querySelectorAll(sel)]
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [closeDisabled])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-gris/75 backdrop-blur-sm sm:items-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => !closeDisabled && e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-ligne bg-fond p-6 sm:p-10 shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={onClose}
          disabled={closeDisabled}
          aria-label="Close dialog"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-ligne bg-fond2 text-gris hover:border-gris transition-colors disabled:opacity-40"
        >
          <X size={18} />
        </button>
        <h2 id="modal-title" className="pr-12 font-display text-2xl sm:text-3xl font-normal tracking-tight text-gris leading-snug">
          {title}
        </h2>
        {children}
      </motion.div>
    </motion.div>
  )
}
