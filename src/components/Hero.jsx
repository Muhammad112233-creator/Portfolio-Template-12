import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../data/content'
import portrait from '../assets/picture.png'

/**
 * Hero — full-height opening "title card".
 * Owns the header, the red poster marquee, the pointer-reactive portrait
 * card and a second, section-local cursor + glow pair.
 */
export default function Hero() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const shineRef = useRef(null)
  const glowRef = useRef(null)
  const contentRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    const content = contentRef.current
    if (!section || !card || !content) return

    /* Entrance timeline: header drops in, copy blurs up, portrait flips in */
    gsap
      .timeline({ defaults: { ease: 'power4.out' } })
      .fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        content.querySelectorAll('.hero-anim-item'),
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.12 },
        '-=0.7'
      )
      .fromTo(
        card,
        { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 1.4,
          ease: 'back.out(1.2)',
        },
        '-=0.9'
      )

    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: '50% 50%',
    })

    const dotX = gsap.quickTo(cursorDotRef.current, 'x', { duration: 0.05, ease: 'power2.out' })
    const dotY = gsap.quickTo(cursorDotRef.current, 'y', { duration: 0.05, ease: 'power2.out' })
    const ringX = gsap.quickTo(cursorRingRef.current, 'x', { duration: 0.15, ease: 'power3.out' })
    const ringY = gsap.quickTo(cursorRingRef.current, 'y', { duration: 0.15, ease: 'power3.out' })
    /* Portrait parallax — the card leans towards the pointer */
    const cardRotY = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' })
    const cardRotX = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' })
    const shineX = gsap.quickTo(shineRef.current, 'x', { duration: 0.3, ease: 'power2.out' })
    const shineY = gsap.quickTo(shineRef.current, 'y', { duration: 0.3, ease: 'power2.out' })

    const onMove = (e) => {
      const bounds = section.getBoundingClientRect()
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`
      }
      dotX(x - 12 / 2)
      dotY(y - 12 / 2)
      ringX(x - 48 / 2)
      ringY(y - 48 / 2)

      const cardBounds = card.getBoundingClientRect()
      const cardCenterX = cardBounds.left + cardBounds.width / 2 - bounds.left
      const tiltX = -((y - (cardBounds.top + cardBounds.height / 2 - bounds.top)) / (cardBounds.height / 2)) * 16

      cardRotY(((x - cardCenterX) / (cardBounds.width / 2)) * 16)
      cardRotX(tiltX)
      shineX(x - cardBounds.left - cardBounds.width / 2)
      shineY(y - cardBounds.top - cardBounds.height / 2)
    }

    const onEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 })
    }

    const onLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 })
      cardRotY(0)
      cardRotX(0)
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseenter', onEnter)
    section.addEventListener('mouseleave', onLeave)

    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseenter', onEnter)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      {/* Red poster marquee running behind the hero */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...profile.rails, ...profile.rails].map((rail, i) => (
              <span
                key={i}
                className="text-[14vw] font-black text-red-600 mx-8 uppercase tracking-tighter"
              >
                {rail} •
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pointer-following red glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12"
      >
        {/* Series badge row */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-500 font-bold tracking-wider">NETFLIX DEVELOPER SERIES</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SEASONS 2025 - 2027</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            {profile.badges.map((badge) => (
              <span key={badge} className="px-2 py-0.5 border border-white/20 rounded bg-black/40">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Poster wall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-pulse">
                {profile.tagline}
              </span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                {profile.role}
              </span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              {profile.headlineTop} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                {profile.headlineAccent}
              </span>
            </h1>

            <div className="hero-anim-item flex items-center gap-1.5 sm:gap-3 text-[9px] sm:text-xs font-mono text-red-400 font-bold whitespace-nowrap">
              <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-red-500">
                {profile.stats[0]}
              </span>
              <span className="text-white/40">•</span>
              <span>{profile.stats[1]}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">{profile.stats[2]}</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              {profile.intro}
            </p>

            <div className="hero-anim-item flex items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* 3D portrait card */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000" />
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                <div
                  ref={shineRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                />
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>
                <img
                  src={portrait}
                  alt="Developer Portrait"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Awards note */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-2">
                {profile.awards.title}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">{profile.awards.text}</p>
            </div>
          </div>
        </div>

        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>ENGINEERED FOR SCALABILITY</span>
          <span>{profile.release}</span>
        </div>
      </div>

      {/* Section-local cursor pair */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      />
      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      />

      <header
        ref={headerRef}
        className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto"
      >
        <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]">
          {profile.brand}
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          {profile.nav.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-red-500 transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#hire"
          className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>
      </header>
    </section>
  )
}
