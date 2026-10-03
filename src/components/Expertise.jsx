import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { expertise } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Expertise — "Episode 02". Four sticky "director's cut" panels that
 * stack on top of each other; the ones underneath shrink, lift and blur
 * as the next card scrolls over them.
 */
export default function Expertise() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      gsap.to(card, {
        scale: 0.92 - i * 0.025,
        y: -15 - i * 8,
        filter: 'blur(6px)',
        opacity: 0.4,
        scrollTrigger: {
          trigger: card,
          start: `top ${90 + i * 20}px`,
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    /* Spotlight coordinates */
    const cleanups = cards.map((card) => {
      if (!card) return () => {}
      const handler = (event) => {
        const bounds = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`)
        card.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`)
      }
      card.addEventListener('mousemove', handler)
      return () => card.removeEventListener('mousemove', handler)
    })

    return () => {
      cleanups.forEach((fn) => fn())
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const register = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el)
  }

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-20 px-6 md:px-12 select-none overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-red-500 font-bold">{expertise.badgeMain}</span>
              <span className="text-white/40">|</span>
              <span>{expertise.badgeSub}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {expertise.heading} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
                {expertise.headingAccent}
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            {expertise.intro}
          </p>
        </div>

        <div className="relative flex flex-col gap-8 pb-20">
          {expertise.cards.map((card, i) => (
            <div
              key={card.number}
              ref={register}
              className={`sticky w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-red-600/50`}
              style={{ zIndex: i + 1, top: `${95 + i * 16}px` }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background:
                    'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.18), transparent 70%)',
                }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent z-10" />

              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 px-2.5 py-0.5 rounded bg-red-600/10 border border-red-600/25">
                  {card.tag}
                </span>
                <span className="text-2xl md:text-3xl font-mono font-black text-white/20">
                  {card.number}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-red-500 transition-colors duration-300">
                    {card.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-red-600 group-hover:shadow-[0_0_10px_#E50914] z-10 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
