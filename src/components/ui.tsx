import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12', className)}>{children}</div>
}

type Tone = 'paper' | 'paper-2' | 'night'
const tones: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  'paper-2': 'bg-paper-2 text-ink',
  night: 'bg-night text-paper',
}

export function Section({ id, className, children, tone = 'paper' }: { id?: string; className?: string; children: ReactNode; tone?: Tone }) {
  return (
    <section id={id} className={cx('py-20 sm:py-28', tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  )
}

/** "§ 01 — Index of goods" style running head with a full-width rule. */
export function RunningHead({ no, children, light, className }: { no?: string; children: ReactNode; light?: boolean; className?: string }) {
  return (
    <div className={cx('flex items-center gap-4 border-t pt-4', light ? 'border-paper/40 text-paper/70' : 'border-ink text-ink-2', className)}>
      {no && <span className="label">§ {no}</span>}
      <span className="label">{children}</span>
    </div>
  )
}

export function SectionHeading({
  no, kicker, title, body, light, className, children,
}: { no?: string; kicker: string; title: ReactNode; body?: string; light?: boolean; className?: string; children?: ReactNode }) {
  return (
    <header className={cx('mb-12 sm:mb-16', className)}>
      <RunningHead no={no} light={light}>{kicker}</RunningHead>
      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 data-reveal className={cx('text-balance font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:col-span-8 lg:text-7xl', light ? 'text-paper' : 'text-ink')}>
          {title}
        </h2>
        {(body || children) && (
          <div data-reveal className={cx('lg:col-span-4 lg:pb-2', light ? 'text-paper/70' : 'text-ink-2')}>
            {body && <p className="text-base leading-relaxed sm:text-[1.0625rem]">{body}</p>}
            {children}
          </div>
        )}
      </div>
    </header>
  )
}

type Variant = 'ink' | 'wax' | 'line' | 'line-light'
const variants: Record<Variant, string> = {
  ink: 'bg-ink text-paper hover:bg-wax',
  wax: 'bg-wax text-paper hover:bg-wax-2',
  line: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  'line-light': 'border border-paper/60 text-paper hover:bg-paper hover:text-ink',
}
export const buttonClass = (v: Variant = 'ink', extra?: string) =>
  cx(
    'label inline-flex items-center justify-center gap-3 px-6 py-4 !text-[0.72rem] font-medium transition-colors duration-200 disabled:opacity-50',
    variants[v],
    extra,
  )

export function ButtonLink({
  variant = 'ink', className, external, ...p
}: ComponentProps<typeof Link> & { variant?: Variant; external?: boolean }) {
  if (external) {
    const { href, children, ...rest } = p
    return (
      <a href={String(href)} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)} {...(rest as ComponentProps<'a'>)}>
        {children}
      </a>
    )
  }
  return <Link className={buttonClass(variant, className)} {...p} />
}

export const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 12" aria-hidden className={cx('flip-rtl h-3 w-6', className)} fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M0 6h22M17 1l5 5-5 5" />
  </svg>
)

/** Rotating wax-seal mark. Pure SVG. */
export function Seal({ text, className, size = 168 }: { text: string; className?: string; size?: number }) {
  const r = 70
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={cx('text-wax', className)} aria-hidden>
      <defs>
        <path id="seal-circle" d={`M100,100 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
      </defs>
      <circle cx="100" cy="100" r="96" fill="currentColor" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="var(--color-paper)" strokeOpacity=".5" strokeWidth="1" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="var(--color-paper)" strokeOpacity=".5" strokeWidth="1" />
      <g className="origin-center animate-spin-slow" style={{ transformBox: 'fill-box' }}>
        <text fill="var(--color-paper)" fontFamily="var(--font-mono)" fontSize="11">
          <textPath href="#seal-circle" textLength={Math.round(2 * Math.PI * r - 6)} lengthAdjust="spacing">{text}</textPath>
        </text>
      </g>
      <text x="100" y="112" textAnchor="middle" fill="var(--color-paper)" fontFamily="var(--font-display-en), serif" fontSize="40">SG</text>
    </svg>
  )
}
