import { useState } from 'react'
import { Leaf } from 'lucide-react'
export default function SmartImg({ img, className = '', priority = false }) {
  const [failed, setFailed] = useState(false)
  if (failed) return (
    <div role="img" aria-label={img.alt} className={`flex flex-col items-center justify-center gap-3 bg-sage p-6 text-center text-forest ${className}`}>
      <Leaf size={36} strokeWidth={1.2} /><span className="max-w-[16rem] font-display text-sm italic">{img.alt}</span>
    </div>
  )
  return <img src={img.src} alt={img.alt} loading={priority ? 'eager' : 'lazy'} onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
