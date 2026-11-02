import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

type Tone = 'white' | 'cream' | 'mist' | 'navy'
const tones: Record<Tone, string> = {
  white: 'bg-white text-ink',
  cream: 'bg-cream text-ink',
  mist: 'bg-mist text-ink',
  navy: 'bg-navy-900 text-white',
}

export function Section({ id, className, children, tone = 'white' }: { id?: string; className?: string; children: ReactNode; tone?: Tone }) {
  return (
    <section id={id} className={cx('py-16 sm:py-20', tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  )
}

/** Gold square + small caps kicker above section titles. */
export function Kicker({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cx('mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]', light ? 'text-gold-400' : 'text-gold-600')}>
      <span aria-hidden className="size-2 bg-gold-500" />
      {children}
    </p>
  )
}

export function SectionTitle({
  kicker, title, lead, center, light, className, action,
}: { kicker?: string; title: ReactNode; lead?: ReactNode; center?: boolean; light?: boolean; className?: string; action?: ReactNode }) {
  return (
    <div className={cx('mb-10 sm:mb-12', center ? 'mx-auto max-w-3xl text-center' : action ? 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between' : 'max-w-3xl', className)}>
      <div className={center ? '' : 'max-w-3xl'}>
        {kicker && <Kicker light={light}>{kicker}</Kicker>}
        <h2 className={cx('font-heading text-[1.9rem] font-extrabold uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.6rem]', light ? 'text-white' : 'text-navy-900')}>
          {title}
        </h2>
        {lead && <p className={cx('mt-4 text-[1.05rem] leading-relaxed', light ? 'text-white/75' : 'text-muted')}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

type Variant = 'gold' | 'navy' | 'outline' | 'light' | 'whatsapp'
const variants: Record<Variant, string> = {
  gold: 'bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-sm',
  navy: 'bg-navy-800 text-white hover:bg-navy-700',
  outline: 'border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white',
  light: 'border-2 border-white/70 text-white hover:bg-white hover:text-navy-900',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1eb956]',
}
export const buttonClass = (v: Variant = 'gold', extra?: string) =>
  cx(
    'inline-flex items-center justify-center gap-2.5 rounded-md px-5 py-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 disabled:opacity-50',
    variants[v],
    extra,
  )

export function ButtonLink({
  variant = 'gold', className, external, ...p
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

/** Arrow in a small circle, used inside primary buttons. */
export const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" aria-hidden className={cx('flip-rtl size-4 shrink-0', className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('rounded-lg border border-line bg-white shadow-card', className)}>{children}</div>
}
