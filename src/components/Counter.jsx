import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
export default function Counter({ to, suffix = '' }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true }); const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setN(to); return }
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, reduce])
  return <span ref={ref}>{n.toLocaleString('en-IN')}{suffix}</span>
}
