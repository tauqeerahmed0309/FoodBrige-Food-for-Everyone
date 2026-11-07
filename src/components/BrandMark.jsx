export default function BrandMark({ className = 'h-8 w-8', title = 'FoodBridge' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="14" fill="currentColor" />
      {/* Arch bridge curve connecting two sides */}
      <path
        d="M12 43 C22 22, 42 22, 52 43"
        stroke="#f1ece1"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Golden food sprout / leaf flourishing above the bridge */}
      <path
        d="M32 30 C32 17, 44 14, 44 24 C44 31, 35 32, 32 30 Z"
        fill="#d99b26"
      />
      {/* Base seed / meal dish dot */}
      <circle cx="21" cy="43" r="3" fill="#d99b26" />
      <circle cx="43" cy="43" r="3" fill="#d99b26" />
    </svg>
  )
}
