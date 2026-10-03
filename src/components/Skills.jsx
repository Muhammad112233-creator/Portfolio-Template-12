import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Skills — the "SKILLS" chapter. On desktop the section pins itself for
 * 500% of scroll and deals the six cards around a wide arc in 3D space.
 * On mobile the same cards become a snap-scrolling horizontal rail.
 */
export default function Skills() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const backdropsRef = useRef([])
  const titlesRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia()

      /* ---------- Desktop: pinned 3D fan ---------- */
      media.add('(min-width: 769px)', () => {
        const place = (progress) => {
          const radius = 1800

          cardsRef.current.forEach((card, i) => {
            if (!card) return
            const offset = i - progress
            const angle = offset * 18
            const radians = (angle * Math.PI) / 180

            gsap.set(card, {
              x: Math.sin(radians) * radius,
              y: radius - Math.cos(radians) * radius,
              z: -Math.abs(offset) * 50,
              scale: Math.max(0.4, 1 - Math.abs(offset) * 0.15),
              rotationZ: angle,
              rotationY: 0,
              opacity: Math.max(0.1, 1 - Math.abs(offset) * 0.3),
              zIndex: Math.round(100 - Math.abs(offset) * 10),
            })
          })

          /* The ghost "SKILLS" words fade with their matching card */
          titlesRef.current.forEach((title, i) => {
            if (!title) return
            const opacity = Math.max(0, 1 - Math.abs(i - progress))
            gsap.set(title, { opacity })
            if (backdropsRef.current[i]) gsap.set(backdropsRef.current[i], { opacity })
          })
        }

        place(0)

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => place(self.progress * (skills.length - 1)),
        })
      })

      /* ---------- Mobile: horizontal snap rail ---------- */
      media.add('(max-width: 768px)', () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return
          gsap.set(card, { clearProps: 'x,y,z,rotation,scale,opacity,position' })
          gsap.set(card, { scale: i === 0 ? 1 : 0.9 })
        })
        titlesRef.current.forEach((title, i) => {
          if (!title) return
          gsap.set(title, { clearProps: 'all', opacity: i === 0 ? 1 : 0 })
        })
        backdropsRef.current.forEach((backdrop, i) => {
          if (!backdrop) return
          gsap.set(backdrop, { clearProps: 'all', opacity: i === 0 ? 1 : 0 })
        })
      })

      return () => media.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* Mobile rail: highlight whichever card sits closest to the centre */
  const handleScroll = (event) => {
    if (window.innerWidth >= 769) return
    const rail = event.target
    const centre = rail.scrollLeft + rail.offsetWidth / 2

    let active = 0
    let closest = Infinity
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      const cardCentre = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCentre - centre)
      if (distance < closest) {
        closest = distance
        active = i
      }
    })

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.to(card, {
        scale: i === active ? 1 : 0.9,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
    titlesRef.current.forEach((title, i) => {
      if (!title) return
      gsap.to(title, { opacity: i === active ? 1 : 0, duration: 0.4, overwrite: 'auto' })
    })
    backdropsRef.current.forEach((backdrop, i) => {
      if (!backdrop) return
      gsap.to(backdrop, { opacity: i === active ? 1 : 0, duration: 0.4, overwrite: 'auto' })
    })
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0b0b0b] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >
      {skills.map((skill, i) => (
        <div
          key={`backdrop-${skill.tag}`}
          ref={(el) => {
            backdropsRef.current[i] = el
          }}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#140203] to-black"
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skills.map((skill, i) => (
          <h1
            key={`ghost-${skill.tag}`}
            ref={(el) => {
              titlesRef.current[i] = el
            }}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{
              WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.15)'}`,
              opacity: 0,
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      <div
        onScroll={handleScroll}
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
      >
        {skills.map((skill, i) => (
          <div
            key={skill.title}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-red-600/80 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/20">
                {skill.tag}
              </span>
              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                {skill.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {skill.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {skill.list.map((item) => (
                <span
                  key={item}
                  className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-red-600/30 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
          </div>
        ))}
      </div>
    </section>
  )
}
