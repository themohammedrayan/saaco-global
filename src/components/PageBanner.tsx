import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { href, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { Img } from './Img'
import { Container, Kicker } from './ui'

/** Standard inner-page banner: dark spice photo, navy wash, heavy title, breadcrumb pill. */
export function PageBanner({
  locale, eyebrow, title, body, image = '/images/plates/global-banner.webp', crumbs = [], children,
}: {
  locale: Locale
  eyebrow?: string
  title: string
  body?: string
  image?: string
  crumbs?: { label: string; path?: string }[]
  children?: ReactNode
  /** accepted for compatibility, unused */
  caption?: string
  no?: string
}) {
  const t = getDict(locale)
  const trail = [{ label: t.nav.home, path: '/' }, ...crumbs]
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Img src={image} alt="" fill priority sizes="100vw" className="photo -z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/55 rtl:bg-gradient-to-l" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            {trail.map((c, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="flip-rtl size-3 text-gold-400" aria-hidden />}
                {c.path && i < trail.length - 1
                  ? <Link href={href(locale, c.path)} className="text-white/75 hover:text-white">{c.label}</Link>
                  : <span aria-current="page" className="text-gold-400">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">
          {eyebrow && <Kicker light>{eyebrow}</Kicker>}
          <h1 className="font-heading text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {body && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{body}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}
