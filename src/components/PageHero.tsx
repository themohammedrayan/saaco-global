import Link from 'next/link'
import type { ReactNode } from 'react'
import { href, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { Img } from './Img'
import { Container } from './ui'

/** Editorial page opener: running head + breadcrumb, Caslon title, optional figure plate. */
export function PageHero({
  locale, eyebrow, title, body, image, caption, crumbs = [], children, no,
}: {
  locale: Locale
  eyebrow?: string
  title: string
  body?: string
  image?: string
  caption?: string
  crumbs?: { label: string; path?: string }[]
  children?: ReactNode
  no?: string
}) {
  const t = getDict(locale)
  const trail = [{ label: t.nav.home, path: '/' }, ...crumbs]
  return (
    <section className="paper-grain border-b border-ink bg-paper">
      <Container className="pt-8 sm:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
          <nav aria-label="Breadcrumb">
            <ol className="label flex flex-wrap items-center gap-2 text-muted">
              {trail.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {c.path && i < trail.length - 1
                    ? <Link href={href(locale, c.path)} className="hover:text-wax">{c.label}</Link>
                    : <span aria-current="page" className="text-ink">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          {no && <span className="label text-muted">No. {no}</span>}
        </div>
        <div className={image ? 'grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:items-end' : 'py-12 sm:py-20'}>
          <div className={image ? 'lg:col-span-7' : 'max-w-5xl'}>
            {eyebrow && <p className="label mb-6 text-wax">{eyebrow}</p>}
            <h1 className="font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">{title}</h1>
            {body && <p className="mt-8 max-w-2xl font-serif text-lg leading-relaxed text-ink-2 sm:text-xl">{body}</p>}
            {children}
          </div>
          {image && (
            <figure className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden border border-ink bg-paper-2">
                <Img src={image} alt="" fill priority sizes="(min-width:1024px) 40vw, 100vw" className="plate-img object-cover" />
              </div>
              {caption && <figcaption className="label mt-3 flex justify-between text-muted"><span>{caption}</span><span>SAACO · KL</span></figcaption>}
            </figure>
          )}
        </div>
      </Container>
    </section>
  )
}
