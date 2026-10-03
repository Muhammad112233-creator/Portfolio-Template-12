import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../data/content'

/**
 * Loader — the red-dot intro card that blurs in, punches out and
 * fades the whole curtain away before the hero timeline starts.
 */
export default function Loader({ onComplete }) {
  const curtainRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    gsap
      .timeline({
        onComplete: () => {
          if (onComplete) onComplete()
        },
      })
      .set(curtainRef.current, { autoAlpha: 1 })
      .fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0, filter: 'blur(8px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
      )
      .to(cardRef.current, {
        scale: 1.05,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.6,
      })
      .to(curtainRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
  }, [onComplete])

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center select-none overflow-hidden"
    >
      <div ref={cardRef} className="flex flex-col items-center gap-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
        <h1
          className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] text-white"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          {profile.brand}
        </h1>
      </div>
    </div>
  )
}
