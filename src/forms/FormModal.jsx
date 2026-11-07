import { useRef, useState } from 'react'
import { CheckCircle2, AlertTriangle, Loader2, ShieldCheck } from 'lucide-react'
import Modal from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import { saveEntry } from '../hooks/useStorage.js'

const cls = (hasErr) =>
  `mt-1.5 w-full rounded-lg border bg-fond2 px-3.5 py-2.5 text-sm text-gris transition-colors focus:outline-none ${
    hasErr
      ? 'border-red-600 focus:border-red-600'
      : 'border-ligne focus:border-jaune'
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
        errs[f.name] = 'Ce champ est obligatoire.'
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
        <div className="mt-6 flex items-start gap-3.5 rounded-xl border border-vert/30 bg-vert/10 p-5 text-vert">
          <CheckCircle2 className="shrink-0 mt-0.5" size={20} />
          <p className="text-sm leading-relaxed text-gris font-medium">
            {cfg.successText}
          </p>
        </div>
        <div className="mt-8 flex justify-end">
          <Button variant="dark" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal title={cfg.title} onClose={onClose} closeDisabled={status === 'loading'}>
      <p className="mt-2 text-sm text-grisDoux leading-relaxed">
        {cfg.intro}
      </p>

      {cfg.safety && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-jaune/40 bg-fond2 p-4 text-xs text-gris">
          <ShieldCheck className="shrink-0 text-vert mt-0.5" size={18} />
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
                className="text-xs font-mono uppercase tracking-wider text-grisDoux"
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
                <option value="">Sélectionner…</option>
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
              <label className="mt-3 flex items-start gap-3 text-xs text-gris cursor-pointer">
                <input
                  id={`f-${f.name}`}
                  type="checkbox"
                  checked={!!v[f.name]}
                  onChange={(e) => set(f.name, e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-ligne text-vert focus:ring-jaune"
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
            <span>Impossible d’enregistrer sur cet appareil. Vérifiez que le stockage local de votre navigateur est actif.</span>
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end pt-4 border-t border-ligne">
          <button
            type="button"
            onClick={onClose}
            disabled={status === 'loading'}
            className="rounded-lg px-4 py-2.5 text-xs font-semibold text-grisDoux hover:text-gris hover:bg-fond2 disabled:opacity-40 transition-colors"
          >
            Annuler
          </button>
          <Button
            type="submit"
            variant="dark"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Enregistrement…</span>
              </>
            ) : (
              cfg.submit
            )}
          </Button>
        </div>

        <p className="text-[11px] font-mono text-grisDoux sm:col-span-2">
          * Prototype solidaire : vos saisies restent exclusivement enregistrées dans le stockage local de votre navigateur.
        </p>
      </form>
    </Modal>
  )
}
