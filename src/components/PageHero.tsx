import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { href, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { Img } from './Img'
import { Container, Eyebrow } from './ui'

export function PageHero({
  locale, eyebrow, title, body, image, crumbs = [], children,
}: {
  locale: Locale
  eyebrow?: string
  title: string
  body?: string
  image?: string
  crumbs?: { label: string; path?: string }[]
  children?: ReactNode
}) {
  const t = getDict(locale)
  const trail = [{ label: t.nav.home, path: '/' }, ...crumbs]
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
      {image && (
        <>
          <Img src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/95 via-forest-900/85 to-forest-900/50 rtl:bg-gradient-to-l" />
        </>
      )}
      <div aria-hidden className="grain absolute inset-0 -z-10" />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
          <ol className="flex flex-wrap items-center gap-1.5">
            {trail.map((c, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="flip-rtl size-3.5" aria-hidden />}
                {c.path && i < trail.length - 1 ? (
                  <Link href={href(locale, c.path)} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-white/90">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {body && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{body}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}
