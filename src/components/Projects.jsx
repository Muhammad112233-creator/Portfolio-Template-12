import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/* Where each poster lands inside the 3 x 3 "streaming hub" layout.
   index 3 is deliberately skipped — that slot belongs to the console. */
const slotOf = (index) => {
  if (index < 3) return { row: 0, col: index }
  if (index === 3) return { row: 1, col: 0 }
  if (index === 4) return { row: 1, col: 2 }
  return { row: 2, col: index - 5 }
}

/**
 * Projects — "ORIGINALS". Eight covers fly in as a shuffled stack, then
 * unfold into a 3 x 3 hub above a floating console bar. On mobile the
 * same covers collapse into a swipeable rail.
 */
export default function Projects() {
  const sectionRef = useRef(null)
  const consoleRef = useRef(null)
  const cardsRef = useRef([])
  const mobileCardsRef = useRef([])
  const mobileRailRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const hub = consoleRef.current

      gsap.set([hub, section.querySelector('.archive-console')], {
        xPercent: -50,
        yPercent: -50,
      })
      gsap.set(hub, { transformOrigin: 'bottom center' })

      /* Give every cover a small random rotation before the deal */
      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        })
      })

      const media = gsap.matchMedia()

      /* ---------- Desktop: stack -> 3 x 3 hub ---------- */
      media.add('(min-width: 768px)', () => {
        let idleFloat

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleActions: 'play reverse play reverse',
            onEnter: () => idleFloat && idleFloat.kill(),
            onEnterBack: () => idleFloat && idleFloat.kill(),
            onLeave: () => idleFloat && idleFloat.kill(),
            onLeaveBack: () => idleFloat && idleFloat.kill(),
            onComplete: () => {
              /* Gentle "floating on the shelf" drift once docked */
              idleFloat = gsap.to(cardsRef.current, {
                y: '+=12',
                rotation: '+=1',
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                stagger: { amount: 1.5, from: 'random' },
              })
            },
          },
        })

        timeline
          .to(hub, { rotationX: -130, duration: 1.2, ease: 'power3.inOut' })
          .to(
            cardsRef.current,
            { y: -140, scale: 0.9, zIndex: 70, duration: 0.6, stagger: 0.04, ease: 'back.out(1.2)' },
            '-=0.6'
          )
          .to(
            cardsRef.current,
            {
              x: (i) => {
                const width = Math.max(...cardsRef.current.map((c) => c?.offsetWidth || 0)) || 360
                const { col } = slotOf(i)
                return (col - 1) * (width + 40)
              },
              y: (i) => {
                const height = Math.max(...cardsRef.current.map((c) => c?.offsetHeight || 0)) || 240
                const { row } = slotOf(i)
                return (row - 1) * (height + 40)
              },
              rotation: () => gsap.utils.random(-3, 3),
              scale: 1,
              duration: 1.4,
              stagger: { amount: 0.4, from: 'center' },
              ease: 'expo.out',
            },
            '-=0.2'
          )
      })

      /* ---------- Mobile: stacked deck -> swipe rail ---------- */
      media.add('(max-width: 767px)', () => {
        const offset = window.innerWidth * 0.8

        mobileCardsRef.current.forEach((card, i) => {
          gsap.set(card, {
            x: -(i * (offset + 20)),
            y: 0,
            scale: 0.4,
            opacity: 0,
            rotation: gsap.utils.random(-15, 15),
          })
        })

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 60%' },
        })

        timeline
          .to(hub, { rotationX: -130, duration: 0.8, ease: 'power3.inOut' })
          .to(
            mobileCardsRef.current,
            { y: -100, opacity: 1, scale: 0.85, duration: 0.6, stagger: 0.05, ease: 'back.out(1.2)' },
            '-=0.4'
          )
          .to(
            mobileCardsRef.current,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: (i) => (i === 0 ? 1 : 0.92),
              opacity: (i) => (i === 0 ? 1 : 0.5),
              duration: 0.8,
              stagger: 0.08,
              ease: 'expo.out',
              onComplete: () => {
                if (!mobileRailRef.current) return
                mobileRailRef.current.style.overflowX = 'auto'
                mobileRailRef.current.style.pointerEvents = 'auto'
              },
            },
            '-=0.2'
          )
      })

      return () => media.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none"
    >
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        <div className="relative w-0 h-0 transform-style-3d">
          {/* Archive console (the "continue watching" bar) */}
          <div
            ref={consoleRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />
            <div className="relative z-10 text-red-600 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* Poster covers */}
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              /* the bottom row sits above the console, the top row tucks behind its arch */
              style={{ zIndex: i > 4 ? 70 : 10 + i }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.episode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">
                      {project.match} Match
                    </span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">
                      HD
                    </span>
                  </div>
                </div>

                <div className="space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-red-600/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
              </div>
            </div>
          ))}

          {/* The visible bottom half of the console, drawn above the covers */}
          <div
            className="archive-console absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile rail */}
      <div
        ref={mobileRailRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        {projects.map((project, i) => (
          <div
            key={`mob-${project.title}`}
            ref={(el) => {
              mobileCardsRef.current[i] = el
            }}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <p className="text-xs text-white/70 font-light line-clamp-2">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
