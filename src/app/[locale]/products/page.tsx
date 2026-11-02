import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { CatalogueBrowser } from '@/components/CatalogueBrowser'
import { CategoryTile, CtaBand } from '@/components/sections'
import { JsonLd } from '@/components/JsonLd'
import { Section, SectionTitle } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/products'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/products', t.products.title, t.products.body)
}

export default async function ProductsPage({ params }: PageProps<'/[locale]/products'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  const count = categories.reduce((n, c) => n + c.items.length, 0)
  return (
    <>
      <PageBanner
        locale={locale}
        eyebrow={t.products.eyebrow}
        title={ar ? 'كتالوج المنتجات' : 'Product catalogue'}
        body={t.products.body}
        image="/images/plates/mixed.webp"
        crumbs={[{ label: t.nav.products }]}
      >
        <p className="mt-6 inline-flex items-center gap-3 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
          <span className="font-heading text-xl font-black text-gold-400">{count}</span> {ar ? 'منتجًا في' : 'products in'}
          <span className="font-heading text-xl font-black text-gold-400">{categories.length}</span> {ar ? 'فئات' : 'categories'}
        </p>
      </PageBanner>
      <Section tone="mist">
        <SectionTitle kicker={ar ? 'تصفّح' : 'Browse'} title={ar ? 'جميع المنتجات' : 'All products'} lead={t.products.specNote} />
        <CatalogueBrowser categories={categories} locale={locale} />
      </Section>
      <Section>
        <SectionTitle kicker={t.v3.catKicker} title={t.v3.catTitle} center />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => <CategoryTile key={c.slug} c={c} locale={locale} />)}
        </div>
      </Section>
      <CtaBand locale={locale} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t.products.title,
        itemListElement: categories.flatMap((c) => c.items.map((i) => ({ c, i }))).map(({ c, i }, idx) => ({
          '@type': 'ListItem', position: idx + 1, name: tr(i.name, locale), url: `${site.url}${href(locale, `/products/${c.slug}/${i.id}`)}`,
        })),
      }} />
    </>
  )
}
