import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { href, tr, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import type { Category } from '@/content/products'
import { partners, process } from '@/content/company'
import { stats, waLink } from '@/content/site'
import { faqs } from '@/content/faq'
import { Icon, WhatsAppIcon } from './Icon'
import { Img } from './Img'
import { ButtonLink, Container, cx } from './ui'

export function CategoryCard({ c, locale, large }: { c: Category; locale: Locale; large?: boolean }) {
  const t = getDict(locale)
  return (
    <Link
      data-reveal
      href={href(locale, `/products/${c.slug}`)}
      className={cx(
        'group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl bg-forest-900 p-6 text-white shadow-sm sm:p-8',
        large ? 'min-h-[26rem] lg:min-h-[34rem]' : 'min-h-[20rem]',
      )}
    >
      <Img
        src={c.cover}
        alt=""
        fill
        sizes={large ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw'}
        className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/95 via-forest-950/45 to-transparent" />
      <h3 className={cx('font-display', large ? 'text-3xl sm:text-4xl' : 'text-2xl')}>{tr(c.name, locale)}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{tr(c.short, locale)}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
        {t.common.explore}
        <ArrowRight className="flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden />
      </span>
    </Link>
  )
}

export function StatsBand({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-forest-800 py-14 text-white">
      <div aria-hidden className="grain absolute inset-0" />
      <Container className="relative">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} data-reveal className="flex flex-col border-white/15 px-4 text-center lg:border-s lg:first:border-s-0">
              <dt className="order-2 mt-2 text-sm text-white/70">{tr(s.label, locale)}</dt>
              <dd className="font-display text-4xl text-gold-300 sm:text-5xl" dir="ltr">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

export function ProcessSteps({ locale }: { locale: Locale }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-5">
      <span aria-hidden className="absolute inset-x-[10%] top-8 hidden h-px bg-gradient-to-r from-transparent via-saffron-400/60 to-transparent md:block" />
      {process.map((s, i) => (
        <li key={i} data-reveal style={{ transitionDelay: `${i * 80}ms` }} className="relative text-center">
          <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-white text-forest-800 shadow-md ring-1 ring-line">
            <Icon name={s.icon} className="size-7" />
            <span className="absolute -end-2 -top-2 grid size-6 place-items-center rounded-full bg-saffron-500 text-xs font-bold text-forest-950">{i + 1}</span>
          </span>
          <h3 className="mt-5 font-display text-xl text-forest-900">{tr(s.title, locale)}</h3>
          <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">{tr(s.body, locale)}</p>
        </li>
      ))}
    </ol>
  )
}

export function CtaBand({ locale, title, body }: { locale: Locale; title?: string; body?: string }) {
  const t = getDict(locale)
  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container>
        <div data-reveal className="relative isolate overflow-hidden rounded-[2rem] bg-forest-900 px-6 py-14 text-white sm:px-14 sm:py-16">
          <Img src="/images/hero/spice-harvest.webp" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-35" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-900/40 rtl:bg-gradient-to-l" />
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">{title ?? t.home.ctaTitle}</h2>
            <p className="mt-5 text-lg text-white/75">{body ?? t.home.ctaBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote}<ArrowRight className="flip-rtl size-4" aria-hidden /></ButtonLink>
              <ButtonLink href={waLink()} external variant="ghost-light"><WhatsAppIcon className="size-4" />{t.common.whatsappUs}</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function PartnersMarquee() {
  const row = [...partners, ...partners]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul className="flex w-max animate-marquee items-center gap-6 hover:[animation-play-state:paused]">
        {row.map((p, i) => (
          <li key={i} aria-hidden={i >= partners.length} className="grid h-28 w-48 shrink-0 place-items-center rounded-2xl bg-white px-6 ring-1 ring-line">
            <Img src={p.logo} alt={i < partners.length ? p.name : ''} sizes="192px" className="max-h-20 w-auto object-contain" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FaqList({ locale, limit }: { locale: Locale; limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs
  return (
    <div className="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
      {list.map((f, i) => (
        <details key={i} className="group p-6 sm:p-7 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg text-forest-900 sm:text-xl">
            {tr(f.q, locale)}
            <Plus aria-hidden className="mt-1 size-5 shrink-0 text-saffron-600 transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{tr(f.a, locale)}</p>
        </details>
      ))}
    </div>
  )
}
