import Link from 'next/link'
import { ArrowRight, Check, Download, Plus } from 'lucide-react'
import { href, tr, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import type { Category, ProductItem } from '@/content/products'
import { countries, site, waLink } from '@/content/site'
import { partners, process } from '@/content/company'
import { faqs } from '@/content/faq'
import { AddToQuote } from './AddToQuote'
import { Icon, WhatsAppIcon } from './Icon'
import { Img } from './Img'
import { ButtonLink, Card, Container, Kicker, cx } from './ui'

export const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

/** Link target for a product. TODO(phase 3): point at /products/[slug]/[product] once product pages exist. */
export const productPath = (c: Category, i: ProductItem) => `/products/${c.slug}#${i.id}`

export const enquireText = (locale: Locale, name: string) =>
  locale === 'ar'
    ? `مرحبًا ${site.name}، أودّ الحصول على عرض سعر لـ: ${name}`
    : `Hello ${site.name}, I would like a quotation for: ${name}`

/* ---------------- Category tile ---------------- */
export function CategoryTile({ c, locale }: { c: Category; locale: Locale }) {
  const t = getDict(locale)
  return (
    <Link data-reveal href={href(locale, `/products/${c.slug}`)} className="group block overflow-hidden rounded-lg border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Img src={c.cover} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw" className="photo object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute end-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-bold text-navy-900">
          {c.items.length} {locale === 'ar' ? 'منتجات' : 'products'}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="font-heading text-[0.95rem] font-extrabold uppercase leading-tight text-navy-900 group-hover:text-gold-600 sm:text-base">{tr(c.name, locale)}</h3>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy-800 text-white transition group-hover:bg-gold-500 group-hover:text-navy-950" aria-hidden>
          <ArrowRight className="flip-rtl size-4" />
        </span>
        <span className="sr-only">{t.common.explore}</span>
      </div>
    </Link>
  )
}

/** Back-compat: inner pages still render a category card grid. */
export function CategoryCard({ c, locale }: { c: Category; locale: Locale; index?: number }) {
  return <CategoryTile c={c} locale={locale} />
}

/* ---------------- Product card ---------------- */
export function ProductCard({ c, i, locale, className }: { c: Category; i: ProductItem; locale: Locale; className?: string }) {
  const name = tr(i.name, locale)
  return (
    <article data-reveal className={cx('group flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition hover:shadow-lift', className)}>
      <Link href={href(locale, productPath(c, i))} className="relative block aspect-[4/3] overflow-hidden bg-mist">
        <Img src={i.image} alt={name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 45vw, 80vw" className="photo object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute start-3 top-3 rounded bg-navy-900/90 px-2 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white">{tr(c.name, locale)}</span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-extrabold uppercase leading-tight text-navy-900">
          <Link href={href(locale, productPath(c, i))} className="hover:text-gold-600">{name}</Link>
        </h3>
        {i.latin && <p className="mt-1 text-sm italic text-muted" dir="ltr">{i.latin}</p>}
        <p className="mt-2 text-sm text-ink-2">{tr(i.forms, locale)}</p>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <div className="flex-1 [&>*]:w-full"><AddToQuote locale={locale} id={i.id} name={i.name.en} category={c.name.en} /></div>
          <a
            href={waLink(enquireText(locale, i.name.en))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${getDict(locale).common.whatsappUs}: ${name}`}
            className="grid size-[2.4rem] shrink-0 place-items-center rounded-md bg-[#25D366] text-white hover:bg-[#1eb956]"
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ---------------- Process (workflow) ---------------- */
export function ProcessSteps({ locale, light }: { locale: Locale; light?: boolean }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {process.map((s, i) => (
        <li key={i} data-reveal style={{ transitionDelay: `${i * 60}ms` }} className={cx('relative rounded-lg p-6', light ? 'bg-white/5 ring-1 ring-white/10' : 'border border-line bg-white shadow-card')}>
          <span className="absolute end-4 top-3 font-heading text-4xl font-black text-gold-500/25" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
          <span className="grid size-12 place-items-center rounded-md bg-gold-500 text-navy-950"><Icon name={s.icon} className="size-6" /></span>
          <h3 className={cx('mt-5 font-heading text-base font-extrabold uppercase', light ? 'text-white' : 'text-navy-900')}>{tr(s.title, locale)}</h3>
          <p className={cx('mt-2 text-sm leading-relaxed', light ? 'text-white/70' : 'text-muted')}>{tr(s.body, locale)}</p>
        </li>
      ))}
    </ol>
  )
}

/* ---------------- Facts table (about) ---------------- */
export function Particulars({ locale }: { locale: Locale; light?: boolean }) {
  const ar = locale === 'ar'
  const rows: [string, string][] = [
    [ar ? 'تأسست' : 'Established', `${site.foundedYear} · ${ar ? 'كيرالا' : 'Kerala'}`],
    [ar ? 'المنشأ' : 'Origin', ar ? 'ساحل مالابار، الهند' : 'Malabar Coast, India'],
    [ar ? 'الفئات' : 'Categories', '7'],
    [ar ? 'منفذ التصدير' : 'Export gateway', ar ? 'ميناء ومطار كوتشين' : 'Cochin port & airport'],
    [ar ? 'الشروط' : 'Trade terms', 'FOB · CIF · CFR'],
    [ar ? 'الأسواق' : 'Markets', countries.map((c) => tr(c.name, locale)).join(' · ')],
    [ar ? 'الرد' : 'Response', ar ? 'خلال 24 ساعة' : 'Within 24 hours'],
  ]
  return (
    <dl className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
      {rows.map(([k, v], i) => (
        <div key={k} className={cx('grid grid-cols-[9rem_1fr] gap-4 px-5 py-3.5 text-sm', i % 2 === 0 && 'bg-mist/60')}>
          <dt className="font-bold uppercase tracking-wide text-navy-800">{k}</dt>
          <dd className="text-ink-2">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ---------------- CTA band ---------------- */
export function CtaBand({ locale, title, body }: { locale: Locale; title?: string; body?: string }) {
  const t = getDict(locale)
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="relative isolate overflow-hidden rounded-xl bg-navy-900 px-6 py-12 text-white sm:px-12">
          <Img src="/images/plates/global-banner.webp" alt="" fill sizes="100vw" className="photo -z-20 object-cover opacity-30" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/60 rtl:bg-gradient-to-l" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <Kicker light>{locale === 'ar' ? 'طلب عرض سعر' : 'Request for quotation'}</Kicker>
              <h2 className="font-heading text-3xl font-black uppercase leading-tight sm:text-4xl">{title ?? t.home.ctaTitle}</h2>
              <p className="mt-4 text-lg text-white/75">{body ?? t.home.ctaBody}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-col">
              <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote} <ArrowRight className="flip-rtl size-4" /></ButtonLink>
              <ButtonLink href={waLink()} external variant="whatsapp"><WhatsAppIcon className="size-4" /> {t.common.whatsappUs}</ButtonLink>
              <a href="/catalogue/saaco-global-catalogue.pdf" download className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/60 px-5 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-navy-900">
                <Download className="size-4" aria-hidden /> {t.common.downloadCatalogue}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------------- Partners ---------------- */
export function PartnersGrid() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {partners.map((p) => (
        <li key={p.name} data-reveal className="grid h-28 place-items-center rounded-lg border border-line bg-white p-4 shadow-card sm:h-32">
          <Img src={p.logo} alt={p.name} sizes="200px" className="max-h-20 w-auto object-contain" />
        </li>
      ))}
    </ul>
  )
}

export function PartnersStrip() {
  const row = [...partners, ...partners]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className="flex w-max animate-marquee items-center gap-5 hover:[animation-play-state:paused]">
        {row.map((p, i) => (
          <li key={i} aria-hidden={i >= partners.length} className="grid h-24 w-44 shrink-0 place-items-center rounded-lg border border-line bg-white px-5 shadow-card">
            <Img src={p.logo} alt={i < partners.length ? p.name : ''} sizes="176px" className="max-h-16 w-auto object-contain" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------- FAQ ---------------- */
export function FaqList({ locale, limit }: { locale: Locale; limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs
  return (
    <div className="space-y-3">
      {list.map((f, i) => (
        <details key={i} className="group rounded-lg border border-line bg-white shadow-card open:border-gold-500 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-heading text-[0.95rem] font-bold text-navy-900 sm:text-base">
            {tr(f.q, locale)}
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-navy-800 text-white transition group-open:rotate-45 group-open:bg-gold-500 group-open:text-navy-950" aria-hidden>
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-ink-2">{tr(f.a, locale)}</p>
        </details>
      ))}
    </div>
  )
}

/* ---------------- Checklist helper ---------------- */
export function Checklist({ items, light }: { items: string[]; light?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((x) => (
        <li key={x} className={cx('flex gap-3', light ? 'text-white/85' : 'text-ink-2')}>
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-950"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
          {x}
        </li>
      ))}
    </ul>
  )
}

export { Card }
