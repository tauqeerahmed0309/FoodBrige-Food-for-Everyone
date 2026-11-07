import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
export default function Modal({ title, onClose, children, closeDisabled = false }) {
  const box = useRef(null)
  const closeRef = useRef(onClose); closeRef.current = onClose
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
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus?.() }
  }, [])
  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-deep/70 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => !closeDisabled && e.target === e.currentTarget && onClose()}>
      <motion.div ref={box} role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-ivory p-6 sm:rounded-lg sm:p-10" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.3 }}>
        <button onClick={onClose} disabled={closeDisabled} aria-label="Close dialog" className="absolute right-4 top-4 rounded-full p-2 text-forest hover:bg-sage disabled:opacity-40"><X size={20} /></button>
        <h2 id="modal-title" className="pr-10 text-3xl leading-tight text-deep">{title}</h2>
        {children}
      </motion.div>
    </motion.div>
  )
}
