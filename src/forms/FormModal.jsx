import { useRef, useState } from 'react'
import { CheckCircle2, AlertTriangle, Loader2, ShieldCheck } from 'lucide-react'
import Modal from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import { saveEntry } from '../hooks/useStorage.js'

const cls = (hasErr) =>
  `mt-1.5 w-full rounded-lg border bg-[#FAF8F3] px-3.5 py-2.5 text-sm text-[#111411] transition-colors focus:outline-none ${
    hasErr
      ? 'border-red-600 focus:border-red-600'
      : 'border-[#D8D2C2] focus:border-[#123B2A]'
  }`

export default function FormModal({ cfg, initial = {}, onClose }) {
  const [v, setV] = useState(() =>
    Object.fromEntries(
      cfg.fields.map((f) => [
        f.name,
        initial[f.name] ?? (f.type === 'checkbox' ? false : '')
      ])
    )
  )
  const [err, setErr] = useState({})
  const [status, setStatus] = useState('idle')
  const submitted = useRef(false)

  const set = (n, val) => {
    setV((p) => ({ ...p, [n]: val }))
    setErr((p) => ({ ...p, [n]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (submitted.current || status === 'loading') return

    cfg.fields.forEach((f) => {
      if (
        f.required !== false &&
        (f.type === 'checkbox' ? !v[f.name] : !String(v[f.name]).trim())
      ) {
        errs[f.name] = 'This field is required.'
      }
    })

    Object.assign(
      errs,
      Object.fromEntries(
        Object.entries(cfg.validate(v)).filter(([k]) => !errs[k])
      )
    )

    setErr(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }

    setStatus('loading')
    try {
      saveEntry(cfg.key, v)
      window.dispatchEvent(new Event('foodbridge:updated'))
      submitted.current = true
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <Modal title={cfg.successTitle} onClose={onClose}>
        <div className="mt-6 flex items-start gap-3.5 rounded-xl border border-[#123B2A]/30 bg-[#123B2A]/10 p-5 text-[#123B2A]">
          <CheckCircle2 className="shrink-0 mt-0.5 text-[#123B2A]" size={20} />
          <p className="text-sm leading-relaxed text-[#111411] font-medium font-body">
            {cfg.successText}
          </p>
        </div>
        <div className="mt-8 flex justify-end">
          <Button variant="dark" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal title={cfg.title} onClose={onClose} closeDisabled={status === 'loading'}>
      <p className="mt-2 text-sm text-[#4A534B] leading-relaxed font-body">
        {cfg.intro}
      </p>

      {cfg.safety && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#B7D66B]/50 bg-[#E9E4D6] p-4 text-xs text-[#111411]">
          <ShieldCheck className="shrink-0 text-[#123B2A] mt-0.5" size={18} />
          <ul className="list-disc space-y-1 pl-4 leading-relaxed font-mono">
            {cfg.safety.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={submit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
        {cfg.fields.map((f) => (
          <div key={f.name} className={f.wide ? 'sm:col-span-2' : ''}>
            {f.type !== 'checkbox' && (
              <label
                htmlFor={`f-${f.name}`}
                className="text-xs font-mono uppercase tracking-wider text-[#4A534B]"
              >
                {f.label}
              </label>
            )}

            {f.type === 'select' ? (
              <select
                id={`f-${f.name}`}
                value={v[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                className={cls(err[f.name])}
                aria-invalid={!!err[f.name]}
                aria-describedby={err[f.name] ? `e-${f.name}` : undefined}
              >
                <option value="">Select…</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                id={`f-${f.name}`}
                rows={3}
                value={v[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                className={cls(err[f.name])}
                aria-invalid={!!err[f.name]}
                aria-describedby={err[f.name] ? `e-${f.name}` : undefined}
              />
            ) : f.type === 'checkbox' ? (
              <label className="mt-3 flex items-start gap-3 text-xs text-[#111411] cursor-pointer">
                <input
                  id={`f-${f.name}`}
                  type="checkbox"
                  checked={!!v[f.name]}
                  onChange={(e) => set(f.name, e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#D8D2C2] text-[#123B2A] focus:ring-[#B7D66B]"
                  aria-invalid={!!err[f.name]}
                  aria-describedby={err[f.name] ? `e-${f.name}` : undefined}
                />
                <span className="leading-snug">{f.label}</span>
              </label>
            ) : (
              <input
                id={`f-${f.name}`}
                type={f.type || 'text'}
                value={v[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                className={cls(err[f.name])}
                aria-invalid={!!err[f.name]}
                aria-describedby={err[f.name] ? `e-${f.name}` : undefined}
              />
            )}

            {err[f.name] && (
              <p
                id={`e-${f.name}`}
                role="alert"
                className="mt-1 text-xs text-red-600 font-mono"
              >
                {err[f.name]}
              </p>
            )}
          </div>
        ))}

        {status === 'error' && (
          <p
            role="alert"
            className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-800 sm:col-span-2"
          >
            <AlertTriangle size={16} className="shrink-0" />
            <span>Could not save your details on this device. Please ensure browser storage is enabled.</span>
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end pt-4 border-t border-[#D8D2C2]">
          <button
            type="button"
            onClick={onClose}
            disabled={status === 'loading'}
            className="rounded-lg px-4 py-2.5 text-xs font-semibold text-[#4A534B] hover:text-[#111411] hover:bg-[#E9E4D6] disabled:opacity-40 transition-colors"
          >
            Cancel
          </button>
          <Button
            type="submit"
            variant="dark"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Saving…</span>
              </>
            ) : (
              cfg.submit
            )}
          </Button>
        </div>

        <p className="text-[11px] font-mono text-[#4A534B] sm:col-span-2">
          * Prototype: details are stored exclusively in this browser&apos;s LocalStorage. Nothing is transmitted to external servers.
        </p>
      </form>
    </Modal>
  )
}
