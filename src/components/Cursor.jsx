import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Cursor — replaces the native pointer with three layers:
 *   1. a 700px red ambient glow that drifts behind everything,
 *   2. a solid red dot that tracks the pointer almost instantly,
 *   3. a blurred ring that lags behind for a smooth parallax feel.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { scale: 0.5, opacity: 0, transformOrigin: '50% 50%' })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power3.out' })

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e
      dotX(x - 12 / 2)
      dotY(y - 12 / 2)
      ringX(x - 48 / 2)
      ringY(y - 48 / 2)
      if (glow) glow.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`
    }

    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
      if (glow) gsap.to(glow, { opacity: 1, duration: 0.3 })
    }

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.inOut' })
      if (glow) gsap.to(glow, { opacity: 0, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none z-[9998] opacity-0 blur-[100px] transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(229,9,20,0.2) 0%, rgba(229,9,20,0.06) 45%, transparent 75%)',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      />
    </>
  )
}
