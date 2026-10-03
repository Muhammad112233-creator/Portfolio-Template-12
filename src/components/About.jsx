import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * About — "Episode 01". Three bento panels that rise in on scroll and
 * track the pointer with a radial spotlight (--mouse-x / --mouse-y).
 */
export default function About() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      cardsRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    /* Spotlight coordinates for every panel */
    const panels = cardsRef.current
    const trackPointer = (event, panel) => {
      const bounds = panel.getBoundingClientRect()
      panel.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`)
      panel.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`)
    }

    const cleanups = panels.map((panel) => {
      if (!panel) return () => {}
      const handler = (event) => trackPointer(event, panel)
      panel.addEventListener('mousemove', handler)
      return () => panel.removeEventListener('mousemove', handler)
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  const register = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el)
  }

  const spotlight =
    'absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'
  const panel =
    'p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden'

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-500 font-bold">{about.badgeMain}</span>
            <span className="text-white/40">|</span>
            <span>{about.badgeSub}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            {about.heading} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              {about.headingAccent}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Background */}
          <div ref={register} className={`md:col-span-7 ${panel}`}>
            <div
              className={spotlight}
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />
            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              {about.cardOne.index}
            </div>
            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                {about.cardOne.title}
              </h3>
              <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I am{' '}
                <span className="text-white font-bold drop-shadow">{about.cardOne.leadName}</span>
                {about.cardOne.leadText}
              </p>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                {about.cardOne.body}
              </p>
            </div>
            <div className="pt-8 flex flex-wrap gap-2 relative z-10">
              {about.cardOne.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div ref={register} className={`md:col-span-5 ${panel}`}>
            <div
              className={spotlight}
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />
            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              {about.cardTwo.index}
            </div>
            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                {about.cardTwo.title}
              </h3>
              <ul className="space-y-3.5 text-sm text-white/80 font-light">
                {about.cardTwo.items.map((item) => (
                  <li key={item.strong} className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">›</span>
                    <span>
                      <strong className="text-white">{item.strong}</strong>
                      {item.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 font-mono text-xs text-white/40 relative z-10">
              {about.cardTwo.footer}
            </div>
          </div>

          {/* Stack strip */}
          <div
            ref={register}
            className={`md:col-span-12 ${panel} flex flex-col md:flex-row items-center justify-between gap-6`}
          >
            <div
              className={spotlight}
              style={{
                background:
                  'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />
            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                {about.cardThree.title}
              </h3>
              <p className="text-base md:text-lg font-semibold text-white">{about.cardThree.text}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 relative z-10">
              {about.cardThree.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-4 py-2 rounded bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-white shadow-inner hover:bg-red-600/20 hover:border-red-600/40 hover:scale-105 transition-all"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
