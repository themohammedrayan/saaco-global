import Link from 'next/link'
import { href, tr, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories, type Category } from '@/content/products'
import { partners, process } from '@/content/company'
import { site, waLink } from '@/content/site'
import { faqs } from '@/content/faq'
import { Img } from './Img'
import { Arrow, ButtonLink, Container, RunningHead, Seal, cx } from './ui'

export const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

/** Ledger-style index of all categories; the plate image reveals on hover (desktop). */
export function CategoryIndex({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  return (
    <ol className="border-t border-ink">
      {categories.map((c, i) => (
        <li key={c.slug} data-reveal>
          <Link
            href={href(locale, `/products/${c.slug}`)}
            className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-rule py-6 transition-colors hover:bg-paper-2 sm:grid-cols-[5rem_1fr_16rem_8rem] sm:py-8 lg:grid-cols-[6rem_1.4fr_1fr_10rem_9rem]"
          >
            <span className="label ps-1 text-muted">{roman[i]}.</span>
            <span className="font-display text-3xl leading-none transition-colors group-hover:text-wax sm:text-5xl lg:text-6xl">{tr(c.name, locale)}</span>
            <span className="hidden text-sm leading-relaxed text-ink-2 lg:block">{tr(c.short, locale)}</span>
            <span className="label hidden text-muted sm:block">{String(c.items.length).padStart(2, '0')} {locale === 'ar' ? 'منتجات' : 'lines'}</span>
            <span className="relative hidden h-20 overflow-hidden border border-ink sm:block lg:h-24">
              <Img src={c.cover} alt="" fill sizes="10rem" className="plate-img object-cover" />
            </span>
            <span className="label flex items-center gap-2 text-wax sm:hidden"><Arrow /></span>
            <span className="sr-only">{t.common.explore}</span>
          </Link>
        </li>
      ))}
    </ol>
  )
}

/** Specimen plate card, used on the products page and "other categories". */
export function CategoryCard({ c, locale, index }: { c: Category; locale: Locale; index: number }) {
  const t = getDict(locale)
  return (
    <Link data-reveal href={href(locale, `/products/${c.slug}`)} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden border border-ink bg-paper-2">
        <Img src={c.cover} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="plate-img object-cover group-hover:scale-[1.03]" />
        <span className="label absolute start-0 top-0 bg-paper px-3 py-2">{locale === 'ar' ? 'لوحة' : 'Plate'} {roman[index]}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 border-b border-rule pb-4">
        <div>
          <h3 className="font-display text-3xl leading-tight group-hover:text-wax">{tr(c.name, locale)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">{tr(c.short, locale)}</p>
        </div>
        <span className="label mt-2 flex shrink-0 items-center gap-2 text-wax">{t.common.explore} <Arrow /></span>
      </div>
    </Link>
  )
}

/** "Particulars" — the house's facts, set as a ledger instead of a stats band. */
export function Particulars({ locale, light }: { locale: Locale; light?: boolean }) {
  const ar = locale === 'ar'
  const rows: [string, string, string?][] = [
    [ar ? 'تأسست' : 'Established', String(site.foundedYear), ar ? 'بيرينتالمانا، كيرالا' : 'Perinthalmanna, Kerala'],
    [ar ? 'المنشأ' : 'Origin', ar ? 'ساحل مالابار' : 'Malabar Coast', `${site.address.geo.lat.toFixed(4)}°N, ${site.address.geo.lng.toFixed(4)}°E`],
    [ar ? 'الفئات' : 'Categories', '07', ar ? 'توابل، شاي وقهوة، عسل، والمزيد' : 'Spices, tea & coffee, honey & more'],
    [ar ? 'منفذ التصدير' : 'Gateway', ar ? 'كوتشين' : 'Cochin', ar ? 'بحرًا وجوًا' : 'Sea & air freight'],
    [ar ? 'الشروط' : 'Terms', 'FOB · CIF', ar ? 'وشروط أخرى عند الطلب' : 'Others on request'],
    [ar ? 'الرد' : 'Response', ar ? '24 ساعة' : '24 h', ar ? 'واتساب والبريد الإلكتروني' : 'WhatsApp & email'],
  ]
  return (
    <dl className={cx('border-t', light ? 'border-paper/50' : 'border-ink')}>
      {rows.map(([k, v, note]) => (
        <div key={k} data-reveal className={cx('grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b py-4 sm:grid-cols-[10rem_1fr_1fr]', light ? 'border-paper/20' : 'border-rule')}>
          <dt className={cx('label', light ? 'text-paper/55' : 'text-muted')}>{k}</dt>
          <dd className="font-display text-3xl leading-none sm:text-4xl" dir="auto">{v}</dd>
          {note && <dd className={cx('col-start-2 text-sm sm:col-start-3', light ? 'text-paper/65' : 'text-ink-2')}>{note}</dd>}
        </div>
      ))}
    </dl>
  )
}

export function ProcessSteps({ locale, light }: { locale: Locale; light?: boolean }) {
  return (
    <ol className={cx('grid border-t sm:grid-cols-2 lg:grid-cols-5', light ? 'border-paper/50' : 'border-ink')}>
      {process.map((s, i) => (
        <li
          key={i}
          data-reveal
          style={{ transitionDelay: `${i * 70}ms` }}
          className={cx('border-b py-8 pe-6 lg:border-b-0 lg:border-e lg:px-6 lg:first:ps-0 lg:last:border-e-0', light ? 'border-paper/20' : 'border-rule')}
        >
          <p className={cx('font-display text-6xl leading-none', light ? 'text-paper/30' : 'text-wax')} dir="ltr">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="mt-6 font-display text-2xl">{tr(s.title, locale)}</h3>
          <p className={cx('mt-3 text-sm leading-relaxed', light ? 'text-paper/65' : 'text-ink-2')}>{tr(s.body, locale)}</p>
        </li>
      ))}
    </ol>
  )
}

export function CtaBand({ locale, title, body }: { locale: Locale; title?: string; body?: string }) {
  const t = getDict(locale)
  return (
    <section className="relative overflow-hidden bg-wax text-paper">
      <Container className="relative grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <RunningHead light>{locale === 'ar' ? 'طلب عرض سعر' : 'Request for quotation'}</RunningHead>
          <h2 data-reveal className="mt-8 text-balance font-display text-5xl leading-[1] sm:text-7xl">{title ?? t.home.ctaTitle}</h2>
          <p className="mt-6 max-w-xl font-serif text-lg text-paper/80">{body ?? t.home.ctaBody}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={href(locale, '/quote')} className="bg-paper !text-ink hover:bg-ink hover:!text-paper">{t.common.requestQuote} <Arrow /></ButtonLink>
            <ButtonLink href={waLink()} external variant="line-light">{t.common.whatsappUs}</ButtonLink>
          </div>
        </div>
        <div className="hidden justify-center lg:col-span-4 lg:flex">
          <Seal size={260} className="text-ink" text={locale === 'ar' ? 'SAACO GLOBAL · EXPORT HOUSE · KERALA · INDIA · ' : 'SAACO GLOBAL · EXPORT HOUSE · KERALA · INDIA · '} />
        </div>
      </Container>
    </section>
  )
}

export function PartnersGrid() {
  return (
    <ul className="grid grid-cols-2 border-s border-t border-ink sm:grid-cols-4">
      {partners.map((p) => (
        <li key={p.name} data-reveal className="group flex flex-col justify-between border-b border-e border-ink bg-paper">
          <div className="grid h-32 place-items-center p-6 sm:h-40">
            <Img src={p.logo} alt={p.name} sizes="200px" className="max-h-20 w-auto object-contain mix-blend-multiply grayscale transition duration-500 group-hover:grayscale-0 sm:max-h-24" />
          </div>
          <p className="label border-t border-rule px-4 py-2 text-muted">{p.name}</p>
        </li>
      ))}
    </ul>
  )
}

export function FaqList({ locale, limit }: { locale: Locale; limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs
  return (
    <div className="border-t border-ink">
      {list.map((f, i) => (
        <details key={i} className="group border-b border-rule [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
          <summary className="grid cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6">
            <span className="label text-muted">Q.{String(i + 1).padStart(2, '0')}</span>
            <span className="font-display text-2xl leading-snug group-hover:text-wax sm:text-[1.7rem]">{tr(f.q, locale)}</span>
            <span aria-hidden className="font-mono text-xl text-wax transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-3xl pb-8 ps-16 font-serif text-[1.0625rem] leading-relaxed text-ink-2">{tr(f.a, locale)}</p>
        </details>
      ))}
    </div>
  )
}
