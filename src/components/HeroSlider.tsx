'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cx } from './ui'

export type Slide = { image: string; kicker: string; title: string; body: string }

/** Crossfading hero that advances every 6.5s. Pauses on hover, on keyboard focus and for reduced-motion users. */
export function HeroSlider({ slides, actions, labels }: { slides: Slide[]; actions: ReactNode; labels: { prev: string; next: string; goto: string } }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)
  const n = slides.length
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n])

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
  useEffect(() => {
    if (paused || reduced.current) return
    const id = setInterval(() => go(1), 6500)
    return () => clearInterval(id)
  }, [paused, go])

  return (
    <div
      className="relative isolate min-h-[34rem] overflow-hidden bg-navy-950 text-white sm:min-h-[38rem] lg:min-h-[40rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, k) => (
        <div key={k} aria-hidden={k !== i} className={cx('absolute inset-0 -z-10 transition-opacity duration-1000', k === i ? 'opacity-100' : 'opacity-0')}>
          <Image src={s.image} alt="" fill priority={k === 0} sizes="100vw" className={cx('photo object-cover', k === i && 'animate-kenburns')} />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/25 rtl:bg-gradient-to-l" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950/70 to-transparent" />

      <div className="mx-auto flex min-h-[34rem] max-w-[80rem] items-center px-4 pb-36 pt-12 sm:pb-28 sm:min-h-[38rem] sm:px-6 lg:min-h-[40rem] lg:px-8">
        <div className="max-w-2xl">
          {slides.map((s, k) => (
            <div key={k} hidden={k !== i} aria-live={k === i ? 'polite' : undefined}>
              <p className="mb-5 inline-flex animate-fade-in items-center gap-2 rounded-full border border-gold-400/40 bg-navy-950/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-400 backdrop-blur">
                <span aria-hidden className="size-1.5 rounded-full bg-gold-400" /> {s.kicker}
              </p>
              <h1 className="animate-fade-in font-heading text-[2.5rem] font-black uppercase leading-[1.02] tracking-tight [animation-delay:80ms] sm:text-6xl lg:text-[4.4rem]">
                {s.title}
              </h1>
              <p className="mt-6 max-w-xl animate-fade-in border-s-4 border-gold-500 ps-4 text-lg leading-relaxed text-white/85 [animation-delay:160ms]">{s.body}</p>
            </div>
          ))}
          <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
        </div>
      </div>

      <div className="absolute bottom-24 end-4 flex items-center gap-2 max-sm:start-4 max-sm:bottom-[5.5rem] sm:end-8 lg:bottom-28">
        <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className="hidden size-10 sm:grid place-items-center rounded-full border border-white/40 hover:bg-white hover:text-navy-900">
          <ChevronLeft className="flip-rtl size-5" />
        </button>
        <div className="flex gap-1.5 px-1">
          {slides.map((_, k) => (
            <button key={k} type="button" onClick={() => setI(k)} aria-label={`${labels.goto} ${k + 1}`} aria-current={k === i}
              className={cx('h-2 rounded-full transition-all', k === i ? 'w-7 bg-gold-500' : 'w-2 bg-white/50 hover:bg-white')} />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label={labels.next} className="hidden size-10 sm:grid place-items-center rounded-full border border-white/40 hover:bg-white hover:text-navy-900">
          <ChevronRight className="flip-rtl size-5" />
        </button>
      </div>
    </div>
  )
}
