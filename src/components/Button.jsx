import { motion } from 'framer-motion'

export default function Button({
  variant = 'primary',
  icon: Icon,
  children,
  className = '',
  disabled = false,
  ...props
}) {
  const isPrimary = variant === 'primary'
  const isDark = variant === 'dark'
  const isGhost = variant === 'ghost'

  const baseStyles =
    'group relative inline-flex items-center justify-between gap-3.5 rounded-lg text-sm font-medium tracking-tight transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none'

  const variantStyles = isPrimary
    ? 'bg-jaune text-gris hover:bg-[#b57534]'
    : isDark
    ? 'bg-gris text-fond hover:bg-[#222724]'
    : isGhost
    ? 'border border-current text-current hover:bg-black/5'
    : 'bg-jaune text-gris'

  const discBg = isPrimary
    ? 'bg-gris text-jaune group-hover:scale-105'
    : isDark
    ? 'bg-jaune text-gris group-hover:scale-105'
    : 'bg-current/10 text-current group-hover:scale-105'

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} py-2.5 pl-5 pr-2.5 min-h-[46px] ${className}`}
      {...props}
    >
      <span className="font-semibold">{children}</span>
      <span
        aria-hidden="true"
        className={`grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 shrink-0 ${discBg}`}
      >
        {Icon ? (
          <Icon size={14} strokeWidth={2.2} />
        ) : (
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5">
            <path
              d="M1 8h13M9 3l5 5-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </motion.button>
  )
}
