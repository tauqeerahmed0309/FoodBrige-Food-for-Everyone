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
      {/* Precision Arch Bridge Arc */}
      <path
        d="M13 44 C23 23, 41 23, 51 44"
        stroke="#FAF8F5"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Botanical Seed Sprout */}
      <path
        d="M32 30 C32 17, 44 15, 44 24 C44 31, 35 32, 32 30 Z"
        fill="#C4823F"
      />
      {/* Anchor Coordinates */}
      <circle cx="21" cy="44" r="2.8" fill="#C4823F" />
      <circle cx="43" cy="44" r="2.8" fill="#C4823F" />
    </svg>
  )
}
