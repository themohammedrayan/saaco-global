import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { CategoryCard, CtaBand } from '@/components/sections'
import { AddToQuote } from '@/components/AddToQuote'
import { JsonLd } from '@/components/JsonLd'
import { Section, SectionHeading } from '@/components/ui'
import Link from 'next/link'

export async function generateMetadata({ params }: PageProps<'/[locale]/products'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/products', t.products.title, t.products.body)
}

export default async function ProductsPage({ params }: PageProps<'/[locale]/products'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return (
    <>
      <PageHero locale={locale} eyebrow={t.products.eyebrow} title={t.products.title} body={t.products.body} image="/images/hero/global-banner.webp" crumbs={[{ label: t.nav.products }]} />
      <Section tone="cream">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => <CategoryCard key={c.slug} c={c} locale={locale} />)}
        </div>
      </Section>
      <Section tone="white">
        <SectionHeading eyebrow={t.products.eyebrow} title={locale === 'ar' ? 'القائمة الكاملة للمنتجات' : 'Full product list'} body={t.products.specNote} />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {categories.map((c) => (
            <div key={c.slug} data-reveal>
              <h3 className="mb-4 flex items-baseline justify-between gap-4 border-b border-line pb-3 font-display text-2xl text-forest-900">
                <Link href={href(locale, `/products/${c.slug}`)} className="hover:text-saffron-600">{tr(c.name, locale)}</Link>
                <span className="text-sm font-sans text-muted">{c.items.length}</span>
              </h3>
              <ul className="divide-y divide-line">
                {c.items.map((i) => (
                  <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div>
                      <p className="font-medium text-forest-900">{tr(i.name, locale)}</p>
                      <p className="text-sm text-muted">{tr(i.forms, locale)} · <span dir="ltr">HS {i.hs}</span></p>
                    </div>
                    <AddToQuote locale={locale} id={i.id} name={i.name.en} category={c.name.en} />
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
