import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SmartImg from '../components/SmartImg.jsx'
import { IMG, STORIES } from '../data/images.js'

export default function Stories() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (step) => {
    setDir(step)
    setIndex((prev) => (prev + step + STORIES.length) % STORIES.length)
  }

  const story = STORIES[index]

  return (
    <section
      id="stories"
      aria-label="Community stories"
      className="py-24 md:py-32 bg-[#F5F2E9] border-t border-[#D8D2C2]"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-4 mb-12">
          <p className="label-tag text-[#111411]">
            <span className="label-index font-mono text-[#123B2A] font-bold">09</span>
            <span>Kitchen Testimonials &middot; Voices of Solidarity</span>
          </p>
          <span className="text-xs font-mono text-[#4A534B] uppercase tracking-wider">
            Local Narratives
          </span>
        </div>

        {/* Section Title & Nav Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="h2 text-[#111411] tracking-tight">
              Community <span className="marker-dark text-[#123B2A]">stories.</span>
            </h2>
            <p className="lead mt-4 text-[#333A34]">
              Authentic perspectives from restaurant chefs, charity kitchen coordinators, and neighbourhood couriers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="grid h-12 w-12 place-items-center rounded-full border border-[#D8D2C2] bg-[#E9E4D6] text-[#111411] hover:border-[#111411] hover:bg-[#F5F2E9] transition-colors focus:outline-none"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next story"
              className="grid h-12 w-12 place-items-center rounded-full border border-[#D8D2C2] bg-[#E9E4D6] text-[#111411] hover:border-[#111411] hover:bg-[#F5F2E9] transition-colors focus:outline-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[420px] lg:min-h-[360px]" aria-live="polite">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.article
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: 40 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * dir }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-10 lg:grid-cols-12 items-center"
            >
              <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-[#D8D2C2] bg-[#E9E4D6]">
                <SmartImg
                  img={IMG[story.img]}
                  className="h-[300px] sm:h-[380px] w-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#F5F2E9]/95 backdrop-blur px-3 py-1.5 rounded-md border border-[#D8D2C2] text-xs font-mono text-[#111411]">
                  {story.role}
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-6 space-y-6">
                <p className="label-tag text-[#123B2A] font-bold">
                  Testimonial &middot; {story.role}
                </p>
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#111411] leading-snug italic font-normal">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div className="pt-6 border-t border-[#D8D2C2] flex items-center justify-between text-xs font-mono text-[#4A534B]">
                  <span className="font-semibold text-[#111411] text-sm font-body">{story.name}</span>
                  <span>FoodBridge Verified Contributor</span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
