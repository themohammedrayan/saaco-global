import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function Section({
  id, className, children, tone = 'cream',
}: { id?: string; className?: string; children: ReactNode; tone?: 'cream' | 'sand' | 'white' | 'forest' }) {
  const tones = {
    cream: 'bg-cream',
    sand: 'bg-sand',
    white: 'bg-white',
    forest: 'bg-forest-900 text-white',
  }
  return (
    <section id={id} className={cx('py-20 sm:py-28', tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cx(
      'mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]',
      light ? 'text-gold-300' : 'text-saffron-600',
    )}>
      <span aria-hidden className={cx('h-px w-8', light ? 'bg-gold-300' : 'bg-saffron-500')} />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow, title, body, light, center, className,
}: { eyebrow?: string; title: string; body?: string; light?: boolean; center?: boolean; className?: string }) {
  return (
    <div data-reveal className={cx('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={cx(
        'font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]',
        light ? 'text-white' : 'text-forest-900',
      )}>{title}</h2>
      {body && <p className={cx('mt-5 text-lg leading-relaxed', light ? 'text-white/75' : 'text-muted')}>{body}</p>}
    </div>
  )
}

type Variant = 'primary' | 'secondary' | 'ghost-light' | 'outline'
const variants: Record<Variant, string> = {
  primary: 'bg-saffron-500 text-forest-950 hover:bg-saffron-400 shadow-lg shadow-saffron-600/20',
  secondary: 'bg-forest-800 text-white hover:bg-forest-700',
  'ghost-light': 'border border-white/30 text-white hover:bg-white/10',
  outline: 'border border-forest-800/20 text-forest-900 hover:border-forest-800 hover:bg-forest-50',
}
export const buttonClass = (v: Variant = 'primary', extra?: string) =>
  cx(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50',
    variants[v],
    extra,
  )

export function ButtonLink({
  variant = 'primary', className, external, ...p
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
