import Link from 'next/link'
import { notFound } from 'next/navigation'
import { href, locales, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories, getCategory } from '@/content/products'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { AddToQuote, RequestSamples } from '@/components/AddToQuote'
import { CategoryCard, CtaBand, roman } from '@/components/sections'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { Arrow, ButtonLink, RunningHead, Section } from '@/components/ui'

export const dynamicParams = false
export const generateStaticParams = () => locales.flatMap((locale) => categories.map((c) => ({ locale, slug: c.slug })))

export async function generateMetadata({ params }: PageProps<'/[locale]/products/[slug]'>) {
  const locale = await getLocale(params)
  const c = getCategory((await params).slug)
  if (!c) return {}
  const exporter = locale === 'ar' ? 'مصدّر من كيرالا، الهند' : 'Exporter from Kerala, India'
  return pageMeta(locale, `/products/${c.slug}`, `${tr(c.name, locale)} — ${exporter}`, c.short, c.cover)
}

export default async function CategoryPage({ params }: PageProps<'/[locale]/products/[slug]'>) {
  const locale = await getLocale(params)
  const c = getCategory((await params).slug)
  if (!c) notFound()
  const t = getDict(locale)
  const ar = locale === 'ar'
  const idx = categories.indexOf(c)
  const others = categories.filter((o) => o.slug !== c.slug).slice(0, 3)
  const sampleLines = c.items.map((i) => ({ id: i.id, name: i.name.en, category: c.name.en }))

  return (
    <>
      <PageHero
        locale={locale}
        no={`P-${roman[idx]}`}
        eyebrow={`${ar ? 'لوحة' : 'Plate'} ${roman[idx]} · ${t.products.eyebrow}`}
        title={tr(c.name, locale)}
        body={tr(c.short, locale)}
        image={c.cover}
        caption={`${ar ? 'لوحة' : 'Plate'} ${roman[idx]} — ${tr(c.name, locale)}`}
        crumbs={[{ label: t.nav.products, path: '/products' }, { label: tr(c.name, locale) }]}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote} <Arrow /></ButtonLink>
          <RequestSamples locale={locale} lines={sampleLines} />
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RunningHead no="01">{ar ? 'وصف' : 'Description'}</RunningHead>
            <p data-reveal className="mt-8 font-serif text-xl leading-relaxed text-ink-2 first-letter:float-start first-letter:me-3 first-letter:font-display first-letter:text-[5rem] first-letter:leading-[0.8] first-letter:text-wax sm:text-2xl rtl:first-letter:float-none rtl:first-letter:me-0 rtl:first-letter:text-inherit">
              {tr(c.intro, locale)}
            </p>

            <RunningHead no="02" className="mt-16">{t.products.items}</RunningHead>
            <ul className="mt-2">
              {c.items.map((i, n) => (
                <li key={i.id} data-reveal className="ledger-row grid gap-4 py-6 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
                  <span className="label text-muted" dir="ltr">SG-{roman[idx]}-{String(n + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight">{tr(i.name, locale)}</h3>
                    {i.latin && <p className="mt-1 font-serif italic text-ink-2" dir="ltr">{i.latin}</p>}
                    <p className="mt-2 text-sm text-ink-2">{t.products.forms}: {tr(i.forms, locale)} <span className="font-mono text-xs text-muted" dir="ltr">· HS {i.hs}</span></p>
                  </div>
                  <AddToQuote locale={locale} id={i.id} name={i.name.en} category={c.name.en} />
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <div className="border border-ink bg-paper-2">
              <h2 className="label flex justify-between border-b border-ink bg-ink px-5 py-3 text-paper">
                <span>{t.products.specs}</span><span dir="ltr">{roman[idx]}</span>
              </h2>
              <dl>
                {c.specs.map((s, k) => (
                  <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-rule px-5 py-4 text-sm">
                    <dt className="label pt-0.5 text-muted">{tr(s.label, locale)}</dt>
                    <dd>{tr(s.value, locale)}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-rule px-5 py-4 text-sm">
                  <dt className="label pt-0.5 text-muted">{ar ? 'الشحن' : 'Shipping'}</dt>
                  <dd>FOB / CIF — {tr(site.port, locale)}</dd>
                </div>
              </dl>
              <p className="px-5 py-4 font-serif text-sm italic leading-relaxed text-ink-2">{t.products.specNote}</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper-2" className="border-y border-ink">
        <RunningHead no="03">{t.products.gallery}</RunningHead>
        <div className="mt-8 grid auto-rows-[13rem] grid-cols-2 gap-4 md:auto-rows-[16rem] md:grid-cols-4">
          {c.gallery.map((gi, i) => (
            <figure key={gi.src} data-reveal className={i === 0 ? 'col-span-2 row-span-2 flex flex-col' : 'flex flex-col'}>
              <div className="relative flex-1 overflow-hidden border border-ink bg-paper">
                <Img src={gi.src} alt={tr(gi.alt, locale)} fill sizes={i === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 25vw, 50vw'} className="plate-img object-cover" />
              </div>
              <figcaption className="label mt-2 truncate text-muted">{ar ? 'شكل' : 'Fig.'} {i + 1} — {tr(gi.alt, locale)}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <RunningHead no="04" className="flex-1">{t.products.otherCategories}</RunningHead>
          <Link href={href(locale, '/products')} className="label ink-link hover:text-wax">{t.common.backToProducts}</Link>
        </div>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {others.map((o) => <CategoryCard key={o.slug} c={o} locale={locale} index={categories.indexOf(o)} />)}
        </div>
      </Section>

      <CtaBand locale={locale} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: tr(c.name, locale),
        itemListElement: c.items.map((i, k) => ({
          '@type': 'ListItem',
          position: k + 1,
          item: {
            '@type': 'Product',
            name: tr(i.name, locale),
            description: `${tr(i.forms, locale)} — ${tr(c.short, locale)}`,
            image: `${site.url}${c.cover}`,
            category: tr(c.name, locale),
            brand: { '@type': 'Brand', name: site.name },
            countryOfOrigin: 'IN',
          },
        })),
      }} />
    </>
  )
}
