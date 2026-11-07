import { useRef, useState } from 'react'
import { CheckCircle2, AlertTriangle, Loader2, ShieldCheck } from 'lucide-react'
import Modal from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import { saveEntry } from '../hooks/useStorage.js'
const cls = (e) => `mt-1 w-full rounded-md border bg-white px-3 py-2.5 text-sm ${e ? 'border-red-600' : 'border-forest/30'}`
export default function FormModal({ cfg, initial = {}, onClose }) {
  const [v, setV] = useState(() => Object.fromEntries(cfg.fields.map((f) => [f.name, initial[f.name] ?? (f.type === 'checkbox' ? false : '')])))
  const [err, setErr] = useState({}), [status, setStatus] = useState('idle')
  const submitted = useRef(false)
  const set = (n, val) => { setV((p) => ({ ...p, [n]: val })); setErr((p) => ({ ...p, [n]: undefined })) }
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (submitted.current || status === 'loading') return
    cfg.fields.forEach((f) => { if (f.required !== false && (f.type === 'checkbox' ? !v[f.name] : !String(v[f.name]).trim())) errs[f.name] = 'This field is required.' })
    Object.assign(errs, Object.fromEntries(Object.entries(cfg.validate(v)).filter(([k]) => !errs[k])))
    setErr(errs)
    const first = Object.keys(errs)[0]
    if (first) { document.getElementById(`f-${first}`)?.focus(); return }
    setStatus('loading')
    try { saveEntry(cfg.key, v); window.dispatchEvent(new Event('foodbridge:updated')); submitted.current = true; setStatus('success') } catch { setStatus('error') }
  }
  if (status === 'success') return (
    <Modal title={cfg.successTitle} onClose={onClose}>
      <div className="mt-6 flex gap-3 rounded-md bg-sage p-5 text-deep"><CheckCircle2 className="shrink-0" /><p>{cfg.successText}</p></div>
      <Button variant="dark" className="mt-6" onClick={onClose}>Close</Button>
    </Modal>
  )
  return (
    <Modal title={cfg.title} onClose={onClose} closeDisabled={status === 'loading'}>
      <p className="mt-2 text-ink/70">{cfg.intro}</p>
      {cfg.safety && <div className="mt-5 flex gap-3 rounded-md border border-harvest/60 bg-harvest/10 p-4 text-sm"><ShieldCheck className="shrink-0 text-forest" /><ul className="list-disc space-y-1 pl-4">{cfg.safety.map((s) => <li key={s}>{s}</li>)}</ul></div>}
      <form onSubmit={submit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
        {cfg.fields.map((f) => (
          <div key={f.name} className={f.wide ? 'sm:col-span-2' : ''}>
            {f.type !== 'checkbox' && <label htmlFor={`f-${f.name}`} className="text-sm font-medium text-deep">{f.label}</label>}
            {f.type === 'select' ? (
              <select id={`f-${f.name}`} value={v[f.name]} onChange={(e) => set(f.name, e.target.value)} className={cls(err[f.name])} aria-invalid={!!err[f.name]} aria-describedby={err[f.name] ? `e-${f.name}` : undefined}><option value="">Select…</option>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
            ) : f.type === 'textarea' ? (
              <textarea id={`f-${f.name}`} rows={3} value={v[f.name]} onChange={(e) => set(f.name, e.target.value)} className={cls(err[f.name])} aria-invalid={!!err[f.name]} aria-describedby={err[f.name] ? `e-${f.name}` : undefined} />
            ) : f.type === 'checkbox' ? (
              <label className="mt-2 flex items-start gap-3 text-sm text-ink/80"><input id={`f-${f.name}`} type="checkbox" checked={!!v[f.name]} onChange={(e) => set(f.name, e.target.checked)} className="mt-1 h-4 w-4" aria-invalid={!!err[f.name]} aria-describedby={err[f.name] ? `e-${f.name}` : undefined} /><span>{f.label}</span></label>
            ) : (
              <input id={`f-${f.name}`} type={f.type || 'text'} value={v[f.name]} onChange={(e) => set(f.name, e.target.value)} className={cls(err[f.name])} aria-invalid={!!err[f.name]} aria-describedby={err[f.name] ? `e-${f.name}` : undefined} />
            )}
            {err[f.name] && <p id={`e-${f.name}`} role="alert" className="mt-1 text-xs text-red-700">{err[f.name]}</p>}
          </div>
        ))}
        {status === 'error' && <p role="alert" className="flex gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800 sm:col-span-2"><AlertTriangle size={18} className="shrink-0" />We could not save your details on this device. Check that browser storage is enabled and try again.</p>}
        <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} disabled={status === 'loading'} className="rounded-md px-5 py-3 text-sm font-semibold text-forest hover:bg-sage disabled:opacity-40">Cancel</button>
          <Button type="submit" variant="dark" disabled={status === 'loading'}>{status === 'loading' ? <><Loader2 size={16} className="animate-spin" />Saving…</> : cfg.submit}</Button>
        </div>
        <p className="text-xs text-ink/55 sm:col-span-2">Prototype: details are stored only in this browser’s LocalStorage. Nothing is sent to anyone.</p>
      </form>
    </Modal>
  )
}
