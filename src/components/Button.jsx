import { motion } from 'framer-motion'

export default function Button({
  variant = 'primary',
  icon: Icon,
  children,
  className = '',
  disabled = false,
  ...props
}) {
  const isPrimary = variant === 'primary' // Ivory button for dark background
  const isDark = variant === 'dark'       // Black button for light background
  const isLime = variant === 'lime'       // Natural lime accent button
  const isGhost = variant === 'ghost'     // Transparent border button

  const baseStyles =
    'group relative inline-flex items-center justify-between gap-3.5 rounded-lg text-sm font-semibold tracking-tight transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none'

  // Dark background: Ivory button with dark green text
  // Light background: Black button with ivory text
  let variantStyles = ''
  let discStyles = ''

  if (isPrimary) {
    // Ivory button for dark green backgrounds
    variantStyles = 'bg-[#F5F2E9] text-[#123B2A] hover:bg-[#FFFFFF] shadow-sm'
    discStyles = 'bg-[#123B2A] text-[#F5F2E9] group-hover:scale-105'
  } else if (isDark) {
    // Black button for light ivory backgrounds
    variantStyles = 'bg-[#111411] text-[#F5F2E9] hover:bg-[#222722] shadow-sm'
    discStyles = 'bg-[#F5F2E9] text-[#111411] group-hover:scale-105'
  } else if (isLime) {
    // Natural lime accent button
    variantStyles = 'bg-[#B7D66B] text-[#111411] hover:bg-[#c6e27f]'
    discStyles = 'bg-[#111411] text-[#B7D66B] group-hover:scale-105'
  } else if (isGhost) {
    variantStyles = 'border border-current text-current hover:bg-current/10'
    discStyles = 'bg-current/15 text-current group-hover:scale-105'
  } else {
    variantStyles = 'bg-[#F5F2E9] text-[#123B2A] hover:bg-[#FFFFFF]'
    discStyles = 'bg-[#123B2A] text-[#F5F2E9]'
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} py-2.5 pl-5 pr-2.5 min-h-[46px] ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 shrink-0 ${discStyles}`}
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
