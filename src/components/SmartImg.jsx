import { useState } from 'react'
import { Leaf } from 'lucide-react'

export default function SmartImg({ img, className = '', priority = false }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed || !img) {
    return (
      <div
        role="img"
        aria-label={img?.alt || 'Image description unavailable'}
        className={`flex flex-col items-center justify-center gap-3 bg-[#E9E4D6] p-6 text-center text-[#123B2A] ${className}`}
      >
        <Leaf size={32} strokeWidth={1.4} className="text-[#123B2A]/70" />
        <span className="max-w-[16rem] font-body text-xs italic text-[#333A34]">
          {img?.alt || 'FoodBridge authentic documentary visual'}
        </span>
      </div>
    )
  }

  return (
    <img
      src={img.src}
      alt={img.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`object-cover transition-opacity duration-300 ${
        loaded ? 'opacity-100' : 'opacity-90'
      } ${className}`}
    />
  )
}
