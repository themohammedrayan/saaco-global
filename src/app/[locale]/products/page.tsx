import Link from 'next/link'
import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { CategoryCard, CtaBand, roman } from '@/components/sections'
import { AddToQuote } from '@/components/AddToQuote'
import { JsonLd } from '@/components/JsonLd'
import { Section, SectionHeading } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/products'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/products', t.products.title, t.products.body)
}

export default async function ProductsPage({ params }: PageProps<'/[locale]/products'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  return (
    <>
      <PageHero locale={locale} no="002" eyebrow={t.products.eyebrow} title={t.products.title} body={t.products.body} crumbs={[{ label: t.nav.products }]} />
      <Section>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => <CategoryCard key={c.slug} c={c} locale={locale} index={i} />)}
        </div>
      </Section>
      <Section tone="paper-2" className="border-t border-ink">
        <SectionHeading no="A" kicker={ar ? 'الملحق' : 'Appendix'} title={ar ? 'القائمة الكاملة للمنتجات' : 'Complete schedule of goods'} body={t.products.specNote} />
        <div className="space-y-14">
          {categories.map((c, ci) => (
            <div key={c.slug} data-reveal>
              <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
                <h3 className="flex items-baseline gap-4 font-display text-3xl sm:text-4xl">
                  <span className="label text-muted">{roman[ci]}.</span>
                  <Link href={href(locale, `/products/${c.slug}`)} className="hover:text-wax">{tr(c.name, locale)}</Link>
                </h3>
                <span className="label text-muted">{String(c.items.length).padStart(2, '0')}</span>
              </div>
              <ul>
                {c.items.map((i) => (
                  <li key={i.id} className="ledger-row grid items-center gap-x-6 gap-y-1 py-4 sm:grid-cols-[1.2fr_1fr_1fr_6rem_auto]">
                    <span className="font-display text-xl">{tr(i.name, locale)}</span>
                    <span className="font-serif text-sm italic text-ink-2" dir="ltr">{i.latin ?? '—'}</span>
                    <span className="text-sm text-ink-2">{tr(i.forms, locale)}</span>
                    <span className="font-mono text-xs text-muted" dir="ltr">HS {i.hs}</span>
                    <span className="mt-2 sm:mt-0 sm:text-end"><AddToQuote locale={locale} id={i.id} name={i.name.en} category={c.name.en} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand locale={locale} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t.products.title,
        itemListElement: categories.map((c, idx) => ({
          '@type': 'ListItem', position: idx + 1, name: tr(c.name, locale), url: `${site.url}${href(locale, `/products/${c.slug}`)}`,
        })),
      }} />
    </>
  )
}
